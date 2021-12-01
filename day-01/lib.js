import fs from 'fs'
import {promisify} from 'util'
import {compose, reduce, get} from '@cullylarson/f'

export const readFile = promisify(fs.readFile)

const reduceIncreases = reduce((acc, x) => {
  if(acc.previousValue !== null && acc.previousValue < x) {
    return {
      previousValue: x,
      numIncreases: acc.numIncreases + 1,
    }
  }
  else {
    return {
      previousValue: x,
      numIncreases: acc.numIncreases,
    }
  }
}, {previousValue: null, numIncreases: 0})

export const countIncreases = compose(
  get('numIncreases', 0),
  reduceIncreases,
)
