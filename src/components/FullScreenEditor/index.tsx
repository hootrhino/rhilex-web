import { FullscreenExitOutlined,FullscreenOutlined } from '@ant-design/icons';
import type { EditorProps } from '@monaco-editor/react';
import { Editor } from '@monaco-editor/react';
import { useFullscreen } from 'ahooks';
import { forwardRef } from 'react';

import './index.less';

type FullScreenEditorProps = Partial<EditorProps>;

const FullScreenEditor = forwardRef<HTMLDivElement, FullScreenEditorProps>(
  ({ onChange, ...props }, ref) => {
    const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(ref as any, {
      pageFullscreen: true,
    });

    return (
      <div className="editor-wrap" ref={ref}>
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
    );
  },
);

export default FullScreenEditor;
