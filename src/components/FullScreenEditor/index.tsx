import { CodeOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-lua';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';

import luamin from 'lua-format';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import AceEditor from 'react-ace';
import { Resizable } from 'react-resizable';

import { completions } from '@/utils/completion';
import { cn } from '@/utils/utils';
import { Divider, Space } from 'antd';
import { useModel } from 'umi';
import '../../../node_modules/react-resizable/css/styles.css';
import './index.less';

type FullScreenEditorProps = {
  [key: string]: any;
};

type uuidItem = {
  label: string;
  value: string;
};

const FullScreenEditor = forwardRef<HTMLDivElement, FullScreenEditorProps>(({ ...props }, ref) => {
  const editorRef = useRef<AceEditor>(null);
  const { data: inends } = useModel('useSource');
  const { data: outends } = useModel('useOutends');
  const [code, setCode] = useState<string>('');
  const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(ref as any, {
    pageFullscreen: true,
  });
  const [h, setHeight] = useState<number>(500);

  const myCompleters = useMemo(() => {
    return [
      {
        getCompletions: function (
          _editor: any,
          _session: any,
          _pos: any,
          _prefix: any,
          callback: any,
        ) {
          const uuidList = [...(inends ?? []), ...(outends ?? [])]?.map((item: uuidItem) => ({
            name: item?.value,
            value: `'${item?.value}'`,
            score: 100,
            meta: item?.label,
          }));

          callback(null, [...completions, ...uuidList]);
        },
      },
    ];
  }, [inends, outends]);

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
      <div ref={ref} className={cn('editor-wrap', 'bg-[#1a1d1f]')} style={{ height: h }}>
        <div className={cn('editor-icon', 'text-white text-[20px] float-right')}>
          <Space
            align="center"
            size="middle"
            className="mr-[10px]"
            split={<Divider type="vertical" className="bg-white" />}
          >
            <Space align="center">
              {isFullscreen ? (
                <FullscreenExitOutlined onClick={exitFullscreen} />
              ) : (
                <FullscreenOutlined onClick={enterFullscreen} />
              )}
              <div className="text-[14px]">{isFullscreen ? '退出全屏' : '全屏'}</div>
            </Space>

            <Space align="center">
              <CodeOutlined
                onClick={() => {
                  // const regex = /[^\S\r\n]+/g;
                  // const clearSpace = code.replace(/[^\S\r\n]+/g, "");

                  const formatCode = luamin.Beautify(code, Settings);
                  let formattedCode = formatCode
                    .toString()
                    .replace(/--discord\.gg\/boronide, code generated using luamin\.js™\n?/g, '');
                  formattedCode = formattedCode.replace(/^\s*\n/gm, '');
                  setCode(formattedCode);
                  editorRef.current?.editor?.setValue(formattedCode);
                }}
              />
              <div className="text-[14px]">代码格式化</div>
            </Space>
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
          onLoad={(editor) => {
            editor.completers = [...editor.completers, ...myCompleters];
          }}
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
