import LogTable from '@/components/LogTable';
import { getGoodsDetail } from '@/services/rulex/kuozhanxieyi';
import { ProDescriptions } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import type { ModalFuncProps } from 'antd';
import { Button, Modal } from 'antd';
import { useEffect } from 'react';
import { baseColumns } from '.';

type DetailProps = ModalFuncProps & {
  config: DetailLogModalConfig;
};

const Detail = ({ config, onCancel, ...props }: DetailProps) => {
  const { uuid, type, open } = config;
  const { run: getDetail, data: detail } = useRequest(
    (params: API.getGoodsDetailParams) => getGoodsDetail(params),
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (uuid) {
      getDetail({ uuid });
    }
  }, [uuid]);

  return (
    <Modal
      title={`扩展协议${type === 'detail' ? '详情' : '日志'}`}
      open={open}
      width="40%"
      footer={
        <Button key="close" type="primary" onClick={onCancel}>
          关闭
        </Button>
      }
      maskClosable={false}
      onCancel={onCancel}
      {...props}
    >
      {type === 'detail' ? (
        <ProDescriptions
          dataSource={detail}
          columns={baseColumns.filter((col) => col.dataIndex !== 'args')}
          column={1}
          labelStyle={{ width: 120, justifyContent: 'end', paddingRight: 10 }}
        >
          <ProDescriptions.Item label="协议参数">{detail?.args}</ProDescriptions.Item>
        </ProDescriptions>
      ) : (
        <LogTable topic={`goods/console/${uuid}`} options={false} headerTitle={undefined} />
      )}
    </Modal>
  );
};

export default Detail;
