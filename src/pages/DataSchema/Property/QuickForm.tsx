import { message } from '@/components/PopupHack';
import {
  getSchemaGetTemplateFields,
  getSchemaGetTemplates,
  postSchemaGenTemplate,
} from '@/services/rhilex/shujumoxing';
import type { ModalFormProps } from '@ant-design/pro-components';
import { ModalForm, ProFormSelect } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import { Table } from 'antd';
import { useState } from 'react';

type DataSourceItem = { name: string; type: string; comment: string };

type QuickPropertyFormProps = ModalFormProps & {
  reload: () => void;
};

const QuickPropertyForm = ({ reload, ...props }: QuickPropertyFormProps) => {
  const { formatMessage } = useIntl();
  const { activeSchema } = useModel('useSchema');
  const [dataSource, setData] = useState<DataSourceItem[]>([]);

  // 获取模板字段列表
  const { data: templates } = useRequest(() => getSchemaGetTemplateFields());

  const columns = [
    {
      title: formatMessage({ id: 'schemaMgt.form.title.id' }),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: formatMessage({ id: 'table.title.type' }),
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: formatMessage({ id: 'table.title.desc' }),
      dataIndex: 'comment',
      key: 'comment',
    },
  ];

  const handleOnReset = () => {
    setData([]);
  };

  return (
    <ModalForm
      title={formatMessage({ id: 'schemaMgt.modal.title.property.new.quick' })}
      layout="horizontal"
      className="h-[500px] overflow-y-auto"
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
        onCancel: handleOnReset,
      }}
      submitter={{
        searchConfig: { submitText: formatMessage({ id: 'schemaMgt.button.apply' }) },
      }}
      onValuesChange={(values) => {
        if (values?.templateId) {
          const newData = templates ? templates[values?.templateId] : [];
          setData(newData);
        }
      }}
      onFinish={async (values) => {
        try {
          await postSchemaGenTemplate({
            schemaId: activeSchema.uuid,
            templateId: values.templateId,
          });
          message.success(formatMessage({ id: 'message.success.new' }));
          reload();
          handleOnReset();
          return true;
        } catch (error) {
          return false;
        }
      }}
      {...props}
    >
      <ProFormSelect
        label={formatMessage({ id: 'schemaMgt.form.title.templateId' })}
        name="templateId"
        width="lg"
        allowClear={false}
        request={async () => {
          const { data } = await getSchemaGetTemplates();
          return data || [];
        }}
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'schemaMgt.form.rules.templateId' }),
          },
        ]}
        placeholder={formatMessage({ id: 'schemaMgt.form.rules.templateId' })}
      />
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </ModalForm>
  );
};

export default QuickPropertyForm;
