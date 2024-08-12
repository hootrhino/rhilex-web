import { ProList } from '@ant-design/pro-components';

import { message } from '@/components/PopupHack';
import PageContainer from '@/components/ProPageContainer';
import ProTag from '@/components/ProTag';
import { getPlugwareList, postPlugwareService } from '@/services/rulex/chajianguanli';
import { useIntl, useRequest } from '@umijs/max';
import { useSize } from 'ahooks';
import { Tooltip } from 'antd';
import { useRef, useState } from 'react';
import Detail from './Detail';
import { PluginName, PluginUUID } from './enum';
import type { DetailParams, PluginConfig, PluginItem } from './typings';

export const defaultConfig = { open: false, name: undefined, args: '', title: '' };

const Plugins = () => {
  const ref = useRef(null);
  const size = useSize(ref);

  const { formatMessage } = useIntl();

  const [detailConfig, setDetailConfig] = useState<PluginConfig>(defaultConfig);

  const handleOnDetail = ({ name, titleId, ...rest }: DetailParams) => {
    setDetailConfig({
      open: true,
      name,
      title: formatMessage({ id: titleId }),
      ...rest,
    });
  };

  // 启动
  const { run: onStart } = useRequest(
    () => postPlugwareService({ uuid: PluginUUID.TERMINAL, name: PluginName.START, args: '' }),
    {
      manual: true,
      onSuccess: () => {
        // 打开终端
        handleOnDetail({ name: PluginName.START, titleId: 'plugin.title.terminal', args: '' });
        message.success(formatMessage({ id: 'message.success.start' }));
      },
    },
  );

  // 停止
  const { run: onStop } = useRequest(
    () => postPlugwareService({ uuid: PluginUUID.TERMINAL, name: PluginName.STOP, args: '' }),
    {
      manual: true,
      onSuccess: () => {
        setDetailConfig(defaultConfig);
        message.success(formatMessage({ id: 'message.success.stop' }));
      },
    },
  );

  const handleOption = (uuid: PluginUUID) => {
    let options: React.ReactNode[] = [];

    switch (uuid) {
      case PluginUUID.ICMP:
        options = [
          <a
            key="ping"
            onClick={() => handleOnDetail({ name: PluginName.PING, titleId: 'plugin.title.ping' })}
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
            onClick={() => handleOnDetail({ name: PluginName.SCAN, titleId: 'plugin.title.scan' })}
          >
            {formatMessage({ id: 'button.scan' })}
          </a>,
        ];
        break;
      case PluginUUID.TERMINAL:
        options = [
          <a key="start" onClick={onStart}>
            {formatMessage({ id: 'button.start' })}
          </a>,
          <a key="stop" onClick={onStop}>
            {formatMessage({ id: 'button.stop' })}
          </a>,
        ];
        break;
      case PluginUUID.NGROKC:
        options = [
          <a
            key="ngrokc"
            onClick={() =>
              handleOnDetail({ name: PluginName.NGROKC, titleId: 'plugin.title.ngrokc' })
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
            onClick={() => handleOnDetail({ name: PluginName.CRC, titleId: 'plugin.title.calc' })}
          >
            {formatMessage({ id: 'plugin.button.calc' })}
          </a>,
        ];
        break;
      case PluginUUID.TEL:
        options = [
          <a
            key="tel"
            onClick={() => handleOnDetail({ name: PluginName.TEL, titleId: 'plugin.title.tel' })}
          >
            {formatMessage({ id: 'plugin.button.tel' })}
          </a>,
        ];
        break;
      default:
        options = [];
        break;
    }
    return options;
  };

  const getListColumn = () => {
    let column = 4;

    if (size) {
      if (size?.width < 1500) {
        column = 3;
      }
      if (size?.width < 1200) {
        column = 2;
      }
    }

    return column;
  };

  return (
    <div ref={ref}>
      <PageContainer>
        <ProList<PluginItem>
          rowKey="uuid"
          pagination={false}
          showActions="hover"
          grid={{ gutter: 16, column: getListColumn() }}
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
      <Detail detailConfig={detailConfig} setDetailConfig={setDetailConfig} />
    </div>
  );
};

export default Plugins;
