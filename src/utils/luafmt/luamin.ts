import { CreateLuaParser } from './createLuaParser';
import { FormatAst } from './formatAst';
import { PrintAst } from './printAst';

type Option = {
  RenameGlobals: boolean;
  RenameVariables: boolean;
  SolveMath: boolean;
};

export type AST = {
  Type: string;
  SemicolonList: Record<string, any>[];
  StatementList: any[];
  GetLastToken: () => void;
  GetFirstToken: () => void;
  [key: string]: any;
};

export type Token = {
  Source?: any;
  LeadingWhite?: string;
  [key: string]: any;
}

export const Beautify = (scr: string, options?: Option) => {
  const ast = CreateLuaParser(scr);

  FormatAst(ast);

  return PrintAst(ast);
};
