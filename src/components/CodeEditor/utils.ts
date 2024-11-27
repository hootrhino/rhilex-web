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

// autocomplete 代码提示
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

// lint 错误提示
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

// 代码提示 icon
export const createIconEl = (src: string) => {
  const el = document.createElement('img');
  el.src = src;
  el.className = 'autocomplete-icon';
  return el;
};

// 代码提示描述
export const createDetailEl = (detail: string) => {
  const el = document.createElement('span');
  el.innerText = detail;
  el.className = 'autocomplete-detail';
  return el;
};

/**
 * 格式化 lua
 */
export const formatLuaCode = (code: string) => {
  const formatCode = luaminp.Beautify(code, {
    RenameVariables: false,
    RenameGlobals: false,
    SolveMath: true,
    Indentation: '\t',
  });
  return formatCode.trim();
};
