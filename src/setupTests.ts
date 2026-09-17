import { TextDecoder, TextEncoder } from 'node:util'
import '@testing-library/jest-dom'

// jest-environment-jsdom doesn't expose Node's TextEncoder/TextDecoder on the
// test global, but react-router-dom needs them at import time.
if (typeof globalThis.TextEncoder === 'undefined') {
  globalThis.TextEncoder = TextEncoder
}
if (typeof globalThis.TextDecoder === 'undefined') {
  globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder
}
