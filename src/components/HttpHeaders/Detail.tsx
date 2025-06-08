import type { DescriptionsProps } from 'antd';
import { Descriptions } from 'antd';
import HeadersTitle from './Title';

type HeadersDetailProps = DescriptionsProps & {
  data: Record<string, any>;
};

const HeadersDetail = ({ data, ...props }: HeadersDetailProps) => {
  return (
    <>
      <HeadersTitle />
      <Descriptions column={1} bordered layout="vertical" className="mt-[12px]" {...props}>
        {Object.keys(data)?.map((item) => (
          <Descriptions.Item label={item} key={item}>
            {data[item]}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </>
  );
};

export default HeadersDetail;
