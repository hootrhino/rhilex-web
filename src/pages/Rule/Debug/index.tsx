import CodeEditor, { Lang } from '@/components/CodeEditor';
import ProLog from '@/components/ProLog';
import { postRulesTest } from '@/services/rulex/guizeguanli';
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
  const { deviceId, inendId } = useParams();
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();

  const [debugLog, setDebugLog] = useState<string[]>([]);
  const [showLog, setShowLog] = useState<boolean>(false);

  const handleOnReset = () => {
    setDebugLog([]);
    setShowLog(false);
  };

  useEffect(() => {
    const newData = handleNewMessage(debugLog, latestMessage?.data, topic);
    if (showLog) {
      setDebugLog(newData);
    }
  }, [latestMessage, topic, showLog]);

  return (
    <ModalForm
      formRef={formRef}
      title={formatMessage({ id: 'ruleConfig.title.test' })}
      modalProps={{
        maskClosable: false,
        destroyOnClose: true,
        onCancel: () => {
          formRef.current?.resetFields();
          handleOnReset();
        },
      }}
      submitter={{
        render: ({ reset, submit }) => {
          return [
            <Button
              key="reset"
              onClick={() => {
                reset();
                handleOnReset();
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
          const testUuid = deviceId || inendId;

          if (!testData || !testUuid) return;

          const { code } = await postRulesTest({
            testData,
            uuid: testUuid,
            type: deviceId ? 'DEVICE' : 'INEND',
          });
          setShowLog(code === 200);

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
          hidePadding
          headStyle={{ paddingBlock: 0 }}
          topic={topic}
          dataSource={debugLog}
          className="h-[220px]"
        />
      </ProForm.Item>
    </ModalForm>
  );
};

export default Debug;
