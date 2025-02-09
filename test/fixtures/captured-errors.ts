// jscs:disable disallowImplicitTypeConversion
// jscs:disable maximumLineLength
/* exported CapturedExceptions */
export const CapturedExceptions: any = {}

CapturedExceptions.OPERA_854 = {
  'message': 'Statement on line 44: Type mismatch (usually a non-object value used where an object is required)\n'
    + 'Backtrace:\n'
    + '  Line 44 of linked script http://path/to/file.js\n'
    + '    this.undef();\n'
    + '  Line 31 of linked script http://path/to/file.js\n'
    + '    ex = ex || this.createException();\n'
    + '  Line 18 of linked script http://path/to/file.js\n'
    + '    var p = new printStackTrace.implementation(), result = p.run(ex);\n'
    + '  Line 4 of inline#1 script in http://path/to/file.js\n'
    + '    printTrace(printStackTrace());\n'
    + '  Line 7 of inline#1 script in http://path/to/file.js\n'
    + '    bar(n - 1);\n'
    + '  Line 11 of inline#1 script in http://path/to/file.js\n'
    + '    bar(2);\n'
    + '  Line 15 of inline#1 script in http://path/to/file.js\n'
    + '    foo();\n'
    + '',
  'opera#sourceloc': 44,
}

CapturedExceptions.OPERA_902 = {
  'message': 'Statement on line 44: Type mismatch (usually a non-object value used where an object is required)\n'
    + 'Backtrace:\n'
    + '  Line 44 of linked script http://path/to/file.js\n'
    + '    this.undef();\n'
    + '  Line 31 of linked script http://path/to/file.js\n'
    + '    ex = ex || this.createException();\n'
    + '  Line 18 of linked script http://path/to/file.js\n'
    + '    var p = new printStackTrace.implementation(), result = p.run(ex);\n'
    + '  Line 4 of inline#1 script in http://path/to/file.js\n'
    + '    printTrace(printStackTrace());\n'
    + '  Line 7 of inline#1 script in http://path/to/file.js\n'
    + '    bar(n - 1);\n'
    + '  Line 11 of inline#1 script in http://path/to/file.js\n'
    + '    bar(2);\n'
    + '  Line 15 of inline#1 script in http://path/to/file.js\n'
    + '    foo();\n'
    + '',
  'opera#sourceloc': 44,
}

CapturedExceptions.OPERA_927 = {
  'message': 'Statement on line 43: Type mismatch (usually a non-object value used where an object is required)\n'
    + 'Backtrace:\n'
    + '  Line 43 of linked script http://path/to/file.js\n'
    + '    bar(n - 1);\n'
    + '  Line 31 of linked script http://path/to/file.js\n'
    + '    bar(2);\n'
    + '  Line 18 of linked script http://path/to/file.js\n'
    + '    foo();\n'
    + '',
  'opera#sourceloc': 43,
}

CapturedExceptions.OPERA_964 = {
  'message': 'Statement on line 42: Type mismatch (usually non-object value supplied where object required)\n'
    + 'Backtrace:\n'
    + '  Line 42 of linked script http://path/to/file.js\n'
    + '                this.undef();\n'
    + '  Line 27 of linked script http://path/to/file.js\n'
    + '            ex = ex || this.createException();\n'
    + '  Line 18 of linked script http://path/to/file.js: In function printStackTrace\n'
    + '        var p = new printStackTrace.implementation(), result = p.run(ex);\n'
    + '  Line 4 of inline#1 script in http://path/to/file.js: In function bar\n'
    + '             printTrace(printStackTrace());\n'
    + '  Line 7 of inline#1 script in http://path/to/file.js: In function bar\n'
    + '           bar(n - 1);\n'
    + '  Line 11 of inline#1 script in http://path/to/file.js: In function foo\n'
    + '           bar(2);\n'
    + '  Line 15 of inline#1 script in http://path/to/file.js\n'
    + '         foo();\n'
    + '',
  'opera#sourceloc': 42,
  'stacktrace': '  ...  Line 27 of linked script http://path/to/file.js\n'
    + '            ex = ex || this.createException();\n'
    + '  Line 18 of linked script http://path/to/file.js: In function printStackTrace\n'
    + '        var p = new printStackTrace.implementation(), result = p.run(ex);\n'
    + '  Line 4 of inline#1 script in http://path/to/file.js: In function bar\n'
    + '             printTrace(printStackTrace());\n'
    + '  Line 7 of inline#1 script in http://path/to/file.js: In function bar\n'
    + '           bar(n - 1);\n'
    + '  Line 11 of inline#1 script in http://path/to/file.js: In function foo\n'
    + '           bar(2);\n'
    + '  Line 15 of inline#1 script in http://path/to/file.js\n'
    + '         foo();\n'
    + '',
}

