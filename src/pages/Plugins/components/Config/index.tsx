import { postPluginService } from '@/services/rulex/chajianguanli';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import { ModalForm } from '@ant-design/pro-components';

import { LogItem } from '@/models/useWebsocket';
import { Button, Space } from 'antd';
import omit from 'lodash/omit';
import { useEffect, useRef, useState } from 'react';
import { useModel, useRequest } from 'umi';
import Ping from './Ping';
import Scanner from './Scanner';

type ConfigProps = ModalFormProps & {
  uuid: string;
  type: 'PING' | 'SCANNER';
  onClose: () => void;
};

const Config = ({ uuid, type, onClose, ...props }: ConfigProps) => {
  const formRef = useRef<ProFormInstance>();
  const { currentLog } = useModel('useWebsocket');
  const { dataSource } = useModel('useSystem');
  const [logData, setData] = useState<LogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [scanType, setType] = useState<'start' | 'stop'>('start');

  const isWindows = dataSource?.hardWareInfo?.osArch?.includes('windows');

  const { run } = useRequest((values) => postPluginService({ ...values, uuid }), {
    manual: true,
    onSuccess: () => {
      if (type === 'PING') {
        setLoading(false);
      } else if (type === 'SCANNER' && scanType === 'start') {
        setLoading(false);
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    },
  });

  const handleOnLoading = (ip?: string) => {
    setData([]);
    setTimeout(() => {
      formRef.current?.setFieldsValue({
        output: type === 'PING' ? `PING ${ip}...` : `SCANNING...`,
      });
    }, 200);
  };

  // 测速
  const handleOnSearch = (ip: string) => {
    handleOnLoading(ip);
    setTimeout(() => {
      run({ name: 'ping', args: [ip] });
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
    handleOnLoading();
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

  useEffect(() => {
    const topic =
      type === 'PING' ? `plugin/ICMPSenderPing/${uuid}` : `plugin/ModbusScanner/${uuid}`;
    const filterLogs = logData
      ?.filter((log) => log?.topic === topic)
      ?.map((item: LogItem) => item?.msg);

    formRef.current?.setFieldsValue({
      output: filterLogs?.length > 0 ? filterLogs?.join('\n') : '',
    });
  }, [logData, type]);

  useEffect(() => {
    if (currentLog !== undefined) {
      setData(logData.concat(currentLog));
    }
  }, [currentLog]);

  return (
    <ModalForm
      formRef={formRef}
      title={type === 'PING' ? '网络测速' : 'Modbus 扫描仪'}
      submitter={{
        render: renderSubmitter,
      }}
      modalProps={{
        destroyOnClose: true,
        afterClose: () => {
          setDisabled(false);
          setLoading(false);
          setData([]);
        },
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

export default Config;
