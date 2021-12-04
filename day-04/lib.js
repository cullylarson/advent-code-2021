import {then} from '@cullylarson/p'
import {compose, trim, filter, map, split, toInt, head, tail} from '@cullylarson/f'
import {readFile} from '../lib.js'

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

  // there should be a last, incomplete board
  boards.push(board)

  return boards
}

const parseInput = (inputArr) => {
  return {
    callNumbers: parseCallNumbers(head(inputArr)),
    boards: parseBoards(tail(inputArr)),
  }
}

export const readInput = fileName => then(compose(
  parseInput,
  filter(Boolean),
  split('\n'),
), readFile(fileName, {encoding: 'utf8'}))
