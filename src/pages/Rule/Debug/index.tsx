import CodeEditor, { Lang } from '@/components/CodeEditor';
import ProLog from '@/components/ProLog';
import { postRulesTestDevice } from '@/services/rulex/guizeguanli';
import { handleNewMessage } from '@/utils/utils';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProForm } from '@ant-design/pro-components';
import { useIntl, useModel, useParams } from '@umijs/max';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import type { DSType } from '..';
import { debugData } from '../DS';

type DebugProps = ModalFormProps & {
  topic: string;
  ruleType: DSType | undefined;
};

const Debug = ({ topic, ruleType, ...props }: DebugProps) => {
  const { latestMessage } = useModel('useWebsocket');
  const { deviceId } = useParams();
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();

  const [debugLog, setDebugLog] = useState<string[]>([]);

  useEffect(() => {
    const newData = handleNewMessage(debugLog, latestMessage?.data, topic);
    setDebugLog(newData);
  }, [latestMessage, topic]);

  return (
    <ModalForm
      formRef={formRef}
      title={formatMessage({ id: 'ruleConfig.title.test' })}
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
              {formatMessage({ id: 'button.reset' })}
            </Button>,
            <Button key="debug" type="primary" onClick={submit}>
              {formatMessage({ id: 'button.test' })}
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
      initialValues={{ testData: ruleType ? debugData[ruleType] : '' }}
      {...props}
    >
      <ProForm.Item
        name="testData"
        label={formatMessage({ id: 'ruleConfig.form.title.testData' })}
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'ruleConfig.form.placeholder.testData' }),
          },
        ]}
      >
        <CodeEditor autoFocus lang={Lang.SHELL} />
      </ProForm.Item>
      <ProForm.Item
        name="output"
        label={formatMessage({ id: 'ruleConfig.form.title.output' })}
        className="mb-0"
      >
        <ProLog
          key="rule_debug"
          hidePadding
          topic={topic}
          dataSource={debugLog}
          headStyle={{ paddingBlock: 0 }}
          className="h-[225px]"
        />
      </ProForm.Item>
    </ModalForm>
  );
};

export default Debug;
