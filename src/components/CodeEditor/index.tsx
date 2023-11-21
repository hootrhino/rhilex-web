import { langs } from '@uiw/codemirror-extensions-langs';
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import { darcula } from '@uiw/codemirror-theme-darcula';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import CodeMirror from '@uiw/react-codemirror';

type CodeEditorProps = ReactCodeMirrorProps & {
  mode?: 'shell' | 'sql';
};

const CodeEditor = ({ mode = 'shell', theme = 'dark', ...props }: CodeEditorProps) => {
  return (
    <CodeMirror
      extensions={[mode === 'shell' ? langs.shell() : langs.sql()]}
      height="200px"
      theme={theme === 'dark' ? darcula : bbedit}
      autoFocus={false}
      {...props}
    />
  );
};

export default CodeEditor;
