import { getInendsDetail } from '@/services/rulex/shuruziyuanguanli';
import { omit } from '@/utils/redash';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { Drawer, DrawerProps } from 'antd';
import { useRequest } from 'umi';
import { baseColumns, configColumns } from '../columns';
import { InendType } from '../enum';

type DetailProps = DrawerProps & {
  uuid: string;
};

const Detail = ({ uuid, ...props }: DetailProps) => {
  const { data, loading } = useRequest(() => getInendsDetail({ uuid }), {
    ready: !!uuid,
    refreshDeps: [uuid],
  });

  return (
    <Drawer title="资源详情" placement="right" width="30%" destroyOnClose {...props}>
      <ProDescriptions
        column={1}
        columns={baseColumns as ProDescriptionsItemProps<Record<string, any>>[]}
        labelStyle={{ justifyContent: 'flex-end', minWidth: 80 }}
        title="基本配置"
        dataSource={data && omit(data, ['config'])}
        loading={loading}
      />
      {data?.type && Object.keys(InendType).includes(data?.type) && (
        <ProDescriptions
          column={1}
          columns={configColumns[data?.type]}
          labelStyle={{ justifyContent: 'flex-end', minWidth: 80 }}
          title="资源配置"
          dataSource={data}
          loading={loading}
        />
      )}
    </Drawer>
  );
};

export default Detail;
