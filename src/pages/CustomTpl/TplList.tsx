import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';

type CustomTplItem = {
  gid?: string;
  uuid?: string;
  label?: string;
  apply?: string;
  type?: string;
};

type TplListProps = {
  dataSource: any[];
};

const TplList = ({ dataSource }: TplListProps) => {
  const columns: ProColumns<Partial<CustomTplItem>>[] = [
    {
      title: '模板名称',
      dataIndex: 'label',
    },
    {
      title: '代码',
      dataIndex: 'apply',
      valueType: 'code',
    },
    {
      title: '描述',
      dataIndex: 'detail',
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 80,
      fixed: 'right',
      render: (_, { uuid }) => [
        <a
          key="edit"
          onClick={() => {
            console.log(uuid);
            // TODO 编辑模板
          }}
        >
          编辑
        </a>,
        <a
          key="remove"
          onClick={() => {
            // TODO 删除模板
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <ProTable
      rowKey="uuid"
      columns={columns}
      search={false}
      pagination={false}
      dataSource={dataSource}
      toolBarRender={() => [
        <Button
          type="primary"
          key="add"
          onClick={() => {
            // TODO 新建模板
          }}
          icon={<PlusOutlined />}
        >
          新建
        </Button>,
      ]}
    />
  );
};

export default TplList;
