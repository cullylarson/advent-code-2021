import {then} from '@cullylarson/p'
import {compose, report} from '@cullylarson/f'
import {readInput, runDays, getTotal} from './lib.js'

const NUM_DAYS = 256
const MAX_AGE = 8

then(compose(
  report,
  getTotal,
  runDays(NUM_DAYS, MAX_AGE),
), readInput(MAX_AGE, 'input.txt'))
