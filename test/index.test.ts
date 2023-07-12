import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { parse } from '../src'

const dirname = fileURLToPath(new URL('.', import.meta.url))

describe('should work', () => {
  it('exported', () => {
    const result = parse(new Error('test'))
    const json = JSON.stringify(result[0], null, 2)
    expect(JSON.parse(json.replaceAll(dirname, '<file>')))
      .toMatchInlineSnapshot(`
        {
          "columnNumber": 26,
          "fileName": "<file>index.test.ts",
          "lineNumber": 9,
          "source": "    at <file>index.test.ts:9:26",
        }
      `)
  })
})
