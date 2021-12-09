import {then} from '@cullylarson/p'
import {compose, map, get, report, filter} from '@cullylarson/f'
import {readInput, flat, length, isDistinct} from './lib.js'

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
