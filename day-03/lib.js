import {then} from '@cullylarson/p'
import {compose, join, toStr, filter, map, split, toInt, values} from '@cullylarson/f'
import {readFile} from '../lib.js'

const binaryStrToNumber = x => parseInt(x, 2)

export const binaryArrayToNumber = compose(
  binaryStrToNumber,
  join(''),
  map(toStr),
)

export const countAtPositions = compose(
  values,
  xs => xs.reduce((acc, x) => {
    for(let i = 0; i < x.length; i++) {
      if(!acc[i]) {
        acc[i] = [0, 0]
      }

      acc[i][x[i]]++
    }

    return acc
  }, {}),
)

export const readData = fileName => then(compose(
  map(map(toInt(null))),
  map(split('')),
  filter(Boolean),
  split('\n'),
), readFile(fileName, {encoding: 'utf8'}))
