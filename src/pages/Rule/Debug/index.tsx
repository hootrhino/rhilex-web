import CodeEditor, { Lang } from '@/components/CodeEditor';
import ProLog from '@/components/ProLog';
import { postRulesTest } from '@/services/rhilex/guizeguanli';
import { debugData } from '@/templates';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProForm, ProFormSelect } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { Button } from 'antd';
import { useRef } from 'react';

type DebugProps = ModalFormProps & {
  topic: string;
};

const Debug = ({ topic, ...props }: DebugProps) => {
  const { deviceId, inendId } = useParams();
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const defaultTestData = localStorage.getItem('testDataConfig');
  const { ruleType, enableBatchRequest } = defaultTestData && JSON.parse(defaultTestData);

  return (
    <ModalForm
      formRef={formRef}
      title={formatMessage({ id: 'ruleConfig.title.test' })}
      modalProps={{
        maskClosable: false,
        destroyOnClose: true,
        onCancel: () => {
          formRef.current?.resetFields();
        },
      }}
      submitter={{
        render: ({ reset, submit }) => {
          return [
            <Button
              key="reset"
              onClick={() => {
                reset();
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

          await postRulesTest({
            testData,
            uuid: testUuid,
            type: deviceId ? 'DEVICE' : 'INEND',
          });

          return false;
        } catch (error) {
          return false;
        }
      }}
      initialValues={{
        type: 'defaultDS',
        testData: enableBatchRequest ? `[${debugData[ruleType]}]` : debugData[ruleType],
      }}
      style={{ height: 500, overflowY: 'auto' }}
      {...props}
    >
      <ProFormSelect
        required
        name="type"
        label={formatMessage({ id: 'ruleConfig.form.title.type' })}
        allowClear={false}
        options={[
          { label: formatMessage({ id: 'ruleConfig.type.option.default' }), value: 'defaultDS' },
        ]}
      />
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
        <ProLog topic={topic} />
      </ProForm.Item>
    </ModalForm>
  );
};

export default Debug;
