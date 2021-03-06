import {compose, report, filter, map, split, toInt} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'
import {countIncreases} from './lib.js'

// adds up "windows" of numbers. a window is the number at each index plus
// the numbers at the next two indexes.
const sumWindows = (xs) => {
  const windows = []

  for(let i = 0; i < xs.length - 2; i++) {
    windows.push(xs[i] + xs[i + 1] + xs[i + 2])
  }

  return windows
}

then(compose(
  report,
  countIncreases,
  sumWindows,
  filter(Boolean),
  map(toInt(null)),
  split('\n'),
), readFile('input.txt', {encoding: 'utf8'}))
