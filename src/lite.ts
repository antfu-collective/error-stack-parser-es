/**
 * Port from https://github.com/stacktracejs/error-stack-parser
 */
import type { ParseOptions, StackFrameLite } from './types'

export * from './types'

const FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/
// eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/optimal-quantifier-concatenation, regexp/no-misleading-capturing-group
const CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m
const SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/

/**
 * Given an Error object, extract the most information from it.
 *
 * @param {Error} error object
 * @param {ParseOptions} options
 * @return {Array} of StackFrames
 */
export function parse(error: Error, options?: ParseOptions): StackFrameLite[] {
  // @ts-expect-error missing stacktrace property
  if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined')
    return parseOpera(error, options)

  else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP))
    return parseV8OrIE(error, options)

  else if (error.stack)
    return parseFFOrSafari(error, options)

  else if (options?.allowEmpty)
    return []

  else
    throw new Error('Cannot parse given Error object')
}

/**
 * Parse stack string from V8, Firefox, or IE into an array of StackFrames.
 */
export function parseStack(stackString: string, options?: ParseOptions): StackFrameLite[] {
  if (stackString.match(CHROME_IE_STACK_REGEXP))
    return parseV8OrIeString(stackString, options)
  else
    return parseFFOrSafariString(stackString, options)
}

/**
 * Separate line and column numbers from a string of the form: (URI:Line:Column)
 */
export function extractLocation(urlLike: string): [string, string | undefined, string | undefined] {
  // Fail-fast but return locations like "(native)"
  if (!urlLike.includes(':'))
    return [urlLike, undefined, undefined]

  const regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/
  const parts = regExp.exec(urlLike.replace(/[()]/g, ''))!
  return [parts[1], parts[2] || undefined, parts[3] || undefined] as const
}

function applySlice<T>(lines: T[], options?: ParseOptions) {
  if (options && options.slice != null) {
    if (Array.isArray(options.slice))
      return lines.slice(options.slice[0], options.slice[1])
    return lines.slice(0, options.slice)
  }
  return lines
}

export function parseV8OrIE(error: Error, options?: ParseOptions): StackFrameLite[] {
  return parseV8OrIeString(error.stack!, options)
}

export function parseV8OrIeString(stack: string, options?: ParseOptions): StackFrameLite[] {
  const filtered = applySlice(
    stack.split('\n').filter((line) => {
      return !!line.match(CHROME_IE_STACK_REGEXP)
    }),
    options,
  )

  return filtered.map((line): StackFrameLite => {
    if (line.includes('(eval ')) {
      // Throw away eval information until we implement stacktrace.js/stackframe#8
      line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^()]*)|(,.*$)/g, '')
    }
    let sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').replace(/^.*?\s+/, '')

    // capture and preseve the parenthesized location "(/foo/my bar.js:12:87)" in
    // case it has spaces in it, as the string is split on \s+ later on
    const location = sanitizedLine.match(/ (\(.+\)$)/)

    // remove the parenthesized location from the line, if it was matched
    sanitizedLine = location ? sanitizedLine.replace(location[0], '') : sanitizedLine

    // if a location was matched, pass it to extractLocation() otherwise pass all sanitizedLine
    // because this line doesn't have function name
    const locationParts = extractLocation(location ? location[1] : sanitizedLine)
    const functionName = (location && sanitizedLine) || undefined
    const fileName = ['eval', '<anonymous>'].includes(locationParts[0]) ? undefined : locationParts[0]

    return {
      function: functionName,
      file: fileName,
      line: locationParts[1] ? +locationParts[1] : undefined,
      col: locationParts[2] ? +locationParts[2] : undefined,
      raw: line,
    }
  })
}

export function parseFFOrSafari(error: Error, options?: ParseOptions): StackFrameLite[] {
  return parseFFOrSafariString(error.stack!, options)
}

