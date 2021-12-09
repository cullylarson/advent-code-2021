import {then} from '@cullylarson/p'
import {compose, map, get, filter, report} from '@cullylarson/f'
import {readInput} from './lib.js'

const getValue = (map, x, y) => map[y][x]

const notNull = x => x !== null

const increment = x => x + 1
const sum = xs => xs.reduce((acc, x) => acc + x, 0)

const getAdjacentValues = (map, x, y) => {
  return [
    // top
    y === 0 ? null : getValue(map, x, y - 1),
    // bottom
    y === map.length - 1 ? null : getValue(map, x, y + 1),
    // left
    x === 0 ? null : getValue(map, x - 1, y),
    // right
    x === map[0].length - 1 ? null : getValue(map, x + 1, y),
  ].filter(notNull)
}

const isLowpoint = info => {
  return info.adjacent.filter(x => x <= info.value).length === 0
}

const getAllAdjacentValues = (map) => {
  const values = []

  for(let x = 0; x < map[0].length; x++) {
    for(let y = 0; y < map.length; y++) {
      values.push({
        value: getValue(map, x, y),
        adjacent: getAdjacentValues(map, x, y),
      })
    }
  }

  return values
}

then(compose(
  report,
  sum,
  map(increment),
  map(get('value', null)),
  filter(isLowpoint),
  getAllAdjacentValues,
), readInput('input.txt'))
