import type { DescriptionsProps } from 'antd';
import { Descriptions } from 'antd';

type HeadersDetailProps = DescriptionsProps & {
  data: Record<string, any>;
};

const HeadersDetail = ({ data, ...props }: HeadersDetailProps) => {
  return (
    Object.keys(data)?.length > 0 && (
      <Descriptions column={1} bordered layout="vertical" {...props}>
        {Object.keys(data)?.map((item) => (
          <Descriptions.Item label={item} key={item}>
            {data[item]}
          </Descriptions.Item>
        ))}
      </Descriptions>
    )
  );
};

export default HeadersDetail;
