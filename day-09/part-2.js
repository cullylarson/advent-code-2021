import {then} from '@cullylarson/p'
import {compose, map, report, headN} from '@cullylarson/f'
import {readInput, sum} from './lib.js'

const rsort = xs => [...xs].sort((a, b) => b - a)

const mult = xs => xs.reduce((acc, x) => acc * x, 1)

const getPoint = (map, x, y) => map[y][x]
const isChecked = (map, x, y) => getPoint(map, x, y).isChecked
const getValue = (map, x, y) => getPoint(map, x, y).value

const markChecked = (map, x, y) => {
  map[y][x].isChecked = true
  return map
}

const embelishMap = map(map(value => ({value, isChecked: false})))

const sumBasin = (map, x, y) => {
  if(isChecked(map, x, y)) return 0

  markChecked(map, x, y)

  if(getValue(map, x, y) === 9) return 0

  return 1 + sum([
    // top
    y === 0 ? 0 : sumBasin(map, x, y - 1),
    // bottom
    y === map.length - 1 ? 0 : sumBasin(map, x, y + 1),
    // left
    x === 0 ? 0 : sumBasin(map, x - 1, y),
    // right
    x === map[0].length - 1 ? 0 : sumBasin(map, x + 1, y),
  ])
}

const getBasins = map => {
  const basins = []

  for(let x = 0; x < map[0].length; x++) {
    for(let y = 0; y < map.length; y++) {
      const basin = sumBasin(map, x, y)
      if(basin !== 0) {
        basins.push(basin)
      }
    }
  }

  return basins
}

then(compose(
  report,
  mult,
  headN(3),
  rsort,
  getBasins,
  embelishMap,
), readInput('input.txt'))
