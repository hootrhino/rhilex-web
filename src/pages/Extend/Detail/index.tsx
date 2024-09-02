import ProDescriptions from '@/components/ProDescriptions';
import ProLog from '@/components/ProLog';
import { getGoodsDetail } from '@/services/rhilex/kuozhanxieyi';
import { DetailModalType } from '@/utils/enum';
import { useIntl, useRequest } from '@umijs/max';
import type { DrawerProps } from 'antd';
import { Button, Drawer, Modal } from 'antd';
import { useEffect } from 'react';
import { baseColumns } from '..';

export type DetailLogModalConfig = {
  open: boolean;
  type: DetailModalType;
  uuid: string;
};

type DetailProps = DrawerProps & {
  config: DetailLogModalConfig;
};

const Detail = ({ config, onClose, ...props }: DetailProps) => {
  const { uuid, type, open } = config;
  const { formatMessage } = useIntl();

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

  return type === DetailModalType.DETAIL ? (
    <Drawer
      title="扩展协议详情"
      open={open}
      width={type === DetailModalType.DETAIL ? '30%' : '40%'}
      placement="right"
      onClose={onClose}
      maskClosable={false}
      {...props}
    >
      <ProDescriptions
        dataSource={detail}
        columns={baseColumns.filter((col) => col.dataIndex !== 'args')}
        labelWidth={120}
      />
      {/* <ProDescriptions
        dataSource={detail}
        columns={baseColumns.filter((col) => col.dataIndex !== 'args')}
        column={1}
        labelStyle={{ width: 120, justifyContent: 'end', paddingRight: 10 }}
      >
        <ProDescriptions.Item label="协议参数">{detail?.args}</ProDescriptions.Item>
      </ProDescriptions> */}
    </Drawer>
  ) : (
    <Modal
      title="扩展协议日志"
      width="50%"
      open={props.open}
      footer={
        <Button type="primary" onClick={onClose}>
          {formatMessage({ id: 'button.close' })}
        </Button>
      }
      onCancel={onClose}
      styles={{ body: { padding: 0 } }}
    >
      <ProLog topic={`goods/console/${uuid}`} />
    </Modal>
  );
};

export default Detail;
