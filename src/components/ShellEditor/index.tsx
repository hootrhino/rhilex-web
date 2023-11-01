import { langs } from '@uiw/codemirror-extensions-langs';
import { monokai } from '@uiw/codemirror-theme-monokai';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import CodeMirror from '@uiw/react-codemirror';

const ShellEditor = (props: ReactCodeMirrorProps) => {
  return (
    <CodeMirror
      extensions={[langs.shell()]}
      height="200px"
      theme={monokai}
      autoFocus={false}
      {...props}
    />
  );
};

export default ShellEditor;
