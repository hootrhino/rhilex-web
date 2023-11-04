import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';

import { message } from '@/components/PopupHack';
import { deleteRules } from '@/services/rulex/guizeguanli';
import { history, useModel, useRequest } from '@umijs/max';
import Debug from './Debug';
import Detail from './Detail';

export type Item = {
  uuid: string;
  name: string;
  status: number;
  description?: string;
  [key: string]: any;
};

export type RuleType = 'device' | 'inends';

type RuleConfigProps = {
  dataSource: Item[];
  type: RuleType;
  typeId: string;
};

const RuleConfig = ({ dataSource, type, typeId }: RuleConfigProps) => {
  const actionRef = useRef<ActionType>();
  const [detailConfig, setDetailConfig] = useState<{
    open: boolean;
    type: 'detail' | 'log';
    uuid: string;
  }>({ open: false, type: 'detail', uuid: '' });
  const [debugConfig, setDebugConfig] = useState<{ open: boolean; uuid: string }>({
    open: false,
    uuid: '',
  });

  const { run: getSources } = useModel('useSource');
  // const { data: deviceList } = useModel('useDevice');

  // 删除
  const { run: remove } = useRequest((params: API.deleteRulesParams) => deleteRules(params), {
    manual: true,
    onSuccess: () => {
      actionRef?.current?.reload();
      message.success('删除成功');
    },
  });

  const columns: ProColumns<Item>[] = [
    {
      title: 'UUID',
      dataIndex: 'uuid',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueEnum: {
        0: { text: '停止', status: 'Error' },
        1: { text: '运行中', status: 'Processing' },
      },
    },
    {
      title: '备注信息',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 200,
      fixed: 'right',
      render: (_, { uuid }) => [
        <a key="debug" onClick={() => setDebugConfig({ open: true, uuid })}>
          测试
        </a>,
        <a key="log" onClick={() => setDetailConfig({ open: true, type: 'log', uuid })}>
          日志
        </a>,
        <a
          key="detail"
          onClick={() => {
            getSources();
            // getDevices();
            setDetailConfig({ open: true, type: 'detail', uuid });
          }}
        >
          详情
        </a>,
        <a key="edit" onClick={() => history.push(`/${type}/${typeId}/rule/edit/${uuid}`)}>
          编辑
        </a>,
        <Popconfirm title="确定要删除该规则？" onConfirm={() => remove({ uuid })} key="remove">
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
          dataSource={dataSource}
          search={false}
          pagination={false}
          toolBarRender={() => [
            <Button
              type="primary"
              key="new"
              onClick={() => history.push(`/${type}/${typeId}/rule/new`)}
              icon={<PlusOutlined />}
            >
              新建
            </Button>,
          ]}
        />
      </PageContainer>
      <Detail onClose={() => setDetailConfig({ ...detailConfig, open: false })} {...detailConfig} />
      <Debug
        onOpenChange={(visible: boolean) => setDebugConfig({ ...debugConfig, open: visible })}
        onClose={() => setDebugConfig({ ...debugConfig, open: false })}
        {...debugConfig}
      />
    </>
  );
};

export default RuleConfig;
