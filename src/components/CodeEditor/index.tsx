import { langs } from '@uiw/codemirror-extensions-langs';
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import { darcula } from '@uiw/codemirror-theme-darcula';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import CodeMirror from '@uiw/react-codemirror';

type CodeEditorProps = ReactCodeMirrorProps & {
  mode?: 'shell' | 'sql' | 'lua';
};

const modes = {
  shell: langs.shell,
  sql: langs.sql,
  lua: langs.lua
}

const CodeEditor = ({ mode = 'shell', theme = 'dark', ...props }: CodeEditorProps) => {

  return (
    <CodeMirror
      extensions={[modes[mode]()]}
      theme={theme === 'dark' ? darcula : bbedit}
      // className={props?.readOnly ? 'cursor-not-allowed' : ''}
      {...props}
    />
  );
};

export default CodeEditor;
