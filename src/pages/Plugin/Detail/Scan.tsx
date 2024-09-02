import type { LogRef } from '@/components/ProLog';
import ProLog from '@/components/ProLog';
import { postPlugwareService } from '@/services/rhilex/chajianguanli';
import { getHwifaceList } from '@/services/rhilex/jiekouguanli';
import { omit } from '@/utils/redash';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import type { ModalFuncProps } from 'antd';
import { Button, message, Modal, Space } from 'antd';
import { useRef, useState } from 'react';
import type { DetailProps } from '.';
import { defaultConfig } from '..';
import { PluginName, PluginUUID } from '../enum';
import type { PluginParams } from '../typings';

type ScanProps = ModalFuncProps & DetailProps;

const Scan = ({ detailConfig, setDetailConfig }: ScanProps) => {
  const formRef = useRef<ProFormInstance>();
  const logRef = useRef<LogRef>(null);
  const { formatMessage } = useIntl();

  const [disabled, setDisabled] = useState<boolean>(true);

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

  const handleOnClose = () => {
    setDetailConfig(defaultConfig);
    logRef.current?.clearLog();
  };

  const renderSubmitter = () => [
    <Button key="close" onClick={handleOnClose}>
      {formatMessage({ id: 'button.close' })}
    </Button>,
    <Button
      ghost
      key="stop"
      type="primary"
      loading={stopLoading}
      onClick={() => onStop({ uuid: PluginUUID.SCANNER, name: PluginName.STOP, args: '' })}
    >
      {formatMessage({ id: 'plugin.button.scan.stop' })}
    </Button>,
    <Button
      key="start"
      onClick={handleOnStart}
      type="primary"
      loading={startLoading}
      disabled={disabled}
    >
      {formatMessage({ id: 'plugin.button.scan.start' })}
    </Button>,
  ];

  return (
    <Modal
      width="50%"
      destroyOnClose
      maskClosable={false}
      footer={renderSubmitter}
      onCancel={handleOnClose}
      styles={{ body: { height: 630, overflow: 'auto' } }}
      {...detailConfig}
    >
      <ProForm formRef={formRef} submitter={false}>
        <ProFormSelect
          name="portUuid"
          label={formatMessage({ id: 'plugin.form.title.portUuid' })}
          fieldProps={{
            optionRender: (option) => (
              <Space>
                <span>{option?.label}</span>
                <span className="text-[12px] text-[#000000A6]">{option?.value}</span>
              </Space>
            ),
          }}
          request={async () => {
            const { data } = await getHwifaceList();

            return data.map((item) => ({ label: item.name, value: item.uuid }));
          }}
          onChange={(value) => setDisabled(!value)}
        />
        <ProForm.Item name="output" label={formatMessage({ id: 'plugin.form.title.output' })}>
          <ProLog topic={`plugin/ModbusScanner/${PluginUUID.SCANNER}`} ref={logRef} />
        </ProForm.Item>
      </ProForm>
    </Modal>
  );
};

export default Scan;