CapturedExceptions.OPERA_10 = {
  'message': 'Statement on line 42: Type mismatch (usually non-object value supplied where object required)',
  'opera#sourceloc': 42,
  'stacktrace': '  Line 42 of linked script http://path/to/file.js\n'
    + '                this.undef();\n'
    + '  Line 27 of linked script http://path/to/file.js\n'
    + '            ex = ex || this.createException();\n'
    + '  Line 18 of linked script http://path/to/file.js: In function printStackTrace\n'
    + '        var p = new printStackTrace.implementation(), result = p.run(ex);\n'
    + '  Line 4 of inline#1 script in http://path/to/file.js: In function bar\n'
    + '             printTrace(printStackTrace());\n'
    + '  Line 7 of inline#1 script in http://path/to/file.js: In function bar\n'
    + '           bar(n - 1);\n'
    + '  Line 11 of inline#1 script in http://path/to/file.js: In function foo\n'
    + '           bar(2);\n'
    + '  Line 15 of inline#1 script in http://path/to/file.js\n'
    + '         foo();\n'
    + '',
}

CapturedExceptions.OPERA_11 = {
  message: '\'this.undef\' is not a function',
  stack: '<anonymous function: run>([arguments not available])@http://path/to/file.js:27\n'
    + 'bar([arguments not available])@http://domain.com:1234/path/to/file.js:18\n'
    + 'foo([arguments not available])@http://domain.com:1234/path/to/file.js:11\n'
    + '<anonymous function>@http://path/to/file.js:15\n'
    + 'Error created at <anonymous function>@http://path/to/file.js:15',
  stacktrace: 'Error thrown at line 42, column 12 in <anonymous function: createException>() in http://path/to/file.js:\n'
    + '    this.undef();\n'
    + 'called from line 27, column 8 in <anonymous function: run>(ex) in http://path/to/file.js:\n'
    + '    ex = ex || this.createException();\n'
    + 'called from line 18, column 4 in printStackTrace(options) in http://path/to/file.js:\n'
    + '    var p = new printStackTrace.implementation(), result = p.run(ex);\n'
    + 'called from line 4, column 5 in bar(n) in http://path/to/file.js:\n'
    + '    printTrace(printStackTrace());\n'
    + 'called from line 7, column 4 in bar(n) in http://path/to/file.js:\n'
    + '    bar(n - 1);\n'
    + 'called from line 11, column 4 in foo() in http://path/to/file.js:\n'
    + '    bar(2);\n'
    + 'called from line 15, column 3 in http://path/to/file.js:\n'
    + '    foo();',
}

CapturedExceptions.OPERA_12 = {
  message: 'Cannot convert \'x\' to object',
  stack: '<anonymous function>([arguments not available])@http://localhost:8000/ExceptionLab.html:48\n'
    + 'dumpException3([arguments not available])@http://localhost:8000/ExceptionLab.html:46\n'
    + '<anonymous function>([arguments not available])@http://localhost:8000/ExceptionLab.html:1',
  stacktrace: 'Error thrown at line 48, column 12 in <anonymous function>(x) in http://localhost:8000/ExceptionLab.html:\n'
    + '    x.undef();\n'
    + 'called from line 46, column 8 in dumpException3() in http://localhost:8000/ExceptionLab.html:\n'
    + '    dumpException((function(x) {\n'
    + 'called from line 1, column 0 in <anonymous function>(event) in http://localhost:8000/ExceptionLab.html:\n'
    + '    dumpException3();',
}

