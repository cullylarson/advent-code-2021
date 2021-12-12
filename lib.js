import fs from 'fs'
import {promisify} from 'util'

export const sum = xs => xs.reduce((acc, x) => acc + x, 0)

export const flat = xs => xs.flat()

export const readFile = promisify(fs.readFile)
