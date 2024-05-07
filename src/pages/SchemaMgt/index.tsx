import PageContainer from '@/components/PageContainer';
import { PlusOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
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

const SchemaMgt = () => {
  const { formatMessage } = useIntl();
  const [activeSchema, setActiveSchema] = useState<ActiveSchema>({
    uuid: '',
    name: '',
    published: false,
  });
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
        >
          <SchemaList
            open={open}
            changeOpen={setOpen}
            activeItem={activeSchema}
            changeActiveItem={setActiveSchema}
          />
        </ProCard>
        <ProCard
          title={
            activeSchema.name
              ? `${activeSchema.name} - ${formatMessage({ id: 'schemaMgt.title.property' })}`
              : formatMessage({ id: 'schemaMgt.title.property' })
          }
        >
          <PropertyList schemaId={activeSchema.uuid} published={activeSchema.published} />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default SchemaMgt;
