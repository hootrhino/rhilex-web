import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProForm } from '@ant-design/pro-components';
import { langs } from '@uiw/codemirror-extensions-langs';
import { monokai } from '@uiw/codemirror-theme-monokai';
import CodeMirror from '@uiw/react-codemirror';
import { Button } from 'antd';
import { useRef } from 'react';
import { useModel } from 'umi';

type DebugProps = ModalFormProps & {
  uuid: string;
  onClose?: () => void;
};

const Debug = ({ uuid, onClose, ...props }: DebugProps) => {
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
        const filterLogs = logs?.filter((log) => log?.topic === `rule/test/${uuid}`);
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
        <CodeMirror extensions={[langs.shell()]} height="200px" theme={monokai} />
      </ProForm.Item>

      <ProForm.Item name="output" label="输出结果">
        <CodeMirror
          extensions={[langs.shell()]}
          height="200px"
          theme={monokai}
          readOnly
          autoFocus={false}
        />
      </ProForm.Item>
    </ModalForm>
  );
};

export default Debug;