CapturedExceptions.OPERA_25 = {
  message: 'Cannot read property \'undef\' of null',
  name: 'TypeError',
  stack: 'TypeError: Cannot read property \'undef\' of null\n'
    + '    at http://path/to/file.js:47:22\n'
    + '    at foo (http://path/to/file.js:52:15)\n'
    + '    at bar (http://path/to/file.js:108:168)',
}

CapturedExceptions.CHROME_15 = {
  arguments: ['undef'],
  message: 'Object #<Object> has no method \'undef\'',
  stack: 'TypeError: Object #<Object> has no method \'undef\'\n'
    + '    at bar (http://path/to/file.js:13:17)\n'
    + '    at bar (http://path/to/file.js:16:5)\n'
    + '    at foo (http://path/to/file.js:20:5)\n'
    + '    at http://path/to/file.js:24:4',
}

CapturedExceptions.CHROME_36 = {
  message: 'Default error',
  name: 'Error',
  stack: 'Error: Default error\n'
    + '    at dumpExceptionError (http://localhost:8080/file.js:41:27)\n'
    + '    at HTMLButtonElement.onclick (http://localhost:8080/file.js:107:146)',
}

CapturedExceptions.CHROME_46 = {
  message: 'Default error',
  name: 'Error',
  stack: 'Error: Default error\n'
    + '    at new CustomError (http://localhost:8080/file.js:41:27)\n'
    + '    at HTMLButtonElement.onclick (http://localhost:8080/file.js:107:146)',
}

CapturedExceptions.CHROME_48_NESTED_EVAL = {
  message: 'message string',
  name: 'Error',
  stack: 'Error: message string\n'
    + 'at baz (eval at foo (eval at speak (http://localhost:8080/file.js:21:17)), <anonymous>:1:30)\n'
    + 'at foo (eval at speak (http://localhost:8080/file.js:21:17), <anonymous>:2:96)\n'
    + 'at eval (eval at speak (http://localhost:8080/file.js:21:17), <anonymous>:4:18)\n'
    + 'at Object.speak (http://localhost:8080/file.js:21:17)\n'
    + 'at http://localhost:8080/file.js:31:13\n',
}

CapturedExceptions.FIREFOX_3 = {
  fileName: 'http://127.0.0.1:8000/js/stacktrace.js',
  lineNumber: 44,
  message: 'this.undef is not a function',
  name: 'TypeError',
  stack: '()@http://127.0.0.1:8000/js/stacktrace.js:44\n'
    + '(null)@http://127.0.0.1:8000/js/stacktrace.js:31\n'
    + 'printStackTrace()@http://127.0.0.1:8000/js/stacktrace.js:18\n'
    + 'bar(1)@http://127.0.0.1:8000/js/file.js:13\n'
    + 'bar(2)@http://127.0.0.1:8000/js/file.js:16\n'
    + 'foo()@http://127.0.0.1:8000/js/file.js:20\n'
    + '@http://127.0.0.1:8000/js/file.js:24\n'
    + '',
}

CapturedExceptions.FIREFOX_7 = {
  fileName: 'file:///G:/js/stacktrace.js',
  lineNumber: 44,
  stack: '()@file:///G:/js/stacktrace.js:44\n'
    + '(null)@file:///G:/js/stacktrace.js:31\n'
    + 'printStackTrace()@file:///G:/js/stacktrace.js:18\n'
    + 'bar(1)@file:///G:/js/file.js:13\n'
    + 'bar(2)@file:///G:/js/file.js:16\n'
    + 'foo()@file:///G:/js/file.js:20\n'
    + '@file:///G:/js/file.js:24\n'
    + '',
}

