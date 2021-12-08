import {then} from '@cullylarson/p'
import {compose, map, get, report, filter} from '@cullylarson/f'
import {readInput} from './lib.js'

const numSegments = {
  0: 6,
  1: 2,
  2: 5,
  3: 5,
  4: 4,
  5: 5,
  6: 6,
  7: 3,
  8: 7,
  9: 6,
}

const length = xs => xs.length
const flat = xs => xs.flat()

const isDistinct = compose(
  x => [numSegments[1], numSegments[4], numSegments[7], numSegments[8]].includes(x),
  length,
)

const countDistinct = compose(
  length,
  filter(isDistinct),
  flat,
  map(get('output', [])),
)

then(compose(
  report,
  countDistinct,
), readInput('input.txt'))
