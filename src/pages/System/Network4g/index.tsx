import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Space, Tag } from 'antd';
import APNConfig from './Apn';
import FourGConfig from './FourG';

const Network4GConfig = () => {
  const { formatMessage } = useIntl();

  return (
    <ProCard split="vertical" title={`4G ${formatMessage({ id: 'system.tab.4gNetwork' })}`}>
      <ProCard
        colSpan="60%"
        title={
          <Space>
            <span>{formatMessage({ id: 'system.tab.apn' })}</span>
            <Tag icon={<ExclamationCircleOutlined />} color="warning">
              {formatMessage({ id: 'system.tips.apn' })}
            </Tag>
          </Space>
        }
      >
        <APNConfig />
      </ProCard>
      <ProCard title={`4G ${formatMessage({ id: 'system.tab.4gConfig' })}`} colSpan="40%">
        <FourGConfig />
      </ProCard>
    </ProCard>
  );
};

export default Network4GConfig;
