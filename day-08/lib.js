import {then} from '@cullylarson/p'
import {compose, filter, trim, map, split} from '@cullylarson/f'
import {readFile} from '../lib.js'

const normalSegments = {
  abcefg: 0,
  cf: 1,
  acdeg: 2,
  acdfg: 3,
  bcdf: 4,
  abdfg: 5,
  abdefg: 6,
  acf: 7,
  abcdefg: 8,
  abcdfg: 9,
}

export const valueToNumSegments = compose(
  xs => Object.fromEntries(xs),
  map(xs => [xs[1], xs[0].length]),
  x => Object.entries(x),
)(normalSegments)

export const knownValueToNumSegments = {
  1: valueToNumSegments[1],
  4: valueToNumSegments[4],
  7: valueToNumSegments[7],
  8: valueToNumSegments[8],
}

export const numSegmentsToKnownValue = compose(
  xs => Object.fromEntries(xs),
  map(xs => [xs[1], xs[0]]),
  x => Object.entries(x),
)(knownValueToNumSegments)

export const flat = xs => xs.flat()

export const length = xs => xs.length

export const isDistinct = compose(
  x => Object.values(knownValueToNumSegments).includes(x),
  length,
)

export const readInput = (fileName) => then(compose(
  map(xs => ({
    patterns: xs[0],
    output: xs[1],
  })),
  map(map(split(' '))),
  map(map(trim)),
  map(split('|')),
  filter(Boolean),
  split('\n'),
), readFile(fileName, {encoding: 'utf8'}))
