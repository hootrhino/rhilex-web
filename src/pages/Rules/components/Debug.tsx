import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProForm } from '@ant-design/pro-components';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import { Button } from 'antd';
import { useRef } from 'react';
import AceEditor from 'react-ace';
import { useModel } from 'umi';

type DebugProps = ModalFormProps & {
  id: string;
  onClose?: () => void;
};

const Debug = ({ id, onClose, ...props }: DebugProps) => {
  const formRef = useRef<ProFormInstance>();
  const { logs } = useModel('useWebsocket');

  return (
    <ModalForm
      formRef={formRef}
      title="测试脚本"
      submitter={{
        render: (props) => {
          return [
            <Button key="close" onClick={onClose}>
              关闭
            </Button>,
            <Button key="reset" onClick={props.reset}>
              重置
            </Button>,
            <Button key="debug" type="primary" onClick={props.submit}>
              测试
            </Button>,
          ];
        },
      }}
      onFinish={async () => {
        const filterLogs = logs
          ?.filter((log) => log?.logType === 'debugRule')
          ?.filter((item) => item?.ruleId === id);
        formRef.current?.setFieldsValue({ output: filterLogs.join('\n') });

        return false;
      }}
      {...props}
    >
      <ProForm.Item
        name="input"
        label="输入数据"
        rules={[{ required: true, message: '请输入数据' }]}
      >
        <AceEditor
          mode="text"
          theme="monokai"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          style={{ height: 200, fontFamily: 'monospace' }}
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
        />
      </ProForm.Item>

      <ProForm.Item name="output" label="输出结果">
        <AceEditor
          mode="text"
          theme="monokai"
          readOnly={true}
          editorProps={{ $blockScrolling: true }}
          width="100%"
          style={{ height: 200, fontFamily: 'monospace' }}
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
        />
      </ProForm.Item>
    </ModalForm>
  );
};

export default Debug;
