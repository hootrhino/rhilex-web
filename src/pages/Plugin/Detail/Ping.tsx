import ProLog from '@/components/ProLog';
import { PluginName, PluginUUID } from '@/models/usePlugin';
import { FormItemType } from '@/utils/enum';
import { validateIPv4 } from '@/utils/regExp';
import { validateFormItem } from '@/utils/utils';
import type { ProFormProps } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Button, Input } from 'antd';
import { Rule } from 'antd/es/form';
import { useState } from 'react';

type PingProps = ProFormProps & {
  dataSource: string[];
  uuid: PluginUUID | undefined;
};

const Ping = ({ uuid, dataSource, ...props }: PingProps) => {
  const { run } = useModel('usePlugin');
  const { formatMessage } = useIntl();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnSearch = (value: string) => {
    if (!uuid) return;

    setLoading(true);
    run({ name: PluginName.PING, args: [value], uuid }).then(() => {
      setLoading(false);
      setDisabled(false);
    });
  };

  return (
    <ProForm submitter={false} {...props}>
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
          onSearch={handleOnSearch}
        />
      </ProForm.Item>
      <ProForm.Item name="output" label={formatMessage({ id: 'plugin.form.title.output' })}>
        <ProLog hidePadding topic={`plugin/ICMPSenderPing/${uuid}`} dataSource={dataSource} />
      </ProForm.Item>
    </ProForm>
  );
};

export default Ping;
