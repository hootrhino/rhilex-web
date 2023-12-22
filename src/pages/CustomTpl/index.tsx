import GroupList, { DEFAULT_CONFIG } from '@/components/GroupList';
import {
  deleteUserluaDel,
  getUserluaGroup,
  getUserluaListByGroup,
} from '@/services/rulex/yonghuLUApianduan';
import { DEFAULT_GROUP_KEY_LUA_TPL, GROUP_TYPE_LUA_TPL } from '@/utils/constant';
import { getName } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { history, useRequest } from '@umijs/max';
import { Button, message, Popconfirm, Typography } from 'antd';
import { useState } from 'react';

const CustomTpl = () => {
  const [activeGroup, setActiveGroup] = useState<string>(DEFAULT_GROUP_KEY_LUA_TPL);
  const [groupConfig, setConfig] = useState<GroupConfig>(DEFAULT_CONFIG);

  // 分组列表
  const { data: groupList, run: getGroupList } = useRequest(() => getUserluaGroup());

  // 模板列表
  const { data: tplList, refresh } = useRequest(
    () => getUserluaListByGroup({uuid: activeGroup}),
    {
      ready: !!activeGroup,
      refreshDeps: [activeGroup],
    },
  );

  // 删除
  const { run: remove } = useRequest(
    (params: API.deleteUserluaDelParams) => deleteUserluaDel(params),
    {
      manual: true,
      onSuccess: () => {
        refresh();
        message.success('删除成功');
      },
    },
  );

  // 重置分组表单
  const handleOnReset = () => {
    getGroupList().then(() => {
      setActiveGroup(DEFAULT_GROUP_KEY_LUA_TPL);
    });
  };

  // 刷新分组列表
  const handleOnRefresh = () => {
    setConfig(DEFAULT_CONFIG);
    getGroupList();
  };

  const columns: ProColumns<TplItem>[] = [
    {
      title: '模板名称',
      dataIndex: 'label',
    },
    {
      title: '代码',
      dataIndex: 'apply',
      renderText: (apply) => {
        return (
          <div className="bg-[#f6f8fa]">
            <Typography.Text style={{ width: 400, padding: 10 }} ellipsis={{ tooltip: apply }}>
              {apply}
            </Typography.Text>
          </div>
        );
      },
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
            if (!uuid && !activeGroup) return;
            history.push(`/custom-tpl/${activeGroup}/edit/${uuid}`);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          title="确定要删除该模板?"
          onConfirm={() => uuid && remove({ uuid })}
          okText="是"
          cancelText="否"
          key="remove"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <PageContainer onBack={() => history.back()}>
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
                  setConfig({ ...DEFAULT_CONFIG, open: true });
                }}
              >
                新建
              </Button>
            }
            headStyle={{ paddingInline: 16 }}
            bodyStyle={{ paddingInline: 16 }}
          >
            <GroupList
              dataSource={groupList || []}
              activeGroup={activeGroup}
              itemCount={tplList?.length || 0}
              config={groupConfig}
              groupRoot={DEFAULT_GROUP_KEY_LUA_TPL}
              groupType={GROUP_TYPE_LUA_TPL}
              onReset={handleOnReset}
              onRefresh={handleOnRefresh}
              updateActiveGroup={setActiveGroup}
              updateConfig={setConfig}
            />
          </ProCard>
          <ProCard title={getName(groupList || [], activeGroup)}>
            <ProTable
              rowKey="uuid"
              columns={columns}
              search={false}
              pagination={false}
              dataSource={tplList}
              toolBarRender={() => [
                <Button
                  type="primary"
                  key="add"
                  onClick={() => {
                    if (!activeGroup) return;
                    history.push(`/custom-tpl/${activeGroup}/new`);
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
    </>
  );
};

export default CustomTpl;
