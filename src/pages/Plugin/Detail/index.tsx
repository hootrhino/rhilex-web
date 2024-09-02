import { postPlugwareService } from '@/services/rhilex/chajianguanli';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { Button, Modal, Space } from 'antd';
import { useRef } from 'react';
import { defaultConfig } from '..';
import { PluginName, PluginUUID } from '../enum';
import type { PluginConfig, PluginParams } from '../typings';
import ClientList from './ClientList';
import ModbusCRC from './CRC';
import Ngrok from './Ngrok';
import Ping from './Ping';
import Scan from './Scan';
import TelemetryProtocol from './Telemetry';
import Terminal from './Terminal';

export type DetailProps = {
  detailConfig: PluginConfig;
  setDetailConfig: (value: PluginConfig) => void;
};

const Detail = ({ detailConfig, setDetailConfig }: DetailProps) => {
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();

  // 计算 CRC
  const { run: onCRC, loading: crcLoading } = useRequest(
    (params: PluginParams) => postPlugwareService(params),
    {
      manual: true,
      onSuccess: (res) => {
        const code = (res as Record<string, any>)[0]?.value;
        formRef.current?.setFieldsValue({ code });
      },
    },
  );

  // Terminal
  const { run: onTerminal } = useRequest(
    () => postPlugwareService({ uuid: PluginUUID.TERMINAL, name: PluginName.STOP, args: '' }),
    {
      manual: true,
    },
  );

  const handleOnClose = () => {
    if (
      detailConfig.name === PluginName.START &&
      detailConfig.title === formatMessage({ id: 'plugin.title.terminal' })
    ) {
      // after close terminal
      onTerminal();
    }

    setDetailConfig(defaultConfig);
  };

  const renderFooter = (name: PluginName | undefined) => {
    let footer: React.ReactNode | false;

    switch (name) {
      case PluginName.NGROKC:
      case PluginName.CLIENTS:
      case PluginName.START:
      case PluginName.TEL:
        footer = (
          <Button type="primary" onClick={handleOnClose}>
            {formatMessage({ id: 'button.close' })}
          </Button>
        );
        break;
      case PluginName.CRC:
        footer = (
          <Space>
            <Button onClick={handleOnClose}>{formatMessage({ id: 'button.close' })}</Button>
            <Button
              key="CRC"
              type="primary"
              loading={crcLoading}
              onClick={() => {
                const { name, args } = formRef.current?.getFieldsValue();
                onCRC({ uuid: PluginUUID.CRC, name, args });
              }}
            >
              {formatMessage({ id: 'plugin.button.calc' })}
            </Button>
          </Space>
        );
        break;
      default:
        break;
    }

    return footer;
  };

  const renderDetail = () => {
    if (detailConfig.name && [PluginName.SCAN, PluginName.STOP].includes(detailConfig.name)) {
      return <Scan detailConfig={detailConfig} setDetailConfig={setDetailConfig} />;
    }
    if (detailConfig.name === PluginName.PING) {
      return <Ping detailConfig={detailConfig} setDetailConfig={setDetailConfig} />;
    }

    return (
      <Modal
        width="50%"
        destroyOnClose
        maskClosable={false}
        footer={() => renderFooter(detailConfig.name)}
        onCancel={handleOnClose}
        styles={{ body: { height: 630, overflow: 'auto' } }}
        {...detailConfig}
      >
        {detailConfig.name === PluginName.NGROKC && <Ngrok />}
        {detailConfig.name === PluginName.CLIENTS && <ClientList />}
        {detailConfig.name === PluginName.START && <Terminal />}
        {detailConfig.name === PluginName.CRC && <ModbusCRC formRef={formRef} />}
        {detailConfig.name === PluginName.TEL && <TelemetryProtocol />}
      </Modal>
    );
  };

  return renderDetail();
};

export default Detail;
