import { getInendsDetail } from '@/services/rulex/shuruziyuanguanli';
import { omit } from '@/utils/redash';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Drawer, DrawerProps } from 'antd';
import { useRequest } from 'umi';
import { baseColumns, configColumns } from '../columns';
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
        column={1}
        columns={baseColumns as ProDescriptionsItemProps<Record<string, any>>[]}
        labelStyle={{ justifyContent: 'flex-end', minWidth: 80 }}
        title={formatMessage({ id: 'inend.title.base' })}
        dataSource={data && omit(data, ['config'])}
        loading={loading}
      />
      {data?.type && Object.keys(InendType).includes(data?.type) && (
        <ProDescriptions
          column={1}
          columns={configColumns[data?.type]}
          labelStyle={{ justifyContent: 'flex-end', minWidth: 80 }}
          title={formatMessage({ id: 'inend.title.group' })}
          dataSource={data}
          loading={loading}
        />
      )}
    </Drawer>
  );
};

export default Detail;
