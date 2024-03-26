import ProLog from '@/components/ProLog';
import { getHwifaceList } from '@/services/rulex/jiekouguanli';
import { omit } from '@/utils/redash';
import { handleNewMessage } from '@/utils/utils';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProForm, ProFormSelect } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, message, Modal, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ClientList from './ClientList';
import Ping from './Ping';
import Terminal from './Terminal';

const Detail = () => {
  const formRef = useRef<ProFormInstance>();
  const { latestMessage } = useModel('useWebsocket');
  const { run, setDetailConfig, detailConfig } = useModel('usePlugin');
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const [scanLog, setScanLog] = useState<string[]>([]);
  const [pingLog, setPingLog] = useState<string[]>([]);

  const handleOnReset = () => {
    setDetailConfig({ open: false, name: '', uuid: '', args: '', title: '' });
    setDisabled(false);
    setLoading(false);
    setScanLog([]);
    setPingLog([]);
  };

  const handleOnClose = () => {
    if (detailConfig.name === 'start' && detailConfig.title === '终端') {
      // after close terminal
      run({ uuid: detailConfig.uuid, name: 'stop', args: '' });
      handleOnReset();
    } else {
      handleOnReset();
    }
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
      {detailConfig.name === 'ping' && <Ping dataSource={pingLog} uuid={detailConfig.uuid} />}
      {['scan', 'stop'].includes(detailConfig.name) && (
        <>
          <ProFormSelect
            name="portUuid"
            label="系统串口"
            request={async () => {
              const { data } = await getHwifaceList();

              return data?.map((item) => ({
                label: (
                  <Space>
                    <span>{item?.name}</span>
                    <span className="text-[12px] text-[#000000A6]">{item?.alias}</span>
                  </Space>
                ),
                value: item.uuid,
              }));
            }}
          />
          <ProForm.Item name="output" label="输出结果">
            <ProLog
              hidePadding
              topic={`plugin/ModbusScanner/${detailConfig.uuid}`}
              dataSource={scanLog}
            />
          </ProForm.Item>
        </>
      )}
    </ModalForm>
  );
};

export default Detail;
