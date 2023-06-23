import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';
// import { formatText } from 'lua-fmt';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-lua'; // jsx模式的包
import 'ace-builds/src-noconflict/theme-monokai'; // monokai的主题样式
import 'ace-builds/webpack-resolver';
import { forwardRef, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import { Resizable } from 'react-resizable';

import '../../../node_modules/react-resizable/css/styles.css';
import './index.less';

type FullScreenEditorProps = {
  defaultValue?: string;
  [key: string]: any;
};

const FullScreenEditor = forwardRef<HTMLDivElement, FullScreenEditorProps>(
  ({ defaultValue, ...props }, ref) => {
    const [code, setCode] = useState<string>('');
    const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(ref as any, {
      pageFullscreen: true,
    });
    const [h, setHeight] = useState<number>(500);

    // const handleFormat = (editor: Record<string, any>) => {
    //   editor
    //     ?.getAction('editor.action.formatDocument')
    //     .run()
    //     .then(() => {
    //       // const formatCode = formatText(editor.getValue());
    //       editor.setValue(editor.getValue());
    //     });
    // };

    useEffect(() => {
      if (defaultValue) {
        setCode(defaultValue);
      }
    }, [defaultValue]);

    return (
      <Resizable
        minConstraints={[200, 200]}
        height={h}
        axis="y"
        onResize={(event, { size }) => {
          setHeight(size.height);
        }}
      >
        <div className="editor-wrap" ref={ref} style={{ height: h }}>
          <div className="editor-icon">
            {isFullscreen ? (
              <FullscreenExitOutlined onClick={exitFullscreen} />
            ) : (
              <FullscreenOutlined onClick={enterFullscreen} />
            )}
          </div>
          {/* <Editor
            onChange={onChange}
            language="lua"
            theme="vs-dark"
            className="editor"
            onMount={(editor) => {
              editor.addAction({
                id: 'format-menu',
                label: 'Format',
                contextMenuGroupId: 'navigation',
                contextMenuOrder: 1,
                run: () => handleFormat(editor),
              });
            }}
            {...props}
          /> */}
          <AceEditor
            mode="lua"
            theme="monokai"
            value={code}
            onChange={(value) => {
              setCode(value);
            }}
            editorProps={{ $blockScrolling: true }}
            width="100%"
            height="100%"
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
            annotations={[{ row: 0, column: 2, type: 'error', text: 'Some error.' }]} // 错误，警告
            {...props}
          />
        </div>
      </Resizable>
    );
  },
);

export default FullScreenEditor;
