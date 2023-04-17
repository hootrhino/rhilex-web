import { FullscreenExitOutlined,FullscreenOutlined } from '@ant-design/icons';
import type { EditorProps } from '@monaco-editor/react';
import { Editor } from '@monaco-editor/react';
import { useFullscreen } from 'ahooks';
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
            defaultLanguage="lua"
            theme="vs-dark"
            className="editor"
            {...props}
          />
        </div>
      </Resizable>
    );
  },
);

export default FullScreenEditor;
