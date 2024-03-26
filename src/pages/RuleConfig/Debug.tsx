import CodeEditor from '@/components/CodeEditor';
import ProLog from '@/components/ProLog';
import { postRulesTestDevice } from '@/services/rulex/guizeguanli';
import { handleNewMessage } from '@/utils/utils';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProForm } from '@ant-design/pro-components';
import { useModel, useParams } from '@umijs/max';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';

type DebugProps = ModalFormProps & {
  uuid: string;
};

const Debug = ({ uuid, ...props }: DebugProps) => {
  const { latestMessage } = useModel('useWebsocket');
  const { deviceId } = useParams();
  const formRef = useRef<ProFormInstance>();
  const [debugLog, setDebugLog] = useState<string[]>([]);

  useEffect(() => {
    const newData = handleNewMessage(debugLog, latestMessage?.data, `rule/log/${uuid}`);
    setDebugLog(newData);
  }, [latestMessage]);

  return (
    <ModalForm
      formRef={formRef}
      title="测试脚本"
      style={{ height: 500 }}
      modalProps={{
        maskClosable: false,
        destroyOnClose: true,
        onCancel: () => {
          formRef.current?.resetFields();
          setDebugLog([]);
        },
      }}
      submitter={{
        render: ({ reset, submit }) => {
          return [
            <Button
              key="reset"
              onClick={() => {
                reset();
                setDebugLog([]);
              }}
            >
              重置
            </Button>,
            <Button key="debug" type="primary" onClick={submit}>
              测试
            </Button>,
          ];
        },
      }}
      onFinish={async ({ testData }) => {
        try {
          if (deviceId) {
            await postRulesTestDevice({ testData, uuid: deviceId });
          }
          return false;
        } catch (error) {
          return false;
        }
      }}
      {...props}
    >
      <ProForm.Item
        name="testData"
        label="输入数据"
        rules={[{ required: true, message: '请输入数据' }]}
      >
        <CodeEditor autoFocus lang="shell" />
      </ProForm.Item>
      <ProForm.Item name="output" label="输出结果" className="h-[300px]">
        <ProLog hidePadding topic={`rule/log/${uuid}`} dataSource={debugLog} />
      </ProForm.Item>
    </ModalForm>
  );
};

export default Debug;
