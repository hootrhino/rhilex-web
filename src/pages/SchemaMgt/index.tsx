import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
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
  schema: {
    iotProperties?: Property[];
  };
};

export type ActiveSchema = Omit<SchemaItem, 'schema'>;

const SchemaMgt = () => {
  const [activeSchema, setActiveSchema] = useState<ActiveSchema>({
    uuid: '',
    name: '',
  });
  const [open, setOpen] = useState<boolean>(false);

  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard
          colSpan="300px"
          title="数据模型列表"
          extra={
            <Button key="add" type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
              新建模型
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
        <ProCard title={activeSchema.name ? `数据模型 ${activeSchema.name} - 属性列表` : '属性列表'}>
          <PropertyList schemaId={activeSchema.uuid} />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default SchemaMgt;
