import { postPlugwareService } from '@/services/rulex/chajianguanli';
import { omit } from '@/utils/redash';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { Button, message, Modal, Space } from 'antd';
import { useRef, useState } from 'react';
import { defaultConfig } from '..';
import { PluginName, PluginUUID } from '../enum';
import type { PluginConfig, PluginParams } from '../typings';
import ClientList from './ClientList';
import ModbusCRC from './CRC';
import Ngrok from './Ngrok';
import Ping from './Ping';
import Scan from './Scan';
import Terminal from './Terminal';

type DetailProps = {
  detailConfig: PluginConfig;
  setDetailConfig: (value: PluginConfig) => void;
};

const Detail = ({ detailConfig, setDetailConfig }: DetailProps) => {
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();

  const [scanLog, setScanLog] = useState<string[]>([]);
  const [pingLog, setPingLog] = useState<string[]>([]);

  // 开始扫描
  const { run: onStart, loading: startLoading } = useRequest(
    (params: PluginParams) => postPlugwareService(params),
    {
      manual: true,
    },
  );

  const handleOnStart = () => {
    let formValues = formRef.current?.getFieldsValue();

    formValues = {
      ...omit(formValues, ['output']),
    };
    const params = {
      uuid: PluginUUID.SCANNER,
      name: PluginName.SCAN,
      args: JSON.stringify(formValues),
    };

    onStart(params);
  };

  // 停止扫描
  const { run: onStop, loading: stopLoading } = useRequest(
    (params: PluginParams) => postPlugwareService(params),
    {
      manual: true,
      onSuccess: () => {
        setDetailConfig({ ...detailConfig, open: true, name: PluginName.STOP, args: '' });
        message.success(formatMessage({ id: 'message.success.stop' }));
      },
    },
  );

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
    setScanLog([]);
    setPingLog([]);
  };

  const renderFooter = (name: PluginName | undefined) => {
    let footer: React.ReactNode | false;

    switch (name) {
      case PluginName.NGROKC:
      case PluginName.CLIENTS:
      case PluginName.PING:
      case PluginName.START:
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
      case PluginName.SCAN:
      case PluginName.STOP:
        footer = (
          <Space>
            <Button onClick={handleOnClose}>{formatMessage({ id: 'button.close' })}</Button>
            <Button
              ghost
              key="stop"
              type="primary"
              loading={stopLoading}
              onClick={() => onStop({ uuid: PluginUUID.SCANNER, name: PluginName.STOP, args: '' })}
            >
              {formatMessage({ id: 'plugin.button.scan.stop' })}
            </Button>
            <Button
              key="start"
              onClick={handleOnStart}
              type="primary"
              loading={startLoading}
              disabled={!formRef.current?.getFieldValue('portUuid')}
            >
              {formatMessage({ id: 'plugin.button.scan.start' })}
            </Button>
          </Space>
        );
      default:
        break;
    }

    return footer;
  };

  return (
    <Modal
      width="50%"
      destroyOnClose
      maskClosable={false}
      footer={() => renderFooter(detailConfig.name)}
      onCancel={handleOnClose}
      {...detailConfig}
    >
      {detailConfig.name === PluginName.NGROKC && <Ngrok />}
      {detailConfig.name === PluginName.CLIENTS && (
        <ClientList changeDetailConfig={setDetailConfig} />
      )}
      {detailConfig.name === PluginName.START && <Terminal />}
      {detailConfig.name === PluginName.PING && (
        <Ping formRef={formRef} dataSource={pingLog} changeData={setPingLog} />
      )}
      {detailConfig.name === PluginName.CRC && <ModbusCRC formRef={formRef} />}
      {detailConfig.name && [PluginName.SCAN, PluginName.STOP].includes(detailConfig.name) && (
        <Scan formRef={formRef} dataSource={scanLog} changeData={setScanLog} />
      )}
    </Modal>
  );
};

export default Detail;
