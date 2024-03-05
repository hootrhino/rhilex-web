import { assert } from './common';
import type { AST, Token } from './luamin';

const printt = (tk: Token, buffer: string) => {
  if (tk.LeadingWhite === null || tk.Source === null) {
    throw `Bad token: tk=${tk} | lwhite=${tk.LeadingWhite} | source=${tk.Source}`;
  }
  return `${buffer}${tk.LeadingWhite}${tk.Source}`;
};

export const PrintAst = (ast: AST) => {
  let buffer = '';

  const printExpr = (expr) => {
    const type = expr.Type;

    if (type === 'BinopExpr') {
      printExpr(expr.Lhs);
      buffer = printt(expr.Token_Op, buffer);
      printExpr(expr.Rhs);
    } else if (type === 'UnopExpr') {
      buffer = printt(expr.Token_Op, buffer);
      printExpr(expr.Rhs);
    } else if (
      [
        'NumberLiteral',
        'StringLiteral',
        'NilLiteral',
        'BooleanLiteral',
        'VargLiteral',
        'HashLiteral',
      ].includes(type)
    ) {
      buffer = printt(expr.Token, buffer);
    } else if (type === 'FieldExpr') {
      printExpr(expr.Base);
      buffer = printt(expr.Token_Dot, buffer);
      buffer = printt(expr.Field, buffer);
    } else if (type === 'IndexExpr') {
      printExpr(expr.Base);
      buffer = printt(expr.Token_OpenBracket, buffer);
      printExpr(expr.Index);
      buffer = printt(expr.Token_CloseBracket, buffer);
    } else if (['MethodExpr', 'CallExpr'].includes(type)) {
      printExpr(expr.Base);
      if (type === 'MethodExpr') {
        buffer = printt(expr.Token_Colon, buffer);
        buffer = printt(expr.Method, buffer);
      }
      if (expr.FunctionArguments.CallType === 'StringCall') {
        buffer = printt(expr.FunctionArguments.Token, buffer);
      } else if (expr.FunctionArguments.CallType === 'ArgCall') {
        buffer = printt(expr.FunctionArguments.Token_OpenParen, buffer);
        expr.FunctionArguments.ArgList.forEach((argExpr, index) => {
          printExpr(argExpr);
          const sep = expr.FunctionArguments.Token_CommaList[index];
          if (sep != null) buffer = printt(sep, buffer);
        });
        buffer = printt(expr.FunctionArguments.Token_CloseParen, buffer);
      } else if (expr.FunctionArguments.CallType === 'TableCall') {
        printExpr(expr.FunctionArguments.TableExpr);
      }
    } else if (type === 'FunctionLiteral') {
      buffer = printt(expr.Token_Function, buffer);
      buffer = printt(expr.Token_OpenParen, buffer);
      expr.ArgList.forEach((arg, index) => {
        buffer = printt(arg, buffer);
        const comma = expr.Token_ArgCommaList[index];
        if (comma != null) buffer = printt(comma, buffer);
      });
      if (expr.Token_Varg != null) {
        buffer = printt(expr.Token_Varg, buffer);
      }
      buffer = printt(expr.Token_CloseParen, buffer);
      printStat(expr.Body);
      buffer = printt(expr.Token_End, buffer);
    } else if (type === 'VariableExpr') {
      buffer = printt(expr.Token, buffer);
    } else if (type === 'ParenExpr') {
      buffer = printt(expr.Token_OpenParen, buffer);
      printExpr(expr.Expression);
      buffer = printt(expr.Token_CloseParen, buffer);
    } else if (type === 'TableLiteral') {
      buffer = printt(expr.Token_OpenBrace, buffer);
      expr.EntryList.forEach(
        (
          { EntryType, Field, Token_Equals, Token_OpenBracket, Token_CloseBracket, Value, Index },
          index,
        ) => {
          if (EntryType === 'Field') {
            buffer = printt(Field, buffer);
            buffer = printt(Token_Equals, buffer);
            printExpr(Value);
          } else if (EntryType === 'Index') {
            buffer = printt(Token_OpenBracket, buffer);
            printExpr(Index);
            buffer = printt(Token_CloseBracket, buffer);
            buffer = printt(Token_Equals, buffer);
            printExpr(Value);
          } else if (EntryType === 'Value') {
            printExpr(Value);
          } else {
            throw 'unreachable';
          }
          const sep = expr.Token_SeperatorList[index];
          if (sep != null) buffer = printt(sep, buffer);
        },
      );
      buffer = printt(expr.Token_CloseBrace, buffer);
    } else if (type === 'CompoundStat') {
      printStat(expr);
    } else {
      throw `unreachable, type: ${type}: ${expr}`;
    }
  };

  const printStat = (stat: AST) => {
    if (stat === null) throw `STAT IS NIL! ${stat}`;
    const type = stat.Type;

    if (type === 'StatList') {
      stat.StatementList.forEach((ch, index) => {
        if (ch === null || ch.Type === null) return;

        ch.Remove = () => {
          stat.StatementList[index] = null;
        };

        printStat(ch);
        if (stat.SemicolonList[index]) buffer = printt(stat.SemicolonList[index], buffer);
      });
    } else if (type === 'BreakStat') {
      buffer = printt(stat.Token_Break, buffer);
    } else if (type === 'ContinueStat') {
      buffer = printt(stat.Token_Continue, buffer);
    } else if (type === 'ReturnStat') {
      buffer = printt(stat.Token_Return, buffer);
      stat.ExprList.forEach((expr, index) => {
        printExpr(expr);
        if (stat.Token_CommaList[index]) {
          buffer = printt(stat.Token_CommaList[index], buffer);
        }
      });
    } else if (type === 'LocalVarStat') {
      buffer = printt(stat.Token_Local, buffer);
      stat.VarList.forEach((_var, index) => {
        buffer = printt(_var, buffer);
        const comma = stat.Token_VarCommaList[index];
        if (comma != null) {
          buffer = printt(comma, buffer);
        }
      });
      if (stat.Token_Equals != null) {
        buffer = printt(stat.Token_Equals, buffer);
        stat.ExprList.forEach((expr, index) => {
          printExpr(expr);
          const comma = stat.Token_ExprCommaList[index];
          if (comma != null) {
            buffer = printt(comma, buffer);
          }
        });
      }
    } else if (type === 'LocalFunctionStat') {
      buffer = printt(stat.Token_Local, buffer);
      buffer = printt(stat.FunctionStat.Token_Function, buffer);
      buffer = printt(stat.FunctionStat.NameChain[0], buffer);
      buffer = printt(stat.FunctionStat.Token_OpenParen, buffer);
      stat.FunctionStat.ArgList.forEach((arg, index) => {
        buffer = printt(arg, buffer);
        const comma = stat.FunctionStat.Token_ArgCommaList[index];
        if (comma != null) buffer = printt(comma, buffer);
      });
      if (stat.FunctionStat.Token_Varg) {
        buffer = printt(stat.FunctionStat.Token_Varg, buffer);
      }
      buffer = printt(stat.FunctionStat.Token_CloseParen, buffer);
      printStat(stat.FunctionStat.Body);
      buffer = printt(stat.FunctionStat.Token_End, buffer);
    } else if (type === 'FunctionStat') {
      buffer = printt(stat.Token_Function, buffer);
      stat.NameChain.forEach((part, index) => {
        buffer = printt(part, buffer);
        const sep = stat.Token_NameChainSeperator[index];
        if (sep != null) buffer = printt(sep, buffer);
      });
      buffer = printt(stat.Token_OpenParen, buffer);
      stat.ArgList.forEach((arg, index) => {
        buffer = printt(arg, buffer);
        const comma = stat.Token_ArgCommaList[index];
        if (comma != null) buffer = printt(comma, buffer);
      });
      if (stat.Token_Varg) {
        buffer = printt(stat.Token_Varg, buffer);
      }
      buffer = printt(stat.Token_CloseParen, buffer);
      printStat(stat.Body);
      buffer = printt(stat.Token_End, buffer);
    } else if (type === 'RepeatStat') {
      buffer = printt(stat.Token_Repeat, buffer);
      printStat(stat.Body);
      buffer = printt(stat.Token_Until, buffer);
      printExpr(stat.Condition);
    } else if (type === 'GenericForStat') {
      buffer = printt(stat.Token_For, buffer);
      stat.VarList.forEach((_var, index) => {
        buffer = printt(_var, buffer);
        const sep = stat.Token_VarCommaList[index];
        if (sep != null) buffer = printt(sep, buffer);
      });
      buffer = printt(stat.Token_In, buffer);
      stat.GeneratorList.forEach((expr, index) => {
        printExpr(expr);
        const sep = stat.Token_GeneratorCommaList[index];
        if (sep != null) buffer = printt(sep, buffer);
      });
      buffer = printt(stat.Token_Do, buffer);
      printStat(stat.Body);
      buffer = printt(stat.Token_End, buffer);
    } else if (type === 'NumericForStat') {
      buffer = printt(stat.Token_For, buffer);
      stat.VarList.forEach((_var, index) => {
        buffer = printt(_var, buffer);
        const sep = stat.Token_VarCommaList[index];
        if (sep != null) buffer = printt(sep, buffer);
      });
      buffer = printt(stat.Token_Equals, buffer);
      stat.RangeList.forEach((expr, index) => {
        printExpr(expr);
        const sep = stat.Token_RangeCommaList[index];
        if (sep != null) buffer = printt(sep, buffer);
      });
      buffer = printt(stat.Token_Do, buffer);
      printStat(stat.Body);
      buffer = printt(stat.Token_End, buffer);
    } else if (type === 'WhileStat') {
      buffer = printt(stat.Token_While, buffer);
      printExpr(stat.Condition);
      buffer = printt(stat.Token_Do, buffer);
      printStat(stat.Body);
      buffer = printt(stat.Token_End, buffer);
    } else if (type === 'DoStat') {
      buffer = printt(stat.Token_Do, buffer);
      printStat(stat.Body);
      buffer = printt(stat.Token_End, buffer);
    } else if (type === 'IfStat') {
      buffer = printt(stat.Token_If, buffer);
      printExpr(stat.Condition);
      buffer = printt(stat.Token_Then, buffer);
      printStat(stat.Body);
      stat.ElseClauseList.forEach((clause) => {
        buffer = printt(clause.Token, buffer);
        if (clause.Condition != null) {
          printExpr(clause.Condition);
          buffer = printt(clause.Token_Then, buffer);
        }
        printStat(clause.Body);
      });
      buffer = printt(stat.Token_End, buffer);
    } else if (type === 'CallExprStat') {
      printExpr(stat.Expression);
    } else if (type === 'CompoundStat') {
      printExpr(stat.Lhs);
      buffer = printt(stat.Token_Compound, buffer);
      printExpr(stat.Rhs);
      stat.Type = 'CompoundStat';
    } else if (type === 'AssignmentStat') {
      stat.Lhs.forEach((ex, index) => {
        printExpr(ex);
        const sep = stat.Token_LhsSeperatorList[index];
        // TODO != 修改为!==
        if (sep != null) buffer = printt(sep, buffer);
      });
      buffer = printt(stat.Token_Equals, buffer);
      stat.Rhs.forEach((ex, index) => {
        printExpr(ex);
        const sep = stat.Token_RhsSeperatorList[index];
        if (sep != null) buffer = printt(sep, buffer);
      });
    } else {
      assert(false, 'unreachable');
    }
  };

  printStat(ast);
  // remove extra space
  buffer = buffer.replace(/^\s*\n/gm, '');

  return buffer;
};
