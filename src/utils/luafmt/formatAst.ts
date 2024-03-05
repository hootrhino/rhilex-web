import { assert } from './common';
import { allCharRegex, WhiteChars } from './constant';
import type { AST, Token } from './luamin';

// 将字符串转成一个散列值(hash值)
const hash2String = (key: string): number => {
  let hash = 0;
  let i = key.length;

  while (i--) {
    hash += key.charCodeAt(i);
    hash += hash << 10;
    hash ^= hash >> 6;
  }
  hash += hash << 3;
  hash ^= hash >> 11;
  hash += hash << 15;

  return hash;
};

const stript = (token: Token) => {
  if (token) token.LeadingWhite = '';
};

const joint = (tokenA: Token, tokenB: Token, shit = false) => {
  stript(tokenB);

  const lastCh = (
    typeof tokenA.Source === 'string' ? tokenA.Source : tokenA.Source.toString()
  ).substr(tokenA.Source.length - 1, 1);
  const firstCh = (
    typeof tokenB.Source === 'string' ? tokenB.Source : tokenB.Source.toString()
  ).substr(0, 1);

  if (
    (lastCh === '-' && firstCh === '-') ||
    (allCharRegex.test(lastCh) && allCharRegex.test(firstCh)) ||
    (shit && lastCh === ')' && firstCh === '(')
  ) {
    tokenB.LeadingWhite = shit ? ';' : ' ';
  } else {
    tokenB.LeadingWhite = '';
  }
};

