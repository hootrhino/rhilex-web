import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

import PageContainer from '@/components/PageContainer';
import { message, modal } from '@/components/PopupHack';
import { getPlugwareList } from '@/services/rulex/chajianguanli';
import { useIntl, useModel } from '@umijs/max';
import { Space } from 'antd';
import Detail from './Detail';
import NgrokDetail from './Detail/Ngrok';

export type PluginItem = {
  name: string;
  version: string;
  helpLink: string;
  [key: string]: any;
};

export enum PluginOptionKey {
  ICMP = 'ICMPSender',
  MQTT = 'RULEX-MqttServer',
  SCANNER = 'MODBUS_SCANNER',
  TERMINAL = 'WEB_TTYD_TERMINAL',
  NGROKC = 'NGROKC',
}

const Plugins = () => {
  const { setDetailConfig, run } = useModel('usePlugin');
  const { formatMessage } = useIntl();

  const handleOption = (uuid: string) => {
    if (uuid === PluginOptionKey.ICMP) {
      return (
        <a
          key="ping"
          onClick={() => {
            setDetailConfig({
              open: true,
              uuid,
              name: 'ping',
              title: formatMessage({ id: 'plugin.title.ping' }),
            });
          }}
        >
          {formatMessage({ id: 'button.ping' })}
        </a>
      );
    } else if (uuid === PluginOptionKey.MQTT) {
      return (
        <a
          key="detail"
          onClick={() => {
            setDetailConfig({
              open: true,
              uuid,
              name: 'clients',
              title: formatMessage({ id: 'plugin.title.clients' }),
              args: [],
            });
          }}
        >
          {formatMessage({ id: 'button.detail' })}
        </a>
      );
    } else if (uuid === PluginOptionKey.SCANNER) {
      return (
        <a
          key="config"
          onClick={() => {
            setDetailConfig({
              open: true,
              uuid,
              name: 'scan',
              title: formatMessage({ id: 'plugin.title.scan' }),
            });
          }}
        >
          {formatMessage({ id: 'button.config' })}
        </a>
      );
    } else if (uuid === PluginOptionKey.TERMINAL) {
      return (
        <Space>
          <a
            key="start"
            onClick={() => {
              run({ uuid, name: 'start', args: '' }).then(() => {
                // 启动并打开终端
                message.success(formatMessage({ id: 'message.success.start' }));
                setDetailConfig({
                  open: true,
                  uuid,
                  name: 'start',
                  title: formatMessage({ id: 'plugin.title.terminal' }),
                  args: '',
                });
              });
            }}
          >
            {formatMessage({ id: 'button.start' })}
          </a>
          <a
            key="stop"
            onClick={() => {
              run({ uuid, name: 'stop', args: '' }).then(() => {
                message.success(formatMessage({ id: 'message.success.stop' }));
                setDetailConfig({ open: false, uuid, name: 'stop', title: '', args: '' });
              });
            }}
          >
            {formatMessage({ id: 'button.stop' })}
          </a>
        </Space>
      );
    } else if (uuid === PluginOptionKey.NGROKC) {
      return (
        <a
          onClick={() =>
            modal.info({
              title: formatMessage({ id: 'plugin.modal.title.viewConfig' }),
              content: <NgrokDetail />,
              okText: formatMessage({ id: 'button.close' }),
            })
          }
        >
          {formatMessage({ id: 'plugin.button.viewConfig' })}
        </a>
      );
    } else {
      return '-';
    }
  };

  const columns: ProColumns<PluginItem>[] = [
    {
      title: formatMessage({ id: 'plugin.table.title.name' }),
      dataIndex: 'name',
      ellipsis: true,
      fixed: 'left',
    },
    {
      title: formatMessage({ id: 'plugin.table.title.version' }),
      dataIndex: 'version',
      width: 80,
    },
    {
      title: formatMessage({ id: 'plugin.table.title.helpLink' }),
      dataIndex: 'helpLink',
      ellipsis: true,
      width: 250,
      renderText: (address) => (
        <a href={address} target="_blank" rel="noreferrer">
          {address}
        </a>
      ),
    },
    {
      title: formatMessage({ id: 'plugin.table.title.author' }),
      dataIndex: 'author',
      width: 80,
    },
    {
      title: formatMessage({ id: 'plugin.table.title.email' }),
      dataIndex: 'email',
      ellipsis: true,
      width: 180,
    },
    {
      title: formatMessage({ id: 'table.option' }),
      valueType: 'option',
      width: 80,
      fixed: 'right',
      key: 'option',
      render: (_, { uuid }) => handleOption(uuid),
    },
  ];

  return (
    <>
      <PageContainer>
        <ProTable
          rowKey="uuid"
          columns={columns}
          request={async () => {
            const res = await getPlugwareList();

            return Promise.resolve({
              data: (res as any)?.data,
              success: true,
            });
          }}
          search={false}
          pagination={false}
          scroll={{ x: 1000 }}
        />
      </PageContainer>
      <Detail />
    </>
  );
};

export default Plugins;
