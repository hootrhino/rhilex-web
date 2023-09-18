import type { RowProps } from 'antd';
import { Col, Row } from 'antd';

type FormItemProps = {
  label: string;
  children: React.ReactNode;
  span?: number;
} & RowProps;

const FormItem = ({ label, span = 8, children, ...props }: FormItemProps) => {
  return (
    <Row justify="space-around" align={props?.align || 'middle'}{...props}>
      <Col span={span} className="text-[#DBDBDB] text-[12px]">
        {label}
      </Col>
      <Col span={24 - span}>{children}</Col>
    </Row>
  );
};

export default FormItem;
