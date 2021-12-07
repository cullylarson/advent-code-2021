import {then} from '@cullylarson/p'
import {compose, report} from '@cullylarson/f'
import {readInput} from './lib.js'

const median = compose(
  xs => xs[Math.floor(xs.length / 2)],
  xs => [...xs].sort((a, b) => a - b),
)

const getFuelCostForMove = (position, positions) => {
  return positions.reduce((acc, x) => {
    return acc + Math.abs(x - position)
  }, 0)
}

const solve = (positions) => {
  const optimalPosition = median(positions)
  return getFuelCostForMove(optimalPosition, positions)
}

then(compose(
  report,
  solve,
), readInput('input.txt'))
