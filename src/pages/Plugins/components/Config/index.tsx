import { postPluginService } from '@/services/rulex/chajianguanli';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import { ModalForm } from '@ant-design/pro-components';

import { Button, Space } from 'antd';
import omit from 'lodash/omit';
import { useRef, useState } from 'react';
import { useModel, useRequest } from 'umi';
import Ping from './Ping';
import Scanner from './Scanner';

type DebugProps = ModalFormProps & {
  uuid: string;
  type: 'PING' | 'SCANNER';
  onClose?: () => void;
};

const ConfigModal = ({ uuid, type, onClose, ...props }: DebugProps) => {
  const formRef = useRef<ProFormInstance>();
  const { logs } = useModel('useWebsocket');
  const { dataSource } = useModel('useSystem');
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [scanType, setType] = useState<'start' | 'stop'>('start');

  const isWindows = dataSource?.hardWareInfo?.osArch?.includes('windows');

  const getOutput = (topic: string) => {
    const filterLogs = logs?.filter((log) => log?.topic === topic)?.map((item) => item?.msg);
    return filterLogs?.length > 0 ? filterLogs?.join('\n') : '';
  };

  const { run } = useRequest((values) => postPluginService({ ...values, uuid }), {
    manual: true,
    onSuccess: () => {
      let outputData;

      if (type === 'PING') {
        outputData = getOutput(`plugin/ICMPSenderPing/${uuid}`);
        setLoading(false);
      } else if (type === 'SCANNER' && scanType === 'start') {
        outputData = getOutput(`plugin/ModbusScanner/${uuid}`);
        setLoading(false);
        setDisabled(true);
      } else {
        outputData = '';
        setDisabled(false);
      }

      formRef.current?.setFieldsValue({
        output: outputData,
      });
    },
  });

  // 测速
  const handleOnSearch = (value: string) => {
    formRef.current?.setFieldsValue({ output: `PING ${value}...` });
    setTimeout(() => {
      run({ name: 'ping', args: [value] });
    }, 2000);
  };

  // 开始扫描
  const onStart = () => {
    let formValues = formRef.current?.getFieldsValue();
    formValues = {
      ...omit(formValues, ['output']),
      baudRate: Number(formValues.baudRate),
      dataBits: Number(formValues.dataBits),
      stopBits: Number(formValues.stopBits),
    };
    const params = {
      name: 'scan',
      args: JSON.stringify(formValues),
    };
    setLoading(true);
    setType('start');
    formRef.current?.setFieldsValue({ output: `SCANNING...` });
    setTimeout(() => {
      run(params);
    }, 2000);
  };

  // 停止扫描
  const onStop = () => {
    const params = {
      name: 'stop',
      args: '',
    };
    run(params);
    setType('stop');
  };

  const renderSubmitter = () => {
    if (type === 'PING') {
      return [
        <Button key="close" onClick={onClose} type="primary">
          关闭
        </Button>,
      ];
    } else {
      return (
        <Space>
          <Button
            key="start"
            onClick={onStart}
            type="primary"
            loading={loading}
            disabled={disabled}
          >
            开始扫描
          </Button>
          <Button key="stop" onClick={onStop} disabled={!disabled}>
            停止扫描
          </Button>
        </Space>
      );
    }
  };

  return (
    <ModalForm
      formRef={formRef}
      title={type === 'PING' ? '网络测速' : 'Modbus 扫描仪'}
      submitter={{
        render: renderSubmitter,
      }}
      initialValues={{
        timeout: 3000,
        baudRate: '9600',
        dataBits: '8',
        stopBits: '1',
        parity: 'N',
        uart: isWindows ? 'COM1' : '/dev/ttyS1',
      }}
      {...props}
    >
      {type === 'PING' ? (
        <Ping onSearch={handleOnSearch} loading={loading} onLoading={setLoading} />
      ) : (
        <Scanner />
      )}
    </ModalForm>
  );
};

export default ConfigModal;
