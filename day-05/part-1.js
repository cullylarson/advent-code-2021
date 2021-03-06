import {then} from '@cullylarson/p'
import {compose, filter, report} from '@cullylarson/f'
import {readInput, markLines, createBoard, getNumOverlaps} from './lib.js'

const MIN_OVERLAPS = 2

const onlyStraightLines = filter(([[x0, y0], [x1, y1]]) => x0 === x1 || y0 === y1)

then(compose(
  report,
  getNumOverlaps(MIN_OVERLAPS),
  markLines,
  createBoard,
  onlyStraightLines,
), readInput('input.txt'))
