import {compose, reduce, report, filter, map, split, join, values, toInt, toStr} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

const binaryStrToNumber = x => parseInt(x, 2)

const binaryArrayToNumber = compose(
  binaryStrToNumber,
  join(''),
  map(toStr),
)

const getMostPopular = (count) => {
  return count[0] > count[1]
    ? 0
    : 1
}

const getLeastPopular = (count) => {
  return count[0] < count[1]
    ? 0
    : 1
}

const countAtPositions = reduce((acc, x) => {
  for(let i = 0; i < x.length; i++) {
    if(!acc[i]) {
      acc[i] = [0, 0]
    }

    acc[i][x[i]]++
  }

  return acc
}, {})

const getGamma = compose(
  binaryArrayToNumber,
  values,
  map(getMostPopular),
)

const getEpsilon = compose(
  binaryArrayToNumber,
  values,
  map(getLeastPopular),
)

const getGammaEpsilon = (counts) => {
  return {
    gamma: getGamma(counts),
    epsilon: getEpsilon(counts),
  }
}

then(compose(
  report,
  ([x, y]) => x * y,
  values,
  getGammaEpsilon,
  countAtPositions,
  map(map(toInt(null))),
  map(split('')),
  filter(Boolean),
  split('\n'),
), readFile('input.txt', {encoding: 'utf8'}))
