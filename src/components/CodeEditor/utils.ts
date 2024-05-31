/**
 * lua 编辑器相关支持
 */

import type { InendItem } from '@/pages/Inend';
import type { OutendItem } from '@/pages/Outend';
import { CompletionContext } from '@codemirror/autocomplete';
import { Diagnostic, linter } from '@codemirror/lint';
import { getIntl, getLocale } from '@umijs/max';
import luaparse from 'luaparse';
import { buildInKeywords, buildInSnippet, builtInFuncs } from './BuildInLua';

// 关键字模糊搜索
const fuzzySearch = (query: string) => {
  return buildInKeywords.filter((word) => word.toLowerCase().includes(query.toLocaleLowerCase()));
};

// autocomplete 代码提示
export const autoCompletions = (
  context: CompletionContext,
  inends: InendItem[],
  outends: OutendItem[],
) => {
  const word = context.matchBefore(/\w*/);

  if (!word || word.from === word.to || word.text.trim().length <= 0) return null;
  const queryData = fuzzySearch(word.text);

  // 内置 keyword
  const buildInKeyword = queryData?.map((item) => ({ label: `${item}`, type: 'keyword' }));

  // 南向资源 UUID
  const inendsOptions = ((inends as any[]) || [])?.map((item: any) => ({
    label: `${item?.name} - ${item.uuid}`,
    type: 'variable',
    detail: getIntl(getLocale()).formatMessage({ id: 'component.tpl.inend' }),
    apply: item.uuid,
  }));
  console.log(inendsOptions);
  // 北向资源 UUID
  const outendsOptions = ((outends as any[]) || [])?.map((item: any) => ({
    label: `${item?.name} - ${item.uuid}`,
    type: 'variable',
    detail: getIntl(getLocale()).formatMessage({ id: 'component.tpl.outend' }),
    apply: item.uuid,
  }));

  return {
    from: word.from,
    options: [
      ...buildInKeyword,
      ...builtInFuncs,
      ...inendsOptions,
      ...outendsOptions,
      ...buildInSnippet,
    ],
  };
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
