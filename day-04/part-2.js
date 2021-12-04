import {then} from '@cullylarson/p'
import {compose, curry, filter, report} from '@cullylarson/f'
import {readInput, scoreGame, markBoards, isWinningBoard} from './lib.js'

const not = curry((f, x) => !f(x))

const playGame = ({callNumbers, boards}) => {
  for(const callNumber of callNumbers) {
    boards = markBoards(callNumber, boards)

    if(boards.length === 1 && isWinningBoard(boards[0])) {
      return {
        board: boards[0],
        callNumber,
      }
    }

    // get rid of any winning boards
    boards = filter(not(isWinningBoard), boards)
  }

  throw Error('Could not find a winning board.')
}

then(compose(
  report,
  scoreGame,
  playGame,
), readInput('input.txt'))
