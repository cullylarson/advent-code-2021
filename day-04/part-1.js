import {then} from '@cullylarson/p'
import {compose, map, filter, curry, report} from '@cullylarson/f'
import {readInput} from './lib.js'

const markBoard = curry((number, board) => {
  return compose(
    map(map(x => x === number ? 'x' : x)),
  )(board)
})

const markBoards = (number, boards) => {
  return boards.map(markBoard(number))
}

const isWinningLine = line => {
  const lineUnique = new Set(line)
  if(lineUnique.size === 1 && lineUnique.has('x')) {
    return true
  }
  else {
    return false
  }
}

const hasWinningLine = lines => {
  for(const line of lines) {
    if(isWinningLine(line)) {
      return true
    }
  }

  return false
}

const invertBoard = board => {
  // check vertical lines
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

const isWinningBoard = board => {
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

const getWinningBoard = (boards) => {
  for(const board of boards) {
    if(isWinningBoard(board)) {
      return board
    }
  }

  return null
}

const playGame = ({callNumbers, boards}) => {
  for(const callNumber of callNumbers) {
    boards = markBoards(callNumber, boards)
    const winningBoard = getWinningBoard(boards)

    if(winningBoard) {
      return {board: winningBoard, callNumber}
    }
  }

  return null
}

const sum = xs => xs.reduce((acc, x) => acc + x)

const scoreBoard = compose(
  sum,
  filter(x => x !== 'x'),
  x => x.flat(),
)

const scoreGame = ({board, callNumber}) => {
  return scoreBoard(board) * callNumber
}

then(compose(
  report,
  scoreGame,
  playGame,
), readInput('input.txt'))
