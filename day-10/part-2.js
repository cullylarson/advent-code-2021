import {then} from '@cullylarson/p'
import {compose, map, report, filter, get, head, tail} from '@cullylarson/f'
import {readInput, isClose, getClosing, closes} from './lib.js'

const median = compose(
  xs => xs[Math.floor(xs.length / 2)],
  xs => [...xs].sort((a, b) => a - b),
)

const points = {
  '}': 3,
  ']': 2,
  ')': 1,
  '>': 4,
}

const getPoints = closing => points[closing]

const fixPairs = (input) => {
  let fixes = []

  do {
    if(!input.length) {
      return {
        input,
        fixes,
      }
    }

    const open = head(input)

    if(isClose(open)) {
      // this will be handled by the caller
      return {
        input,
        fixes,
      }
    }

    const result = fixPairs(tail(input))

    if(result.error) {
      return {
        ...result,
        input,
      }
    }

    input = result.input
    fixes = fixes.concat(result.fixes)

    if(!input.length) {
      const close = getClosing(open)
      fixes.push(close)
      input += close
    }

    const close = head(input)

    if(!closes(open, close)) {
      return {
        error: {
          kind: 'mismatch',
          open,
          close,
          expected: getClosing(open),
        },
      }
    }

    input = tail(input)
  }
  while(input.length)

  return {
    input,
    fixes,
  }
}

then(compose(
  report,
  median,
  map(xs => xs.reduce((acc, x) => acc * 5 + x, 0)),
  map(map(getPoints)),
  map(get('fixes', [])),
  filter(x => get(['error', 'kind'], null, x) !== 'mismatch'),
  map(fixPairs),
), readInput('input.txt'))
