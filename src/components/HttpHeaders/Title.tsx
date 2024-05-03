import { QuestionCircleOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { Space } from 'antd';

const HeadersTitle = () => {
  const { formatMessage } = useIntl();

  return (
    <Space align="center">
      <span>HTTP Headers</span>
      <div className="text-[12px] text-[#00000080] ml-[5px]">
        <QuestionCircleOutlined />
        <span className="mr-[5px] ml-[2px]">
          {formatMessage({ id: 'component.link.httpHeaders' })}
        </span>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers"
          target="_blank"
          rel="noreferrer"
        >
          HTTP Headers
        </a>
      </div>
    </Space>
  );
};

export default HeadersTitle;
