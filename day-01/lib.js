import {compose, reduce, get} from '@cullylarson/f'

const reduceIncreases = reduce((acc, x) => {
  if(acc.previousValue !== null && acc.previousValue < x) {
    return {
      previousValue: x,
      numIncreases: acc.numIncreases + 1,
    }
  }
  else {
    return {
      previousValue: x,
      numIncreases: acc.numIncreases,
    }
  }
}, {previousValue: null, numIncreases: 0})

export const countIncreases = compose(
  get('numIncreases', 0),
  reduceIncreases,
)
