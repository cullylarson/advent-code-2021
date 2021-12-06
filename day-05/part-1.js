import {then} from '@cullylarson/p'
import {compose, filter, report, curry, last} from '@cullylarson/f'
import {readInput, flat, sort} from './lib.js'

const AT_LEAST_OVERLAPS = 2

const length = xs => xs.length

const getNumOverlaps = curry((atLeast, board) => {
  return compose(
    length,
    filter(x => x >= atLeast),
    flat,
    flat,
  )(board)
})

const getBoardSize = compose(
  last,
  sort,
  flat,
  flat,
)

const createBoard = (lines) => {
  const size = getBoardSize(lines)

  const board = []
  for(let y = 0; y <= size; y++) {
    const row = Array(size + 1).fill(0)
    board.push(row)
  }

  return {board, lines}
}

const markPoint = (board, x, y) => {
  board[y][x]++
  return board
}

const isInteger = x => Math.floor(x) === x

const markLine = (board, line) => {
  const [startX, startY] = line[0]
  const [endX, endY] = line[1]

  if(startX === endX) {
    const x = startX
    for(let y = Math.min(startY, endY); y <= Math.max(startY, endY); y++) {
      board = markPoint(board, x, y)
    }
  }
  else if(startY === endY) {
    const y = startY
    for(let x = Math.min(startX, endX); x <= Math.max(startX, endX); x++) {
      board = markPoint(board, x, y)
    }
  }
  else {
    const run = endX - startX
    const rise = endY - startY
    const m = run === 0 ? 0 : rise / run
    const b = startY - (m * startX)

    for(let x = startX; x <= endX; x++) {
      const y = (m * x) + b

      if(isInteger(y)) {
        board = markPoint(board, x, y)
      }
    }
  }

  return board
}

const markLines = ({board, lines}) => {
  return lines.reduce(markLine, board)
}

const onlyStraightLines = filter(([[startX, startY], [endX, endY]]) => startX === endX || startY === endY)

then(compose(
  report,
  getNumOverlaps(AT_LEAST_OVERLAPS),
  markLines,
  createBoard,
  onlyStraightLines,
), readInput('input.txt'))
