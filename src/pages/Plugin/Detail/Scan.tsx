import type { LogRef } from '@/components/ProLog';
import ProLog from '@/components/ProLog';
import { baudRateEnum, dataBitsEnum, parityEnum, stopBitsEnum } from '@/pages/Device/enum';
import { postPlugwareService } from '@/services/rhilex/chajianguanli';
import { getHwifaceList } from '@/services/rhilex/jiekouguanli';
import { omit } from '@/utils/redash';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormDigit, ProFormSelect } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import type { ModalFuncProps } from 'antd';
import { Button, Flex, message, Modal } from 'antd';
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

  const [loading, setLoading] = useState<boolean>(false);

  // 开始扫描
  const handleOnStart = () => {
    setLoading(true);

    formRef.current
      ?.validateFields()
      .then(async (values) => {
        const argVals = { ...omit(values, ['output']) };

        const params = {
          uuid: PluginUUID.SCANNER,
          name: PluginName.SCAN,
          args: JSON.stringify(argVals),
        };
        await postPlugwareService(params);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
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
    <Button key="start" onClick={handleOnStart} type="primary" loading={loading}>
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
      <ProForm
        formRef={formRef}
        submitter={false}
        initialValues={{ timeout: 3000, baudRate: 9600, dataBits: 8, parity: 'N', stopBits: 1 }}
      >
        <Flex gap="middle" wrap>
          <ProFormDigit
            name="timeout"
            label={formatMessage({ id: 'form.title.timeout' })}
            width="sm"
            placeholder={formatMessage(
              { id: 'placeholder.input' },
              { text: formatMessage({ id: 'form.title.timeout' }) },
            )}
            rules={[
              {
                required: true,
                message: formatMessage(
                  { id: 'placeholder.input' },
                  { text: formatMessage({ id: 'form.title.timeout' }) },
                ),
              },
            ]}
            fieldProps={{ addonAfter: 'ms' }}
          />
          <ProFormSelect
            label={formatMessage({ id: 'form.title.baudRate' })}
            name="baudRate"
            width="sm"
            valueEnum={baudRateEnum}
            allowClear={false}
            placeholder={formatMessage(
              { id: 'placeholder.select' },
              { text: formatMessage({ id: 'form.title.baudRate' }) },
            )}
            rules={[
              {
                required: true,
                message: formatMessage(
                  { id: 'placeholder.select' },
                  { text: formatMessage({ id: 'form.title.baudRate' }) },
                ),
              },
            ]}
          />
          <ProFormSelect
            label={formatMessage({ id: 'form.title.dataBits' })}
            name="dataBits"
            width="sm"
            allowClear={false}
            valueEnum={dataBitsEnum}
            placeholder={formatMessage(
              { id: 'placeholder.select' },
              { text: formatMessage({ id: 'form.title.dataBits' }) },
            )}
            rules={[
              {
                required: true,
                message: formatMessage(
                  { id: 'placeholder.select' },
                  { text: formatMessage({ id: 'form.title.dataBits' }) },
                ),
              },
            ]}
          />

          <ProFormSelect
            label={formatMessage({ id: 'form.title.parity' })}
            name="parity"
            width="sm"
            allowClear={false}
            valueEnum={parityEnum}
            placeholder={formatMessage(
              { id: 'placeholder.select' },
              { text: formatMessage({ id: 'form.title.parity' }) },
            )}
            rules={[
              {
                required: true,
                message: formatMessage(
                  { id: 'placeholder.select' },
                  { text: formatMessage({ id: 'form.title.parity' }) },
                ),
              },
            ]}
          />
          <ProFormSelect
            label={formatMessage({ id: 'form.title.stopBits' })}
            name="stopBits"
            width="sm"
            allowClear={false}
            valueEnum={stopBitsEnum}
            placeholder={formatMessage(
              { id: 'placeholder.select' },
              { text: formatMessage({ id: 'form.title.stopBits' }) },
            )}
            rules={[
              {
                required: true,
                message: formatMessage(
                  { id: 'placeholder.select' },
                  { text: formatMessage({ id: 'form.title.stopBits' }) },
                ),
              },
            ]}
          />
          <ProFormSelect
            label={formatMessage({ id: 'form.title.uart' })}
            name="uart"
            width="sm"
            placeholder={formatMessage(
              { id: 'placeholder.select' },
              { text: formatMessage({ id: 'form.title.uart' }) },
            )}
            request={async () => {
              const { data } = await getHwifaceList();
              return data.map((item) => ({ label: item.name, value: item.name }));
            }}
            rules={[
              {
                required: true,
                message: formatMessage(
                  { id: 'placeholder.select' },
                  { text: formatMessage({ id: 'form.title.uart' }) },
                ),
              },
            ]}
          />
        </Flex>
        <ProForm.Item name="output" label={formatMessage({ id: 'plugin.form.title.output' })}>
          <ProLog topic={`plugin/ModbusScanner/${PluginUUID.SCANNER}`} ref={logRef} />
        </ProForm.Item>
      </ProForm>
    </Modal>
  );
};

export default Scan;
