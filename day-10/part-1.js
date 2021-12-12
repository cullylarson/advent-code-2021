import {then} from '@cullylarson/p'
import {compose, map, report, get, filter, head, tail} from '@cullylarson/f'
import {readInput, isClose, closes, getClosing} from './lib.js'

const sum = xs => xs.reduce((acc, x) => acc + x, 0)

const points = {
  '}': 1197,
  ']': 57,
  ')': 3,
  '>': 25137,
}

const getPoints = closing => points[closing]

const findPairs = (input) => {
  do {
    if(!input.length) {
      return input
    }

    const open = head(input)

    if(isClose(open)) {
      // this will be handled by the caller
      return input
    }

    const result = findPairs(tail(input))

    if(result.error) {
      return result
    }

    input = result

    if(!input.length) {
      return {
        error: {
          kind: 'incomplete',
          open,
        },
      }
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

  return input
}

then(compose(
  report,
  sum,
  map(getPoints),
  map(get(['error', 'close'], null)),
  filter(x => get(['error', 'kind'], null, x) === 'mismatch'),
  map(findPairs),
), readInput('input.txt'))