const StripAst = (ast: AST) => {
  const bodyjoint = (open: Token, body: Token, close: Token) => {
    stripStat(body);
    stript(close);

    if (body.GetFirstToken() != null) {
      joint(open, body.GetFirstToken());
      joint(body.GetLastToken(), close);
    } else {
      joint(open, close);
    }
  };

  const stripExpr = (expr) => {
    if (expr.Type === 'BinopExpr') {
      stripExpr(expr.Lhs);
      stript(expr.Token_Op);
      stripExpr(expr.Rhs);

      joint(expr.Token_Op, expr.Rhs.GetFirstToken());
      joint(expr.Lhs.GetLastToken(), expr.Token_Op);
    } else if (expr.Type === 'UnopExpr') {
      stript(expr.Token_Op);
      stripExpr(expr.Rhs);

      joint(expr.Token_Op, expr.Rhs.GetFirstToken());
    } else if (
      [
        'NumberLiteral',
        'StringLiteral',
        'NilLiteral',
        'BooleanLiteral',
        'VargLiteral',
        'HashLiteral',
      ].includes(expr.Type)
    ) {
      stript(expr.Token);
    } else if (expr.Type === 'FieldExpr') {
      stripExpr(expr.Base);
      stript(expr.Token_Dot);
      stript(expr.Field);
    } else if (expr.Type === 'IndexExpr') {
      stripExpr(expr.Base);
      stript(expr.Token_OpenBracket);
      stripExpr(expr.Index);
      stript(expr.Token_CloseBracket);
    } else if (['MethodExpr', 'CallExpr'].includes(expr.Type)) {
      stripExpr(expr.Base);
      if (expr.Type === 'MethodExpr') {
        stript(expr.Token_Colon);
        stript(expr.Method);
      }
      if (expr.FunctionArguments.CallType == 'StringCall') {
        stript(expr.FunctionArguments.Token);
      } else if (expr.FunctionArguments.CallType == 'ArgCall') {
        stript(expr.FunctionArguments.Token_OpenParen);
        expr.FunctionArguments.ArgList.forEach((argExpr, index) => {
          stripExpr(argExpr);
          let sep = expr.FunctionArguments.Token_CommaList[index];
          if (sep != null) {
            stript(sep);
          }
        });
        stript(expr.FunctionArguments.Token_CloseParen);
      } else if (expr.FunctionArguments.CallType == 'TableCall') {
        stripExpr(expr.FunctionArguments.TableExpr);
      }
    } else if (expr.Type === 'FunctionLiteral') {
      stript(expr.Token_Function);
      stript(expr.Token_OpenParen);
      expr.ArgList.forEach((arg, index) => {
        stript(arg);
        const comma = expr.Token_ArgCommaList[index];
        if (comma != null) stript(comma);
      });
      if (expr.Token_Varg != null) {
        stript(expr.Token_Varg);
      }
      stript(expr.Token_CloseParen);
      bodyjoint(expr.Token_CloseParen, expr.Body, expr.Token_End);
    } else if (expr.Type === 'VariableExpr') {
      stript(expr.Token);
    } else if (expr.Type === 'ParenExpr') {
      stript(expr.Token_OpenParen);
      stripExpr(expr.Expression);
      stript(expr.Token_CloseParen);
    } else if (expr.Type === 'TableLiteral') {
      stript(expr.Token_OpenBrace);
      expr.EntryList.forEach((entry, index) => {
        if (entry.EntryType === 'Field') {
          stript(entry.Field);
          stript(entry.Token_Equals);
          stripExpr(entry.Value);
        } else if (entry.EntryType === 'Index') {
          stript(entry.Token_OpenBracket);
          stripExpr(entry.Index);
          stript(entry.Token_CloseBracket);
          stript(entry.Token_Equals);
          stripExpr(entry.Value);
        } else if (entry.EntryType === 'Value') {
          stripExpr(entry.Value);
        } else {
          assert(false, 'unreachable');
        }
        let sep = expr.Token_SeperatorList[index];
        if (sep != null) {
          stript(sep);
        }
      });

      expr.Token_SeperatorList[expr.EntryList.length - 1] = null;
      stript(expr.Token_CloseBrace);
    } else {
      throw `unreachable, type: ${expr.Type}:${expr}  ${console.trace()}`;
    }
  };

  const stripStat = (stat) => {
    if (stat.Type === 'StatList') {
      for (let i = 0; i <= stat.StatementList.length; i++) {
        const chStat = stat.StatementList[i];
        if (chStat === null) continue;

        stripStat(chStat);
        stript(chStat.GetFirstToken());
        const lastChStat = stat.StatementList[i - 1];
        if (lastChStat != null) {
          let bannedCombos = {
            ')': ['(', '['],
            ']': ['(', '['],
          };

          if (stat.SemicolonList[i - 1]) {
            const lastS = lastChStat.GetLastToken().Source;
            const firstS = chStat.GetFirstToken().Source;

            if (
              bannedCombos[lastS] === null ||
              bannedCombos[lastS] === undefined ||
              !bannedCombos[lastS].includes(firstS)
            ) {
              stat.SemicolonList[i - 1] = null;
            } else {
              //console.log(lastS, firstS)
            }
          }

          if (!stat.SemicolonList[i - 1]) {
            joint(lastChStat.GetLastToken(), chStat.GetFirstToken(), true);
          }
        }
      }

      stat.SemicolonList[stat.StatementList.length - 1] = null;
      if (stat.StatementList.length > 0) {
        stript(stat.StatementList[0].GetFirstToken());
      }
    } else if (stat.Type === 'BreakStat') {
      stript(stat.Token_Break);
    } else if (stat.Type === 'ContinueStat') {
      stript(stat.Token_Continue);
    } else if (stat.Type === 'ReturnStat') {
      stript(stat.Token_Return);
      stat.ExprList.forEach((expr, index) => {
        stripExpr(expr);
        if (stat.Token_CommaList[index] != null) stript(stat.Token_CommaList[index]);
      });
      if (stat.ExprList.length > 0) {
        joint(stat.Token_Return, stat.ExprList[0].GetFirstToken());
      }
    } else if (stat.Type === 'LocalVarStat') {
      stript(stat.Token_Local);
      stat.VarList.forEach((_var, index) => {
        if (index == 0) {
          joint(stat.Token_Local, _var);
        } else {
          stript(_var);
        }
        const comma = stat.Token_VarCommaList[index];
        if (comma != null) stript(comma);
      });
      if (stat.Token_Equals != null) {
        stript(stat.Token_Equals);
        stat.ExprList.forEach((expr, index) => {
          stripExpr(expr);
          const comma = stat.Token_ExprCommaList[index];
          if (comma != null) stript(comma);
        });
      }
    } else if (stat.Type === 'LocalFunctionStat') {
      stript(stat.Token_Local);
      joint(stat.Token_Local, stat.FunctionStat.Token_Function);
      joint(stat.FunctionStat.Token_Function, stat.FunctionStat.NameChain[0]);
      joint(stat.FunctionStat.NameChain[0], stat.FunctionStat.Token_OpenParen);

      stat.FunctionStat.ArgList.forEach((arg, index) => {
        stript(arg);
        const comma = stat.FunctionStat.Token_ArgCommaList[index];
        if (comma != null) stript(comma);
      });
      if (stat.FunctionStat.Token_Varg) {
        stript(stat.FunctionStat.Token_Varg);
      }
      stript(stat.FunctionStat.Token_CloseParen);
      bodyjoint(
        stat.FunctionStat.Token_CloseParen,
        stat.FunctionStat.Body,
        stat.FunctionStat.Token_End,
      );
    } else if (stat.Type === 'FunctionStat') {
      stript(stat.Token_Function);
      stat.NameChain.forEach((part, index) => {
        if (index == 0) {
          joint(stat.Token_Function, part);
        } else {
          stript(part);
        }
        const sep = stat.Token_NameChainSeperator[index];
        if (sep != null) stript(sep);
      });
      stript(stat.Token_OpenParen);
      stat.ArgList.forEach((arg, index) => {
        stript(arg);
        const comma = stat.Token_ArgCommaList[index];
        if (comma != null) stript(comma);
      });

      if (stat.Token_Varg) {
        stript(stat.Token_Varg);
      }
      stript(stat.Token_CloseParen);
      bodyjoint(stat.Token_CloseParen, stat.Body, stat.Token_End);
    } else if (stat.Type === 'RepeatStat') {
      stript(stat.Token_Repeat);
      bodyjoint(stat.Token_Repeat, stat.Body, stat.Token_Until);
      stripExpr(stat.Condition);
      joint(stat.Token_Until, stat.Condition.GetFirstToken());
    } else if (stat.Type === 'GenericForStat') {
      stript(stat.Token_For);
      stat.VarList.forEach((_var, index) => {
        if (index == 0) {
          joint(stat.Token_For, _var);
        } else {
          stript(_var);
        }
        const sep = stat.Token_VarCommaList[index];
        if (sep != null) stript(sep);
      });
      joint(stat.VarList[stat.VarList.length - 1], stat.Token_In);
      stat.GeneratorList.forEach((expr, index) => {
        stripExpr(expr);
        if (index == 0) {
          joint(stat.Token_In, expr.GetFirstToken());
        }
        const sep = stat.Token_GeneratorCommaList[index];
        if (sep != null) stript(sep);
      });
      joint(stat.GeneratorList[stat.GeneratorList.length - 1].GetLastToken(), stat.Token_Do);
      bodyjoint(stat.Token_Do, stat.Body, stat.Token_End);
    } else if (stat.Type === 'NumericForStat') {
      stript(stat.Token_For);
      stat.VarList.forEach((_var, index) => {
        if (index == 0) {
          joint(stat.Token_For, _var);
        } else {
          stript(_var);
        }
        const sep = stat.Token_VarCommaList[index];
        if (sep != null) stript(sep);
      });
      joint(stat.VarList[stat.VarList.length - 1], stat.Token_Equals);
      stat.RangeList.forEach((expr, index) => {
        stripExpr(expr);
        if (index == 0) {
          joint(stat.Token_Equals, expr.GetFirstToken());
        }
        const sep = stat.Token_RangeCommaList[index];
        if (sep != null) stript(sep);
      });
      joint(stat.RangeList[stat.RangeList.length - 1].GetLastToken(), stat.Token_Do);
      bodyjoint(stat.Token_Do, stat.Body, stat.Token_End);
    } else if (stat.Type === 'WhileStat') {
      stript(stat.Token_While);
      stripExpr(stat.Condition);
      stript(stat.Token_Do);
      joint(stat.Token_While, stat.Condition.GetFirstToken());
      joint(stat.Condition.GetLastToken(), stat.Token_Do);
      bodyjoint(stat.Token_Do, stat.Body, stat.Token_End);
    } else if (stat.Type === 'DoStat') {
      stript(stat.Token_Do);
      stript(stat.Token_End);
      bodyjoint(stat.Token_Do, stat.Body, stat.Token_End);
    } else if (stat.Type === 'IfStat') {
      stript(stat.Token_If);
      stripExpr(stat.Condition);
      joint(stat.Token_If, stat.Condition.GetFirstToken());
      joint(stat.Condition.GetLastToken(), stat.Token_Then);

      let lastBodyOpen = stat.Token_Then;
      let lastBody = stat.Body;

      stat.ElseClauseList.forEach((clause, i) => {
        bodyjoint(lastBodyOpen, lastBody, clause.Token);
        lastBodyOpen = clause.Token;

        if (clause.Condition != null) {
          stripExpr(clause.Condition);
          joint(clause.Token, clause.Condition.GetFirstToken());
          joint(clause.Condition.GetLastToken(), clause.Token_Then);
          lastBodyOpen = clause.Token_Then;
        }

        stripStat(clause.Body);
        lastBody = clause.Body;
      });

      bodyjoint(lastBodyOpen, lastBody, stat.Token_End);
    } else if (stat.Type === 'CallExprStat') {
      stripExpr(stat.Expression);
    } else if (stat.Type === 'CompoundStat') {
      stripExpr(stat.Lhs);
      stript(stat.Token_Compound);
      stripExpr(stat.Rhs);

      joint(stat.Lhs.GetLastToken(), stat.Token_Compound);
      joint(stat.Token_Compound, stat.Rhs.GetFirstToken());
    } else if (stat.Type === 'AssignmentStat') {
      stat.Lhs.forEach((ex, index) => {
        stripExpr(ex);
        const sep = stat.Token_LhsSeperatorList[index];
        if (sep != null) stript(sep);
      });
      stript(stat.Token_Equals);
      stat.Rhs.forEach((ex, index) => {
        stripExpr(ex);
        const sep = stat.Token_RhsSeperatorList[index];
        if (sep != null) stript(sep);
      });
    } else {
      return stripExpr(stat);
    }
  };

  stripStat(ast);
};

