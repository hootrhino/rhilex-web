import ProDescriptions from '@/components/ProDescriptions';
import ProTag, { StatusType } from '@/components/ProTag';
import UnitValue from '@/components/UnitValue';
import { getShellyGen1Detail, getShellyGen1Status } from '@/services/rulex/shellyshebei';
import type { ProDescriptionsProps } from '@ant-design/pro-components';
import { getIntl, getLocale } from '@umijs/max';
import { Divider } from 'antd';

type DetailProps<RecordType = Record<string, any>, ValueType = 'text'> = ProDescriptionsProps<
  RecordType,
  ValueType
> & {
  mac: string;
  deviceId: string;
  ip: string | undefined;
};

const intl = getIntl(getLocale());

const baseColumns = [
  {
    title: intl.formatMessage({ id: 'device.form.title.id' }),
    dataIndex: 'id',
    ellipsis: true,
    renderText: (id: string) => id || '-',
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.name' }),
    dataIndex: 'name',
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.ip' }),
    dataIndex: 'ip',
    ellipsis: true,
    renderText: (ip: string) => ip || '-',
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.mac' }),
    dataIndex: 'mac',
    ellipsis: true,
    renderText: (mac: string) => mac || '-',
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.model' }),
    dataIndex: 'model',
    ellipsis: true,
    renderText: (model: string) => model || '-',
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.gen' }),
    dataIndex: 'gen',
    renderText: (gen: string) => (gen ? `v${gen}` : '-'),
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.fwId' }),
    dataIndex: 'fw_id',
    ellipsis: true,
    renderText: (fw_id: string) => fw_id || '-',
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.ver' }),
    dataIndex: 'ver',
    renderText: (ver: string) => (ver ? `v${ver}` : '-'),
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.slot' }),
    dataIndex: 'slot',
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.app' }),
    dataIndex: 'app',
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.authEn' }),
    dataIndex: 'auth_en',
    renderText: (auth_en: boolean) => {
      console.log(auth_en);
      return auth_en === undefined ? '-' : <ProTag type={StatusType.BOOL}>{auth_en}</ProTag>;
    },
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.authDomain' }),
    dataIndex: 'auth_domain',
  },
];

const statusColumns = [
  {
    title: intl.formatMessage({ id: 'device.form.title.restartRequired' }),
    dataIndex: 'restart_required',
    renderText: (restart_required: boolean) => (
      <ProTag type={StatusType.BOOL}>{restart_required}</ProTag>
    ),
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.time' }),
    dataIndex: 'time',
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.unixtime' }),
    dataIndex: 'unixtime',
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.uptime' }),
    dataIndex: 'uptime',
    renderText: (uptime: number) => <UnitValue value={uptime} unit="ms" />,
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.ramSize' }),
    dataIndex: 'ram_size',
    renderText: (ram_size: number) => <UnitValue value={ram_size} unit="Byte" />,
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.ramFree' }),
    dataIndex: 'ram_free',
    renderText: (ram_free: number) => <UnitValue value={ram_free} unit="Byte" />,
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.fsSize' }),
    dataIndex: 'fs_size',
    renderText: (fs_size: number) => <UnitValue value={fs_size} unit="Byte" />,
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.fsFree' }),
    dataIndex: 'fs_free',
    renderText: (fs_free: number) => <UnitValue value={fs_free} unit="Byte" />,
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.cfgRev' }),
    dataIndex: 'cfg_rev',
    renderText: (cfg_rev: string) => `v${cfg_rev}`,
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.kvsRev' }),
    dataIndex: 'kvs_rev',
    renderText: (kvs_rev: string) => `v${kvs_rev}`,
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.scheduleRev' }),
    dataIndex: 'schedule_rev',
    renderText: (schedule_rev: string) => `v${schedule_rev}`,
  },
  {
    title: intl.formatMessage({ id: 'device.form.title.webhookRev' }),
    dataIndex: 'webhook_rev',
    renderText: (webhook_rev: string) => `v${webhook_rev}`,
  },
];

const Detail = ({ mac, deviceId, ip, ...props }: DetailProps) => {
  const labelWidth = getLocale() === 'en-US' ? 185 : 130;

  return (
    <>
      <ProDescriptions
        title={intl.formatMessage({ id: 'device.title.smartHome.detail.base' })}
        column={2}
        columns={baseColumns}
        labelWidth={labelWidth}
        params={{ ip }}
        request={async () => {
          const { data } = await getShellyGen1Detail({ mac, deviceId, ip: ip as string });

          return Promise.resolve({
            data: data,
            success: true,
          });
        }}
        {...props}
      />
      <Divider className="my-[10px]" />
      <ProDescriptions
        title={intl.formatMessage({ id: 'device.title.smartHome.detail.status' })}
        column={2}
        columns={statusColumns}
        labelWidth={labelWidth}
        params={{ ip }}
        request={async () => {
          const { data } = await getShellyGen1Status({ ip: ip || '' });

          return Promise.resolve({
            data: data,
            success: true,
          });
        }}
        {...props}
      />
    </>
  );
};

export default Detail;
