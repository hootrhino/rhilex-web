import { CodeOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-lua';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';

import luamin from 'lua-format';
import { forwardRef, useEffect, useRef, useState } from 'react';
import AceEditor from 'react-ace';
import { Resizable } from 'react-resizable';

import { Space, Tooltip } from 'antd';
import '../../../node_modules/react-resizable/css/styles.css';
import './index.less';

type FullScreenEditorProps = {
  [key: string]: any;
};

const FullScreenEditor = forwardRef<HTMLDivElement, FullScreenEditorProps>(({ ...props }, ref) => {
  const editorRef = useRef(null);
  const [code, setCode] = useState<string>('');
  const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(ref as any, {
    pageFullscreen: true,
  });
  const [h, setHeight] = useState<number>(500);

  const Settings = {
    RenameVariables: false,
    RenameGlobals: false,
    SolveMath: true,
  };

  useEffect(() => {
    if (props?.value) {
      setCode(props?.value);
    }
  }, [props?.value]);

  return (
    <Resizable
      minConstraints={[200, 200]}
      height={h}
      axis="y"
      onResize={(event, { size }) => {
        setHeight(size.height);
      }}
    >
      <div className="editor-wrap" ref={ref} style={{ height: h, background: '#1a1d1f' }}>
        <div className="editor-icon" style={{ color: '#fff', fontSize: 22, float: 'right' }}>
          <Space align="center" size="middle" style={{ marginRight: 10 }}>
            <Tooltip title={isFullscreen ? '退出全屏' : '全屏'}>
              {isFullscreen ? (
                <FullscreenExitOutlined onClick={exitFullscreen} />
              ) : (
                <FullscreenOutlined onClick={enterFullscreen} />
              )}
            </Tooltip>
            <Tooltip title="代码格式化">
              <CodeOutlined
                onClick={() => {
                  const formatCode = luamin.Beautify(code, Settings);
                  let formattedCode = formatCode
                    .toString()
                    .replace(/--discord\.gg\/boronide, code generated using luamin\.js™\n?/g, '');
                  formattedCode = formattedCode.replace(/^\s*\n/gm, '');
                  setCode(formattedCode);
                  editorRef.current?.editor?.setValue(formattedCode);
                }}
              />
            </Tooltip>
          </Space>
        </div>
        <AceEditor
          mode="lua"
          theme="monokai"
          value={code}
          onChange={(value) => setCode(value)}
          ref={editorRef}
          editorProps={{ $blockScrolling: true }}
          width="100%"
          style={{ height: 'calc(100% - 44px)' }}
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
});

export default FullScreenEditor;
