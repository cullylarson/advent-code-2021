import {then} from '@cullylarson/p'
import {compose, get, report} from '@cullylarson/f'
import {readInput, doSteps, octosToChart} from './lib.js'

const NUM_STEPS = 100

then(compose(
  report,
  get('flashes', 0),
  doSteps(NUM_STEPS, false),
  octosToChart,
), readInput('input.txt'))
