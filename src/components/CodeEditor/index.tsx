import { getOutendsList } from '@/services/rulex/shuchuziyuanguanli';
import { getInendsList } from '@/services/rulex/shuruziyuanguanli';
import { autocompletion, Completion } from '@codemirror/autocomplete';
import { lintGutter, lintKeymap } from '@codemirror/lint';
import { langs } from '@uiw/codemirror-extensions-langs';
import { darculaInit } from '@uiw/codemirror-theme-darcula';
import { githubLightInit } from '@uiw/codemirror-theme-github';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import CodeMirror, { basicSetup, keymap } from '@uiw/react-codemirror';
import { useRequest } from '@umijs/max';

import {
  funcIcon,
  keywordIcon,
  snippetIcon,
  variableIcon,
} from '@/components/CodeEditor/images/autocomplete';
import { autoCompletions, createDetailEl, createIconEl, luaLinter } from './utils';

export enum Lang {
  SHELL = 'shell',
  SQL = 'sql',
  LUA = 'lua',
  JSON = 'json',
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

type CodeEditorProps = {
  lang: Lang;
  theme?: Theme;
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

const CodeEditor = ({ lang, theme = Theme.DARK, ...props }: CodeEditorProps) => {
  const { data: inends } = useRequest(() => getInendsList());
  const { data: outends } = useRequest(() => getOutendsList());

  const getEditorConfig = () => {
    if (lang !== Lang.LUA) return [];

    return [
      autocompletion({
        override: [(context) => autoCompletions(context, inends, outends)],
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
    if (theme === Theme.DARK) {
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
