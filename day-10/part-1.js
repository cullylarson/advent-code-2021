import {then} from '@cullylarson/p'
import {compose, map, report, head, tail, filter, get} from '@cullylarson/f'
import {readInput} from './lib.js'

const sum = xs => xs.reduce((acc, x) => acc + x, 0)

const points = {
  '}': 1197,
  ']': 57,
  ')': 3,
  '>': 25137,
}

const pairs = {
  '{': '}',
  '[': ']',
  '(': ')',
  '<': '>',
}

const getPoints = closing => points[closing]

const closingCharacters = Object.values(pairs)

const isClose = (x) => closingCharacters.includes(x)

const closes = (open, close) => {
  return pairs[open] === close
}

const getClosing = open => pairs[open]

const findPairs = (input) => {
  const pairs = []

  do {
    if(!input.length) {
      return {
        pairs,
        input,
      }
    }

    const open = head(input)

    if(isClose(open)) {
      return {
        pairs,
        input,
      }
    }

    const result = findPairs(tail(input))

    if(result.error) return result

    input = result.input
    pairs.push(result.pairs)

    if(!input.length) {
      return {
        error: {
          kind: 'no-close',
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

    pairs.push({open, close})
    input = tail(input)
  }
  while(input.length)

  return {
    pairs,
    input: '',
  }
}

then(compose(
  report,
  sum,
  map(getPoints),
  map(get(['error', 'close'], null)),
  filter(x => get(['error', 'kind'], null, x) === 'mismatch'),
  map(findPairs),
), readInput('input.txt'))
