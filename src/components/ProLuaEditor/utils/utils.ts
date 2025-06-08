import { foldService } from '@codemirror/language';

/**
 * lua 编辑器相关支持
 */

import type { DeviceItem } from '@/pages/Device';
import type { InendItem } from '@/pages/Inend';
import type { OutendItem } from '@/pages/Outend';
import { buildInKeywords, buildInSnippet, builtInFuncs } from '@/templates/BuildIn';
import { CompletionContext } from '@codemirror/autocomplete';
import { Diagnostic, linter } from '@codemirror/lint';
import luaparse from 'luaparse';
import luaminp from './luamin';

/**
 * autocomplete 代码提示
 */
export const autoCompletions = (
  context: CompletionContext,
  inendVariables: InendItem[],
  outendVariables: OutendItem[],
  deviceVariables: DeviceItem[],
) => {
  const word = context.matchBefore(/\w*/);

  if (!word || word.from === word.to || word.text.trim().length <= 0) return null;

  return {
    from: word.from,
    options: [
      ...(buildInKeywords.get('luaKeywords') || []),
      ...(builtInFuncs.get('luaBuiltFuncs') || []),
      ...(buildInSnippet.get('luaSnappet') || []),
      ...inendVariables,
      ...outendVariables,
      ...deviceVariables,
    ],
  } as any;
};

/**
 * lint 错误提示
 */
export const luaLinter = linter((view) => {
  const diagnostics: Diagnostic[] = [];

  try {
    luaparse.parse(view.state.doc?.toString());
  } catch (e: any) {
    const from = e.index || 0;
    const to = from;
    diagnostics.push({
      from,
      to,
      message: e.message,
      severity: 'error',
    });
  }

  return diagnostics;
});

/**
 * 代码提示 icon
 */
export const createIconEl = (src: string) => {
  const el = document.createElement('img');
  el.src = src;
  el.className = 'autocomplete-icon';
  return el;
};

/**
 * 代码提示描述
 */
export const createDetailEl = (detail: string) => {
  const el = document.createElement('span');
  el.innerText = detail;
  el.className = 'autocomplete-detail';
  return el;
};

/**
 *
 * 折叠代码
 */
export const foldingOnIndent = foldService.of((state, from, to) => {
  const line = state.doc.lineAt(from); // First line
  const lines = state.doc.lines; // Number of lines in the document
  const indent = line.text.search(/\S|$/); // Indent level of the first line
  let foldStart = from; // Start of the fold
  let foldEnd = to; // End of the fold

  // Check the next line if it is on a deeper indent level
  // If it is, check the next line and so on
  // If it is not, go on with the foldEnd
  let nextLine = line;
  while (nextLine.number < lines) {
    nextLine = state.doc.line(nextLine.number + 1); // Next line
    const nextIndent = nextLine.text.search(/\S|$/); // Indent level of the next line

    // If the next line is on a deeper indent level, add it to the fold
    if (nextIndent > indent) {
      foldEnd = nextLine.to; // Set the fold end to the end of the next line
    } else {
      break; // If the next line is not on a deeper indent level, stop
    }
  }

  // If the fold is only one line, don't fold it
  if (state.doc.lineAt(foldStart).number === state.doc.lineAt(foldEnd).number) {
    return null;
  }

  // Set the fold start to the end of the first line
  // With this, the fold will not include the first line
  foldStart = line.to;

  // Return a fold that covers the entire indent level
  return { from: foldStart, to: foldEnd };
});

/**
 * 格式化 lua
 */
export const formatLuaCode = (code: string) => {
  const reg = /\n(\n)*( )*(\n)*\n/g;

  const formatCode = luaminp.Beautify(code, {
    RenameVariables: false,
    RenameGlobals: false,
    SolveMath: true,
    Indentation: '\t',
  });

  const removeBlankCode = formatCode.replace(reg, '\n');

  return removeBlankCode.trim();
};
