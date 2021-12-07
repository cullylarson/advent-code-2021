import v8 from 'v8'
import {then} from '@cullylarson/p'
import {compose, report} from '@cullylarson/f'
import {readInput, runDays, length} from './lib.js'

const NUM_DAYS = 256

const totalHeapSize = v8.getHeapStatistics().total_available_size
const totalHeapSizeGb = (totalHeapSize / 1024 / 1024 / 1024).toFixed(2)
console.log('totalHeapSizeGb: ', totalHeapSizeGb)

then(compose(
  report,
  length,
  runDays(NUM_DAYS),
), readInput('input.txt'))
