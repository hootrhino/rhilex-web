import { modal } from '@/components/PopupHack';
import { DOC_URL } from '@/utils/constant';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { PageContainerProps } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { getIntl, getLocale, history } from '@umijs/max';
import { Space } from 'antd';

type ProPageContainerProps = {
  showExtra?: boolean;
  backUrl?: string;
} & PageContainerProps;

export const GoBackModal = (url: string) =>
  modal.confirm({
    title: getIntl(getLocale()).formatMessage({ id: 'component.modal.title.page' }),
    onOk: () => history.push(url),
    okText: getIntl(getLocale()).formatMessage({ id: 'button.ok' }),
    cancelText: getIntl(getLocale()).formatMessage({ id: 'button.cancel' }),
  });

const ProPageContainer = ({
  showExtra = false,
  backUrl,
  title,
  onBack,
  children,
  ...props
}: ProPageContainerProps) => {
  const getTitle = () => (
    <Space align="baseline">
      <span>{title}</span>
      <a href={DOC_URL} target="_blank" rel="noreferrer" className="text-[12px]">
        <QuestionCircleOutlined className="pr-[2px]" />
        {getIntl(getLocale()).formatMessage({ id: 'component.link.form' })}
      </a>
    </Space>
  );

  const getHeader = () => {
    if (backUrl) {
      return {
        title: showExtra ? getTitle() : title,
        onBack: () => GoBackModal(backUrl),
      };
    } else if (onBack) {
      return {
        title: showExtra ? getTitle() : title,
        onBack: onBack,
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
