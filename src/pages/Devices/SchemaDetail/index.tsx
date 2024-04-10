import { getBaseColumns } from '@/pages/SchemaMgt/Property';
import { getDevicesProperties } from '@/services/rulex/shebeiguanli';
import { ProTable } from '@ant-design/pro-components';
import type { DrawerProps } from 'antd';
import { Drawer } from 'antd';

type SchemaDetailProps = DrawerProps & {
  activeDevice: string;
  activeDeviceName: string;
};

const SchemaDetail = ({ activeDevice, activeDeviceName, ...props }: SchemaDetailProps) => {
  return (
    <Drawer
      title={activeDeviceName ? `设备 ${activeDeviceName} - 数据模型` : '数据模型'}
      placement="right"
      width="50%"
      destroyOnClose
      maskClosable={false}
      {...props}
    >
      <ProTable
        rowKey="uuid"
        search={false}
        options={false}
        polling={5000}
        columns={getBaseColumns(true)}
        request={async ({ current, pageSize }) => {
          const { data } = await getDevicesProperties({
            current,
            size: pageSize,
            uuid: activeDevice,
          });

          return Promise.resolve({
            data: data?.records || [],
            total: data?.total || 0,
            success: true,
          });
        }}
        pagination={{
          defaultPageSize: 10,
          hideOnSinglePage: true,
        }}
      />
    </Drawer>
  );
};

export default SchemaDetail;
