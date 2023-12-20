import { LogItem } from '@/models/useWebsocket';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Modal, Space } from 'antd';
import omit from 'lodash/omit';
import { useEffect, useRef, useState } from 'react';
import ClientList from './ClientList';
import Ping from './Ping';
import Scan from './Scan';
import Terminal from './Terminal';

const Detail = () => {
  const formRef = useRef<ProFormInstance>();
  const {
    run,
    errorData,
    setDetailConfig,
    detailConfig,
    setLoading,
    loading,
    disabled,
    setDisabled,
  } = useModel('usePlugin');
  const { latestMessage } = useModel('useWebsocket');

  const [logData, setLogData] = useState<LogItem[]>([]);

  const handleOnLoading = (output: string) => {
    setLogData([]);
    setTimeout(() => {
      formRef.current?.setFieldsValue({
        output,
      });
    }, 200);
  };

  const handleOnClose = () => {
    setDetailConfig({ open: false, name: '', uuid: '', args: '', title: '' });
    setDisabled(false);
    setLoading(false);
    setLogData([]);
  };

  // 开始扫描
  const onStart = () => {
    let formValues = formRef.current?.getFieldsValue();

    formValues = {
      ...omit(formValues, ['output']),
    };
    const params = {
      uuid: detailConfig.uuid,
      name: 'scan',
      args: JSON.stringify(formValues),
    };
    setLoading(true);
    handleOnLoading(`SCANNING...`);
    setTimeout(() => {
      run(params);
    }, 2000);
  };

  // 停止扫描
  const onStop = () => {
    setLoading(false);
    run({ uuid: detailConfig.uuid, name: 'stop', args: '' });
    setDetailConfig({ ...detailConfig, open: true, name: 'stop', args: '' });
  };

  const renderSubmitter = () => {
    if (detailConfig.name === 'ping') return false;
    return (
      <Space>
        <Button key="start" onClick={onStart} type="primary" loading={loading} disabled={disabled}>
          开始扫描
        </Button>
        <Button key="stop" onClick={onStop}>
          停止扫描
        </Button>
      </Space>
    );
  };

  const getTopic = (name: string) => {
    let topic = '';
    if (name === 'ping') {
      topic = `plugin/ICMPSenderPing/${detailConfig.uuid}`;
    }
    if (name === 'scan') {
      topic = `plugin/ModbusScanner/${detailConfig.uuid}`;
    }
    return topic;
  };

  useEffect(() => {
    const topic = getTopic(detailConfig.name);

    const filterLogs = logData
      ?.filter((log) => log?.topic === topic)
      ?.map((item: LogItem) => item?.msg);
    formRef.current?.setFieldsValue({
      output:
        errorData?.length > 0 ? errorData.concat(filterLogs).join('\n') : filterLogs?.join('/n'),
    });
  }, [logData, errorData, detailConfig.name]);

  useEffect(() => {
    if (latestMessage !== undefined) {
      const newLog = JSON.parse(latestMessage?.data);
      setLogData(logData.concat(newLog));
    }
  }, [latestMessage]);

  return ['clients', 'start'].includes(detailConfig.name) ? (
    <Modal
      width="60%"
      destroyOnClose
      maskClosable={false}
      footer={
        <Button type="primary" onClick={handleOnClose}>
          关闭
        </Button>
      }
      onCancel={handleOnClose}
      {...detailConfig}
    >
      {detailConfig.name === 'clients' && <ClientList />}
      {detailConfig.name === 'start' && <Terminal />}
    </Modal>
  ) : (
    <ModalForm
      {...detailConfig}
      formRef={formRef}
      submitter={{
        render: renderSubmitter,
      }}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
        onCancel: handleOnClose,
      }}
      onOpenChange={(visible) => setDetailConfig({ ...detailConfig, open: visible })}
    >
      {detailConfig.name === 'ping' && <Ping onLoading={handleOnLoading} />}
      {['scan', 'stop'].includes(detailConfig.name) && <Scan />}
    </ModalForm>
  );
};

export default Detail;
