import {then} from '@cullylarson/p'
import {compose, curry, filter, trim, map, split, toInt} from '@cullylarson/f'
import {readFile} from '../lib.js'

export const length = xs => xs.length

const runDay = fishes => fishes.reduce((acc, x) => {
  // reproduce
  if(x === 0) {
    acc.push(8)
    acc.push(6)
  }
  else {
    acc.push(x - 1)
  }

  return acc
}, [])

export const runDays = curry((numDays, fishes) => {
  for(let i = 0; i < numDays; i++) {
    fishes = runDay(fishes)
  }

  return fishes
})

export const readInput = fileName => then(compose(
  map(toInt(null)),
  filter(Boolean),
  map(trim),
  split(','),
), readFile(fileName, {encoding: 'utf8'}))
