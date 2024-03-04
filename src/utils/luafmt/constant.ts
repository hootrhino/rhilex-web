export const WhiteChars = [' ', '\n', '\t', '\r'];

export const Main_CharacterForEscape = {
  r: '\r',
  n: '\n',
  t: '\t',
  '"': '"',
  "'": "'",
  '\\': '\\',
};

export const AllIdentStartChars = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '_',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

// 正则替代 const identRegex = /[\da-zA-Z_]/;
export const AllIdentChars = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',

  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '_',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  't',
  'u',
  'v',
  'w',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  'x',
  'y',
  'z',
];

export const Digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const HexDigits = [
  //digits
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',

  //letters
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
];

export const BinaryDigits = [
  '0',
  '1', // lol
];

export const Symbols = [
  '+',
  '-',
  '*',
  ')',
  ';',
  '/',
  '^',
  '%',
  '#',
  ',',
  '{',
  '}',
  ':',
  '[',
  ']',
  '(',
  '.',
  '`',
];

export const EqualSymbols = ['~', '=', '>', '<'];

export const CompoundSymbols = ['+', '-', '*', '/', '^', '..', '%'];

export const Compounds = ['+=', '-=', '*=', '/=', '^=', '..=', '%='];

export const Keywords = [
  'and',
  'break',
  'do',
  'else',
  'elseif',
  'end',
  'false',
  'for',
  'function',
  'goto',
  'if',
  'in',
  'local',
  'nil',
  'not',
  'or',
  'repeat',
  'return',
  'then',
  'true',
  'until',
  'while',
  'continue',
];

export const BlockFollowKeyword = ['else', 'elseif', 'until', 'end'];

export const UnopSet = ['-', 'not', '#', '~'];

export const BinopSet = [
  '+',
  '-',
  '*',
  '/',
  '%',
  '^',
  '#',
  '//', //algorithmic

  '&',
  '|',
  '~',
  '<<',
  '>>', // bitops

  '..',
  '.',
  ':', //dots / colons

  '>',
  '<',
  '<=',
  '>=',
  '~=',
  '==', //arrows / conditional

  '+=',
  '-=',
  '*=',
  '/=',
  '%=',
  '^=',
  '..=', // compounds

  'and',
  'or', // conditional
];

export const UnaryPriority = 11;

export const BinaryPriority = {
  '^': [13, 12],

  '%': [10, 10],
  '//': [10, 10],
  '/': [10, 10],
  '*': [10, 10],

  '+': [9, 9],
  '-': [9, 9],

  '..': [8, 7],

  '>>': [7, 7],
  '<<': [7, 7],
  '&': [6, 6],
  '~': [5, 5],
  '|': [4, 4],

  '==': [3, 3],
  '~=': [3, 3],
  '>=': [3, 3],
  '<=': [3, 3],
  '>': [3, 3],
  '<': [3, 3],

  '+=': [3, 3],
  '-=': [3, 3],
  '*=': [3, 3],
  '/=': [3, 3],
  '^=': [3, 3],
  '%=': [3, 3],
  '..=': [3, 3],

  and: [2, 2],
  or: [1, 1],
};

export const ExprType = {
  BinopExpr: true,
  UnopExpr: true,
  NumberLiteral: true,
  StringLiteral: true,
  NilLiteral: true,
  BooleanLiteral: true,
  VargLiteral: true,
  HashLiteral: true,
  FieldExpr: true,
  IndexExpr: true,
  MethodExpr: true,
  CallExpr: true,
  FunctionLiteral: true,
  VariableExpr: true,
  ParenExpr: true,
  TableLiteral: true,
};

export const StatType = {
  StatList: true,
  BreakStat: true,
  ContinueStat: true,
  ReturnStat: true,
  LocalVarStat: true,
  LocalFunctionStat: true,
  FunctionStat: true,
  RepeatStat: true,
  GenericForStat: true,
  NumericForStat: true,
  WhileStat: true,
  DoStat: true,
  IfStat: true,
  CallExprStat: true,
  AssignmentStat: true,
  CompoundStat: true,
};
