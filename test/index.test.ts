if (typeof globalThis.structuredClone !== 'function') {
  // Minimal polyfill for structuredClone for test purposes.
  globalThis.structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));
}

import { describe, it, expect } from 'vitest'
import { getWindows } from '../index'
import { execFile } from 'child_process'
import * as path from 'path'

// mac-windows module tests using Vitest
describe('mac-windows module tests', () => {
  it('getWindows returns valid window objects', async () => {
    console.log('Running getWindows test…')
    let windows: any
    try {
      // Force the onScreenOnly mode here
      windows = await getWindows({ onScreenOnly: true })
      console.log('getWindows output:', windows)
    } catch (err) {
      console.error('getWindows threw an error:', err)
      throw err
    }
    expect(Array.isArray(windows)).toBe(true)
    console.log('Number of windows returned:', windows.length)
    windows.forEach((win: any, index: number) => {
      console.log(`Window ${index} details:`, win)
      expect(typeof win.pid).toBe('number')
      expect(typeof win.ownerName).toBe('string')
      expect(typeof win.name).toBe('string')
      expect(typeof win.x).toBe('number')
      expect(typeof win.y).toBe('number')
      expect(typeof win.width).toBe('number')
      expect(typeof win.height).toBe('number')
      expect(typeof win.number).toBe('number')
    })
  })
})

// ActivateWindow executable tests using Vitest
describe('ActivateWindow executable tests', () => {
  it('activates Finder (expected "true")', async () => {
    console.log('Running activate-window test with "Finder"…')
    const scriptPath = path.join(__dirname, '..', 'scripts', 'ActivateWindow')
    const result: string = await new Promise((resolve, reject) => {
      execFile(scriptPath, ['Finder'], (err, stdout, stderr) => {
        if (err) {
          console.error('activate-window error for "Finder":', err)
          return reject(err)
        }
        console.log('Raw stdout:', stdout)
        resolve(stdout.trim())
      })
    })
    expect(result).toBe('true')
  })

  it('fails to activate a non-existent app (expected "false")', async () => {
    console.log('Running activate-window test with a non-existent app…')
    const scriptPath = path.join(__dirname, '..', 'scripts', 'ActivateWindow')
    const result: string = await new Promise((resolve, reject) => {
      execFile(scriptPath, ['NonExistentApp'], (err, stdout, stderr) => {
        if (err) {
          console.error('activate-window error for NonExistentApp:', err)
          return reject(err)
        }
        console.log('Raw stdout:', stdout)
        resolve(stdout.trim())
      })
    })
    expect(result).toBe('false')
  })
})