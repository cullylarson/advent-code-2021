import {then} from '@cullylarson/p'
import {compose, curry, get, report, map} from '@cullylarson/f'
import {readInput} from './lib.js'

const NUM_STEPS = 100

const getOcto = (chart, x, y) => chart.octos[y][x]

const octosToChart = octos => {
  return {
    flashes: 0,
    octos: map(map(x => ({
      energy: x,
      hasFlashed: false,
    })), octos),
  }
}

const markNoneFlashes = chart => ({
  ...chart,
  octos: map(map(x => ({...x, hasFlashed: false})), chart.octos),
})

const zeroOutFlashed = chart => ({
  ...chart,
  octos: map(map(x => x.hasFlashed ? {...x, energy: 0} : x), chart.octos),
})

const forEachOcto = curry((f, chart) => {
  for(let y = 0; y < chart.octos.length; y++) {
    for(let x = 0; x < chart.octos[y].length; x++) {
      chart = f(chart, x, y)
    }
  }

  return chart
})

const increaseEnergy = (chart, x, y) => {
  chart.octos[y][x].energy++

  return chart
}

const increaseEnergies = forEachOcto(increaseEnergy)

const energizeAdjacent = (chart, x, y) => {
  const octos = chart.octos

  // top left
  if(x > 0 && y > 0) {
    chart = increaseEnergy(chart, x - 1, y - 1)
  }

  // top
  if(y > 0) {
    chart = increaseEnergy(chart, x, y - 1)
  }

  // top right
  if(y > 0 && x < octos[y].length - 1) {
    chart = increaseEnergy(chart, x + 1, y - 1)
  }

  // right
  if(x < octos[y].length - 1) {
    chart = increaseEnergy(chart, x + 1, y)
  }

  // bottom right
  if(x < octos[y].length - 1 && y < octos.length - 1) {
    chart = increaseEnergy(chart, x + 1, y + 1)
  }

  // bottom
  if(y < octos.length - 1) {
    chart = increaseEnergy(chart, x, y + 1)
  }

  // bottom left
  if(x > 0 && y < octos.length - 1) {
    chart = increaseEnergy(chart, x - 1, y + 1)
  }

  // left
  if(x > 0) {
    chart = increaseEnergy(chart, x - 1, y)
  }

  return chart
}

const iterateFlashes = forEachOcto((chart, x, y) => {
  const octo = getOcto(chart, x, y)

  if(octo.energy > 9 && !octo.hasFlashed) {
    chart.flashes++
    chart.octos[y][x] = {
      hasFlashed: true,
    }

    chart = energizeAdjacent(chart, x, y)
  }

  return chart
})

const doStep = (chart) => {
  chart = markNoneFlashes(chart)
  chart = increaseEnergies(chart)

  let lastFlashes = chart.flashes

  do {
    chart = iterateFlashes(chart)

    if(chart.flashes === lastFlashes) {
      break
    }

    lastFlashes = chart.flashes
  }
  while(true)

  chart = zeroOutFlashed(chart)

  return chart
}

const doSteps = curry((numSteps, chart) => {
  for(let i = 0; i < numSteps; i++) {
    chart = doStep(chart)
  }

  return chart
})

then(compose(
  report,
  get('flashes', 0),
  doSteps(NUM_STEPS),
  octosToChart,
), readInput('input.txt'))