CapturedExceptions.FIREFOX_14 = {
  message: 'x is null',
  stack: '@http://path/to/file.js:48\n'
    + 'dumpException3@http://path/to/file.js:52\n'
    + 'onclick@http://path/to/file.js:1\n'
    + '',
  fileName: 'http://path/to/file.js',
  lineNumber: 48,
}

CapturedExceptions.FIREFOX_31 = {
  message: 'Default error',
  name: 'Error',
  stack: 'foo@http://path/to/file.js:41:13\n'
    + 'bar@http://path/to/file.js:1:1\n'
    + '',
  fileName: 'http://path/to/file.js',
  lineNumber: 41,
  columnNumber: 12,
}

CapturedExceptions.FIREFOX_43_NESTED_EVAL = {
  columnNumber: 30,
  fileName: 'http://localhost:8080/file.js line 25 > eval line 2 > eval',
  lineNumber: 1,
  message: 'message string',
  stack: 'baz@http://localhost:8080/file.js line 26 > eval line 2 > eval:1:30\n'
    + 'foo@http://localhost:8080/file.js line 26 > eval:2:96\n'
    + '@http://localhost:8080/file.js line 26 > eval:4:18\n'
    + 'speak@http://localhost:8080/file.js:26:17\n'
    + '@http://localhost:8080/file.js:33:9',
}

CapturedExceptions.FIREFOX_43_FUNCTION_NAME_WITH_AT_SIGN = {
  message: 'Dummy error',
  name: 'Error',
  stack: 'obj["@fn"]@Scratchpad/1:10:29\n'
    + '@Scratchpad/1:11:1\n'
    + '',
  fileName: 'Scratchpad/1',
  lineNumber: 10,
  columnNumber: 29,
}

CapturedExceptions.FIREFOX_60_URL_WITH_AT_SIGN = {
  message: 'culprit',
  name: 'Error',
  stack: 'who@http://localhost:5000/misc/@stuff/foo.js:3:9\n'
    + 'what@http://localhost:5000/misc/@stuff/foo.js:6:3\n'
    + 'where@http://localhost:5000/misc/@stuff/foo.js:9:3\n'
    + 'why@http://localhost:5000/misc/@stuff/foo.js:12:3\n'
    + '@http://localhost:5000/misc/@stuff/foo.js:15:1\n',
  fileName: 'http://localhost:5000/misc/@stuff/foo.js',
  lineNumber: 3,
  columnNumber: 9,
}

CapturedExceptions.FIREFOX_60_URL_AND_FUNCTION_NAME_WITH_AT_SIGN = {
  message: 'culprit',
  name: 'Error',
  stack: 'obj["@who"]@http://localhost:5000/misc/@stuff/foo.js:4:9\n'
    + 'what@http://localhost:5000/misc/@stuff/foo.js:8:3\n'
    + 'where@http://localhost:5000/misc/@stuff/foo.js:11:3\n'
    + 'why@http://localhost:5000/misc/@stuff/foo.js:14:3\n'
    + '@http://localhost:5000/misc/@stuff/foo.js:17:1\n',
  fileName: 'http://localhost:5000/misc/@stuff/foo.js',
  lineNumber: 4,
  columnNumber: 9,
}

CapturedExceptions.SAFARI_6 = {
  message: '\'null\' is not an object (evaluating \'x.undef\')',
  stack: '@http://path/to/file.js:48\n'
    + 'dumpException3@http://path/to/file.js:52\n'
    + 'onclick@http://path/to/file.js:82\n'
    + '[native code]',
  line: 48,
  sourceURL: 'http://path/to/file.js',
}

