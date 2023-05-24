import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import type { EditorProps } from '@monaco-editor/react';
import { Editor } from '@monaco-editor/react';
import { useFullscreen } from 'ahooks';
import { formatText } from 'lua-fmt';
import { forwardRef, useState } from 'react';
import { Resizable } from 'react-resizable';

import '../../../node_modules/react-resizable/css/styles.css';
import './index.less';

type FullScreenEditorProps = Partial<EditorProps>;

const FullScreenEditor = forwardRef<HTMLDivElement, FullScreenEditorProps>(
  ({ onChange, ...props }, ref) => {
    const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(ref as any, {
      pageFullscreen: true,
    });
    const [h, setHeight] = useState<number>(200);

    const handleFormat = (editor: Record<string, any>) => {
      editor
        ?.getAction('editor.action.formatDocument')
        .run()
        .then(() => {
          const formatCode = formatText(editor.getValue());
          console.log('Code formatted!', formatCode);
          editor.setValue(formatCode);
        });
    };

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
          <Editor
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
          />
        </div>
      </Resizable>
    );
  },
);

export default FullScreenEditor;
