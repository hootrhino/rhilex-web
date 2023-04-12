import { Button, Modal, Space } from 'antd';

type GoBackFooterProps = {
  onConfirm: () => void;
};

const GoBackFooter = ({ onConfirm }: GoBackFooterProps) => {
  return (
    <Space style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginTop: 12 }}>
      <Button key="cancel" onClick={() => Modal.destroyAll()}>
        取消
      </Button>
      <Button key="confirm" type="primary" onClick={onConfirm}>
        确定
      </Button>
    </Space>
  );
};

export default GoBackFooter;