export function parseFFOrSafariString(stack: string, options?: ParseOptions): StackFrameLite[] {
  const filtered = applySlice(
    stack.split('\n').filter((line) => {
      return !line.match(SAFARI_NATIVE_CODE_REGEXP)
    }),
    options,
  )

  return filtered.map((line): StackFrameLite => {
    // Throw away eval information until we implement stacktrace.js/stackframe#8
    if (line.includes(' > eval'))
      line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ':$1')

    if (!line.includes('@') && !line.includes(':')) {
      // Safari eval frames only have function names and nothing else
      return {
        function: line,
      }
    }
    else {
      // eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/optimal-quantifier-concatenation
      const functionNameRegex = /(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/
      const matches = line.match(functionNameRegex)
      const functionName = (matches && matches[1]) ? matches[1] : undefined
      const locationParts = extractLocation(line.replace(functionNameRegex, ''))

      return {
        function: functionName,
        file: locationParts[0],
        line: locationParts[1] ? +locationParts[1] : undefined,
        col: locationParts[2] ? +locationParts[2] : undefined,
        raw: line,
      }
    }
  })
}

export function parseOpera(e: Error, options?: ParseOptions): StackFrameLite[] {
  // @ts-expect-error missing stacktrace property
  if (!e.stacktrace || (e.message.includes('\n') && e.message.split('\n').length > e.stacktrace.split('\n').length))
    return parseOpera9(e)

  else if (!e.stack)
    return parseOpera10(e)

  else
    return parseOpera11(e, options)
}

export function parseOpera9(e: Error, options?: ParseOptions): StackFrameLite[] {
  // eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/optimal-quantifier-concatenation
  const lineRE = /Line (\d+).*script (?:in )?(\S+)/i
  const lines = e.message.split('\n')
  const result: StackFrameLite[] = []

  for (let i = 2, len = lines.length; i < len; i += 2) {
    const match = lineRE.exec(lines[i])
    if (match) {
      result.push({
        file: match[2],
        line: +match[1],
        raw: lines[i],
      })
    }
  }

  return applySlice(result, options)
}

export function parseOpera10(e: Error, options?: ParseOptions): StackFrameLite[] {
  // eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/optimal-quantifier-concatenation
  const lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i
  // @ts-expect-error missing stack property
  const lines = e.stacktrace.split('\n')
  const result: StackFrameLite[] = []

  for (let i = 0, len = lines.length; i < len; i += 2) {
    const match = lineRE.exec(lines[i])
    if (match) {
      result.push({
        function: match[3] || undefined,
        file: match[2],
        line: match[1] ? +match[1] : undefined,
        raw: lines[i],
      })
    }
  }

  return applySlice(result, options)
}

// Opera 10.65+ Error.stack very similar to FF/Safari
export function parseOpera11(error: Error, options?: ParseOptions): StackFrameLite[] {
  const filtered = applySlice(
    // @ts-expect-error missing stack property
    error.stack.split('\n').filter((line) => {
      return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/)
    }),
    options,
  )

  return filtered.map<StackFrameLite>((line) => {
    const tokens = line.split('@')
    const locationParts = extractLocation(tokens.pop()!)
    const functionCall = (tokens.shift() || '')
    const functionName = functionCall
      .replace(/<anonymous function(: (\w+))?>/, '$2')
      .replace(/\([^)]*\)/g, '') || undefined
    let argsRaw
    if (functionCall.match(/\(([^)]*)\)/))
      argsRaw = functionCall.replace(/^[^(]+\(([^)]*)\)$/, '$1')

    const args = (argsRaw === undefined || argsRaw === '[arguments not available]')
      ? undefined
      : argsRaw.split(',')

    return {
      function: functionName,
      args,
      file: locationParts[0],
      line: locationParts[1] ? +locationParts[1] : undefined,
      col: locationParts[2] ? +locationParts[2] : undefined,
      raw: line,
    }
  })
}
