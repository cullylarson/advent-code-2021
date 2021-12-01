import fs from 'fs'
import {promisify} from 'util'
import {compose, reduce, report, filter, map, split, toInt, get} from '@cullylarson/f'
import {then} from '@cullylarson/p'

const readFile = promisify(fs.readFile)

const countIncreases = reduce((acc, x) => {
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

then(compose(
  report,
  get('numIncreases', 0),
  countIncreases,
  filter(Boolean),
  map(toInt(null)),
  split('\n'),
), readFile('input.txt', {encoding: 'utf8'}))
