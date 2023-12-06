import { Space, Typography } from 'antd';

type LabelProps = {
  data: any;
};

const Label = ({ data }: LabelProps) => {
  const { detail, label } = data;

  return (
    <Typography.Paragraph
      style={{
        marginBottom: 0,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Space>
        <span>{detail}</span>
        <span className="text-[12px] text-[#000000A6]">{label}</span>
      </Space>
    </Typography.Paragraph>
  );
};

export default Label;
