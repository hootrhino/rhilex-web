import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import type { IAceEditorProps } from 'react-ace';
import AceEditor from 'react-ace';

import '../index.less';

const SQLEditor = (props: IAceEditorProps) => {
  return (
    <AceEditor
      mode="mysql"
      theme="monokai"
      editorProps={{ $blockScrolling: true }}
      width="100%"
      style={{ height: 'calc(100% - 40px)', background: '#282A36', color: '#F8F8F2' }}
      fontSize={16}
      showPrintMargin={false}
      highlightActiveLine={true}
      enableSnippets={true}
      setOptions={{
        enableLiveAutocompletion: true,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        tabSize: 2,
      }}
      className="data-center-editor"
      {...props}
    />
  );
};

export default SQLEditor;
