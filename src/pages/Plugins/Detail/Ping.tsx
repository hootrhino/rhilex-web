import ProLog from '@/components/ProLog';
import { FormItemType } from '@/utils/enum';
import { validateFormItem } from '@/utils/utils';
import { ProForm } from '@ant-design/pro-components';
import { Button, Input } from 'antd';
import { Rule } from 'antd/es/form';
import { useState } from 'react';
import { useModel } from 'umi';

type PingProps = {
  dataSource: string[];
  uuid: string;
};

const Ping = ({ uuid, dataSource }: PingProps) => {
  const { run, detailConfig } = useModel('usePlugin');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <ProForm.Item
        name="ip"
        label="地址"
        rules={[
          {
            validator: (_rule: Rule, value: string) => validateFormItem(value, FormItemType.IP),
          },
        ]}
      >
        <Input.Search
          placeholder="请输入地址"
          enterButton={
            <Button type="primary" disabled={disabled} loading={loading}>
              测试
            </Button>
          }
          size="large"
          onSearch={(value: string) => {
            setLoading(true);
            run({ name: 'ping', args: [value], uuid: detailConfig.uuid }).then(() => {
              setLoading(false);
              setDisabled(false);
            });
          }}
        />
      </ProForm.Item>
      <ProForm.Item name="output" label="输出结果">
        <ProLog hidePadding topic={`plugin/ICMPSenderPing/${uuid}`} dataSource={dataSource} />
      </ProForm.Item>
    </>
  );
};

export default Ping;
