import {compose, report, filter, map, split, toInt} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'
import {countIncreases} from './lib.js'

then(compose(
  report,
  countIncreases,
  filter(Boolean),
  map(toInt(null)),
  split('\n'),
), readFile('input.txt', {encoding: 'utf8'}))
