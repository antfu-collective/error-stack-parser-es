/**
 * Port from https://github.com/stacktracejs/error-stack-parser
 */

import type { ParseOptions, StackFrame, StackFrameLite } from './types'
import {
  parse as _parse,
  parseFFOrSafari as _parseFFOrSafari,
  parseOpera as _parseOpera,
  parseOpera9 as _parseOpera9,
  parseOpera10 as _parseOpera10,
  parseOpera11 as _parseOpera11,
  parseV8OrIE as _parseV8OrIE,
} from './lite'

export { extractLocation } from './lite'

export * from './types'

function stackframesLiteToStackframes(liteStackframes: StackFrameLite[]): StackFrame[] {
  return liteStackframes.map((liteStackframe) => {
    return {
      functionName: liteStackframe.function,
      args: liteStackframe.args,
      fileName: liteStackframe.file,
      lineNumber: liteStackframe.line,
      columnNumber: liteStackframe.col,
      source: liteStackframe.raw,
    }
  })
}

/**
 * Given an Error object, extract the most information from it.
 *
 * @param {Error} error object
 * @return {Array} of StackFrames
 */
export function parse(error: Error, options?: ParseOptions): StackFrame[] {
  return stackframesLiteToStackframes(_parse(error, options))
}

export function parseV8OrIE(error: Error) {
  return stackframesLiteToStackframes(_parseV8OrIE(error))
}

export function parseFFOrSafari(error: Error) {
  return stackframesLiteToStackframes(_parseFFOrSafari(error))
}

export function parseOpera(e: Error): StackFrame[] {
  return stackframesLiteToStackframes(_parseOpera(e))
}

export function parseOpera9(e: Error): StackFrame[] {
  return stackframesLiteToStackframes(_parseOpera9(e))
}

export function parseOpera10(e: Error): StackFrame[] {
  return stackframesLiteToStackframes(_parseOpera10(e))
}

export function parseOpera11(error: Error): StackFrame[] {
  return stackframesLiteToStackframes(_parseOpera11(error))
}
