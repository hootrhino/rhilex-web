import { modal } from '@/components/PopupHack';
import { DOC_URL } from '@/utils/constant';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { PageContainerProps } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { Space } from 'antd';
import { history } from 'umi';

type ProPageContainerProps = {
  showExtra?: boolean;
  backUrl?: string;
} & PageContainerProps;

export const GoBackModal = (url: string) => {
  return modal.confirm({
    title: '离开可能会丢失数据，确定要返回列表吗？',
    onOk: () => history.push(url),
    okText: '确定',
    cancelText: '取消',
  });
};

const ProPageContainer = ({
  showExtra = false,
  backUrl,
  title,
  onBack,
  children,
  ...props
}: ProPageContainerProps) => {
  const getTitle = () => {
    return (
      <Space align="baseline">
        <span>{title}</span>
        <a href={DOC_URL} target="_blank" rel="noreferrer" className="text-[12px]">
          <QuestionCircleOutlined className="pr-[2px]" />
          前往官方文档主页查看更多帮助信息
        </a>
      </Space>
    );
  };

  const getHeader = () => {
    if (backUrl) {
      return {
        title: showExtra ? getTitle() : title,
        onBack: () => (onBack ? onBack() : GoBackModal(backUrl)),
      };
    } else {
      return {};
    }
  };

  return (
    <PageContainer header={getHeader()} {...props}>
      {children}
    </PageContainer>
  );
};

export default ProPageContainer;
