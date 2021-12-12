import {then} from '@cullylarson/p'
import {compose, trim, curry, filter, map, split, toInt, head, tail} from '@cullylarson/f'
import {readFile, sum, flat} from '../lib.js'

const parseCallNumbers = compose(
  map(toInt(null)),
  map(trim),
  split(','),
)

const parseBoardLine = compose(
  map(toInt(null)),
  split(/\s+/),
  trim,
)

const parseBoards = boardLines => {
  const boards = []
  let board = []
  for(let i = 0; i < boardLines.length; i++) {
    if(i % 5 === 0 && i !== 0) {
      boards.push(board)
      board = []
    }

    board.push(parseBoardLine(boardLines[i]))
  }

  // there should be a last, complete board
  boards.push(board)

  return boards
}

const parseInput = (inputArr) => {
  return {
    callNumbers: parseCallNumbers(head(inputArr)),
    boards: parseBoards(tail(inputArr)),
  }
}

export const markBoard = curry((number, board) => {
  return map(map(x => x === number ? 'x' : x), board)
})

export const markBoards = curry((number, boards) => {
  return boards.map(markBoard(number))
})

const isWinningLine = line => {
  const lineUnique = new Set(line)
  return lineUnique.size === 1 && lineUnique.has('x')
}

const hasWinningLine = lines => lines.some(isWinningLine)

const invertBoard = board => {
  const vLines = []

  for(let col = 0; col < board[0].length; col++) {
    const vLine = []
    for(let row = 0; row < board.length; row++) {
      vLine.push(board[row][col])
    }
    vLines.push(vLine)
  }

  return vLines
}

export const isWinningBoard = board => {
  // check horizontal lines
  if(hasWinningLine(board)) {
    return true
  }

  // check vertical lines
  if(hasWinningLine(invertBoard(board))) {
    return true
  }

  return false
}

const scoreBoard = compose(
  sum,
  filter(x => x !== 'x'),
  flat,
)

export const scoreGame = ({board, callNumber}) => {
  return scoreBoard(board) * callNumber
}

export const readInput = fileName => then(compose(
  parseInput,
  filter(Boolean),
  split('\n'),
), readFile(fileName, {encoding: 'utf8'}))
