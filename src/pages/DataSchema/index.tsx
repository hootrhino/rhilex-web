import PageContainer from '@/components/ProPageContainer';
import { MAX_TOTAL } from '@/utils/constant';
import { PlusOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Badge, Button } from 'antd';
import { useState } from 'react';
import PropertyList from './Property';
import SchemaList from './Schema';

const DataSchema = () => {
  const { formatMessage } = useIntl();
  const { activeSchema } = useModel('useSchema');
  const { isFreeTrial, total } = useModel('useCommon');

  const [open, setOpen] = useState<boolean>(false);

  const getPropertyTitle = () => {
    if (activeSchema.name) {
      return (
        <>
          {activeSchema.name} - {formatMessage({ id: 'schemaMgt.title.property' })}
        </>
      );
    }
    return <>{formatMessage({ id: 'schemaMgt.title.property' })}</>;
  };

  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard
          colSpan="300px"
          title={formatMessage({ id: 'schemaMgt.title.schema' })}
          extra={
            <Button
              key="add"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setOpen(true)}
              disabled={isFreeTrial && total >= MAX_TOTAL}
            >
              {formatMessage({ id: 'button.new' })}
            </Button>
          }
          headStyle={{ paddingInline: 16 }}
          bodyStyle={{ paddingInline: 16 }}
        >
          <SchemaList open={open} changeOpen={setOpen} />
        </ProCard>
        <Badge.Ribbon
          text={formatMessage({
            id: `schemaMgt.status.${activeSchema.published ? 'published' : 'unpublished'}`,
          })}
          color={activeSchema.published ? 'green' : 'blue'}
        >
          <ProCard title={getPropertyTitle()}>
            <PropertyList />
          </ProCard>
        </Badge.Ribbon>
      </ProCard>
    </PageContainer>
  );
};

export default DataSchema;
