import { defaultConfig, PluginName } from '@/models/usePlugin';
import { omit } from '@/utils/redash';
import { handleNewMessage } from '@/utils/utils';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Button, message, Modal, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ClientList from './ClientList';
import ModbusCRC from './CRC';
import Ngrok from './Ngrok';
import Ping from './Ping';
import Scan from './Scan';
import Terminal from './Terminal';

const Detail = () => {
  const formRef = useRef<ProFormInstance>();
  const { latestMessage } = useModel('useWebsocket');
  const { run, setDetailConfig, detailConfig } = useModel('usePlugin');
  const { formatMessage } = useIntl();

  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const [scanLog, setScanLog] = useState<string[]>([]);
  const [pingLog, setPingLog] = useState<string[]>([]);

  const handleOnReset = () => {
    setDetailConfig(defaultConfig);
    setDisabled(false);
    setLoading(false);
    setScanLog([]);
    setPingLog([]);
  };

  const handleOnClose = () => {
    if (
      detailConfig.name === PluginName.START &&
      detailConfig.title === formatMessage({ id: 'plugin.title.terminal' })
    ) {
      // after close terminal
      if (detailConfig.uuid) {
        run({ uuid: detailConfig.uuid, name: PluginName.STOP, args: '' });
      }

      handleOnReset();
    } else {
      handleOnReset();
    }
  };

  // 开始扫描
  const onStart = () => {
    if (!detailConfig.uuid) return;

    let formValues = formRef.current?.getFieldsValue();

    formValues = {
      ...omit(formValues, ['output']),
    };
    const params = {
      uuid: detailConfig.uuid,
      name: PluginName.SCAN,
      args: JSON.stringify(formValues),
    };
    setLoading(true);
    run(params).then(() => {
      setLoading(false);
    });
  };

  // 停止扫描
  const onStop = () => {
    if (!detailConfig.uuid) return;

    setLoading(false);
    run({ uuid: detailConfig.uuid, name: PluginName.STOP, args: '' }).then(() => {
      setDetailConfig({ ...detailConfig, open: true, name: PluginName.STOP, args: '' });
      message.success(formatMessage({ id: 'message.success.stop' }));
    });
  };

  // 计算 CRC
  const onCRC = () => {
    if (!detailConfig.uuid) return;

    const { name, args } = formRef.current?.getFieldsValue();

    run({ uuid: detailConfig.uuid, name, args }).then((res) => {
      const code = (res as Record<string, any>)[0]?.value;
      formRef.current?.setFieldsValue({ code });
    });
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
            <Button key="CRC" type="primary" onClick={onCRC}>
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
            <Button ghost key="stop" type="primary" onClick={onStop}>
              {formatMessage({ id: 'plugin.button.scan.stop' })}
            </Button>
            <Button
              key="start"
              onClick={onStart}
              type="primary"
              loading={loading}
              disabled={disabled}
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

  useEffect(() => {
    const newPingData = handleNewMessage(
      pingLog,
      latestMessage?.data,
      `plugin/ICMPSenderPing/${detailConfig.uuid}`,
    );
    const newScanData = handleNewMessage(
      scanLog,
      latestMessage?.data,
      `plugin/ModbusScanner/${detailConfig.uuid}`,
    );
    setPingLog(newPingData);
    setScanLog(newScanData);
  }, [latestMessage]);

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
      {detailConfig.name === PluginName.CLIENTS && <ClientList uuid={detailConfig.uuid} />}
      {detailConfig.name === PluginName.START && <Terminal />}
      {detailConfig.name === PluginName.PING && (
        <Ping formRef={formRef} dataSource={pingLog} uuid={detailConfig.uuid} />
      )}
      {detailConfig.name === PluginName.CRC && <ModbusCRC formRef={formRef} />}
      {detailConfig.name && [PluginName.SCAN, PluginName.STOP].includes(detailConfig.name) && (
        <Scan formRef={formRef} uuid={detailConfig.uuid} dataSource={scanLog} />
      )}
    </Modal>
  );
};

export default Detail;
