import { QuestionCircleOutlined } from '@ant-design/icons';
import { Space } from 'antd';

const HttpHeadersTitle = () => {
  return (
    <Space align="center">
      <span>HTTP Headers</span>
      <div className="text-[12px] text-[#00000080] ml-[5px]">
        <QuestionCircleOutlined />
        <span className="mr-[5px] ml-[2px]">更多信息请参考</span>
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

export default HttpHeadersTitle;
