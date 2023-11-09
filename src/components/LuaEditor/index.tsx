import { autocompletion, CompletionContext } from '@codemirror/autocomplete';
import { linter, lintGutter, lintKeymap } from '@codemirror/lint';
import { langs } from '@uiw/codemirror-extensions-langs';
import { darculaInit } from '@uiw/codemirror-theme-darcula';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import CodeMirror, { basicSetup, keymap } from '@uiw/react-codemirror';
import { useModel } from '@umijs/max';
import luaparse from 'luaparse';
import { luaGlobFuncs, luaKeywords } from './constant';

type Options = {
  value: string;
  label: string;
};

const LuaEditor = (props: ReactCodeMirrorProps) => {
  const { data: inends } = useModel('useSource');
  const { data: outends } = useModel('useOutends');

  // 格式化关键字
  const fuzzySearch = (query: string) => {
    return luaKeywords.filter((word) => word.toLowerCase().includes(query));
  };

  const myCompletions = (context: CompletionContext) => {
    const word = context.matchBefore(/\w*/);

    if (!word || word.from === word.to || word.text.trim().length <= 0) return null;
    const queryData = fuzzySearch(word.text);

    // 内置 keyword
    const buildInKeyword = queryData?.map((item) => ({ label: ` ${item}`, type: 'keyword' }));

    // 输入资源 UUID
    const inendsOptions = inends?.map((item: Options) => ({
      label: ` ${item?.value}`,
      type: 'text',
      detail: `UUID 参数来自资源管理`,
      apply: item.value,
    }));

    // 输出资源 UUID
    const outendsOptions = outends?.map((item: Options) => ({
      label: ` ${item?.value}`,
      type: 'text',
      detail: `UUID 参数来自目标管理`,
      apply: item.value,
    }));

    return {
      from: word.from,
      options: [
        ...buildInKeyword,
        ...inendsOptions,
        ...outendsOptions,
        ...luaGlobFuncs,
      ],
    };
  };

  // 错误提示
  const luaLinter = linter((view) => {
    const diagnostics = [];

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

  return (
    <CodeMirror
      minHeight="400px"
      theme={darculaInit({settings: {selection: 'rgba(227, 23, 13, 0.2)', lineHighlight: 'transparent'}})}
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
        autocompletion({ override: [myCompletions as any] }),
        lintGutter(),
        keymap.of(lintKeymap),
        luaLinter,
      ]}
      {...props}
    />
  );
};

export default LuaEditor;
