import { getAibase } from '@/services/rulex/AInengli';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer,ProColumns,ProTable } from '@ant-design/pro-components';
import { Button, Descriptions, Modal } from 'antd';
import { isEmpty } from 'lodash';

type TableItem = {
  uuid: string;
  name: string;
  type: string;
  filepath: string;
  config: Record<string, any>;
  description: string;
};

const AI = () => {
  const [modal, contextHolder] = Modal.useModal();

  const columns: ProColumns<TableItem>[] = [
    {
      title: 'UUID',
      dataIndex: 'uuid',
      ellipsis: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '模型路径',
      dataIndex: 'filepath',
    },
    // {
    //   title: '模型属性',
    //   dataIndex: 'config',
    // },

    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
    },
  ];

  return (
    <>
      <PageContainer>
        <ProTable
          rowKey="uuid"
          // actionRef={actionRef}
          columns={columns}
          search={false}
          pagination={false}
          request={async () => {
            const res = await getAibase({});

            return Promise.resolve({
              data: (res as any)?.data,
              success: true,
            });
          }}
          toolBarRender={() => [
            <Button
              key="new"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() =>
                modal.info({
                  title: '暂不支持用户自定义 AI 能力',
                  content: (
                    <div>
                      <p>用户自定义 AI 能力将会在新版本中支持，敬请期待～</p>
                    </div>
                  ),
                  onOk() {},
                })
              }
            >
              新建
            </Button>,
          ]}
          expandable={{
            expandedRowRender: ({ config }) => {
              const dataSource =
                config &&
                Object.keys(config)?.map((item) => {
                  let value = config[item];

                  if (typeof config[item] === 'boolean') {
                    value = value.toString();
                  } else if (typeof config[item] === 'object' && config[item]?.length > 1) {
                    value = config[item].join(',');
                  }
                  return { label: item, value };
                });

              return (
                <Descriptions bordered title="模型属性" size="small">
                  {dataSource?.map(({ label, value }) => (
                    <Descriptions.Item label={label} key={label}>
                      {value}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              );
            },
            rowExpandable: ({ config }) => !isEmpty(config),
          }}
        />
      </PageContainer>
      {contextHolder}
    </>
  );
};

export default AI;
