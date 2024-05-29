import PageContainer from '@/components/ProPageContainer';
import { PlusOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Button } from 'antd';
import { useState } from 'react';
import PropertyList from './Property';
import SchemaList from './Schema';

type Rule = {
  defaultValue?: string;
  max?: number;
  min?: number;
  round?: number;
  trueLabel?: string;
  falseLabel?: string;
};

export type Property = {
  uuid?: string;
  schemaId?: string;
  label?: string;
  name?: string;
  type?: string;
  rw?: string;
  unit?: string;
  rule: Rule;
  description?: string;
};

export type SchemaItem = {
  uuid: string;
  name: string;
  published: boolean;
  description?: string;
  schema: {
    iotProperties?: Property[];
  };
};

export type ActiveSchema = Omit<SchemaItem, 'schema' | 'description'>;

const DataSchema = () => {
  const { formatMessage } = useIntl();
  const { activeSchema } = useModel('useSchema');
  const [open, setOpen] = useState<boolean>(false);

  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard
          colSpan="300px"
          title={formatMessage({ id: 'schemaMgt.title.schema' })}
          extra={
            <Button key="add" type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
              {formatMessage({ id: 'button.new' })}
            </Button>
          }
          headStyle={{ paddingInline: 16 }}
          bodyStyle={{ paddingInline: 16 }}
        >
          <SchemaList open={open} changeOpen={setOpen} />
        </ProCard>
        <ProCard
          title={
            activeSchema.name
              ? `${activeSchema.name} - ${formatMessage({ id: 'schemaMgt.title.property' })}`
              : formatMessage({ id: 'schemaMgt.title.property' })
          }
        >
          <PropertyList />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default DataSchema;
