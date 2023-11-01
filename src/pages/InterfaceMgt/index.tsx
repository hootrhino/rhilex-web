import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Popconfirm } from 'antd';
import { useRef } from 'react';

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
      valueEnum: new Map([
        [4800, '4800'],
        [9600, '9600'],
        [115200, '115200'],
      ]),
    },
    {
      title: '数据位',
      dataIndex: 'dataBits',
      valueEnum: new Map([
        [1, '1'],
        [2, '2'],
        [3, '3'],
        [4, '4'],
        [5, '5'],
        [6, '6'],
        [7, '7'],
        [8, '8'],
      ]),
    },
    {
      title: '奇偶校验',
      dataIndex: 'parity',
      valueEnum: { E: '奇校验', O: '偶校验', N: '不校验' },
    },
    {
      title: '停止位',
      dataIndex: 'stopBits',
      valueEnum: new Map([
        [1, '1'],
        [1.5, '1.5'],
        [2, '2'],
      ]),
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
