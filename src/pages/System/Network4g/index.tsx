import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import APNConfig from './Apn';
import FourGConfig from './FourG';

const Network4GConfig = () => {
  return (
    <ProCard split="vertical" title="4G 网络">
      <ProCard
        colSpan="60%"
        title={
          <Space>
            <span>APN 配置</span>
            <Tag icon={<ExclamationCircleOutlined />} color="warning">
              此配置项属于高级网络功能，配置不当会造成设备断网，请谨慎操作
            </Tag>
          </Space>
        }
      >
        <APNConfig />
      </ProCard>
      <ProCard title="4G 配置" colSpan="40%">
        <FourGConfig />
      </ProCard>
    </ProCard>
  );
};

export default Network4GConfig;
