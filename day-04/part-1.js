import {then} from '@cullylarson/p'
import {compose, report} from '@cullylarson/f'
import {readInput, scoreGame, markBoards, isWinningBoard} from './lib.js'

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

  throw Error('Could not find a winning board.')
}

then(compose(
  report,
  scoreGame,
  playGame,
), readInput('input.txt'))
