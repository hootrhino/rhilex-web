import CodeEditor, { Lang } from '@/components/CodeEditor';
import ProLog from '@/components/ProLog';
import { DeviceType } from '@/pages/Device/enum';
import { postRulesTest } from '@/services/rhilex/guizeguanli';
import { debugData } from '@/templates';
import { multTestData } from '@/templates/DataStructure/DeviceDS';
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

  const getTypeOptions = () => {
    if (
      [DeviceType.TENCENT_IOTHUB_GATEWAY, DeviceType.ITHINGS_IOTHUB_GATEWAY].includes(
        ruleType as any,
      )
    ) {
      return [
        { label: formatMessage({ id: 'ruleConfig.type.option.control' }), value: 'defaultDS' },
        { label: formatMessage({ id: 'ruleConfig.type.option.action' }), value: 'action' },
      ];
    }

    return [{ label: formatMessage({ id: 'ruleConfig.type.option.default' }), value: 'defaultDS' }];
  };

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
      onValuesChange={({ type }) => {
        if (
          type &&
          [DeviceType.TENCENT_IOTHUB_GATEWAY, DeviceType.ITHINGS_IOTHUB_GATEWAY].includes(ruleType)
        ) {
          const data = multTestData[ruleType][type];
          formRef.current?.setFieldsValue({ testData: enableBatchRequest ? `[${data}]` : data });
        }
      }}
      style={{ height: 500, overflowY: 'auto' }}
      {...props}
    >
      <ProFormSelect
        required
        name="type"
        label={formatMessage({ id: 'ruleConfig.form.title.type' })}
        allowClear={false}
        options={getTypeOptions()}
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
