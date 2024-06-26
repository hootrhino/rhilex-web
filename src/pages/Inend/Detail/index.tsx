import type { EnhancedProDescriptionsItemProps } from '@/components/ProDescriptions';
import ProDescriptions from '@/components/ProDescriptions';
import { getInendsDetail } from '@/services/rulex/shuruziyuanguanli';
import { omit } from '@/utils/redash';
import { useIntl, useRequest } from '@umijs/max';
import { Drawer, DrawerProps } from 'antd';
import { baseColumns, typeConfigColumns } from '../Columns';
import { InendType } from '../enum';

type DetailProps = DrawerProps & {
  uuid: string;
};

const Detail = ({ uuid, ...props }: DetailProps) => {
  const { formatMessage } = useIntl();

  const { data, loading } = useRequest(() => getInendsDetail({ uuid }), {
    ready: !!uuid,
    refreshDeps: [uuid],
  });

  return (
    <Drawer
      title={formatMessage({ id: 'inend.title.detail' })}
      placement="right"
      width="30%"
      destroyOnClose
      {...props}
    >
      <ProDescriptions
        columns={baseColumns as EnhancedProDescriptionsItemProps[]}
        labelWidth={80}
        title={formatMessage({ id: 'inend.title.base' })}
        dataSource={data && omit(data, ['config'])}
        loading={loading}
      />
      {data?.type && Object.keys(InendType).includes(data?.type) && (
        <ProDescriptions
          columns={typeConfigColumns[data?.type]}
          labelWidth={80}
          title={formatMessage({ id: 'inend.title.group' })}
          dataSource={data}
          loading={loading}
        />
      )}
    </Drawer>
  );
};

export default Detail;
