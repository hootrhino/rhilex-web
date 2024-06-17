import { ProList } from '@ant-design/pro-components';

import { message } from '@/components/PopupHack';
import PageContainer from '@/components/ProPageContainer';
import ProTag from '@/components/ProTag';
import { defaultConfig, PluginName, PluginUUID } from '@/models/usePlugin';
import { getPlugwareList } from '@/services/rulex/chajianguanli';
import { useIntl, useModel } from '@umijs/max';
import { useSize } from 'ahooks';
import { Tooltip } from 'antd';
import { useRef } from 'react';
import Detail from './Detail';

export type PluginItem = {
  name: string;
  version: string;
  uuid: PluginUUID;
  [key: string]: any;
};

type DetailParams = {
  uuid: PluginUUID;
  name: PluginName;
  titleId: string;
  args?: any;
};

const Plugins = () => {
  const { setDetailConfig, run } = useModel('usePlugin');
  const { formatMessage } = useIntl();
  const ref = useRef(null);
  const size = useSize(ref);

  const handleOnDetail = ({ uuid, name, titleId, ...rest }: DetailParams) => {
    setDetailConfig({
      open: true,
      uuid,
      name,
      title: formatMessage({ id: titleId }),
      ...rest,
    });
  };

  // start
  const handleOnStart = (uuid: PluginUUID) => {
    run({ uuid, name: PluginName.START, args: '' });
    // 启动并打开终端
    handleOnDetail({ uuid, name: PluginName.START, titleId: 'plugin.title.terminal', args: '' });
    message.success(formatMessage({ id: 'message.success.start' }));
  };

  // stop
  const handleOnStop = (uuid: PluginUUID) => {
    run({ uuid, name: PluginName.STOP, args: '' });
    setDetailConfig(defaultConfig);
    message.success(formatMessage({ id: 'message.success.stop' }));
  };

  const handleOption = (uuid: PluginUUID) => {
    let options: React.ReactNode[] = [];

    switch (uuid) {
      case PluginUUID.ICMP:
        options = [
          <a
            key="ping"
            onClick={() =>
              handleOnDetail({ uuid, name: PluginName.PING, titleId: 'plugin.title.ping' })
            }
          >
            {formatMessage({ id: 'button.ping' })}
          </a>,
        ];
        break;
      case PluginUUID.MQTT:
        options = [
          <a
            key="detail"
            onClick={() =>
              handleOnDetail({
                uuid,
                name: PluginName.CLIENTS,
                titleId: 'plugin.title.clients',
                args: [],
              })
            }
          >
            {formatMessage({ id: 'button.detail' })}
          </a>,
        ];
        break;
      case PluginUUID.SCANNER:
        options = [
          <a
            key="scan"
            onClick={() =>
              handleOnDetail({ uuid, name: PluginName.SCAN, titleId: 'plugin.title.scan' })
            }
          >
            {formatMessage({ id: 'button.scan' })}
          </a>,
        ];
        break;
      case PluginUUID.TERMINAL:
        options = [
          <a key="start" onClick={() => handleOnStart(uuid)}>
            {formatMessage({ id: 'button.start' })}
          </a>,
          <a key="stop" onClick={() => handleOnStop(uuid)}>
            {formatMessage({ id: 'button.stop' })}
          </a>,
        ];
        break;
      case PluginUUID.NGROKC:
        options = [
          <a
            key="ngrokc"
            onClick={() =>
              handleOnDetail({ uuid, name: PluginName.NGROKC, titleId: 'plugin.title.ngrokc' })
            }
          >
            {formatMessage({ id: 'button.detail' })}
          </a>,
        ];
        break;
      case PluginUUID.CRC:
        options = [
          <a
            key="crc"
            onClick={() =>
              handleOnDetail({ uuid, name: PluginName.CRC, titleId: 'plugin.title.calc' })
            }
          >
            {formatMessage({ id: 'plugin.button.calc' })}
          </a>,
        ];
        break;
      default:
        options = [];
        break;
    }
    return options;
  };

  return (
    <div ref={ref}>
      <PageContainer>
        <ProList<PluginItem>
          rowKey="uuid"
          pagination={false}
          showActions="hover"
          grid={{ gutter: 16, column: size && size?.width < 1200 ? 2 : 4 }}
          cardProps={{ className: 'plugin-card', bodyStyle: { paddingBlockStart: 16 } }}
          metas={{
            title: {
              dataIndex: 'name',
            },
            subTitle: {
              render: (_dom, { version }) => <ProTag color="blue">{version}</ProTag>,
            },
            content: {
              render: (_dom, { description }) =>
                description && description.length > 40 ? (
                  <Tooltip title={description}>
                    <div className="truncate">{description}</div>
                  </Tooltip>
                ) : (
                  <div className={description ? 'truncate' : 'invisible'}>{description || '-'}</div>
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
    </div>
  );
};

export default Plugins;
