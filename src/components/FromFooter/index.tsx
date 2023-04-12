import { FooterToolbar } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';

type FromFooterProps = {
  onReset: () => void;
  onSubmit: () => void;
};

const FormFooter = ({ onReset, onSubmit }: FromFooterProps) => {
  return (
    <FooterToolbar>
      <Popconfirm key="reset" title="重置可能会丢失数据，确定要重置吗？" onConfirm={onReset}>
        <Button>重置</Button>
      </Popconfirm>

      <Button key="submit" type="primary" onClick={onSubmit}>
        提交
      </Button>
    </FooterToolbar>
  );
};

export default FormFooter;
