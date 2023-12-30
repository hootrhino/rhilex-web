import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, message, Modal, Space } from 'antd';
import omit from 'lodash/omit';
import { useRef, useState } from 'react';
import ClientList from './ClientList';
import Ping from './Ping';
import Scan from './Scan';
import Terminal from './Terminal';

const Detail = () => {
  const formRef = useRef<ProFormInstance>();
  const { run, setDetailConfig, detailConfig } = useModel('usePlugin');

  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleOnClose = () => {
    setDetailConfig({ open: false, name: '', uuid: '', args: '', title: '' });
    setDisabled(false);
    setLoading(false);
    setShowOutput(false);
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
    run(params).then(() => {
      setLoading(false);
      setShowOutput(true);
    });
  };

  // 停止扫描
  const onStop = () => {
    setLoading(false);
    run({ uuid: detailConfig.uuid, name: 'stop', args: '' }).then(() => {
      setDetailConfig({ ...detailConfig, open: true, name: 'stop', args: '' });
      message.success('停止成功');
    });
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
      {detailConfig.name === 'ping' && (
        <Ping
          showOutput={showOutput}
          uuid={detailConfig.uuid}
          handleShow={(value) => setShowOutput(value)}
        />
      )}
      {['scan', 'stop'].includes(detailConfig.name) && (
        <Scan showOutput={showOutput} uuid={detailConfig.uuid} />
      )}
    </ModalForm>
  );
};

export default Detail;
