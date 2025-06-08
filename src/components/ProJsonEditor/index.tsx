import { langs } from '@uiw/codemirror-extensions-langs';
import { darculaInit } from '@uiw/codemirror-theme-darcula';
import CodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror';

const themeSetting = {
  lineHighlight: 'transparent',
  fontFamily: 'Consolas, monospace',
  selection: 'rgba(227, 23, 13, 0.2)',
};

const ProJsonEditor = ({ ...props }: ReactCodeMirrorProps) => {
  return (
    <CodeMirror
      autoFocus
      style={{ width: '100%' }}
      theme={darculaInit({
        settings: themeSetting,
      })}
      extensions={[langs.json()]}
      {...props}
    />
  );
};

export default ProJsonEditor;
