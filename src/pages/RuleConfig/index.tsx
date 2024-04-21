import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useState } from 'react';

import PageContainer from '@/components/PageContainer';
import { message } from '@/components/PopupHack';
import { deleteRulesDel } from '@/services/rulex/guizeguanli';
import { DetailModalType } from '@/utils/enum';
import { history, useParams, useRequest } from '@umijs/max';
import type { TestType } from './Debug';
import Debug from './Debug';
import type { DetailLogModalConfig } from './Detail';
import Detail from './Detail';

export type RuleItem = {
  uuid: string;
  name: string;
  status: number;
  description?: string;
  [key: string]: any;
};

export enum RuleType {
  DEVICE = 'device',
  INENDS = 'inends',
}

type DetailModalConfig = {
  open: boolean;
  uuid: string;
};

type RuleConfigProps = {
  dataSource: RuleItem[];
  type: RuleType;
  typeId: string;
  pageTitle: string;
  testType: TestType;
  refresh: () => void;
};

const RuleConfig = ({
  dataSource,
  pageTitle,
  type,
  typeId,
  testType,
  refresh,
}: RuleConfigProps) => {
  const { groupId } = useParams();
  const [detailConfig, setDetailConfig] = useState<DetailLogModalConfig>({
    open: false,
    type: DetailModalType.DETAIL,
    uuid: '',
  });
  const [debugConfig, setDebugConfig] = useState<DetailModalConfig>({
    open: false,
    uuid: '',
  });

  // 删除
  const { run: remove } = useRequest((params: API.deleteRulesDelParams) => deleteRulesDel(params), {
    manual: true,
    onSuccess: () => {
      refresh();
      message.success('删除成功');
    },
  });

  const getUrl = (mode: 'new' | 'edit', uuid?: string) => {
    let url = '';
    if (mode === 'new') {
      url = groupId ? `/${type}/${groupId}/${typeId}/rule/new` : `/${type}/${typeId}/rule/new`;
    } else {
      url = groupId
        ? `/${type}/${groupId}/${typeId}/rule/edit/${uuid}`
        : `/${type}/${typeId}/rule/edit/${uuid}`;
    }

    return url;
  };

  const getTitle = () => {
    let title = '规则配置';
    if (pageTitle) {
      title =
        type === RuleType.DEVICE ? `设备 ${pageTitle} - 规则配置` : `资源 ${pageTitle} - 规则配置`;
    }
    return title;
  };

  const columns: ProColumns<RuleItem>[] = [
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
      title: '备注',
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
        <a
          key="log"
          onClick={() => setDetailConfig({ open: true, type: DetailModalType.LOG, uuid })}
        >
          日志
        </a>,
        <a
          key="detail"
          onClick={() => {
            setDetailConfig({ open: true, type: DetailModalType.DETAIL, uuid });
          }}
        >
          详情
        </a>,
        <a
          key="edit"
          onClick={() => {
            history.push(getUrl('edit', uuid));
          }}
        >
          编辑
        </a>,
        <Popconfirm title="确定要删除此规则？" onConfirm={() => remove({ uuid })} key="remove">
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <PageContainer backUrl={`/${type}/list`} title={getTitle()}>
        <ProTable
          rowKey="uuid"
          columns={columns}
          dataSource={dataSource}
          search={false}
          pagination={false}
          options={{ reload: () => refresh() }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="new"
              onClick={() => {
                history.push(getUrl('new'));
              }}
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
        type={type}
        testType={testType}
        {...debugConfig}
      />
    </>
  );
};

export default RuleConfig;
