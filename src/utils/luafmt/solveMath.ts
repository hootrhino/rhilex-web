/**
 * SolveMath 辅助函数
 */
export const replace = <T extends any>(a: T, b: Partial<T>) => {
  if (!b) return;

  for (let [key, value] of Object.entries(b)) {
    a[key] = value;
  }
};

export const removeParen = (a: any) => {
  if (typeof a == 'object' && a.Type == 'ParenExpr') return replace(a, a.Expression);
}

export const createunop = (operator: string, rhs: any) => {
  const tokenOp = { Type: 'Symbol', LeadingWhite: '', Source: operator };

  return {
    Type: 'UnopExpr',
    Token_Op: tokenOp,
    Rhs: rhs,
    GetFirstToken: () => tokenOp,
    GetLastToken: () => rhs.GetLastToken(),
  }
}

export const createtype = (type: string, val: string, type2 = null) => {
  const token = {
    Type: type2 == null ? 'Number' : type2,
    LeadingWhite: '',
    Source: val,
  };

  return {
    Type: type,
    Token: token,
    GetFirstToken: () => token,
    GetLastToken: () => token,
  };
}

export const createbinop = (operator: string, lhs: any, rhs: any) => {
  return {
    Type: 'BinopExpr',
    Token_Op: { Type: 'Symbol', LeadingWhite: '', Source: operator },
    Lhs: lhs,
    Rhs: rhs,
    GetFirstToken: () => lhs.GetFirstToken(),
    GetLastToken: () => rhs.GetLastToken(),
  };
}
