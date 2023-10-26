import { autocompletion, CompletionContext, snippetCompletion } from '@codemirror/autocomplete';
import { langs } from '@uiw/codemirror-extensions-langs';
import { atomone } from '@uiw/codemirror-theme-atomone';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import CodeMirror, { basicSetup } from '@uiw/react-codemirror';
import { useModel } from '@umijs/max';
import { luaGlobFuncs, luaKeywords, luaSnippets } from './constant';

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

    // 内置模板
    const snippetOptions = luaSnippets.map((snippet: any) =>
      snippetCompletion(snippet.template, snippet.completion),
    );

    return {
      from: word.from,
      options: [
        ...buildInKeyword,
        ...inendsOptions,
        ...outendsOptions,
        ...luaGlobFuncs,
        ...snippetOptions,
      ],
    };
  };

  return (
    <CodeMirror
      minHeight="400px"
      theme={atomone}
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
          tabSize: 2
        }),
        autocompletion({ override: [myCompletions as any] }),
      ]}
      {...props}
    />
  );
};

export default LuaEditor;
