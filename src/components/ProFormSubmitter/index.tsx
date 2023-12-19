import { FooterToolbar } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';

type ProFormSubmitterProps = {
  handleOnSubmit: (values?: any) => void;
  handleOnReset: () => void;
  loading: boolean;
};

const ProFormSubmitter = ({ handleOnSubmit, handleOnReset, loading }: ProFormSubmitterProps) => {
  return (
    <FooterToolbar>
      <Popconfirm key="reset" title="重置可能会丢失数据，确定要重置吗？" onConfirm={handleOnReset}>
        <Button>重置</Button>
      </Popconfirm>

      <Button key="submit" type="primary" onClick={async() => await handleOnSubmit()} loading={loading}>
        提交
      </Button>
    </FooterToolbar>
  );
};

export default ProFormSubmitter;
