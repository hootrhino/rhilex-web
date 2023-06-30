import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProForm } from '@ant-design/pro-components';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import { Button, Input } from 'antd';
import { useRef } from 'react';
import AceEditor from 'react-ace';
import { useModel } from 'umi';

type DebugProps = ModalFormProps & {
  onClose?: () => void;
};

const Ping = ({ onClose, ...props }: DebugProps) => {
  const formRef = useRef<ProFormInstance>();
  const { logs } = useModel('useWebsocket');

  return (
    <ModalForm
      formRef={formRef}
      title="网络测速"
      submitter={{
        render: () => {
          return [
            <Button key="close" onClick={onClose} type="primary">
              关闭
            </Button>,
          ];
        },
      }}
      {...props}
    >
      <ProForm.Item name="ip" label="地址">
        <Input.Search
          placeholder="请输入地址"
          allowClear
          enterButton="测试"
          size="large"
          onSearch={(value) => {
            console.log(value);
            const filterLogs = logs?.filter(
              (log) => log?.topic === 'plugin/ICMPSenderPing/ICMPSender',
            );
            formRef.current?.setFieldsValue({ output: filterLogs.join('\n') });
          }}
        />
      </ProForm.Item>

      <ProForm.Item name="output" label="输出">
        <AceEditor
          mode="sh"
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

export default Ping;
