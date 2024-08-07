import type { EnhancedProDescriptionsItemProps } from '@/components/ProDescriptions';
import ProDescriptions from '@/components/ProDescriptions';
import { getInendsDetail } from '@/services/rulex/shuruziyuanguanli';
import { omit } from '@/utils/redash';
import { getLocale, useIntl, useRequest } from '@umijs/max';
import { Drawer, DrawerProps } from 'antd';
import { baseColumns, typeConfigColumns } from '../Columns';
import { InendType } from '../enum';

type DetailProps = DrawerProps & {
  uuid: string;
};

const Detail = ({ uuid, ...props }: DetailProps) => {
  const { formatMessage } = useIntl();
  const labelWidth = getLocale() === 'en-US' ? 220 : 120;

  const { data, loading } = useRequest(() => getInendsDetail({ uuid }), {
    ready: !!uuid,
    refreshDeps: [uuid],
  });

  return (
    <Drawer
      title={formatMessage({ id: 'inend.title.detail' })}
      placement="right"
      width="40%"
      destroyOnClose
      {...props}
    >
      <ProDescriptions
        columns={baseColumns as EnhancedProDescriptionsItemProps[]}
        labelWidth={labelWidth}
        title={formatMessage({ id: 'inend.title.base' })}
        dataSource={data && omit(data, ['config'])}
        loading={loading}
        rootClassName="detail-descriptions"
      />
      {data?.type && Object.values(InendType).includes(data?.type as InendType) && (
        <ProDescriptions
          columns={typeConfigColumns[data?.type]}
          labelWidth={labelWidth}
          title={formatMessage({ id: 'inend.title.group' })}
          dataSource={data}
          loading={loading}
        />
      )}
    </Drawer>
  );
};

export default Detail;
