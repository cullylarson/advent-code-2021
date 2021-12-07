import {then} from '@cullylarson/p'
import {compose, curry, filter, trim, map, split, toInt} from '@cullylarson/f'
import {readFile} from '../lib.js'

export const getTotal = model => model.reduce((acc, x) => acc + x, 0)

const emptyModel = maxAge => {
  return Array(maxAge + 1).fill(0)
}

const runDay = (maxAge, model) => {
  const nextDayModel = emptyModel(maxAge)

  for(let age = 0; age < model.length; age++) {
    const num = model[age]

    if(age === 0) {
      nextDayModel[maxAge] += num
      nextDayModel[maxAge - 2] += num
    }
    else {
      nextDayModel[age - 1] += num
    }
  }

  return nextDayModel
}

export const runDays = curry((numDays, maxAge, model) => {
  for(let i = 0; i < numDays; i++) {
    model = runDay(maxAge, model)
  }

  return model
})

const toModel = curry((maxAge, ages) => {
  const model = emptyModel(maxAge)

  for(const age of ages) {
    model[age]++
  }

  return model
})

export const readInput = (maxAge, fileName) => then(compose(
  toModel(maxAge),
  map(toInt(null)),
  filter(Boolean),
  map(trim),
  split(','),
), readFile(fileName, {encoding: 'utf8'}))
