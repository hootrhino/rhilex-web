import { getOutendsList } from '@/services/rulex/shuchuziyuanguanli';
import { getInendsList } from '@/services/rulex/shuruziyuanguanli';
import { autocompletion, Completion, CompletionContext } from '@codemirror/autocomplete';
import { Diagnostic, linter, lintGutter, lintKeymap } from '@codemirror/lint';
import { langs } from '@uiw/codemirror-extensions-langs';
import { darculaInit } from '@uiw/codemirror-theme-darcula';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import CodeMirror, { basicSetup, keymap } from '@uiw/react-codemirror';
import { useRequest } from '@umijs/max';
import luaparse from 'luaparse';
import { builtInFuncs, luaGlobFuncs, luaKeywords } from './constant';

import { funcIcon, keywordIcon, snippetIcon, variableIcon } from '@/assets/images/autocomplete';

const iconMap = {
  function: funcIcon,
  method: funcIcon,
  keyword: keywordIcon,
  snippet: snippetIcon,
  variable: variableIcon,
};

const LuaEditor = (props: ReactCodeMirrorProps) => {
  const { data: inends } = useRequest(() => getInendsList());
  const { data: outends } = useRequest(() => getOutendsList());

  // 格式化关键字
  const fuzzySearch = (query: string) => {
    return luaKeywords.filter((word) => word.toLowerCase().includes(query));
  };

  // 代码提示
  const myCompletions = (context: CompletionContext) => {
    const word = context.matchBefore(/\w*/);

    if (!word || word.from === word.to || word.text.trim().length <= 0) return null;
    const queryData = fuzzySearch(word.text);

    // 内置 keyword
    const buildInKeyword = queryData?.map((item) => ({ label: `${item}`, type: 'keyword' }));

    // 输入资源 UUID
    const inendsOptions = (inends || [])?.map((item: any) => ({
      label: `${item?.name}`,
      type: 'variable',
      detail: `UUID 参数来自资源管理`,
      apply: item.uuid,
    }));

    // 输出资源 UUID
    const outendsOptions = (outends || [])?.map((item: any) => ({
      label: `${item?.name}`,
      type: 'variable',
      detail: `UUID 参数来自目标管理`,
      apply: item.uuid,
    }));

    return {
      from: word.from,
      options: [
        ...buildInKeyword,
        ...inendsOptions,
        ...outendsOptions,
        ...luaGlobFuncs,
        ...builtInFuncs,
      ],
    };
  };

  // 错误提示
  const luaLinter = linter(view => {
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

  const createIconEl = (src: string) => {
    const el = document.createElement('img');
    el.src = src;
    el.className = 'autocomplete-icon';
    return el;
  };

  const createDetailEl = (detail: string) => {
    const el = document.createElement('span');
    el.innerText = detail;
    el.className = 'autocomplete-detail';
    return el;
  };

  return (
    <CodeMirror
      minHeight="400px"
      theme={darculaInit({
        settings: {
          selection: 'rgba(227, 23, 13, 0.2)',
          lineHighlight: 'transparent',
          fontFamily: 'Consolas, monospace',
        },
      })}
      autoFocus
      extensions={[
        langs.lua(),
        basicSetup({
          autocompletion: true,
          foldGutter: false,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: false,
          defaultKeymap: true,
          lintKeymap: true,
          completionKeymap: true,
          tabSize: 2,
          lineNumbers: true,
          syntaxHighlighting: true,
        }),
        autocompletion({
          override: [myCompletions as any],
          addToOptions: [
            {
              render: (completion: Completion) => {
                if (!completion.type) return null;
                const icon = iconMap[completion.type] || '';

                return createIconEl(icon);
              },
              position: 20,
            },
            {
              render: (completion: Completion) => {
                if (!completion.detail) return null;

                return createDetailEl(completion.detail);
              },
              position: 90,
            },
          ],
          tooltipClass: () => 'customize-autocomplete-tooltip',
        }),
        lintGutter(),
        keymap.of(lintKeymap),
        luaLinter,
      ]}
      {...props}
    />
  );
};

export default LuaEditor;
