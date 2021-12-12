import {then} from '@cullylarson/p'
import {compose, map, split, filter, join, get} from '@cullylarson/f'
import {readFile} from '../lib.js'

export const printChart = chart => {
  compose(
    x => {
      console.log('**', chart.flashes, '**')
      console.log(x)
      console.log('----------')
    },
    join('\n'),
    map(join(' ')),
    map(map(get('energy', null))),
    get('octos', []),
  )(chart)

  return chart
}

export const readInput = (fileName) => then(compose(
  map(split('')),
  filter(Boolean),
  split('\n'),
), readFile(fileName, {encoding: 'utf8'}))
