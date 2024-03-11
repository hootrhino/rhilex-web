import { getOutendsList } from '@/services/rulex/shuchuziyuanguanli';
import { getInendsList } from '@/services/rulex/shuruziyuanguanli';
import { autocompletion, Completion, CompletionContext } from '@codemirror/autocomplete';
import { Diagnostic, linter, lintGutter, lintKeymap } from '@codemirror/lint';
import { langs } from '@uiw/codemirror-extensions-langs';
import { darculaInit } from '@uiw/codemirror-theme-darcula';
import { githubLightInit } from '@uiw/codemirror-theme-github';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import CodeMirror, { basicSetup, keymap } from '@uiw/react-codemirror';
import { useRequest } from '@umijs/max';
import luaparse from 'luaparse';
import { builtInFuncs, luaGlobFuncs, luaKeywords } from './buildInLua';

import { funcIcon, keywordIcon, snippetIcon, variableIcon } from '@/assets/images/autocomplete';
import { quickSnippet } from './quickLuaTpl';

type CodeEditorProps = {
  lang: 'shell' | 'sql' | 'lua' | 'json';
  theme?: 'dark' | 'light';
} & Omit<ReactCodeMirrorProps, 'theme'>;

const iconMap = {
  function: funcIcon,
  method: funcIcon,
  keyword: keywordIcon,
  snippet: snippetIcon,
  variable: variableIcon,
};

const modes = {
  shell: langs.shell,
  sql: langs.sql,
  lua: langs.lua,
  json: langs.json,
};

const themeSetting = {
  lineHighlight: 'transparent',
  fontFamily: 'Consolas, monospace',
};

const basicSetupSetting = {
  autocompletion: true,
  foldGutter: false,
  dropCursor: false,
  allowMultipleSelections: false,
  indentOnInput: false,
  defaultKeymap: true,
  lintKeymap: true,
  completionKeymap: true,
  syntaxHighlighting: true,
};

const CodeEditor = ({ lang, theme = 'dark', ...props }: CodeEditorProps) => {
  const { data: inends } = useRequest(() => getInendsList());
  const { data: outends } = useRequest(() => getOutendsList());

  // 关键字模糊搜索
  const fuzzySearch = (query: string) => {
    return luaKeywords.filter((word) => word.toLowerCase().includes(query.toLocaleLowerCase()));
  };

  // 代码提示
  const myCompletions = (context: CompletionContext) => {
    const word = context.matchBefore(/\w*/);

    if (!word || word.from === word.to || word.text.trim().length <= 0) return null;
    const queryData = fuzzySearch(word.text);

    // 内置 keyword
    const buildInKeyword = queryData?.map((item) => ({ label: `${item}`, type: 'keyword' }));

    // 输入资源 UUID
    const inendsOptions = ((inends as any[]) || [])?.map((item: any) => ({
      label: `${item?.name}`,
      type: 'variable',
      detail: `UUID 参数来自资源管理`,
      apply: item.uuid,
    }));

    // 输出资源 UUID
    const outendsOptions = ((outends as any[]) || [])?.map((item: any) => ({
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
        ...quickSnippet
      ],
    };
  };

  // 错误提示
  const luaLinter = linter((view) => {
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
  const createIconEl = (src: string) => {
    const el = document.createElement('img');
    el.src = src;
    el.className = 'autocomplete-icon';
    return el;
  };

  // 代码提示描述
  const createDetailEl = (detail: string) => {
    const el = document.createElement('span');
    el.innerText = detail;
    el.className = 'autocomplete-detail';
    return el;
  };

  const getEditorConfig = () => {
    if (lang !== 'lua') return [];

    return [
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
    ];
  };

  const getTheme = () => {
    if (theme === 'dark') {
      return darculaInit({
        settings: {
          ...themeSetting,
          selection: 'rgba(227, 23, 13, 0.2)',
        },
      });
    } else {
      return githubLightInit({
        settings: themeSetting,
      });
    }
  };

  return (
    <CodeMirror
      autoFocus
      theme={getTheme()}
      extensions={[modes[lang](), basicSetup(basicSetupSetting), ...getEditorConfig()]}
      {...props}
    />
  );
};

export default CodeEditor;
