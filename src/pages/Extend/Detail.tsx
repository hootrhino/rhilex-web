import LogTable from '@/components/LogTable';
import { getGoodsDetail } from '@/services/rulex/kuozhanxieyi';
import { filterLogByTopic } from '@/utils/utils';
import { ProDescriptions } from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import type { DrawerProps } from 'antd';
import { Drawer } from 'antd';
import { useEffect } from 'react';
import { baseColumns } from '.';

type DetailProps = DrawerProps & {
  config: DetailLogModalConfig;
};

const Detail = ({ config, onClose, ...props }: DetailProps) => {
  const { goodsConsoleData } = useModel('useWebsocket');
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
    <Drawer
      title={`扩展协议${type === 'detail' ? '详情' : '日志'}`}
      open={open}
      width={type === 'detail' ? '30%' : '40%'}
      placement="right"
      onClose={onClose}
      maskClosable={false}
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
        <LogTable
          options={false}
          headerTitle={undefined}
          logData={filterLogByTopic(goodsConsoleData, `goods/console/${uuid}`)}
        />
      )}
    </Drawer>
  );
};

export default Detail;
