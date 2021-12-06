import {then} from '@cullylarson/p'
import {compose, report} from '@cullylarson/f'
import {readInput, runDays, length} from './lib.js'

const NUM_DAYS = 80

then(compose(
  report,
  length,
  runDays(NUM_DAYS),
), readInput('input.txt'))
