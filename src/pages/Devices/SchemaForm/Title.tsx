import { DOC_URL } from '@/utils/constant';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Space } from 'antd';

type TitleProps = {
  deviceId: string | undefined;
};

const Title = ({ deviceId }: TitleProps) => {
  return (
    <Space align="baseline">
      <span>{deviceId ? '编辑设备' : '新建设备'}</span>
      <a href={DOC_URL} target="_blank" rel="noreferrer" className="text-[12px]">
        <QuestionCircleOutlined className="pr-[2px]" />
        前往官方文档主页查看更多帮助信息
      </a>
    </Space>
  );
};

export default Title;
