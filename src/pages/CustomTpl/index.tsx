import { modal } from '@/components/PopupHack';
import { DeleteOutlined, EditOutlined, FolderOpenOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProCard,
  ProFormText,
  ProList,
  ProTable,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Space, Tooltip } from 'antd';
import { useRef, useState } from 'react';

type DataItem = {
  label: string;
  apply: string;
  type: string;
  detail: string;
};

type CustomTplItem = {
  title: string;
  key: string;
  data: DataItem[];
};

type GroupItem = {
  uuid: string;
  name: string;
  type: string;
  [key: string]: any;
};

type GroupConfig = {
  open: boolean;
  type: string;
  title: string;
};

const defaultCofig = { open: false, type: 'new', title: '新建模板分组' };

const DEFAULT_TYPE = 'LUA_TEMPLATE';

const CustomTpl = () => {
  const actionRef = useRef<ActionType>();
  const groupFormRef = useRef<ProFormInstance>();
  const {
    // remove: removeGroup,
    // create: createGroup,
    // update: updateGroup,
    getDetail: getGroupDetail,
    // detail: groupDetail,
  } = useModel('useGroup');
  const [groupConfig, setConfig] = useState<GroupConfig>(defaultCofig);
  const [activeGroup, setActiveGroup] = useState<string>();

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

  // TODO getGroupList
  // 删除
  const handleOnRemoveGroup = ({ name, uuid }: GroupItem) => {
    modal.confirm({
      title: `确定要删除${name}吗？`,
      width: 600,
      content: '',
      // content: `模板分组中包含 ${groupItems?.length} 个模板，删除后将被移入默认分组中，请谨慎处理。`,
      // onOk: () =>
      //   removeGroup({ uuid: uuid }).then(() =>
      //     getGroupList().then(() => {
      //       setActiveGroup('VROOT');
      //     }),
      //   ),
    });
  };

  // const getGroupName = (key: string) => {
  //   const group = groupList?.find((group: any) => group.uuid === key);

  //   return group?.name;
  // };

  return (
    <>
      <PageContainer>
        <ProCard split="vertical">
          <ProCard
            headerBordered
            title="模板分组"
            colSpan="270px"
            extra={
              <Button
                key="add"
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setConfig({ open: true, title: '新建模板分组', type: 'new' });
                }}
              >
                新建
              </Button>
            }
            headStyle={{ paddingInline: 16 }}
            bodyStyle={{ paddingInline: 16 }}
          >
            <ProList<any>
              toolBarRender={false}
              onRow={(record: GroupItem) => {
                return {
                  onClick: () => {
                    setActiveGroup(record.uuid);
                  },
                };
              }}
              rowKey="uuid"
              headerTitle={false}
              dataSource={[]}
              rowClassName={(item: GroupItem) => (item?.uuid === activeGroup ? 'active-group' : '')}
              metas={{
                title: {
                  dataIndex: 'name',
                  render: (dom) => {
                    return <div className="w-[120px] truncate">{dom}</div>;
                  },
                },
                avatar: {
                  render: () => <FolderOpenOutlined className="pl-[10px]" />,
                },
                actions: {
                  render: (dom, entity) =>
                    entity?.uuid === 'VROOT' ? null : (
                      <Space size="middle">
                        <Tooltip title="重命名分组">
                          <a
                            key="edit"
                            onClick={() => {
                              setConfig({ open: true, title: '编辑模板分组', type: 'edit' });
                              getGroupDetail({ uuid: entity.uuid });
                            }}
                          >
                            <EditOutlined />
                          </a>
                        </Tooltip>
                        <Tooltip title="删除分组">
                          <a key="remove" onClick={() => handleOnRemoveGroup(entity)}>
                            <DeleteOutlined />
                          </a>
                        </Tooltip>
                      </Space>
                    ),
                },
              }}
            />
          </ProCard>

          <ProCard title="分组名称">
            <ProTable
              rowKey="uuid"
              actionRef={actionRef}
              columns={columns}
              search={false}
              pagination={false}
              dataSource={[]}
              // request={async () => {
              //   const { data } = await getNotifyList();

              //   return Promise.resolve({
              //     data,
              //     success: true,
              //   });
              // }}
              toolBarRender={() => [
                <Button
                  type="primary"
                  key="add"
                  onClick={() => {
                    // TODO 新建
                  }}
                  icon={<PlusOutlined />}
                >
                  新建
                </Button>,
              ]}
            />
          </ProCard>
        </ProCard>
      </PageContainer>
      <ModalForm
        formRef={groupFormRef}
        title={groupConfig.title}
        open={groupConfig.open}
        onOpenChange={(visible) => setConfig({ ...groupConfig, open: visible })}
        modalProps={{ destroyOnClose: true }}
        // onFinish={async (values) => {
        //   if (groupConfig.type === 'new') {
        //     createGroup({ type: DEFAULT_TYPE, name: values?.name }).then((value: any) => {
        //       setActiveGroup(value?.gid);
        //       setConfig(defaultCofig);
        //       getGroupList();
        //     });
        //   } else {
        //     updateGroup({
        //       type: DEFAULT_TYPE,
        //       uuid: groupDetail?.uuid || '',
        //       name: values.name,
        //     }).then(() => {
        //       setConfig(defaultCofig);
        //       getGroupList();
        //     });
        //   }
        // }}
        layout="horizontal"
        width="30%"
      >
        <ProFormText width="md" name="name" label="分组名称" placeholder="请输入分组名称" />
      </ModalForm>
    </>
  );
};

export default CustomTpl;
