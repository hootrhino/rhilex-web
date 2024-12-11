import { message } from '@/components/PopupHack';
import UnitValue from '@/components/UnitValue';
import type { OutendItem } from '@/pages/Outend';
import { getOutendsList } from '@/services/rhilex/shuchuziyuanguanli';
import { deleteAlarmRuleDel, getAlarmRuleList } from '@/services/rhilex/yujingzhongxin';
import { defaultPagination } from '@/utils/constant';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, RequestOptionsType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history, Link, useIntl, useRequest } from '@umijs/max';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import TestRule from './Test';

export type ExprDefine = {
  expr?: string;
  eventType?: string;
};

export type AlarmRuleItem = {
  uuid?: string;
  name: string;
  exprDefine: ExprDefine[];
  interval: number;
  threshold: number;
  handleId: string;
  description?: string;
  [key: string]: any;
};

type FormConfig = {
  open: boolean;
  uuid: string;
};

const defaultConfig = {
  uuid: '',
  open: false,
};

const AlarmRule = () => {
  const actionRef = useRef<ActionType>();
  const { formatMessage } = useIntl();
  const [testConfig, setTestConfig] = useState<FormConfig>(defaultConfig);

  // 删除
  const { run: remove } = useRequest(
    (params: API.deleteAlarmRuleDelParams) => deleteAlarmRuleDel(params),
    {
      manual: true,
      onSuccess: () => {
        actionRef.current?.reload();
        message.success(formatMessage({ id: 'message.success.remove' }));
      },
    },
  );

  // 北向列表
  const { data: outends } = useRequest(() => getOutendsList(), {
    formatResult: (res) => {
      return (res as any).data?.map((item: OutendItem) => ({
        label: item.name,
        value: item.uuid,
      }));
    },
  });

  const columns: ProColumns<Partial<AlarmRuleItem>>[] = [
    {
      title: 'UUID',
      dataIndex: 'uuid',
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'table.title.name' }),
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'alarm.table.title.exprDefine' }),
      dataIndex: 'exprDefine',
      hideInTable: true,
      tooltip: (
        <div>
          {formatMessage({ id: 'alarm.tooltip.expr' })}
          <a href="https://expr-lang.org/" target="_blank" rel="noreferrer">
            https://expr-lang.org/
          </a>
        </div>
      ),
    },
    {
      title: formatMessage({ id: 'alarm.table.title.interval' }),
      dataIndex: 'interval',
      valueType: 'digit',
      tooltip: formatMessage({ id: 'alarm.tooltip.interval' }),
      render: (_dom: React.ReactNode, { interval }: Partial<AlarmRuleItem>) =>
        interval ? <UnitValue value={interval} unit="s" /> : '-',
    },
    {
      title: formatMessage({ id: 'alarm.table.title.threshold' }),
      dataIndex: 'threshold',
      valueType: 'digit',
      tooltip: formatMessage({ id: 'alarm.tooltip.threshold' }),
    },
    {
      title: formatMessage({ id: 'alarm.table.title.handleId' }),
      dataIndex: 'handleId',
      valueType: 'select',
      ellipsis: true,
      renderText: (handleId) => {
        const outend = outends?.find((item: RequestOptionsType) => item.value === handleId);
        const result = outend ? (
          <Link to={`/outend/detail/${outend.value}`}>{outend.label}</Link>
        ) : (
          handleId
        );

        return result || '-';
      },
    },
    {
      title: formatMessage({ id: 'table.title.desc' }),
      dataIndex: 'description',
      ellipsis: true,
      renderText: (description) => description || '-',
    },
    {
      title: formatMessage({ id: 'table.title.option' }),
      width: 170,
      key: 'option',
      valueType: 'option',
      hideInDescriptions: true,
      hideInForm: true,
      render: (_, { uuid }) => [
        <a
          key="test"
          onClick={() => {
            if (!uuid) return;
            setTestConfig({ open: true, uuid });
          }}
        >
          {formatMessage({ id: 'button.test' })}
        </a>,
        <a key="detail" onClick={() => history.push(`/alarm/rule/detail/${uuid}`)}>
          {formatMessage({ id: 'button.detail' })}
        </a>,
        <a key="edit" onClick={() => history.push(`/alarm/rule/edit/${uuid}`)}>
          {formatMessage({ id: 'button.edit' })}
        </a>,

        <Popconfirm
          title={formatMessage({ id: 'alarm.rule.popconfirm.title.remove' })}
          onConfirm={() => uuid && remove({ uuid })}
          okText={formatMessage({ id: 'button.yes' })}
          cancelText={formatMessage({ id: 'button.no' })}
          key="remove"
        >
          <a>{formatMessage({ id: 'button.remove' })}</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <ProTable
        rowKey="uuid"
        actionRef={actionRef}
        rootClassName="stripe-table"
        search={false}
        columns={columns}
        pagination={defaultPagination}
        request={async ({
          current = defaultPagination.defaultCurrent,
          pageSize = defaultPagination.defaultPageSize,
        }) => {
          const { data } = await getAlarmRuleList({ current, size: pageSize });

          return Promise.resolve({
            data: data.records,
            total: data.total,
            success: true,
          });
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="new"
            onClick={() => history.push('/alarm/rule/new')}
            icon={<PlusOutlined />}
          >
            {formatMessage({ id: 'button.new' })}
          </Button>,
        ]}
      />
      <TestRule
        {...testConfig}
        onOpenChange={(open) => setTestConfig(open ? { ...testConfig, open } : defaultConfig)}
      />
    </>
  );
};

export default AlarmRule;
