import CodeEditor, { Lang } from '@/components/CodeEditor';
import { message } from '@/components/PopupHack';
import RuleExample from '@/components/RuleExample';
import { putCecollasUpdateAction } from '@/services/rhilex/yunbianxietong';
import { ProField, ProForm } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { Empty } from 'antd';
import { Schema } from '../enum';

type ActionProps = {
  schema: Schema;
  data: string | undefined | null;
  refresh: () => void;
};

const Action = ({ schema, data, refresh }: ActionProps) => {
  const { formatMessage } = useIntl();
  // const formRef = useRef<ProFormInstance>();
  const { uuid } = useParams();

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
      initialValues={{ action: data ? JSON.stringify(data) : '' }}
      submitter={{
        searchConfig: { submitText: '更新' },
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
        label={<RuleExample name="" handleOnFormatCode={() => {}} />}
        name="action"
      >
        <CodeEditor key="action" minHeight="400px" lang={Lang.JSON} />
      </ProForm.Item>
    </ProForm>
  );
};

export default Action;
