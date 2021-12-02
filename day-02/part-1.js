import {compose, reduce, report, filter, map, split, toInt} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

const lineToCommand = ([command, unitsStr]) => {
  return {
    command,
    units: toInt(null, unitsStr),
  }
}

const commandsToPosition = reduce((acc, x) => {
  switch(x.command) {
    case 'forward':
      return {
        ...acc,
        horizontal: acc.horizontal + x.units,
      }
    case 'up':
      return {
        ...acc,
        depth: acc.depth - x.units,
      }
    case 'down':
      return {
        ...acc,
        depth: acc.depth + x.units,
      }
  }
}, {horizontal: 0, depth: 0})

then(compose(
  report,
  x => x.horizontal * x.depth,
  commandsToPosition,
  map(lineToCommand),
  map(split(' ')),
  filter(Boolean),
  split('\n'),
), readFile('input.txt', {encoding: 'utf8'}))
