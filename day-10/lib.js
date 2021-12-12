import {then} from '@cullylarson/p'
import {compose, map, split, filter} from '@cullylarson/f'
import {readFile} from '../lib.js'

const pairs = {
  '{': '}',
  '[': ']',
  '(': ')',
  '<': '>',
}

const closingCharacters = Object.values(pairs)

export const isClose = (x) => closingCharacters.includes(x)

export const closes = (open, close) => {
  return pairs[open] === close
}

export const getClosing = open => pairs[open]

export const readInput = (fileName) => then(compose(
  map(split('')),
  filter(Boolean),
  split('\n'),
), readFile(fileName, {encoding: 'utf8'}))
