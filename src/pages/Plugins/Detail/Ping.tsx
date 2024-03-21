import ProOutputList from '@/components/ProOutputList';
import { validateIPv4 } from '@/utils/regExp';
import { ProForm } from '@ant-design/pro-components';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';

type PingProps = {
  showOutput: boolean;
  uuid: string;
  handleShow: (value: boolean) => void;
};

const Ping = ({ showOutput, uuid, handleShow }: PingProps) => {
  const { run, detailConfig } = useModel('usePlugin');
  const {
    topicData: { pingLog },
  } = useModel('useWebsocket');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

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
            run({ name: 'ping', args: [value], uuid: detailConfig.uuid }).then(() => {
              handleShow(true);
              setLoading(false);
              setDisabled(false);
            });
          }}
        />
      </ProForm.Item>
      <ProOutputList
        showOutput={showOutput}
        data={pingLog}
        topic={`plugin/ICMPSenderPing/${uuid}`}
      />
    </>
  );
};

export default Ping;
