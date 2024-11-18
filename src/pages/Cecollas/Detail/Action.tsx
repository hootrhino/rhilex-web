import CodeEditor, { Lang } from '@/components/CodeEditor';
import { message } from '@/components/PopupHack';
import RuleExample from '@/components/RuleExample';
import { putCecollasUpdateAction } from '@/services/rhilex/yunbianxietong';
import { ProField, ProForm, ProFormInstance } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { Empty } from 'antd';
import { useRef } from 'react';
import { Schema } from '../enum';

type ActionProps = {
  schema: Schema;
  data: string | undefined | null;
  refresh: () => void;
};

const Action = ({ schema, data, refresh }: ActionProps) => {
  const { formatMessage } = useIntl();
  const formRef = useRef<ProFormInstance>();
  const { uuid } = useParams();

  // 格式化代码
  const handleOnFormatCode = () => {
    const code = formRef.current?.getFieldValue('action');
    const formatCode = JSON.stringify(JSON.parse(code), null, 2);
    console.log(code, formatCode);
    formRef.current?.setFieldsValue({ action: formatCode });
  };

  return schema === Schema.SUB_DEVICE ? (
    <div className="network-card mt-4">
      {data ? (
        <ProField text={data || ''} valueType="jsonCode" mode="read" />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  ) : (
    <ProForm
      formRef={formRef}
      initialValues={{ action: data ? JSON.stringify(data) : '' }}
      submitter={{
        searchConfig: { submitText: formatMessage({ id: 'cecollas.button.update' }) },
        render: (props, dom) => <div className="flex justify-end gap-2">{dom}</div>,
      }}
      onFinish={async ({ action }) => {
        if (!uuid) return;
        const params = {
          uuid,
          action: action ? JSON.stringify(action) : '',
        };

        await putCecollasUpdateAction(params);
        refresh();
        message.success(formatMessage({ id: 'message.success.update' }));
      }}
    >
      <ProForm.Item
        rootClassName="rule-label"
        label={<RuleExample name="" handleOnFormatCode={handleOnFormatCode} />}
        name="action"
      >
        <CodeEditor key="action" minHeight="400px" lang={Lang.JSON} />
      </ProForm.Item>
    </ProForm>
  );
};

export default Action;
