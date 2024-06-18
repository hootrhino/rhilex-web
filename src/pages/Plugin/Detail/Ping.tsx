import ProLog from '@/components/ProLog';
import { postPlugwareService } from '@/services/rulex/chajianguanli';
import { FormItemType } from '@/utils/enum';
import { validateIPv4 } from '@/utils/regExp';
import { handleNewMessage, validateFormItem } from '@/utils/utils';
import type { ProFormProps } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import { Button, Input } from 'antd';
import { Rule } from 'antd/es/form';
import { useEffect, useState } from 'react';
import { PluginName, PluginUUID } from '../enum';
import type { PluginParams } from '../typings';

type PingProps = ProFormProps & {
  dataSource: string[];
  changeData: (value: string[]) => void;
};

const Ping = ({ dataSource, changeData, ...props }: PingProps) => {
  const { latestMessage } = useModel('useWebsocket');
  const { formatMessage } = useIntl();
  const [disabled, setDisabled] = useState<boolean>(true);

  const { run: onSearch, loading: loading } = useRequest(
    (params: PluginParams) => postPlugwareService(params),
    {
      manual: true,
      onSuccess: () => setDisabled(false),
    },
  );

  useEffect(() => {
    const newPingData = handleNewMessage(
      dataSource,
      latestMessage?.data,
      `plugin/ICMPSenderPing/${PluginUUID.ICMP}`,
    );

    changeData(newPingData);
  }, [latestMessage]);

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
          onSearch={(value: string) =>
            onSearch({ uuid: PluginUUID.ICMP, name: PluginName.PING, args: [value] })
          }
        />
      </ProForm.Item>
      <ProForm.Item name="output" label={formatMessage({ id: 'plugin.form.title.output' })}>
        <ProLog
          hidePadding
          topic={`plugin/ICMPSenderPing/${PluginUUID.ICMP}`}
          dataSource={dataSource}
        />
      </ProForm.Item>
    </ProForm>
  );
};

export default Ping;
