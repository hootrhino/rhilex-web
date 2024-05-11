import { ProList } from '@ant-design/pro-components';

import PageContainer from '@/components/PageContainer';
import { message, modal } from '@/components/PopupHack';
import { getPlugwareList } from '@/services/rulex/chajianguanli';
import { useIntl, useModel } from '@umijs/max';
import { Tag, Tooltip } from 'antd';
import Detail from './Detail';
import NgrokDetail from './Detail/Ngrok';

export type PluginItem = {
  name: string;
  version: string;
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

  // ping
  const handleOnPing = (uuid: string) => {
    setDetailConfig({
      open: true,
      uuid,
      name: 'ping',
      title: formatMessage({ id: 'plugin.title.ping' }),
    });
  };

  // clients
  const handleOnDetail = (uuid: string) => {
    setDetailConfig({
      open: true,
      uuid,
      name: 'clients',
      title: formatMessage({ id: 'plugin.title.clients' }),
      args: [],
    });
  };

  // scan
  const handleOnConfig = (uuid: string) => {
    setDetailConfig({
      open: true,
      uuid,
      name: 'scan',
      title: formatMessage({ id: 'plugin.title.scan' }),
    });
  };

  // start
  const handleOnStart = (uuid: string) => {
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
  };

  // stop
  const handleOnStop = (uuid: string) => {
    run({ uuid, name: 'stop', args: '' }).then(() => {
      message.success(formatMessage({ id: 'message.success.stop' }));
      setDetailConfig({ open: false, uuid, name: 'stop', title: '', args: '' });
    });
  };

  // ngrokc
  const handleOnViewConfig = () => {
    modal.info({
      title: formatMessage({ id: 'plugin.modal.title.viewConfig' }),
      content: <NgrokDetail />,
      okText: formatMessage({ id: 'button.close' }),
    });
  };

  const handleOption = (uuid: string) => {
    if (uuid === PluginOptionKey.ICMP) {
      return [
        <a key="ping" onClick={() => handleOnPing(uuid)}>
          {formatMessage({ id: 'button.ping' })}
        </a>,
      ];
    } else if (uuid === PluginOptionKey.MQTT) {
      return [
        <a key="detail" onClick={() => handleOnDetail(uuid)}>
          {formatMessage({ id: 'button.detail' })}
        </a>,
      ];
    } else if (uuid === PluginOptionKey.SCANNER) {
      return [
        <a key="config" onClick={() => handleOnConfig(uuid)}>
          {formatMessage({ id: 'button.config' })}
        </a>,
      ];
    } else if (uuid === PluginOptionKey.TERMINAL) {
      return [
        <a key="start" onClick={() => handleOnStart(uuid)}>
          {formatMessage({ id: 'button.start' })}
        </a>,
        <a key="stop" onClick={() => handleOnStop(uuid)}>
          {formatMessage({ id: 'button.stop' })}
        </a>,
      ];
    } else if (uuid === PluginOptionKey.NGROKC) {
      return [
        <a key="ngrokc" onClick={handleOnViewConfig}>
          {formatMessage({ id: 'plugin.button.viewConfig' })}
        </a>,
      ];
    } else {
      return [];
    }
  };

  return (
    <>
      <PageContainer>
        <ProList<PluginItem>
          rowKey="uuid"
          pagination={false}
          showActions="hover"
          grid={{ gutter: 16, column: 4 }}
          cardProps={{ className: 'plugin-card', bodyStyle: { paddingBlockStart: 16 } }}
          metas={{
            title: {
              dataIndex: 'name',
            },
            subTitle: {
              render: (_dom, { version }) => <Tag color="blue">{version}</Tag>,
            },
            content: {
              render: (_dom, { description }) =>
                description && description.length > 40 ? (
                  <Tooltip title={description}>
                    <div className="truncate">{description}</div>
                  </Tooltip>
                ) : (
                  description
                ),
            },
            actions: {
              cardActionProps: 'extra',
              render: (_dom, { uuid }) => handleOption(uuid),
            },
          }}
          request={async () => {
            const res = await getPlugwareList();

            return Promise.resolve({
              data: (res as any)?.data,
              success: true,
            });
          }}
        />
      </PageContainer>
      <Detail />
    </>
  );
};

export default Plugins;
