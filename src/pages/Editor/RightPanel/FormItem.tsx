import type { RowProps } from 'antd';
import { Col, Row } from 'antd';

type FormItemProps = {
  label: string;
  children: React.ReactNode;
} & RowProps;

const FormItem = ({ label, children, ...props }: FormItemProps) => {
  return (
    <Row justify="space-around" align="middle" {...props}>
      <Col span={8} className="text-[#DBDBDB] text-[12px]">
        {label}
      </Col>
      <Col span={16}>{children}</Col>
    </Row>
  );
};

export default FormItem;
