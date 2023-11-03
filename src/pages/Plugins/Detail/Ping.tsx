import CodeEditor from '@/components/CodeEditor';
import { validateIPv4 } from '@/utils/utils';
import { ProForm } from '@ant-design/pro-components';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';

type PingProps = {
  onLoading: (value: string) => void;
};

const Ping = ({ onLoading }: PingProps) => {
  const { run, detailConfig, loading, setLoading } = useModel('usePlugin');
  const [disabled, setDisabled] = useState<boolean>(true);

  // 测速
  const handleOnSearch = (ip: string) => {
    onLoading(`PING ${ip}...`);
    setTimeout(() => {
      run({ name: 'ping', args: [ip], uuid: detailConfig.uuid });
    }, 2000);
  };

  return (
    <>
      <ProForm.Item
        name="ip"
        label="地址"
        rules={[
          () => ({
            validator(_, value) {
              if (!value) {
                setDisabled(true);
                return Promise.resolve();
              } else {
                try {
                  if (!validateIPv4(value)) {
                    return Promise.reject(new Error('IP格式不正确，请检查'));
                  } else {
                    setDisabled(false);
                    return Promise.resolve();
                  }
                } catch (error) {
                  return Promise.reject(new Error('IP格式不正确，请检查'));
                }
              }
            },
          }),
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
            handleOnSearch(value);
          }}
        />
      </ProForm.Item>
      <ProForm.Item name="output" label="输出">
        <CodeEditor readOnly />
      </ProForm.Item>
    </>
  );
};

export default Ping;
