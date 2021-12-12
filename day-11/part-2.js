import {then} from '@cullylarson/p'
import {compose, report} from '@cullylarson/f'
import {readInput, doSteps, octosToChart} from './lib.js'

const NUM_STEPS = 100

then(compose(
  report,
  doSteps(NUM_STEPS, true),
  octosToChart,
), readInput('input.txt'))
