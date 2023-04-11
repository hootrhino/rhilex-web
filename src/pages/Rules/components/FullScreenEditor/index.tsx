import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Editor } from '@monaco-editor/react';
import { useFullscreen } from 'ahooks';
import { forwardRef } from 'react';

import './index.less';

type FullScreenEditorProps = {
  defaultValue?: string;
};

const FullScreenEditor = forwardRef<HTMLDivElement, FullScreenEditorProps>(
  ({ defaultValue, ...props }, ref) => {
    const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(ref as any, {
      pageFullscreen: true,
    });

    return (
      <div className="editor-wrap" ref={ref} {...props}>
        <div className="editor-icon">
          {isFullscreen ? (
            <FullscreenExitOutlined onClick={exitFullscreen} />
          ) : (
            <FullscreenOutlined onClick={enterFullscreen} />
          )}
        </div>
        <Editor
          defaultLanguage="lua"
          theme="vs-dark"
          className="editor"
          defaultValue={defaultValue}
        />
      </div>
    );
  },
);

export default FullScreenEditor;
