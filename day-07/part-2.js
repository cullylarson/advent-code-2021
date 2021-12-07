import {then} from '@cullylarson/p'
import {compose, report} from '@cullylarson/f'
import {readInput} from './lib.js'

const max = xs => xs.reduce((acc, x) => {
  return acc === null
    ? x
    : Math.max(acc, x)
}, null)

const min = xs => xs.reduce((acc, x) => {
  return acc === null
    ? x
    : Math.min(acc, x)
}, null)

const getFuelForMove = (startPosition, endPosition) => {
  const distance = Math.abs(startPosition - endPosition)
  // the sum of integers from 0 to `distance` is the fuel cost
  // c.f. https://www.cuemath.com/sum-of-integers-formula/
  return (distance * (distance + 1)) / 2
}

const getTotalFuelForMove = (destination, positions) => {
  return positions.reduce((acc, x) => {
    return acc + getFuelForMove(x, destination)
  }, 0)
}

const solve = (positions) => {
  const startPosition = min(positions)
  const endPosition = max(positions)

  let leastFuel = null

  for(let position = startPosition; position <= endPosition; position++) {
    const fuel = getTotalFuelForMove(position, positions)

    if(leastFuel === null || leastFuel > fuel) {
      leastFuel = fuel
    }
  }

  if(leastFuel === null) {
    throw Error('Could not solve.')
  }

  return leastFuel
}

then(compose(
  report,
  solve,
), readInput('input.txt'))
