import { cn } from '@/utils/utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { getLocale, useIntl } from '@umijs/max';
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
            <div className="w-[100px]">{formatMessage({ id: 'system.tab.apn' })}</div>
            <Tag
              icon={<ExclamationCircleOutlined />}
              color="warning"
              className={cn(getLocale() === 'en-US' ? 'w-[80%] truncate' : '')}
            >
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
