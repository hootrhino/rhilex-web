import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useState } from 'react';

import { message } from '@/components/PopupHack';
import PageContainer from '@/components/ProPageContainer';
import ProTag, { StatusType } from '@/components/ProTag';
import { deleteRulesDel } from '@/services/rulex/guizeguanli';
import { DetailModalType } from '@/utils/enum';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
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
  INEND = 'inend',
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
  const { formatMessage } = useIntl();
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
      message.success(formatMessage({ id: 'message.success.remove' }));
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
    let title = formatMessage({ id: 'ruleConfig.title' });
    if (pageTitle) {
      title =
        type === RuleType.DEVICE
          ? formatMessage({ id: 'ruleConfig.title.deviceConfig' }, { title: pageTitle })
          : formatMessage({ id: 'ruleConfig.title.sourceConfig' }, { title: pageTitle });
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
      title: formatMessage({ id: 'ruleConfig.form.title.name' }),
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'ruleConfig.table.title.status' }),
      dataIndex: 'status',
      width: 100,
      renderText: (status) => <ProTag type={StatusType.RULE}>{status}</ProTag>,
    },
    {
      title: formatMessage({ id: 'table.desc' }),
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'table.option' }),
      valueType: 'option',
      key: 'option',
      width: 230,
      fixed: 'right',
      render: (_, { uuid }) => [
        <a key="debug" onClick={() => setDebugConfig({ open: true, uuid })}>
          {formatMessage({ id: 'button.test' })}
        </a>,
        <a
          key="log"
          onClick={() => setDetailConfig({ open: true, type: DetailModalType.LOG, uuid })}
        >
          {formatMessage({ id: 'button.log' })}
        </a>,
        <a
          key="detail"
          onClick={() => {
            setDetailConfig({ open: true, type: DetailModalType.DETAIL, uuid });
          }}
        >
          {formatMessage({ id: 'button.detail' })}
        </a>,
        <a
          key="edit"
          onClick={() => {
            history.push(getUrl('edit', uuid));
          }}
        >
          {formatMessage({ id: 'button.edit' })}
        </a>,
        <Popconfirm
          title={formatMessage({ id: 'ruleConfig.popconfirm.title.remove' })}
          onConfirm={() => remove({ uuid })}
          key="remove"
        >
          <a>{formatMessage({ id: 'button.remove' })}</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <PageContainer onBack={() => history.push(`/${type}/list`)} title={getTitle()}>
        <ProTable
          rowKey="uuid"
          columns={columns}
          rootClassName="stripe-table"
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
              {formatMessage({ id: 'button.new' })}
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
