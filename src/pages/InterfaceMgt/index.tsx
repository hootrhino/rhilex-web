import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Popconfirm } from 'antd';
import { useRef } from 'react';
import {
  baudRateEnum,
  dataBitsEnum,
  parityEnum,
  stopBitsEnum,
} from '../Devices/components/columns';

type InterfaceItem = {
  uuid: string;
  name: string;
  type: string;
  timeout: number;
  baudRate: number;
  dataBits: number;
  parity: string;
  stopBits: number;
  uart: string;
};

const Interface = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<InterfaceItem>[] = [
    {
      title: '接口名称',
      dataIndex: 'name',
    },
    {
      title: '接口类型',
      dataIndex: 'type',
    },
    {
      title: '超时时间（毫秒）',
      dataIndex: 'timeout',
    },
    {
      title: '波特率',
      dataIndex: 'baudRate',
      valueEnum: baudRateEnum,
    },
    {
      title: '数据位',
      dataIndex: 'dataBits',
      valueEnum: dataBitsEnum,
    },
    {
      title: '奇偶校验',
      dataIndex: 'parity',
      valueEnum: parityEnum,
    },
    {
      title: '停止位',
      dataIndex: 'stopBits',
      valueEnum: stopBitsEnum,
    },
    {
      title: '串口路径',
      dataIndex: 'uart',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 150,
      fixed: 'right',
      render: (_, { uuid }) => [
        <a
          key="detail"
          onClick={() => {
            // TODO 详情
            console.log(uuid);
          }}
        >
          详情
        </a>,
        <a
          key="edit"
          onClick={() => {
            // TODO 编辑
          }}
        >
          编辑
        </a>,
        <Popconfirm
          title="确定要删除该目标？"
          onConfirm={() => {
            // TODO 删除
          }}
          key="delete"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <>
      <PageContainer>
        <ProTable
          rowKey="uuid"
          actionRef={actionRef}
          columns={columns}
          dataSource={[]}
          // request={async () => {
          //   const { data } = await getGoodsList();

          //   return Promise.resolve({
          //     data: data as Item[],
          //     success: true,
          //   });
          // }}
          search={false}
          pagination={false}
        />
      </PageContainer>
    </>
  );
};

export default Interface;
