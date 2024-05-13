export interface StackFrame {
  args?: any[]
  columnNumber?: number
  lineNumber?: number
  fileName?: string
  functionName?: string
  source?: string
}

/**
 * Simplified representation of a stack frame.
 */
export interface StackFrameLite {
  function?: string
  args?: any[]
  file?: string
  col?: number
  line?: number
  raw?: string
}

export interface ParseOptions {
  /**
   * Slice the stack from the given index.
   * This could save some computation to avoid parsing unneeded stack frames.
   */
  slice?: number | [number, number]
}
