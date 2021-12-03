import {then} from '@cullylarson/p'
import {compose, report, curry, values} from '@cullylarson/f'
import {readData, binaryArrayToNumber, countAtPositions} from './lib.js'

const filterByBit = (bitIdx, bitValue, values) => values.filter(value => {
  return value[bitIdx] === bitValue
})

const getBitValueMostCommon = (bitCount) => {
  return bitCount[0] > bitCount[1]
    ? 0
    // tie break to 1
    : 1
}

const getBitValueLeastCommon = (bitCount) => {
  return bitCount[1] < bitCount[0]
    ? 1
    // tie break to 0
    : 0
}

const applyBitCriteria = curry((getBitValue, values) => {
  for(let bitIdx = 0; bitIdx < values[0].length; bitIdx++) {
    const counts = countAtPositions(values)
    const bitCount = counts[bitIdx]
    const bitValue = getBitValue(bitCount)

    values = filterByBit(bitIdx, bitValue, values)

    if(values.length === 1) return values[0]
  }

  throw Error('Could not find value by applying bit criteria.')
})

const applyBitCriteriaOxy = applyBitCriteria(getBitValueMostCommon)
const applyBitCriteriaCo2 = applyBitCriteria(getBitValueLeastCommon)

const getOxy = (counts, values) => compose(
  binaryArrayToNumber,
  () => applyBitCriteriaOxy(counts, values),
)()

const getCo2 = (counts, values) => compose(
  binaryArrayToNumber,
  () => applyBitCriteriaCo2(counts, values),
)()

const getRatings = (values) => {
  return {
    oxy: getOxy(values),
    co2: getCo2(values),
  }
}

then(compose(
  report,
  ([x, y]) => x * y,
  values,
  getRatings,
), readData('input.txt'))
