import { FormOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import CopyButton from './CopyButton';

type ExtraProps = {
  data: TplItem;
  handleOnCopy: () => void;
};

const Extra = ({ data, handleOnCopy }: ExtraProps) => {
  const { variables } = data;

  return (
    <>
      {variables && variables?.length > 0 ? (
        <Button
          type="primary"
          size="small"
          ghost
          onClick={(e) => {
            e.stopPropagation();
            handleOnCopy();
          }}
          icon={<FormOutlined />}
        >
          立即使用
        </Button>
      ) : (
        <CopyButton data={data} size="small" ghost />
      )}
    </>
  );
};

export default Extra;
