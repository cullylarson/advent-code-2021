import {then} from '@cullylarson/p'
import {compose, curry, filter, map, split, report, join} from '@cullylarson/f'
import {readInput, flat, isDistinct, numSegmentsToKnownValue} from './lib.js'

const sort = xs => [...xs].sort()

const sum = xs => xs.reduce((acc, x) => acc + x, 0)

const sortLetters = compose(
  join(''),
  sort,
  split(''),
)

const patternToArray = split('')
const arrayToPattern = join('')

const translateValue = curry((mapping, x) => {
  return mapping[x]
})

const getDisinctPatterns = patterns => Array.from(new Set(patterns.filter(isDistinct)))

const difference = (a, b) => a
  .filter(x => !b.includes(x))
  .concat(b.filter(x => !a.includes(x)))

// the items in A that are not in B
const differenceOneWay = (a, b) => a.filter(x => !b.includes(x))

const getSegmentA = (pattern1Arr, pattern7Arr) => {
  const result = difference(pattern1Arr, pattern7Arr)

  if(result.length !== 1) throw Error('Could not get segment A')

  return result[0]
}

const getSegmentD = (pattern0Arr) => {
  const result = differenceOneWay(['a', 'b', 'c', 'd', 'e', 'f', 'g'], pattern0Arr)

  if(result.length !== 1) throw Error('Could not get segment D')

  return result[0]
}

const getSegmentB = (segmentD, segmentsBd) => {
  const segmentBArr = difference([segmentD], segmentsBd)

  if(segmentBArr.length !== 1) throw Error('Could not get segment B.')

  return segmentBArr[0]
}

const getSegmentC = (pattern1, pattern5) => {
  const segmentCArr = differenceOneWay(pattern1, pattern5)

  if(segmentCArr.length !== 1) throw Error('Could not get segment C.')

  return segmentCArr[0]
}

const getSegmentF = (pattern1, segmentC) => {
  const segmentFArr = differenceOneWay(pattern1, [segmentC])

  if(segmentFArr.length !== 1) throw Error('Could not get segment F.')

  return segmentFArr[0]
}

const getSegmentsBd = (pattern1Arr, pattern4Arr) => {
  return difference(pattern1Arr, pattern4Arr)
}

const getPattern0 = (patternArrs, segmentsBd) => {
  return compose(
    xs => {
      if(xs.length !== 1) throw Error('Could not get pattern 0.')

      return xs[0]
    },
    filter(xs => {
      // 0 has B but not D (doesn't have both)
      return (new Set([xs.includes(segmentsBd[0]), xs.includes(segmentsBd[1])])).size === 2
    }),
    filter(xs => xs.length === 6),
  )(patternArrs)
}

const getPattern2 = (patternArrs, segmentF) => {
  return compose(
    xs => {
      if(xs.length !== 1) throw Error('Could not get pattern 2.')

      return xs[0]
    },
    filter(xs => !xs.includes(segmentF)),
    filter(xs => xs.length === 5),
  )(patternArrs)
}

const getPattern6 = (patternArrs, segmentC) => {
  return compose(
    xs => {
      if(xs.length !== 1) throw Error('Could not get pattern 6.')

      return xs[0]
    },
    filter(xs => !xs.includes(segmentC)),
    filter(xs => xs.length === 6),
  )(patternArrs)
}

const getPattern5 = (patternArrs, segmentB) => {
  return compose(
    xs => {
      if(xs.length !== 1) throw Error('Could not get pattern 5.')

      return xs[0]
    },
    filter(xs => xs.includes(segmentB)),
    filter(xs => xs.length === 5),
  )(patternArrs)
}

const getPattern3 = (patternArrs, pattern2, pattern5) => {
  const pattern2Str = arrayToPattern(pattern2)
  const pattern5Str = arrayToPattern(pattern5)

  return compose(
    xs => {
      if(xs.length !== 1) throw Error('Could not get pattern 3.')

      return patternToArray(xs[0])
    },
    filter(x => x !== pattern2Str && x !== pattern5Str),
    map(arrayToPattern),
    filter(xs => xs.length === 5),
  )(patternArrs)
}

const getPattern9 = (patternArrs, pattern0, pattern6) => {
  const pattern0Str = arrayToPattern(pattern0)
  const pattern6Str = arrayToPattern(pattern6)

  return compose(
    xs => {
      if(xs.length !== 1) throw Error('Could not get pattern 9.')

      return patternToArray(xs[0])
    },
    filter(x => x !== pattern0Str && x !== pattern6Str),
    map(arrayToPattern),
    filter(xs => xs.length === 6),
  )(patternArrs)
}

// returns a mapping between pattern of each number and the number itself
const getMapping = patterns => {
  const patternArrs = patterns.map(patternToArray)

  const distinctPatterns = compose(
    xs => Object.fromEntries(xs),
    map((pattern) => [numSegmentsToKnownValue[pattern.length], patternToArray(pattern)]),
    getDisinctPatterns,
  )(patterns)

  const pattern1 = distinctPatterns[1]
  const pattern7 = distinctPatterns[7]
  const pattern4 = distinctPatterns[4]
  const pattern8 = distinctPatterns[8]
  const segmentA = getSegmentA(pattern1, pattern7)
  const segmentsBd = getSegmentsBd(pattern1, distinctPatterns[4])
  const pattern0 = getPattern0(patternArrs, segmentsBd)
  const segmentD = getSegmentD(pattern0)
  const segmentB = getSegmentB(segmentD, segmentsBd)
  const pattern5 = getPattern5(patternArrs, segmentB)
  const segmentC = getSegmentC(pattern1, pattern5)
  const segmentF = getSegmentF(pattern1, segmentC)
  const pattern2 = getPattern2(patternArrs, segmentF)
  const pattern6 = getPattern6(patternArrs, segmentC)
  const pattern3 = getPattern3(patternArrs, pattern2, pattern5)
  const pattern9 = getPattern9(patternArrs, pattern0, pattern6)

  return {
    [arrayToPattern(pattern0)]: 0,
    [arrayToPattern(pattern1)]: 1,
    [arrayToPattern(pattern2)]: 2,
    [arrayToPattern(pattern3)]: 3,
    [arrayToPattern(pattern4)]: 4,
    [arrayToPattern(pattern5)]: 5,
    [arrayToPattern(pattern6)]: 6,
    [arrayToPattern(pattern7)]: 7,
    [arrayToPattern(pattern8)]: 8,
    [arrayToPattern(pattern9)]: 9,
  }
}

const augMapping = ({patterns, output}) => {
  return {
    patterns,
    output,
    mapping: getMapping(patterns),
  }
}

const translateEntry = ({mapping, output}) => {
  return map(translateValue(mapping), output)
}

then(compose(
  report,
  sum,
  map(x => Number(x)),
  map(join('')),
  map(translateEntry),
  map(augMapping),
  map(({patterns, output}) => ({
    patterns: patterns.map(sortLetters),
    output: output.map(sortLetters),
  })),
), readInput('input.txt'))
