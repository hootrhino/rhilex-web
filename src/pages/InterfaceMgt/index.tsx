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
      title: '描述',
      dataIndex: 'description',
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
