import yallist from 'yallist'
import {then} from '@cullylarson/p'
import {compose, curry, filter, trim, map, split, toInt} from '@cullylarson/f'
import {readFile} from '../lib.js'

export const length = xs => xs.length

const printHeapUsed = () => {
  const heapUsed = process.memoryUsage().heapUsed / 1024 / 1024
  const totalHeapUsedMb = (heapUsed).toFixed(2)
  console.info('Used: ', totalHeapUsedMb, 'MB')
}

export const printList = fishes => {
  let list = ''
  fishes.forEach(fish => {
    list += fish + ', '
  })
  console.info(list)
  return fishes
}

const runDay = fishes => {
  const last = fishes.tail

  let item = fishes.head
  do {
    // reproduce
    if(item.value === 0) {
      fishes.push(8)
      item.value = 6
    }
    else {
      item.value--
    }

    item = item === last ? null : item.next
  }
  while(item)

  return fishes
}

export const runDays = curry((numDays, fishes) => {
  for(let i = 0; i < numDays; i++) {
    fishes = runDay(fishes)
    console.log({i})
    printHeapUsed()
  }

  return fishes
})

const toLinkedList = (xs) => yallist.create(xs)

export const readInput = fileName => then(compose(
  toLinkedList,
  map(toInt(null)),
  filter(Boolean),
  map(trim),
  split(','),
), readFile(fileName, {encoding: 'utf8'}))
