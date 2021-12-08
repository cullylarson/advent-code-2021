import {then} from '@cullylarson/p'
import {compose, filter, trim, map, split} from '@cullylarson/f'
import {readFile} from '../lib.js'

export const readInput = (fileName) => then(compose(
  map(xs => ({
    patterns: xs[0],
    output: xs[1],
  })),
  map(map(split(' '))),
  map(map(trim)),
  map(split('|')),
  filter(Boolean),
  split('\n'),
), readFile(fileName, {encoding: 'utf8'}))
