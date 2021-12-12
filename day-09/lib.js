import {then} from '@cullylarson/p'
import {compose, filter, map, split, toInt} from '@cullylarson/f'
import {readFile} from '../lib.js'

export const readInput = (fileName) => then(compose(
  map(map(toInt(null))),
  map(split('')),
  filter(Boolean),
  split('\n'),
), readFile(fileName, {encoding: 'utf8'}))
