import {then} from '@cullylarson/p'
import {compose, report, map, values} from '@cullylarson/f'
import {readData, binaryArrayToNumber, countAtPositions} from './lib.js'

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

const getGamma = compose(
  binaryArrayToNumber,
  map(getMostPopular),
)

const getEpsilon = compose(
  binaryArrayToNumber,
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
), readData('input.txt'))
