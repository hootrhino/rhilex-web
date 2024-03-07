import { langs } from '@uiw/codemirror-extensions-langs';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { githubLight } from '@uiw/codemirror-theme-github';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import CodeMirror from '@uiw/react-codemirror';

type CodeEditorProps = ReactCodeMirrorProps & {
  mode?: 'shell' | 'sql' | 'lua' | 'json';
};

const modes = {
  shell: langs.shell,
  sql: langs.sql,
  lua: langs.lua,
  json: langs.json,
};

const CodeEditor = ({ mode = 'shell', theme = 'dark', ...props }: CodeEditorProps) => {
  return (
    <CodeMirror
      extensions={[modes[mode]()]}
      theme={theme === 'dark' ? darcula : githubLight}
      // className={props?.readOnly ? 'cursor-not-allowed' : ''}
      {...props}
    />
  );
};

export default CodeEditor;
