import {then} from '@cullylarson/p'
import {compose, report} from '@cullylarson/f'
import {readInput, markLines, createBoard, getNumOverlaps} from './lib.js'

const MIN_OVERLAPS = 2

then(compose(
  report,
  getNumOverlaps(MIN_OVERLAPS),
  markLines,
  createBoard,
), readInput('input.txt'))