CapturedExceptions.SAFARI_7 = {
  message: '\'null\' is not an object (evaluating \'x.undef\')',
  name: 'TypeError',
  stack: 'http://path/to/file.js:48:22\n'
    + 'foo@http://path/to/file.js:52:15\n'
    + 'bar@http://path/to/file.js:108:107',
  line: 47,
  sourceURL: 'http://path/to/file.js',
}

CapturedExceptions.SAFARI_8 = {
  message: 'null is not an object (evaluating \'x.undef\')',
  name: 'TypeError',
  stack: 'http://path/to/file.js:47:22\n'
    + 'foo@http://path/to/file.js:52:15\n'
    + 'bar@http://path/to/file.js:108:23',
  line: 47,
  column: 22,
  sourceURL: 'http://path/to/file.js',
}

CapturedExceptions.SAFARI_8_EVAL = {
  message: 'Can\'t find variable: getExceptionProps',
  name: 'ReferenceError',
  stack: 'eval code\n'
    + 'eval@[native code]\n'
    + 'foo@http://path/to/file.js:58:21\n'
    + 'bar@http://path/to/file.js:109:91',
  line: 1,
  column: 18,
}

CapturedExceptions.SAFARI_9_NESTED_EVAL = {
  column: 39,
  line: 1,
  message: 'message string',
  stack: 'baz\n'
    + 'foo\n'
    + 'eval code\n'
    + 'eval@[native code]\n'
    + 'speak@http://localhost:8080/file.js:26:21\n'
    + 'global code@http://localhost:8080/file.js:33:18',
}

CapturedExceptions.IE_9 = {
  message: 'Unable to get property \'undef\' of undefined or null reference',
  description: 'Unable to get property \'undef\' of undefined or null reference',
}

CapturedExceptions.IE_10 = {
  message: 'Unable to get property \'undef\' of undefined or null reference',
  stack: 'TypeError: Unable to get property \'undef\' of undefined or null reference\n'
    + '   at Anonymous function (http://path/to/file.js:48:13)\n'
    + '   at foo (http://path/to/file.js:46:9)\n'
    + '   at bar (http://path/to/file.js:82:1)',
  description: 'Unable to get property \'undef\' of undefined or null reference',
  number: -2146823281,
}

CapturedExceptions.IE_11 = {
  message: 'Unable to get property \'undef\' of undefined or null reference',
  name: 'TypeError',
  stack: 'TypeError: Unable to get property \'undef\' of undefined or null reference\n'
    + '   at Anonymous function (http://path/to/file.js:47:21)\n'
    + '   at foo (http://path/to/file.js:45:13)\n'
    + '   at bar (http://path/to/file.js:108:1)',
  description: 'Unable to get property \'undef\' of undefined or null reference',
  number: -2146823281,
}

CapturedExceptions.EDGE_20_NESTED_EVAL = {
  description: 'message string',
  message: 'message string',
  name: 'Error',
  stack: 'Error: message string\n'
    + '  at baz (eval code:1:18)\n'
    + '  at foo (eval code:2:90)\n'
    + '  at eval code (eval code:4:18)\n'
    + '  at speak (http://localhost:8080/file.js:25:17)\n'
    + '  at Global code (http://localhost:8080/file.js:32:9)',
}

CapturedExceptions.NODE_WITH_SPACES = {
  name: 'Error',
  message: '',
  stack: 'Error\n     at /var/app/scratch/my '
    + 'project/index.js:2:9\n    at Object.<anonymous> '
    + '(/var/app/scratch/my '
    + 'project/index.js:2:9)\n    at Module._compile '
    + '(internal/modules/cjs/loader.js:774:30)\n    at '
    + 'Object.Module._extensions..js (internal/modules/cjs/loader.js:785:10)\n   '
    + ' at Module.load (internal/modules/cjs/loader.js:641:32)\n    at '
    + 'Function.Module._load (internal/modules/cjs/loader.js:556:12)\n    at '
    + 'Function.Module.runMain (internal/modules/cjs/loader.js:837:10)\n    at '
    + 'internal/main/run_main_module.js:17:11',
}
