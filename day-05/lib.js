import {then} from '@cullylarson/p'
import {compose, filter, trim, map, split, toInt, last, curry} from '@cullylarson/f'
import {readFile} from '../lib.js'

const flat = xs => xs.flat()

const sort = xs => [...xs].sort((a, b) => a - b)

const getMostDigts = compose(
  x => ('' + x).length,
  last,
  sort,
  flat,
  flat,
)

const pad = curry((toLength, x) => {
  let xStr = x + ''
  for(let i = xStr.length; i < toLength; i++) {
    xStr += ' '
  }

  return xStr
})

export const printBoard = board => {
  const spacing = getMostDigts(board)
  for(let y = 0; y < board.length; y++) {
    console.info(
      board[y]
        .map(pad(spacing))
        .join(' '),
    )
  }

  return board
}

const length = xs => xs.length

export const getNumOverlaps = curry((minOverlaps, board) => {
  return compose(
    length,
    filter(x => x >= minOverlaps),
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

export const createBoard = (lines) => {
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
  const [x0, y0] = line[0]
  const [x1, y1] = line[1]

  // straight line, vertical
  if(x0 === x1) {
    const x = x0
    for(let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) {
      board = markPoint(board, x, y)
    }
  }
  // straight line, horizontal
  else if(y0 === y1) {
    const y = y0
    for(let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) {
      board = markPoint(board, x, y)
    }
  }
  else {
    const run = x1 - x0
    const rise = y1 - y0
    const m = run === 0 ? 0 : rise / run
    const b = y0 - (m * x0)

    for(let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) {
      const y = (m * x) + b

      if(isInteger(y)) {
        board = markPoint(board, x, y)
      }
    }
  }

  return board
}

export const markLines = ({board, lines}) => {
  return lines.reduce(markLine, board)
}

export const readInput = fileName => then(compose(
  map(map(map(toInt(null)))),
  map(map(split(','))),
  map(map(trim)),
  map(split('->')),
  filter(Boolean),
  split('\n'),
), readFile(fileName, {encoding: 'utf8'}))
