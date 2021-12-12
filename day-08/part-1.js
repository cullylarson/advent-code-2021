import {then} from '@cullylarson/p'
import {compose, map, get, report, filter} from '@cullylarson/f'
import {flat} from '../lib.js'
import {readInput, length, isDistinct} from './lib.js'

const countDistinct = compose(
  length,
  filter(isDistinct),
  flat,
  map(get('output', [])),
)

then(compose(
  report,
  countDistinct,
), readInput('input.txt'))
