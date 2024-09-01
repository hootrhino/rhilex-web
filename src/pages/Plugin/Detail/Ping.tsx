import type { LogRef } from '@/components/ProLog';
import ProLog from '@/components/ProLog';
import { postPlugwareService } from '@/services/rulex/chajianguanli';
import { FormItemType } from '@/utils/enum';
import { validateIPv4 } from '@/utils/regExp';
import { validateFormItem } from '@/utils/utils';
import { ProForm } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import type { ModalFuncProps } from 'antd';
import { Button, Input, Modal } from 'antd';
import { Rule } from 'antd/es/form';
import { useRef, useState } from 'react';
import type { DetailProps } from '.';
import { defaultConfig } from '..';
import { PluginName, PluginUUID } from '../enum';
import type { PluginParams } from '../typings';

type PingProps = ModalFuncProps & DetailProps;

const Ping = ({ detailConfig, setDetailConfig }: PingProps) => {
  const { formatMessage } = useIntl();
  const logRef = useRef<LogRef>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  const { run: onSearch, loading: loading } = useRequest(
    (params: PluginParams) => postPlugwareService(params),
    {
      manual: true,
      onSuccess: () => setDisabled(false),
    },
  );

  const handleOnClose = () => {
    setDetailConfig(defaultConfig);
    logRef.current?.clearLog();
  };

  return (
    <Modal
      width="50%"
      destroyOnClose
      maskClosable={false}
      footer={() => (
        <Button type="primary" onClick={handleOnClose}>
          {formatMessage({ id: 'button.close' })}
        </Button>
      )}
      onCancel={handleOnClose}
      styles={{ body: { height: 630, overflow: 'auto' } }}
      {...detailConfig}
    >
      <ProForm submitter={false} initialValues={{ ip: '127.0.0.0' }}>
        <ProForm.Item
          name="ip"
          label={formatMessage({ id: 'plugin.form.title.ip' })}
          rules={[
            {
              validator: (_rule: Rule, value: string) => {
                setDisabled(!validateIPv4(value));

                return validateFormItem(value, FormItemType.IP);
              },
            },
          ]}
        >
          <Input.Search
            placeholder={formatMessage({ id: 'plugin.form.placeholder.ip' })}
            enterButton={
              <Button type="primary" disabled={disabled} loading={loading}>
                {formatMessage({ id: 'button.test' })}
              </Button>
            }
            size="large"
            onSearch={(value: string) =>
              onSearch({ uuid: PluginUUID.ICMP, name: PluginName.PING, args: [value] })
            }
          />
        </ProForm.Item>
        <ProForm.Item name="output" label={formatMessage({ id: 'plugin.form.title.output' })}>
          <ProLog topic={`plugin/ICMPSenderPing/${PluginUUID.ICMP}`} ref={logRef} />
        </ProForm.Item>
      </ProForm>
    </Modal>
  );
};

export default Ping;
