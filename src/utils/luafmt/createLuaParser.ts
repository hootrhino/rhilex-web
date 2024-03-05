import { assert } from './common';
import {
  allCharRegex,
  allStartCharRegex,
  BinaryDigits,
  BinaryPriority,
  BinopSet,
  BlockFollowKeyword,
  Compounds,
  CompoundSymbols,
  Digits,
  EqualSymbols,
  HexDigits,
  Keywords,
  Main_CharacterForEscape,
  Symbols,
  UnaryPriority,
  UnopSet,
  WhiteChars,
} from './constant';
import { Token } from './luamin';

const parseFloat = (str: string | symbol, radix?: number) => {
  if (!str) return 0;
  var parts = str.toString().split('.');
  if (parts.length > 1 && radix) {
    return parseInt(parts[0], radix) + parseInt(parts[1], radix) / Math.pow(radix, parts[1].length);
  }
  return parseInt(parts[0], radix);
};

const CharacterForEscape = new Proxy(Main_CharacterForEscape, {
  get(a, b) {
    return parseFloat(b);
  },
});

const CreateLuaTokenStream = (text) => {
  // Tracking for the current position in the buffer, and
  // the current line / character we are on

  let p = 0;

  // Output buffer for tokens
  const tokenBuffer: any[] = [];

  // Get a character or '' if at eof
  function look(n = 0) {
    return p <= text.length ? text.substr(p + n, 1) : '';
  }

  function get() {
    if (p <= text.length) {
      let c = text.substr(p, 1);
      p++;
      return c;
    } else {
      return '';
    }
  }

  // Error
  function error(str) {
    let line = 1;
    let char = 1;
    while (0 <= p) {
      if (text.substr(0, 1) == '\n') {
        line++;
        char = 1;
      } else {
        char++;
      }
    }

    for (let i_ = 0; i_ < tokenBuffer.length; i_++) {
      let token: any = tokenBuffer[i_];
      console.log(`${token.Type}<${token.Source}>`);
    }
    throw `file<${line}:${char}>: ${str}`;
  }

  // Consume a long data with equals count of `eqcount`
  function longdata(eqcount) {
    while (true) {
      let c = get();
      if (c == '') {
        error('Unfinished long string.');
      } else if (c == ']') {
        let done = true; // Until contested

        for (let i = 1; i <= eqcount; i++) {
          if (look() == '=') {
            p++;
          } else {
            done = false;
            break;
          }
        }
        if (done && get() == ']') {
          return;
        }
      }
    }
  }

  // Get the opening part for a long data `[` `=`` * `[`
  // Precondition: The first `[` has been consumed
  // Return: nil or the equals count

  function getopen() {
    let startp = p;
    while (look() == '=') {
      p++;
    }
    if (look() == '[') {
      p++;
      return p - startp - 1;
    } else {
      p = startp;
      return;
    }
  }

  // Add token
  let whiteStart = 0;
  let tokenStart = 0;
  let tokens = 0;
  function token(type: string) {
    tokens++;

    let src = text.substr(tokenStart, p - tokenStart);
    let ntype: string | null = null;
    const maxValue = 999999999999;
    if (type == 'Number') {
      if (src.startsWith('0x')) {
        ntype = 'hex';
        if (parseInt(src, 16) < maxValue) src = parseInt(src, 16);
      } else if (src.startsWith('0b')) {
        ntype = 'bin';
        if (parseInt(src.substr(2), 2) < maxValue) src = parseInt(src.substr(2), 2);
      }
    }
    let tk = {
      Type: type,
      LeadingWhite: text.substr(whiteStart, tokenStart - whiteStart),
      Source: src,
      NType: '',
    };
    if (ntype !== null) {

      tk = {
        ...tk,
        NType: ntype
      }
    }
    tokenBuffer.push(tk);

    whiteStart = p;
    tokenStart = p;
    return tk;
  }

  // Parse tokens loop
  while (true) {
    // Mark the whitespace start
    whiteStart = p;
    while (true) {
      // Whitespaces
      let c = look();
      if (c == '') {
        break;
      } else if (c == '-') {
        if (look(1) == '-') {
          p += 2;

          // Consume comment body
          if (look() == '[') {
            p++;
            let eqcount = getopen();
            if (eqcount != null) {
              // Long comment body
              longdata(eqcount);
              whiteStart = p;
            } else {
              // Normal comment body
              while (true) {
                let c2 = get();
                if (c2 == '' || c2 == '\n') {
                  //whiteStart = p
                  break;
                }
              }
            }
          } else {
            // Normal comment body
            while (true) {
              let c2 = get();
              if (c2 == '' || c2 == '\n') {
                //whiteStart = p
                break;
              }
            }
          }
        } else {
          break;
        }
      } else if (WhiteChars.includes(c)) {
        p++;
      } else {
        break;
      }
    }

    // let leadingWhite = text.substr(whiteStart, (p - whiteStart))
    // Mark the token start
    tokenStart = p;

    // Switch on token type
    let c1 = get();
    if (c1 == '') {
      // End of file
      token('Eof');
      break;
    } else if (c1 == "'" || c1 == '"') {
      // String constant
      while (true) {
        let c2 = get();
        if (c2 == '\\') {
          let c3 = get();
          let esc = CharacterForEscape[c3];
          if (esc == null) {
            throw `Invalid Escape Sequence \`${c3}\`.`;
          }
        } else if (c2 == c1) {
          break;
        } else if (c2 == '') {
          throw 'Unfinished string!';
        }
      }
      token('String');
    } else if (c1 == '`') {
      // Hash string
      while (true) {
        let c2 = get();
        if (c2 == '\\') {
          let c3 = get();
          let esc = CharacterForEscape[c3];
          if (esc == null) {
            throw `Invalid Escape Sequence \`${c3}\`.`;
          }
        } else if (c2 == c1) {
          break;
        } else if (c2 == '') {
          throw 'Unfinished string!';
        }
      }

      token('Hash');
    } else if (allStartCharRegex.test(c1)) {
      // Ident or keyword
      while (allCharRegex.test(look())) {
        p++;
      }

      if (Keywords.includes(text.substr(tokenStart, p - tokenStart))) {
        token('Keyword');
      } else {
        token('Ident');
      }
    } else if (Digits.includes(c1) || (c1 == '.' && Digits.includes(look()))) {
      // Number
      if (c1 == '0' && look().toLowerCase() == 'x') {
        p++;
        // Hex number
        while (HexDigits.includes(look()) || look() === '_') {
          p++;
        }
      } else if (c1 == '0' && look().toLowerCase() == 'b') {
        p++;
        // Binary number
        while (BinaryDigits.includes(look()) || look() === '_') {
          p++;
        }
      } else {
        // Normal number
        while (Digits.includes(look()) || look() === '_') {
          p++;
        }

        if (look() == '.') {
          // With decimal point
          p++;
          while (Digits.includes(look())) {
            p++;
          }
        }

        if (look() == 'e' || look() == 'E') {
          // With exponent
          p++;
          if (look() == '-' || look() == '+') {
            p++;
          }
          while (Digits.includes(look())) {
            p++;
          }
        }
      }
      token('Number');
    } else if (c1 == '[') {
      // Symbol or Long String
      let eqCount = getopen();
      if (eqCount != null) {
        // Long String
        longdata(eqCount);
        token('String');
      } else {
        // Symbol
        token('Symbol');
      }
    } else if (c1 == '.') {
      // Greedily consume up to 3 `.` for . / .. / ... tokens / ..= compound
      if (look() == '.') {
        get();
        if (look() == '.') {
          get();
        } else if (look() == '=') {
          get();
        }
      }
      token('Symbol');
    } else if (BinopSet.includes(c1 + look())) {
      get();
      token('Symbol');
    } else if (EqualSymbols.includes(c1)) {
      if (look() == '=') {
        p++;
      }
      token('Symbol');
    } else if (CompoundSymbols.includes(c1) && look() == '=') {
      get();
      token('Symbol');
    } else if (Symbols.includes(c1)) {
      token('Symbol');
    } else {
      throw `Bad symbol \`${c1}\` in source. ${p}`;
    }
  }

  return tokenBuffer;
};

