import {then} from '@cullylarson/p'
import {compose, filter, trim, map, split, toInt, last, curry} from '@cullylarson/f'
import {readFile} from '../lib.js'

export const flat = xs => xs.flat()

export const sort = xs => [...xs].sort((a, b) => a - b)

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

export const readInput = fileName => then(compose(
  map(map(map(toInt(null)))),
  map(map(split(','))),
  map(map(trim)),
  map(split('->')),
  filter(Boolean),
  split('\n'),
), readFile(fileName, {encoding: 'utf8'}))
