import { getShellyGen1Detail, getShellyGen1Status } from '@/services/rulex/shellyshebei';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { ProDescriptionsProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { Divider, Tag } from 'antd';

type DetailProps<RecordType = Record<string, any>, ValueType = 'text'> = ProDescriptionsProps<
  RecordType,
  ValueType
> & {
  mac: string;
  deviceId: string;
  ip: string | undefined;
};

const baseColumns = [
  {
    title: '设备 ID',
    dataIndex: 'id',
  },
  {
    title: '设备名称',
    dataIndex: 'name',
  },
  {
    title: '设备 IP 地址',
    dataIndex: 'ip',
  },
  {
    title: '设备 MAC 地址',
    dataIndex: 'mac',
  },
  {
    title: '设备型号',
    dataIndex: 'model',
  },
  {
    title: '设备硬件版本号',
    dataIndex: 'gen',
    renderText: (gen: string) => `v${gen}`,
  },
  {
    title: '设备固件版本 ID',
    dataIndex: 'fw_id',
  },
  {
    title: '设备固件版本号',
    dataIndex: 'ver',
    renderText: (ver: string) => `v${ver}`,
  },
  {
    title: '设备所在的插槽位置',
    dataIndex: 'slot',
  },
  {
    title: '设备应用程序名称',
    dataIndex: 'app',
  },
  {
    title: '是否开启认证功能',
    dataIndex: 'auth_en',
    renderText: (auth_en: boolean) => (
      <Tag
        color={auth_en ? 'success' : 'error'}
        icon={auth_en ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
      >
        {auth_en ? '开启' : '关闭'}
      </Tag>
    ),
  },
  {
    title: '设备认证域',
    dataIndex: 'auth_domain',
  },
];

const statusColumns = [
  {
    title: '是否需要重启设备',
    dataIndex: 'restart_required',
    renderText: (restart_required: boolean) => (
      <Tag
        color={restart_required ? 'success' : 'error'}
        icon={restart_required ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
      >
        {restart_required ? '开启' : '关闭'}
      </Tag>
    ),
  },
  {
    title: '设备当前时间',
    dataIndex: 'time',
  },
  {
    title: '设备 Unix 时间戳',
    dataIndex: 'unixtime',
  },
  {
    title: '设备运行时间',
    dataIndex: 'uptime',
  },
  {
    title: 'RAM 总大小',
    dataIndex: 'ram_size',
    renderText: (ram_size: number) => `${ram_size}（字节）`,
  },
  {
    title: '可用 RAM 大小',
    dataIndex: 'ram_free',
    renderText: (ram_free: number) => `${ram_free}（字节）`,
  },
  {
    title: '文件系统总大小',
    dataIndex: 'fs_size',
    renderText: (fs_size: number) => `${fs_size}（字节）`,
  },
  {
    title: '文件系统可用大小',
    dataIndex: 'fs_free',
    renderText: (fs_free: number) => `${fs_free}（字节）`,
  },
  {
    title: '配置版本号',
    dataIndex: 'cfg_rev',
    renderText: (cfg_rev: string) => `v${cfg_rev}`,
  },
  {
    title: '键值存储版本号',
    dataIndex: 'kvs_rev',
    renderText: (kvs_rev: string) => `v${kvs_rev}`,
  },
  {
    title: '计划任务版本号',
    dataIndex: 'schedule_rev',
    renderText: (schedule_rev: string) => `v${schedule_rev}`,
  },
  {
    title: 'Webhook 版本号',
    dataIndex: 'webhook_rev',
    renderText: (webhook_rev: string) => `v${webhook_rev}`,
  },
];

const Detail = ({ mac, deviceId, ip, ...props }: DetailProps) => {
  return (
    <>
      <ProDescriptions
        title="设备基本信息"
        column={2}
        labelStyle={{ justifyContent: 'flex-end', minWidth: 140, marginRight: 10 }}
        request={async () => {
          const { data } = await getShellyGen1Detail({ mac, deviceId });

          return Promise.resolve({
            data: data,
            success: true,
          });
        }}
        columns={baseColumns}
        {...props}
      />
      <Divider className="my-[10px]" />
      <ProDescriptions
        title="设备状态信息"
        column={2}
        labelStyle={{ justifyContent: 'flex-end', minWidth: 140, marginRight: 10 }}
        params={{ ip }}
        request={async () => {
          const { data } = await getShellyGen1Status({ ip: ip || '' });

          return Promise.resolve({
            data: data,
            success: true,
          });
        }}
        columns={statusColumns}
        {...props}
      />
    </>
  );
};

export default Detail;