export const FormatAst = (ast: AST) => {
  let currentIndent = 0;

  function applyIndent(token) {
    const indentString = `\n${'\t'.repeat(currentIndent)}`;

    if (
      token.LeadingWhite == '' ||
      token.LeadingWhite.substr(-indentString.length, indentString.length) != indentString
    ) {
      //token.LeadingWhite = token.LeadingWhite.replace("\n?[\t ]*$") /Remove all \n & \t at end of string
      // idk string patterns in js :(

      let newstr = '';

      for (let i = token.LeadingWhite.length; i >= 0; i--) {
        let cur = token.LeadingWhite.substr(i, 1);
        if (cur == '' || cur.match(/\s/g)) {
        } else {
          newstr = token.LeadingWhite.substr(0, i + 1);
          break;
        }
      }

      token.LeadingWhite = `${newstr}${indentString}`;
    }
  }

  function indent() {
    currentIndent++;
  }

  function undent() {
    currentIndent--;
    assert(currentIndent >= 0, 'Undented too far');
  }

  function leadingChar(tk) {
    if (tk.LeadingWhite.length > 0) {
      return tk.LeadingWhite.substr(0, 1);
    } else {
      return tk.Source.toString().substr(0, 1);
    }
  }

  function trimToken(tk) {
    tk.LeadingWhite = tk.LeadingWhite.trim();
  }
  function padToken(tk) {
    trimToken(tk);
    if (!WhiteChars.includes(leadingChar(tk))) {
      tk.LeadingWhite = ' ' + tk.LeadingWhite;
    }
  }

  function padExpr(expr) {
    padToken(expr.GetFirstToken());
  }

  function formatBody(bodyStat, closeToken) {
    indent();
    formatStat(bodyStat);
    undent();
    applyIndent(closeToken);
  }

  const formatExpr = (expr) => {
    if (expr.Type === 'BinopExpr') {
      formatExpr(expr.Lhs);
      formatExpr(expr.Rhs);
      padExpr(expr.Rhs);
      padToken(expr.Token_Op);
    } else if (expr.Type === 'UnopExpr') {
      trimToken(expr.Token_Op);
      formatExpr(expr.Rhs);
      if (expr.Token_Op.Source[0]) padToken(expr.Rhs.GetFirstToken());
    } else if (
      [
        'NumberLiteral',
        'StringLiteral',
        'NilLiteral',
        'BooleanLiteral',
        'VargLiteral',
        'HashLiteral',
      ].includes(expr.Type)
    ) {
      // no
      trimToken(expr.Token);
      if (expr.Type === 'HashLiteral') {
        const hash = `${expr.Token.Source.substring(1, expr.Token.Source.length - 1)}`;
        expr.Token.Source = `"${hash2String(hash)}"`
        expr.Type = 'StringLiteral';
        expr.Token.Type = 'String';
      }
    } else if (expr.Type === 'FieldExpr') {
      formatExpr(expr.Base);
    } else if (expr.Type === 'IndexExpr') {
      formatExpr(expr.Base);
      formatExpr(expr.Index);
    } else if (['MethodExpr', 'CallExpr'].includes(expr.Type)) {
      formatExpr(expr.Base);
      trimToken(expr.FunctionArguments.GetFirstToken());
      trimToken(expr.FunctionArguments.GetLastToken());
      // if (expr.Type === 'MethodExpr') {
      // }

      if (expr.FunctionArguments.CallType === 'StringCall') {
      } else if (expr.FunctionArguments.CallType === 'ArgCall') {
        expr.FunctionArguments.ArgList.forEach((argExpr, index) => {
          formatExpr(argExpr);
          if (index > 0) {
            padExpr(argExpr);
          }
          const sep = expr.FunctionArguments.Token_CommaList[index];
          if (sep != null) trimToken(sep);
        });
      } else if (expr.FunctionArguments.CallType == 'TableCall') {
        formatExpr(expr.FunctionArguments.TableExpr);
      }
    } else if (expr.Type === 'FunctionLiteral') {
      expr.ArgList.forEach((arg, index) => {
        if (index > 0) {
          padToken(arg);
        }
        let comma = expr.Token_ArgCommaList[index];
        if (comma != null) {
        }
      });

      if (expr.ArgList.length > 0 && expr.Token_Varg != null) {
        padToken(expr.Token_Varg);
      }
      formatBody(expr.Body, expr.Token_End);
    } else if (expr.Type === 'VariableExpr') {
      // TODO something
    } else if (expr.Type === 'ParenExpr') {
      trimToken(expr.Token_OpenParen);
      trimToken(expr.Token_CloseParen);
      formatExpr(expr.Expression);
    } else if (expr.Type === 'TableLiteral') {
      if (expr.EntryList.length !== 0) {
        indent();

        expr.EntryList.forEach((entry, index) => {
          if (entry.EntryType === 'Field') {
            if (expr.EntryList.length > 100) {
              StripAst(entry.Value);
            } else {
              applyIndent(entry.Field);
            }

            padToken(entry.Token_Equals);
            formatExpr(entry.Value);
            padExpr(entry.Value);
          } else if (entry.EntryType === 'Index') {
            if (expr.EntryList.length > 100) {
              trimToken(entry.Token_OpenBracket);
            } else applyIndent(entry.Token_OpenBracket);

            formatExpr(entry.Index);

            padToken(entry.Token_Equals);
            formatExpr(entry.Value);
            padExpr(entry.Value);
          } else if (entry.EntryType === 'Value') {
            formatExpr(entry.Value);

            if (expr.EntryList.length > 100) {
              StripAst(entry.Value);
            } else {
              applyIndent(entry.Value.GetFirstToken());
            }
          } else {
            assert(false, 'unreachable');
          }
          let sep = expr.Token_SeperatorList[index];
          if (sep != null) {
            if (expr.EntryList.length > 100) sep.LeadingWhite = '';
            else trimToken(sep);
          }
        });
        undent();
        if (expr.EntryList.length > 100) {
          expr.Token_CloseBrace.LeadingWhite = '';
        } else {
          applyIndent(expr.Token_CloseBrace);
        }
      }
    } else if (expr.Type === 'CompoundStat') {
      formatStat(expr);
    } else {
      console.log(expr);
      throw `unreachable, type: ${expr.Type}:` + expr;
    }
  };

  const formatStat = (stat) => {
    // TODO 类型 BreakStat ContinueStat 未做处理
    if (stat.Type === 'StatList') {
      stat.StatementList.forEach((stat, index) => {
        if (stat === null || stat.Type === null) return;

        stat.Remove = () => {
          stat.StatementList[index] = null;
        };

        formatStat(stat);
        applyIndent(stat.GetFirstToken());
      });
    } else if (stat.Type === 'ReturnStat') {
      stat.ExprList.forEach((expr) => {
        formatExpr(expr);
        padExpr(expr);
      });
    } else if (stat.Type === 'LocalVarStat') {
      stat.VarList.forEach((_var) => padToken(_var));
      if (stat.Token_Equals) {
        trimToken(stat.Token_Equals);
        padToken(stat.Token_Equals);

        const newlist: any[] = [];
        const newcommalist: any[] = [];
        stat.ExprList.forEach((expr, index) => {
          if (expr != null) {
            if (index < stat.VarList.length) {
              newlist.push(expr);
              newcommalist.push(stat.Token_ExprCommaList[index]);
            } else if (
              ['CallExpr', 'ParenExpr', 'VargLiteral', 'BinopExpr', 'UnopExpr'].includes(expr.Type)
            ) {
              newlist.push(expr);
              newcommalist.push(stat.Token_ExprCommaList[index]);
            }
          }
        });

        stat.ExprList = newlist;
        stat.CommaList = newcommalist;

        stat.ExprList.forEach((expr, index) => {
          if (expr != null) {
            formatExpr(expr);
            padExpr(expr);
            const comma = stat.Token_ExprCommaList[index];
            if (comma != null && stat.ExprList.length - 1 == index) {
              stat.Token_ExprCommaList[index] = null;
            }
          }
        });
      }
    } else if (stat.Type === 'LocalFunctionStat') {
      padToken(stat.FunctionStat.Token_Function);
      padToken(stat.FunctionStat.NameChain[0]);

      stat.FunctionStat.ArgList.forEach((arg, index) => {
        if (index > 0) {
          padToken(arg);
        } else {
          trimToken(arg);
        }

        const comma = stat.FunctionStat.Token_ArgCommaList[index];
        if (comma) trimToken(comma);
      });

      if (stat.FunctionStat.ArgList.length > 0 && stat.FunctionStat.Token_Varg) {
        trimToken(stat.FunctionStat.Token_Varg);
        padToken(stat.FunctionStat.Token_Varg);
      } else if (stat.FunctionStat.Token_Varg) {
        trimToken(stat.FunctionStat.Token_Varg);
      }

      trimToken(stat.FunctionStat.Token_OpenParen);
      trimToken(stat.FunctionStat.Token_CloseParen);
      formatBody(
        stat.FunctionStat.Body,
        stat.FunctionStat.Token_End,
      );
    } else if (stat.Type === 'FunctionStat') {
      stat.NameChain.forEach((part, index) => index === 0 && padToken(part));

      stat.ArgList.forEach((arg, index) => index > 0 && padToken(arg));

      if (stat.ArgList.length > 0 && stat.Token_Varg) {
        padToken(stat.Token_Varg);
      }

      formatBody(stat.Body, stat.Token_End);
    } else if (stat.Type === 'RepeatStat') {
      formatBody(stat.Body, stat.Token_Until);
      formatExpr(stat.Condition);
      padExpr(stat.Condition);
    } else if (stat.Type === 'GenericForStat') {
      stat.VarList.forEach((_var) => padToken(_var));
      padToken(stat.Token_In);
      stat.GeneratorList.forEach((expr) => {
        formatExpr(expr);
        padExpr(expr);
      });
      padToken(stat.Token_Do);
      formatBody(stat.Body, stat.Token_End);
    } else if (stat.Type === 'NumericForStat') {
      stat.VarList.forEach((_var) => padToken(_var));
      padToken(stat.Token_Equals);
      stat.RangeList.forEach((expr) => {
        formatExpr(expr);
        padExpr(expr);
      });
      padToken(stat.Token_Do);
      formatBody(stat.Body, stat.Token_End);
    } else if (stat.Type === 'WhileStat') {
      formatExpr(stat.Condition);
      padExpr(stat.Condition);
      padToken(stat.Token_Do);
      formatBody(stat.Body, stat.Token_End);
    } else if (stat.Type === 'DoStat') {
      formatBody(stat.Body, stat.Token_End);
    } else if (stat.Type === 'IfStat') {
      formatExpr(stat.Condition);
      padExpr(stat.Condition);
      padToken(stat.Token_Then);

      let lastBody = stat.Body;

      stat.ElseClauseList.forEach((clause) => {
        formatBody(lastBody, clause.Token);

        if (clause.Condition != null) {
          formatExpr(clause.Condition);
          padExpr(clause.Condition);
          padToken(clause.Token_Then);
        }
        lastBody = clause.Body;
      });

      formatBody(lastBody, stat.Token_End);
    } else if (stat.Type === 'CallExprStat') {
      formatExpr(stat.Expression);
    } else if (stat.Type === 'CompoundStat') {
      formatExpr(stat.Lhs);
      formatExpr(stat.Rhs);

      padExpr(stat.Lhs);
      padExpr(stat.Rhs);
      padToken(stat.Token_Compound);
    } else if (stat.Type === 'AssignmentStat') {
      stat.Lhs.forEach((ex, index) => {
        formatExpr(ex);
        if (index > 0) {
          padExpr(ex);
        }
      });
      padToken(stat.Token_Equals);
      stat.Rhs.forEach((ex) => {
        formatExpr(ex);
        padExpr(ex);
      });
    } else {
      assert(false, 'Unreachable');
    }
  };

  formatStat(ast);
};
