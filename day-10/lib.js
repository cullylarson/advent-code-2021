import {then} from '@cullylarson/p'
import {compose, filter, map, split} from '@cullylarson/f'
import {readFile} from '../lib.js'

export const readInput = (fileName) => then(compose(
  map(split('')),
  filter(Boolean),
  split('\n'),
), readFile(fileName, {encoding: 'utf8'}))
