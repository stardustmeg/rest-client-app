/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: false positive */
import '@testing-library/jest-dom'

import { afterAll, afterEach, beforeAll } from 'vitest'

import { server } from './server/index.js'

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