export const CreateLuaParser = (text: string) => {
  // Token stream and pointer into it
  let tokens = CreateLuaTokenStream(text);

  let p = 0;
  function get() {
    const tok = tokens[p];
    if (p < tokens.length) {
      p++;
    }
    return tok;
  }
  function peek(n = 0) {
    return tokens[n + p] || tokens[tokens.length - 1];
  }

  function getTokenStartPosition(token) {
    let line = 1;
    let char = 0;
    let tkNum = 0;
    while (true) {
      let tk = tokens[tkNum];
      let text;
      if (tk == token) {
        text = tk.LeadingWhite;
      } else {
        text = tk.LeadingWhite + tk.Source;
      }

      for (let i = 0; i <= text.length; i++) {
        let c = text.substr(i, 1);
        if (c == '\n') {
          line++;
          char = 0;
        } else {
          char++;
        }
      }

      if (tk == token) {
        break;
      }
      tkNum++;
    }
    return `${line}:${char + 1}`;
  }

  function debugMark() {
    const tk = peek();
    return `<${tk.Type} \`${tk.Source}\`> at: ${getTokenStartPosition(tk)}`;
  }

  function isBlockFollow() {
    const tok = peek();
    return tok.Type == 'Eof' || (tok.Type == 'Keyword' && BlockFollowKeyword.includes(tok.Source));
  }

  function isUnop() {
    return UnopSet.includes(peek().Source) || false;
  }

  function isBinop() {
    return BinopSet.includes(peek().Source) || false;
  }

  function expect(type: string, source?: string) {
    const tk = peek();

    if (tk.Type == type && (source == null || tk.Source == source)) {
      return get();
    } else {
      for (let i = -3; i <= 3; i++) {
        console.log(`Tokens[${i}] = \`${peek(i).Source}\``);
      }
      throw source ? `${getTokenStartPosition(tk)}: \`${source}\` expected.` : `${getTokenStartPosition(tk)}: ${type} expected.`;
    }
  }

  function MkNode(node) {
    function getFirstToken() {
      const token = node.GetFirstToken();
      assert(token);
      return token;
    }

    function getLastToken() {
      const token = node.GetLastToken();
      assert(token);
      return token;
    }

    return {
      ...node,
      GetFirstToken: getFirstToken,
      GetLastToken: getLastToken
    }
  }

  function exprlist(locals, upvals) {
    const exprList = [subexpr(locals, upvals)];
    const commaList: any[] = [];
    while (peek().Source == ',') {
      commaList.push(get());
      exprList.push(subexpr(locals, upvals));
    }
    return [exprList, commaList];
  }

  function prefixexpr(locals, upvals) {
    let tk = peek();
    if (tk.Source == '(') {
      const oparenTk = get();
      const inner = subexpr(locals, upvals);
      const cparenTk = expect('Symbol', ')');

      return MkNode({
        Type: 'ParenExpr',
        Expression: inner,
        Token_OpenParen: oparenTk,
        Token_CloseParen: cparenTk,
        GetFirstToken: () => oparenTk,
        GetLastToken: () => cparenTk,
      });
    } else if (tk.Type == 'Ident') {
      const node = MkNode({
        Type: 'VariableExpr',
        Token: get(),
        GetFirstToken: () => node.Token,
        GetLastToken: () => node.Token,
      });

      if (locals[node.Token.Source] != null && locals[node.Token.Source]?.Tokens?.push != null) {
        locals[node.Token.Source].Tokens.push(node.Token);
        locals[node.Token.Source].UseCountIncrease();
      } else if (
        upvals[node.Token.Source] != null &&
        upvals[node.Token.Source]?.Tokens?.push != null
      ) {
        upvals[node.Token.Source].Tokens.push(node.Token);
        upvals[node.Token.Source].UseCountIncrease();
      }

      return node;
    } else {
      console.log(debugMark());
      throw `${getTokenStartPosition(tk)}: Unexpected symbol. ${tk.Type} ${tk.Source}`;
    }
  }

  function tableexpr(locals, upvals) {
    const obrace = expect('Symbol', '{');
    const entries: any[] = [];
    const seperators: any[] = [];

    while (peek().Source != '}') {
      if (peek().Source == '[') {
        entries.push({
          EntryType: 'Index',
          Index: subexpr(locals, upvals),
          Value: subexpr(locals, upvals),
          Token_OpenBracket: get(),
          Token_CloseBracket: expect('Symbol', ']'),
          Token_Equals: expect('Symbol', '='),
        });
      } else if (peek().Type == 'Ident' && peek(1).Source == '=') {
        entries.push({
          EntryType: 'Field',
          Field: get(),
          Value: subexpr(locals, upvals),
          Token_Equals: get(),
        });
      } else {
        entries.push({
          EntryType: 'Value',
          Value: subexpr(locals, upvals),
        });
      }

      if (peek().Source == ',' || peek().Source == ';') {
        seperators.push(get());
      } else {
        break;
      }
    }

    const cbrace = expect('Symbol', '}');

    return MkNode({
      Type: 'TableLiteral',
      EntryList: entries,
      Token_SeperatorList: seperators,
      Token_OpenBrace: obrace,
      Token_CloseBrace: cbrace,
      GetFirstToken: () => obrace,
      GetLastToken: () => cbrace,
    });
  }

  function varlist(acceptVarg?: boolean) {
    const varList: any[] = [];
    const commaList: any[] = [];
    if (peek().Type == 'Ident') {
      varList.push(get());
    } else if (peek().Source == '...' && acceptVarg) {
      return [varList, commaList, get()];
    }
    while (peek().Source == ',') {
      commaList.push(get());
      if (peek().Source == '...' && acceptVarg) {
        return [varList, commaList, get()];
      } else {
        varList.push(expect('Ident'));
      }
    }
    return [varList, commaList];
  }

  function blockbody(terminator: string, locals: any, upvals?: any) {
    const body = block(locals, upvals);
    const after = peek();
    if (after.Type == 'Keyword' && after.Source == terminator) {
      get();
      return [body, after];
    } else {
      console.log(after.Type, after.Source);
      throw `${getTokenStartPosition(after)}: ${terminator} expected.`;
    }
  }

  function funcdecl(isAnonymous, locals, upvals) {
    const functionKw = get();

    let nameChain;
    let nameChainSeperator;

    if (!isAnonymous) {
      nameChain = [];
      nameChainSeperator = [];

      nameChain.push(expect('Ident'));

      while (peek().Source == '.') {
        nameChainSeperator.push(get());
        nameChain.push(expect('Ident'));
      }

      if (peek().Source == ':') {
        nameChainSeperator.push(get());
        nameChain.push(expect('Ident'));
      }
    }

    const oparenTk = expect('Symbol', '(');

    const [argList, argCommaList, vargToken] = varlist(true);
    const cparenTk = expect('Symbol', ')');
    const [fbody, enTk] = blockbody('end', locals, upvals);

    return MkNode({
      Type: isAnonymous == true ? 'FunctionLiteral' : 'FunctionStat',
      NameChain: nameChain,
      ArgList: argList,
      Body: fbody,

      Token_Function: functionKw,
      Token_NameChainSeperator: nameChainSeperator,
      Token_OpenParen: oparenTk,
      Token_Varg: vargToken,
      Token_ArgCommaList: argCommaList,
      Token_CloseParen: cparenTk,
      Token_End: enTk,
      GetFirstToken: () => functionKw,
      GetLastToken: () => enTk,
    });
  }

  function functionargs(locals, upvals) {
    let tk = peek();
    if (tk.Source == '(') {
      let oparenTk = get();
      const argList: any[] = [];
      const argCommaList: any[] = [];
      while (peek().Source != ')') {
        argList.push(subexpr(locals, upvals));
        if (peek().Source == ',') {
          argCommaList.push(get());
        } else {
          break;
        }
      }

      const cparenTk = expect('Symbol', ')');

      return MkNode({
        CallType: 'ArgCall',
        ArgList: argList,
        Token_CommaList: argCommaList,
        Token_OpenParen: oparenTk,
        Token_CloseParen: cparenTk,
        GetFirstToken: () => oparenTk,
        GetLastToken: () => cparenTk,
      });
    } else if (tk.Source == '{') {
      const tableExpr = subexpr(locals, upvals);

      return MkNode({
        CallType: 'TableCall',
        TableExpr: tableExpr,
        GetFirstToken: () => tableExpr.GetFirstToken(),
        GetLastToken: () => tableExpr.GetLastToken(),
      });
    } else if (tk.Type == 'String') {
      return MkNode({
        CallType: 'StringCall',
        Token: get(),
        GetFirstToken: () => get(),
        GetLastToken: () => get(),
      });
    } else {
      throw 'Function arguments expected.';
    }
  }

  function primaryexpr(locals, upvals) {
    let base = prefixexpr(locals, upvals);
    assert(base, 'nil prefixexpr');

    while (true) {
      let tk = peek();

      if (tk.Source == '.') {
        let dotTk = get();
        let fieldName = expect('Ident');
        let node;
        node = MkNode({
          Type: 'FieldExpr',
          Base: base,
          Field: fieldName,
          Token_Dot: dotTk,
          GetFirstToken: () => node.Base.GetFirstToken(),
          GetLastToken: () => node.Field,
        });
        base = node;
      } else if (tk.Source == ':') {
        let colonTk = get();
        let methodName = expect('Ident');
        let fargs = functionargs(locals, upvals);
        let node;
        node = MkNode({
          Type: 'MethodExpr',
          Base: base,
          Method: methodName,
          FunctionArguments: fargs,
          Token_Colon: colonTk,
          GetFirstToken: () => node.Base.GetFirstToken(),
          GetLastToken: () => node.FunctionArguments.GetLastToken(),
        });
        base = node;
      } else if (tk.Source == '[') {
        let obrac = get();
        let index = subexpr(locals, upvals);
        let cbrac = expect('Symbol', ']');
        let node;
        node = MkNode({
          Type: 'IndexExpr',
          Base: base,
          Index: index,
          Token_OpenBracket: obrac,
          Token_CloseBracket: cbrac,
          GetFirstToken: () => node.Base.GetFirstToken(),
          GetLastToken: () => node.Token_CloseBracket,
        });
        base = node;
      } else if (tk.Source == '{' || tk.Source == '(' || tk.Type == 'String') {
        let node;
        node = MkNode({
          Type: 'CallExpr',
          Base: base,
          FunctionArguments: functionargs(locals, upvals),
          GetFirstToken: () => node.Base.GetFirstToken(),
          GetLastToken: () => node.FunctionArguments.GetLastToken(),
        });
        base = node;
      } else if (Compounds.includes(tk.Source)) {
        let compoundTk = get();
        let rhsExpr = subexpr(locals, upvals);

        let node;
        node = MkNode({
          Type: 'CompoundStat',
          Base: base,
          Token_Compound: compoundTk,
          Rhs: rhsExpr,
          Lhs: base,
          GetFirstToken: () => node.Base.GetFirstToken(),
          GetLastToken: () => node.Rhs.GetLastToken(),
        });
        base = node;
      } else {
        return base;
      }
    }
  }

  function simpleexpr(locals, upvals) {
    let tk = peek();
    if (tk.Type == 'Number') {
      let node;
      node = MkNode({
        Type: 'NumberLiteral',
        Token: get(),
        GetFirstToken: () => node.Token,
        GetLastToken: () => node.Token,
      });

      return node;
    } else if (tk.Type == 'String') {
      let node;
      node = MkNode({
        Type: 'StringLiteral',
        Token: get(),
        GetFirstToken: () => node.Token,
        GetLastToken: () => node.Token,
      });
      return node;
    } else if (tk.Type == 'Hash') {
      let node;
      node = MkNode({
        Type: 'HashLiteral',
        Token: get(),
        GetFirstToken: () => node.Token,
        GetLastToken: () => node.Token,
      });
      return node;
    } else if (tk.Source == 'nil') {
      let node;
      node = MkNode({
        Type: 'NilLiteral',
        Token: get(),
        GetFirstToken: () => node.Token,
        GetLastToken: () => node.Token,
      });
      return node;
    } else if (tk.Source == 'true' || tk.Source == 'false') {
      let node;
      node = MkNode({
        Type: 'BooleanLiteral',
        Token: get(),
        GetFirstToken: () => node.Token,
        GetLastToken: () => node.Token,
      });
      return node;
    } else if (tk.Source == '...') {
      let node;
      node = MkNode({
        Type: 'VargLiteral',
        Token: get(),
        GetFirstToken: () => node.Token,
        GetLastToken: () => node.Token,
      });
      return node;
    } else if (tk.Source == '{') {
      return tableexpr(locals, upvals);
    } else if (tk.Source == 'function') {
      return funcdecl(true, locals, upvals);
    } else {
      return primaryexpr(locals, upvals);
    }
  }

  function subexpr(locals, upvals, limit = 0) {
    let curNode;
    if (isUnop()) {
      let opTk = get();
      let ex = subexpr(locals, upvals, UnaryPriority);

      const node = MkNode({
        Type: 'UnopExpr',
        Token_Op: opTk,
        Rhs: ex,
        GetFirstToken: () => node.Token_Op,
        GetLastToken: () => node.Rhs.GetLastToken(),
      });
      curNode = node;
    } else {
      curNode = simpleexpr(locals, upvals);
      assert(curNode, 'nil sipleexpr');
    }

    while (
      isBinop() &&
      BinaryPriority[peek().Source] != undefined &&
      BinaryPriority[peek().Source][0] > limit
    ) {
      let opTk = get();
      let rhs = subexpr(locals, upvals, BinaryPriority[opTk.Source][1]);
      assert(rhs, 'RhsNeeded');

      const node = MkNode({
        Type: 'BinopExpr',
        Lhs: curNode,
        Rhs: rhs,
        Token_Op: opTk,
        GetFirstToken: () => node.Lhs.GetFirstToken(),
        GetLastToken: () => node.Rhs.GetLastToken(),
      });
      curNode = node;
    }
    return curNode;
  }

  function exprstat(locals, upvals) {
    let ex = primaryexpr(locals, upvals);

    if (ex.Type == 'MethodExpr' || ex.Type == 'CallExpr') {
      return MkNode({
        Type: 'CallExprStat',
        Expression: ex,
        GetFirstToken: () => ex.GetFirstToken(),
        GetLastToken: () => ex.GetLastToken(),
      });
    } else if (ex.Type == 'CompoundStat') {
      return ex;
    } else {
      let lhs = [ex];
      const lhsSeperator: any[] = [];
      while (peek().Source == ',') {
        lhsSeperator.push(get());
        let lhsPart = primaryexpr(locals, upvals);
        if (lhsPart.Type == 'MethodExpr' || lhsPart.Type == 'CallExpr') {
          throw 'Bad left hand side of asignment';
        }
        lhs.push(lhsPart);
      }
      let eq = expect('Symbol', '=');
      let rhs = [subexpr(locals, upvals)];
      const rhsSeperator: any[] = [];
      while (peek().Source == ',') {
        rhsSeperator.push(get());
        rhs.push(subexpr(locals, upvals));
      }

      return MkNode({
        Type: 'AssignmentStat',
        Rhs: rhs,
        Lhs: lhs,
        Token_Equals: eq,
        Token_LhsSeperatorList: lhsSeperator,
        Token_RhsSeperatorList: rhsSeperator,
        GetFirstToken: () => lhs[0].GetFirstToken(),
        GetLastToken: () => rhs[rhs.length - 1].GetLastToken(),
      });
    }
  }

  function ifstat(locals, upvals) {
    let ifKw = get();
    let condition = subexpr(locals, upvals);
    let thenKw = expect('Keyword', 'then');
    let ifBody = block(locals, upvals);
    const elseClauses: any[] = [];
    while (peek().Source == 'elseif' || peek().Source == 'else') {
      let elseifKw = get();
      let elseifCondition;
      let elseifThenKw;
      if (elseifKw.Source == 'elseif') {
        elseifCondition = subexpr(locals, upvals);
        elseifThenKw = expect('Keyword', 'then');
      }
      let elseifBody = block(locals, upvals);
      elseClauses.push({
        Condition: elseifCondition,
        Body: elseifBody,

        ClauseType: elseifKw.Source,
        Token: elseifKw,
        Token_Then: elseifThenKw,
      });
      if (elseifKw.Source == 'else') {
        break;
      }
    }
    let enKw = expect('Keyword', 'end');

    return MkNode({
      Type: 'IfStat',
      Condition: condition,
      Body: ifBody,
      ElseClauseList: elseClauses,
      Token_If: ifKw,
      Token_Then: thenKw,
      Token_End: enKw,
      GetFirstToken: () => ifKw,
      GetLastToken: () => enKw,
    });
  }

  function dostat(locals, upvals) {
    let doKw = get();
    let [body, enKw] = blockbody('end', locals, upvals);

    let node;
    node = MkNode({
      Type: 'DoStat',
      Body: body,

      Token_Do: doKw,
      Token_End: enKw,
      GetFirstToken: () => node.Token_Do,
      GetLastToken: () => node.Token_End,
    });
    return node;
  }

  function whilestat(locals, upvals) {
    let whileKw = get();
    let condition = subexpr(locals, upvals);
    let doKw = expect('Keyword', 'do');
    let [body, enKw] = blockbody('end', locals, upvals);

    return MkNode({
      Type: 'WhileStat',
      Condition: condition,
      Body: body,

      Token_While: whileKw,
      Token_Do: doKw,
      Token_End: enKw,
      GetFirstToken: () => whileKw,
      GetLastToken: () => enKw,
    });
  }

  function forstat(locals, upvals) {
    let forKw = get();
    let [loopVars, loopVarCommas] = varlist();
    let node = [];
    if (peek().Source == '=') {
      let eqTk = get();
      let [exprList, exprCommaList] = exprlist(locals, upvals);
      if (exprList.length < 2 || exprList.length > 3) {
        throw 'Expected 2 or 3 values for range bounds';
      }
      let doTk = expect('Keyword', 'do');
      let [body, enTk] = blockbody('end', locals, upvals);
      let node;
      node = MkNode({
        Type: 'NumericForStat',
        VarList: loopVars,
        RangeList: exprList,
        Body: body,

        Token_For: forKw,
        Token_VarCommaList: loopVarCommas,
        Token_Equals: eqTk,
        Token_RangeCommaList: exprCommaList,
        Token_Do: doTk,
        Token_End: enTk,
        GetFirstToken: () => node.Token_For,
        GetLastToken: () => node.Token_End,
      });
      return node;
    } else if (peek().Source == 'in') {
      let inTk = get();
      let [exprList, exprCommaList] = exprlist(locals, upvals);
      let doTk = expect('Keyword', 'do');
      let [body, enTk] = blockbody('end', locals, upvals);
      let node;
      node = MkNode({
        Type: 'GenericForStat',
        VarList: loopVars,
        GeneratorList: exprList,
        Body: body,

        Token_For: forKw,
        Token_VarCommaList: loopVarCommas,
        Token_In: inTk,
        Token_GeneratorCommaList: exprCommaList,
        Token_Do: doTk,
        Token_End: enTk,
        GetFirstToken: () => node.Token_For,
        GetLastToken: () => node.Token_End,
      });
      return node;
    }
  }

  function repeatstat(locals, upvals) {
    let repeatKw = get();
    let [body, untilTk] = blockbody('until', locals);
    let condition = subexpr(locals, upvals);

    return MkNode({
      Type: 'RepeatStat',
      Body: body,
      Condition: condition,
      Token_Repeat: repeatKw,
      Token_Until: untilTk,
      GetFirstToken: () => repeatKw,
      GetLastToken: () => condition.GetLastToken(),
    });
  }

  function localdecl(locals, upvals) {
    let localKw = get();
    if (peek().Source == 'function') {
      let funcStat = funcdecl(false, locals, upvals);
      if (funcStat.NameChain.length > 1) {
        throw getTokenStartPosition(funcStat.Token_NameChainSeperator[0]) + ': `(` expected.';
      }

      return MkNode({
        Type: 'LocalFunctionStat',
        FunctionStat: funcStat,
        Token_Local: localKw,
        GetFirstToken: () => localKw,
        GetLastToken: () => funcStat.GetLastToken(),
      });
    } else if (peek().Type == 'Ident') {
      let [varList, varCommaList] = varlist(false);
      let exprList: any[] = [];
      let exprCommaList: any[] = [];
      let eqToken;
      if (peek().Source == '=') {
        eqToken = get();
        let [exprList1, exprCommaList1] = exprlist(locals, upvals);
        exprList = exprList1;
        exprCommaList = exprCommaList1;
      }

      return MkNode({
        Type: 'LocalVarStat',
        VarList: varList,
        ExprList: exprList,
        Token_Local: localKw,
        Token_Equals: eqToken,
        Token_VarCommaList: varCommaList,
        Token_ExprCommaList: exprCommaList,
        GetFirstToken: () => localKw,
        GetLastToken: function () {
          if (exprList.length > 0) {
            return exprList[exprList.length - 1].GetLastToken();
          } else {
            return varList[varList.length - 1];
          }
        },
      });
    } else {
      throw '`function` or ident expected';
    }
  }

  function retstat(locals, upvals) {
    let returnKw = get();
    let exprList;
    let commaList;
    if (isBlockFollow() || peek().Source == ';') {
      exprList = [];
      commaList = [];
    } else {
      [exprList, commaList] = exprlist(locals, upvals);
    }
    let self;
    self = {
      Type: 'ReturnStat',
      ExprList: exprList,
      Token_Return: returnKw,
      Token_CommaList: commaList,
      GetFirstToken: () => self.Token_Return,
      GetLastToken: function () {
        if (self.ExprList.length > 0) {
          return self.ExprList[self.ExprList.length - 1].GetLastToken();
        } else {
          return self.Token_Return;
        }
      },
    };
    return self;
  }

  function breakstat() {
    return {
      Type: 'BreakStat',
      Token_Break: get(),
      GetFirstToken: () => get(),
      GetLastToken: () => get(),
    };
  }

  function continuestat() {
    return {
      Type: 'ContinueStat',
      Token_Continue: get(),
      GetFirstToken: () => get(),
      GetLastToken: () => get(),
    };
  }

  function statement(locals, upvals) {
    const tok: Token = peek();

    if (tok.Source == 'if') {
      return ifstat(locals, upvals);
    } else if (tok.Source == 'while') {
      return whilestat(locals, upvals);
    } else if (tok.Source == 'do') {
      return dostat(locals, upvals);
    } else if (tok.Source == 'for') {
      return forstat(locals, upvals);
    } else if (tok.Source == 'repeat') {
      return repeatstat(locals, upvals);
    } else if (tok.Source == 'function') {
      return funcdecl(false, locals, upvals);
    } else if (tok.Source == 'local') {
      return localdecl(locals, upvals);
    } else if (tok.Source == 'return') {
      return retstat(locals, upvals);
    } else if (tok.Source == 'break') {
      return breakstat();
    } else if (tok.Source == 'continue') {
      return continuestat();
    } else {
      return exprstat(locals, upvals);
    }
  }

  const block = (a, b) => {
    const statements: any[] = [];
    let semicolons: any[] = [];

    let locals = {};
    let upvals = {};
    if (b != null) {
      for (let [i, v] of Object.entries(b)) {
        upvals[i] = v;
      }
    }

    if (a != null) {
      for (let [i, v] of Object.entries(a)) {
        upvals[i] = v;
      }
    }

    let thing;
    let i = 0;
    while (!isBlockFollow()) {
      if (thing && thing == peek()) {
        console.log(`INFINITE LOOP POSSIBLE ON STATEMENT ${thing.Source} :`, thing);
      }
      thing = peek();
      let stat = statement(locals, upvals);
      if (stat) {
        statements.push(stat);

        switch (stat.Type) {
          case 'LocalVarStat':
            stat.VarList.forEach((token) => {
              token.UseCount = 0;
              token.Number = i++;
              locals[token.Source] = token;

              let tokens = [];
              function lol() {
                token.UseCount++;
                tokens.forEach((t) => {
                  t.UseCount = token.UseCount;
                });
              }

              token.Tokens = {};
              token.Tokens.push = (t) => {
                t.UseCountIncrease = lol;
                t.UseCount = token.UseCount;
                t.Tokens = token.Tokens;
                tokens.push(t);
              };
              token.Tokens.get = () => tokens;

              token.UseCountIncrease = lol;
            });
            break;

          case 'LocalFunctionStat':
            const nameChain = stat.FunctionStat.NameChain;

            if (nameChain.length === 1) {
              let token = nameChain[0];
              token.UseCount = 0;
              token.Number = i++;
              locals[token.Source] = token;

              let tokens = [];
              function lol() {
                token.UseCount++;
                tokens.forEach((t) => {
                  t.UseCount = token.UseCount;
                });
              }

              token.Tokens = {};
              token.Tokens.push = (t) => {
                t.UseCountIncrease = lol;
                t.UseCount = token.UseCount;
                t.Tokens = token.Tokens;
                tokens.push(t);
              };
              token.Tokens.get = () => tokens;

              token.UseCountIncrease = lol;
            }
            break;

          default:
            break;
        }
      }

      let next = peek();
      if (next.Type == 'Symbol' && next.Source == ';') {
        semicolons[statements.length - 1] = get();
      }
    }

    return {
      Type: 'StatList',
      StatementList: statements,
      SemicolonList: semicolons,
      GetFirstToken: () => {
        if (statements.length === 0) return;
        return statements?.[0]?.GetFirstToken();
      },
      GetLastToken: () => {
        if (statements.length === 0) {
          return;
        } else if (semicolons[statements.length - 1]) {
          return semicolons[statements.length - 1];
        } else {
          return semicolons?.[statements.length - 1]?.GetLastToken();
        }
      },
    };
  };

  return block([], []);
};
