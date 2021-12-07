import {then} from '@cullylarson/p'
import {compose, trim, map, split, toInt} from '@cullylarson/f'
import {readFile} from '../lib.js'

export const readInput = (fileName) => then(compose(
  map(toInt(null)),
  map(trim),
  split(','),
), readFile(fileName, {encoding: 'utf8'}))
