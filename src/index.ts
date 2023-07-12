/**
 * Port from https://github.com/stacktracejs/error-stack-parser-es
 */

export interface StackFrame {
  args?: any[]
  isConstructor?: boolean
  isEval?: boolean
  isNative?: boolean
  isToplevel?: boolean
  columnNumber?: number
  lineNumber?: number
  fileName?: string
  functionName?: string
  source?: string
}

const FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/
const CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m
const SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/

/**
 * Given an Error object, extract the most information from it.
 *
 * @param {Error} error object
 * @return {Array} of StackFrames
 */
export function parse(error: Error) {
  // @ts-expect-error missing stacktrace property
  if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined')
    return parseOpera(error)

  else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP))
    return parseV8OrIE(error)

  else if (error.stack)
    return parseFFOrSafari(error)

  else
    throw new Error('Cannot parse given Error object')
}

// Separate line and column numbers from a string of the form: (URI:Line:Column)
export function extractLocation(urlLike: string) {
  // Fail-fast but return locations like "(native)"
  if (!urlLike.includes(':'))
    return [urlLike]

  const regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/
  const parts = regExp.exec(urlLike.replace(/[()]/g, ''))!
  return [parts[1], parts[2] || undefined, parts[3] || undefined] as const
}

export function parseV8OrIE(error: Error) {
  // @ts-expect-error missing stack property
  const filtered = error.stack.split('\n').filter((line) => {
    return !!line.match(CHROME_IE_STACK_REGEXP)
  })

  return filtered.map((line): StackFrame => {
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
      functionName,
      fileName,
      lineNumber: locationParts[1] ? +locationParts[1] : undefined,
      columnNumber: locationParts[2] ? +locationParts[2] : undefined,
      source: line,
    }
  })
}

export function parseFFOrSafari(error: Error) {
  // @ts-expect-error missing stack property
  const filtered = error.stack.split('\n').filter((line) => {
    return !line.match(SAFARI_NATIVE_CODE_REGEXP)
  })

  return filtered.map((line): StackFrame => {
    // Throw away eval information until we implement stacktrace.js/stackframe#8
    if (line.includes(' > eval'))
      line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ':$1')

    if (!line.includes('@') && !line.includes(':')) {
      // Safari eval frames only have function names and nothing else
      return {
        functionName: line,
      }
    }
    else {
      const functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/
      const matches = line.match(functionNameRegex)
      const functionName = (matches && matches[1]) ? matches[1] : undefined
      const locationParts = extractLocation(line.replace(functionNameRegex, ''))

      return {
        functionName,
        fileName: locationParts[0],
        lineNumber: locationParts[1] ? +locationParts[1] : undefined,
        columnNumber: locationParts[2] ? +locationParts[2] : undefined,
        source: line,
      }
    }
  })
}

export function parseOpera(e: Error) {
  // @ts-expect-error missing stacktrace property
  if (!e.stacktrace || (e.message.includes('\n') && e.message.split('\n').length > e.stacktrace.split('\n').length))
    return parseOpera9(e)

  else if (!e.stack)
    return parseOpera10(e)

  else
    return parseOpera11(e)
}

export function parseOpera9(e: Error) {
  const lineRE = /Line (\d+).*script (?:in )?(\S+)/i
  const lines = e.message.split('\n')
  const result: StackFrame[] = []

  for (let i = 2, len = lines.length; i < len; i += 2) {
    const match = lineRE.exec(lines[i])
    if (match) {
      result.push({
        fileName: match[2],
        lineNumber: +match[1],
        source: lines[i],
      })
    }
  }

  return result
}

export function parseOpera10(e: Error) {
  const lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i
  // @ts-expect-error missing stack property
  const lines = e.stacktrace.split('\n')
  const result: StackFrame[] = []

  for (let i = 0, len = lines.length; i < len; i += 2) {
    const match = lineRE.exec(lines[i])
    if (match) {
      result.push({
        functionName: match[3] || undefined,
        fileName: match[2],
        lineNumber: match[1] ? +match[1] : undefined,
        source: lines[i],
      })
    }
  }

  return result
}

// Opera 10.65+ Error.stack very similar to FF/Safari
export function parseOpera11(error: Error) {
  // @ts-expect-error missing stack property
  const filtered = error.stack.split('\n').filter((line) => {
    return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/)
  })

  return filtered.map((line) => {
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
      functionName,
      args,
      fileName: locationParts[0],
      lineNumber: locationParts[1] ? +locationParts[1] : undefined,
      columnNumber: locationParts[2] ? +locationParts[2] : undefined,
      source: line,
    }
  })
}
