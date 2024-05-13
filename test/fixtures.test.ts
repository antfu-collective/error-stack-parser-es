import { describe, expect, it } from 'vitest'
import { parse } from '../src'
import { CapturedExceptions } from './fixtures/captured-errors'

interface CustomMatchers<R = unknown> {
  toMatchStackFrame: (expected: [string?, any?, string?, number?, number?]) => R
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
  toMatchStackFrame(received, [fn, args, fileName, lineNumber, columnNumber]) {
    const pass = received.functionName === fn
      && received.args === args
      && received.fileName === fileName
      && received.lineNumber === lineNumber
      && received.columnNumber === columnNumber

    if (pass) {
      return {
        message: () => `expected ${received} not to match stack frame`,
        pass: true,
      }
    }

    return {
      message: () => `expected ${received} to match stack frame`,
      pass: false,
    }
  },
})

describe('errorStackParser', () => {
  describe('#parse', () => {
    it('should not parse IE 9 Error', () => {
      expect(() => {
        parse(CapturedExceptions.IE_9)
      }).toThrow(new Error('Cannot parse given Error object'))
    })

    it('should parse Safari 6 Error.stack', () => {
      const stackFrames = parse(CapturedExceptions.SAFARI_6)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(3)
      expect(stackFrames[0]).toMatchStackFrame([undefined, undefined, 'http://path/to/file.js', 48])
      expect(stackFrames[1]).toMatchStackFrame(['dumpException3', undefined, 'http://path/to/file.js', 52])
      expect(stackFrames[2]).toMatchStackFrame(['onclick', undefined, 'http://path/to/file.js', 82])
    })

    it('should parse Safari 7 Error.stack', () => {
      const stackFrames = parse(CapturedExceptions.SAFARI_7)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(3)
      expect(stackFrames[0]).toMatchStackFrame([undefined, undefined, 'http://path/to/file.js', 48, 22])
      expect(stackFrames[1]).toMatchStackFrame(['foo', undefined, 'http://path/to/file.js', 52, 15])
      expect(stackFrames[2]).toMatchStackFrame(['bar', undefined, 'http://path/to/file.js', 108, 107])
    })

    it('should parse Safari 8 Error.stack', () => {
      const stackFrames = parse(CapturedExceptions.SAFARI_8)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(3)
      expect(stackFrames[0]).toMatchStackFrame([undefined, undefined, 'http://path/to/file.js', 47, 22])
      expect(stackFrames[1]).toMatchStackFrame(['foo', undefined, 'http://path/to/file.js', 52, 15])
      expect(stackFrames[2]).toMatchStackFrame(['bar', undefined, 'http://path/to/file.js', 108, 23])
    })

    it('should parse nested eval() from Safari 9', () => {
      const stackFrames = parse(CapturedExceptions.SAFARI_9_NESTED_EVAL)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(5)
      expect(stackFrames[0]).toMatchStackFrame(['baz', undefined, undefined, undefined, undefined])
      expect(stackFrames[1]).toMatchStackFrame(['foo', undefined, undefined, undefined, undefined])
      expect(stackFrames[2]).toMatchStackFrame(['eval code', undefined, undefined, undefined, undefined])
      expect(stackFrames[3]).toMatchStackFrame(['speak', undefined, 'http://localhost:8080/file.js', 26, 21])
      expect(stackFrames[4]).toMatchStackFrame(['global code', undefined, 'http://localhost:8080/file.js', 33, 18])
    })

    it('should parse Firefox 31 Error.stack', () => {
      const stackFrames = parse(CapturedExceptions.FIREFOX_31)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(2)
      expect(stackFrames[0]).toMatchStackFrame(['foo', undefined, 'http://path/to/file.js', 41, 13])
      expect(stackFrames[1]).toMatchStackFrame(['bar', undefined, 'http://path/to/file.js', 1, 1])
    })

    it('should parse nested eval() from Firefox 43', () => {
      const stackFrames = parse(CapturedExceptions.FIREFOX_43_NESTED_EVAL)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(5)
      expect(stackFrames[0]).toMatchStackFrame(['baz', undefined, 'http://localhost:8080/file.js', 26, undefined])
      expect(stackFrames[1]).toMatchStackFrame(['foo', undefined, 'http://localhost:8080/file.js', 26, undefined])
      expect(stackFrames[2]).toMatchStackFrame([undefined, undefined, 'http://localhost:8080/file.js', 26, undefined])
      expect(stackFrames[3]).toMatchStackFrame(['speak', undefined, 'http://localhost:8080/file.js', 26, 17])
      expect(stackFrames[4]).toMatchStackFrame([undefined, undefined, 'http://localhost:8080/file.js', 33, 9])
    })

    it('should parse function names containing @ in Firefox 43 Error.stack', () => {
      const stackFrames = parse(CapturedExceptions.FIREFOX_43_FUNCTION_NAME_WITH_AT_SIGN)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(2)
      expect(stackFrames[0]).toMatchStackFrame(['obj["@fn"]', undefined, 'Scratchpad/1', 10, 29])
      expect(stackFrames[1]).toMatchStackFrame([undefined, undefined, 'Scratchpad/1', 11, 1])
    })

    it('should parse stack traces with @ in the URL', () => {
      const stackFrames = parse(CapturedExceptions.FIREFOX_60_URL_WITH_AT_SIGN)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(5)
      expect(stackFrames[0]).toMatchStackFrame(['who', undefined, 'http://localhost:5000/misc/@stuff/foo.js', 3, 9])
      expect(stackFrames[1]).toMatchStackFrame(['what', undefined, 'http://localhost:5000/misc/@stuff/foo.js', 6, 3])
    })

    it('should parse stack traces with @ in the URL and the method', () => {
      const stackFrames = parse(CapturedExceptions.FIREFOX_60_URL_AND_FUNCTION_NAME_WITH_AT_SIGN)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(5)
      expect(stackFrames[0]).toMatchStackFrame(['obj["@who"]', undefined, 'http://localhost:5000/misc/@stuff/foo.js', 4, 9])
      expect(stackFrames[1]).toMatchStackFrame(['what', undefined, 'http://localhost:5000/misc/@stuff/foo.js', 8, 3])
    })

    it('should parse V8 Error.stack', () => {
      const stackFrames = parse(CapturedExceptions.CHROME_15)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(4)
      expect(stackFrames[0]).toMatchStackFrame(['bar', undefined, 'http://path/to/file.js', 13, 17])
      expect(stackFrames[1]).toMatchStackFrame(['bar', undefined, 'http://path/to/file.js', 16, 5])
      expect(stackFrames[2]).toMatchStackFrame(['foo', undefined, 'http://path/to/file.js', 20, 5])
      expect(stackFrames[3]).toMatchStackFrame([undefined, undefined, 'http://path/to/file.js', 24, 4])
    })

    it('should parse V8 entries with no location', () => {
      const stackFrames = parse({ stack: 'Error\n at Array.forEach (native)' } as any)
      expect(stackFrames.length).toBe(1)
      expect(stackFrames[0]).toMatchStackFrame(['Array.forEach', undefined, '(native)', undefined, undefined])
    })

    it('should parse V8 Error.stack entries with port numbers', () => {
      const stackFrames = parse(CapturedExceptions.CHROME_36)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(2)
      expect(stackFrames[0]).toMatchStackFrame(['dumpExceptionError', undefined, 'http://localhost:8080/file.js', 41, 27])
    })

    it('should parse error stacks with Constructors', () => {
      const stackFrames = parse(CapturedExceptions.CHROME_46)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(2)
      expect(stackFrames[0]).toMatchStackFrame(['new CustomError', undefined, 'http://localhost:8080/file.js', 41, 27])
      expect(stackFrames[1]).toMatchStackFrame(['HTMLButtonElement.onclick', undefined, 'http://localhost:8080/file.js', 107, 146])
    })

    it('should parse nested eval() from V8', () => {
      const stackFrames = parse(CapturedExceptions.CHROME_48_NESTED_EVAL)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(5)
      expect(stackFrames[0]).toMatchStackFrame(['baz', undefined, 'http://localhost:8080/file.js', 21, 17])
      expect(stackFrames[1]).toMatchStackFrame(['foo', undefined, 'http://localhost:8080/file.js', 21, 17])
      expect(stackFrames[2]).toMatchStackFrame(['eval', undefined, 'http://localhost:8080/file.js', 21, 17])
      expect(stackFrames[3]).toMatchStackFrame(['Object.speak', undefined, 'http://localhost:8080/file.js', 21, 17])
      expect(stackFrames[4]).toMatchStackFrame([undefined, undefined, 'http://localhost:8080/file.js', 31, 13])
    })

    it('should parse IE 10 Error stacks', () => {
      const stackFrames = parse(CapturedExceptions.IE_10)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(3)
      expect(stackFrames[0]).toMatchStackFrame(['Anonymous function', undefined, 'http://path/to/file.js', 48, 13])
      expect(stackFrames[1]).toMatchStackFrame(['foo', undefined, 'http://path/to/file.js', 46, 9])
      expect(stackFrames[2]).toMatchStackFrame(['bar', undefined, 'http://path/to/file.js', 82, 1])
    })

    it('should parse IE 11 Error stacks', () => {
      const stackFrames = parse(CapturedExceptions.IE_11)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(3)
      expect(stackFrames[0]).toMatchStackFrame(['Anonymous function', undefined, 'http://path/to/file.js', 47, 21])
      expect(stackFrames[1]).toMatchStackFrame(['foo', undefined, 'http://path/to/file.js', 45, 13])
      expect(stackFrames[2]).toMatchStackFrame(['bar', undefined, 'http://path/to/file.js', 108, 1])
    })

    it('should parse nested eval() from Edge', () => {
      const stackFrames = parse(CapturedExceptions.EDGE_20_NESTED_EVAL)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(5)
      expect(stackFrames[0]).toMatchStackFrame(['baz', undefined, undefined, 1, 18])
      expect(stackFrames[1]).toMatchStackFrame(['foo', undefined, undefined, 2, 90])
      expect(stackFrames[2]).toMatchStackFrame(['eval', undefined, undefined, 4, 18])
      expect(stackFrames[3]).toMatchStackFrame(['speak', undefined, 'http://localhost:8080/file.js', 25, 17])
      expect(stackFrames[4]).toMatchStackFrame(['Global code', undefined, 'http://localhost:8080/file.js', 32, 9])
    })

    it('should parse Opera 9.27 Error messages', () => {
      const stackFrames = parse(CapturedExceptions.OPERA_927)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(3)
      expect(stackFrames[0]).toMatchStackFrame([undefined, undefined, 'http://path/to/file.js', 43])
      expect(stackFrames[1]).toMatchStackFrame([undefined, undefined, 'http://path/to/file.js', 31])
      expect(stackFrames[2]).toMatchStackFrame([undefined, undefined, 'http://path/to/file.js', 18])
    })

    it('should parse Opera 10 Error messages', () => {
      const stackFrames = parse(CapturedExceptions.OPERA_10)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(7)
      expect(stackFrames[0]).toMatchStackFrame([undefined, undefined, 'http://path/to/file.js', 42])
      expect(stackFrames[1]).toMatchStackFrame([undefined, undefined, 'http://path/to/file.js', 27])
      expect(stackFrames[2]).toMatchStackFrame(['printStackTrace', undefined, 'http://path/to/file.js', 18])
      expect(stackFrames[3]).toMatchStackFrame(['bar', undefined, 'http://path/to/file.js', 4])
      expect(stackFrames[4]).toMatchStackFrame(['bar', undefined, 'http://path/to/file.js', 7])
      expect(stackFrames[5]).toMatchStackFrame(['foo', undefined, 'http://path/to/file.js', 11])
      expect(stackFrames[6]).toMatchStackFrame([undefined, undefined, 'http://path/to/file.js', 15])
    })

    it('should parse Opera 11 Error messages', () => {
      const stackFrames = parse(CapturedExceptions.OPERA_11)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(4)
      expect(stackFrames[0]).toMatchStackFrame(['run', undefined, 'http://path/to/file.js', 27])
      expect(stackFrames[1]).toMatchStackFrame(['bar', undefined, 'http://domain.com:1234/path/to/file.js', 18])
      expect(stackFrames[2]).toMatchStackFrame(['foo', undefined, 'http://domain.com:1234/path/to/file.js', 11])
      expect(stackFrames[3]).toMatchStackFrame([undefined, undefined, 'http://path/to/file.js', 15])
    })

    it('should parse Opera 25 Error stacks', () => {
      const stackFrames = parse(CapturedExceptions.OPERA_25)
      expect(stackFrames).toBeTruthy()
      expect(stackFrames.length).toBe(3)
      expect(stackFrames[0]).toMatchStackFrame([undefined, undefined, 'http://path/to/file.js', 47, 22])
      expect(stackFrames[1]).toMatchStackFrame(['foo', undefined, 'http://path/to/file.js', 52, 15])
      expect(stackFrames[2]).toMatchStackFrame(['bar', undefined, 'http://path/to/file.js', 108, 168])
    })

    it('should handle newlines in Error stack messages', () => {
      const stackFrames = parse({
        stack: 'Error: Problem at this\nlocation. Error code:1234\n'
        + '    at http://path/to/file.js:47:22\n'
        + '    at foo (http://path/to/file.js:52:15)',
      } as any)

      expect(stackFrames.length).toBe(2)
      expect(stackFrames[0]).toMatchStackFrame([undefined, undefined, 'http://path/to/file.js', 47, 22])
      expect(stackFrames[1]).toMatchStackFrame(['foo', undefined, 'http://path/to/file.js', 52, 15])
    })

    it('should handle webpack eval stacks', () => {
      const stackframes = parse({
        stack: 'ReferenceError: chilxdren is not defined\n '
        + 'at Layout (eval at proxyClass (webpack:///../react-hot-loader/~/react-proxy/modules/createClassProxy.js?), <anonymous>:4:17)',
      } as any)
      expect(stackframes.length).toBe(1)
      expect(stackframes[0].fileName).toEqual('webpack:///../react-hot-loader/~/react-proxy/modules/createClassProxy.js?')
      expect(stackframes[0].lineNumber).toBeUndefined()
      expect(stackframes[0].columnNumber).toBeUndefined()
    })

    it('should handle spaces in Node.js stacks', () => {
      const stackframes = parse(CapturedExceptions.NODE_WITH_SPACES)
      expect(stackframes.length).toBe(8)
      expect(stackframes[0].fileName).toEqual('/var/app/scratch/my project/index.js')
      expect(stackframes[0].lineNumber).toBe(2)
      expect(stackframes[0].columnNumber).toBe(9)
      expect(stackframes[1].fileName).toEqual('/var/app/scratch/my project/index.js')
      expect(stackframes[1].lineNumber).toBe(2)
      expect(stackframes[1].columnNumber).toBe(9)
    })
  })
})
