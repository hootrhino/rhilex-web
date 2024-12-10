import { message } from '@/components/PopupHack';
import UnitValue from '@/components/UnitValue';
import type { OutendItem } from '@/pages/Outend';
import { getOutendsList } from '@/services/rhilex/shuchuziyuanguanli';
import {
  deleteAlarmRuleDel,
  getAlarmRuleDetail,
  getAlarmRuleList,
} from '@/services/rhilex/yujingzhongxin';
import { defaultPagination } from '@/utils/constant';
import { PlusOutlined } from '@ant-design/icons';
import type {
  ActionType,
  ProColumns,
  ProDescriptionsItemProps,
  RequestOptionsType,
} from '@ant-design/pro-components';
import { ProDescriptions, ProTable } from '@ant-design/pro-components';
import { Link, useIntl, useModel, useRequest } from '@umijs/max';
import { Button, Modal, Popconfirm, Tag } from 'antd';
import { nanoid } from 'nanoid';
import { useRef, useState } from 'react';
import TestRule from './Test';
import UpdateRule from './Update';

type ExprDefine = {
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
  const { detailConfig, changeConfig, initialConfig } = useModel('useCommon');
  const [formConfig, setFormConfig] = useState<FormConfig>(defaultConfig);
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
      renderText: (exprDefine) => {
        return exprDefine.length > 0 ? (
          <div className="flex flex-col w-full">
            {exprDefine.map((item: ExprDefine) => (
              <div className="w-full relative" key={`rule-${nanoid()}`}>
                <Tag color="blue" rootClassName="absolute -right-4 -top-[6px] mr-0">
                  {item.eventType}
                </Tag>
                <pre className="json-code">
                  <code>{item.expr}</code>
                </pre>
              </div>
            ))}
          </div>
        ) : (
          '-'
        );
      },
    },
    {
      title: formatMessage({ id: 'alarm.table.title.interval' }),
      dataIndex: 'interval',
      valueType: 'digit',
      render: (_dom: React.ReactNode, { interval }: Partial<AlarmRuleItem>) =>
        interval ? <UnitValue value={interval} unit="s" /> : '-',
    },
    {
      title: formatMessage({ id: 'alarm.table.title.threshold' }),
      dataIndex: 'threshold',
      valueType: 'digit',
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
        <a
          key="detail"
          onClick={() => {
            if (!uuid) return;
            changeConfig({ open: true, uuid });
          }}
        >
          {formatMessage({ id: 'button.detail' })}
        </a>,
        <a
          key="edit"
          onClick={() => {
            if (!uuid) return;

            setFormConfig({ open: true, uuid });
          }}
        >
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
            onClick={() => setFormConfig({ open: true, uuid: '' })}
            icon={<PlusOutlined />}
          >
            {formatMessage({ id: 'button.new' })}
          </Button>,
        ]}
      />
      <Modal
        destroyOnClose
        width="35%"
        title={formatMessage({ id: 'alarm.rule.title.detail' })}
        open={detailConfig.open}
        onCancel={initialConfig}
        maskClosable={false}
        styles={{
          body: { maxHeight: 500, overflowY: 'scroll' },
        }}
        footer={
          <Button type="primary" onClick={initialConfig}>
            {formatMessage({ id: 'button.close' })}
          </Button>
        }
      >
        <ProDescriptions
          column={1}
          labelStyle={{ width: 120, justifyContent: 'end' }}
          columns={columns as ProDescriptionsItemProps<Record<string, any>, AlarmRuleItem>[]}
          request={async () => {
            const { data } = await getAlarmRuleDetail({ uuid: detailConfig.uuid });
            return Promise.resolve({
              success: true,
              data,
            });
          }}
        />
      </Modal>
      <UpdateRule
        {...formConfig}
        onOpenChange={(open) => setFormConfig(open ? { ...formConfig, open } : defaultConfig)}
        reload={() => {
          actionRef.current?.reload();
          setFormConfig(defaultConfig);
        }}
      />
      <TestRule
        {...testConfig}
        onOpenChange={(open) => setTestConfig(open ? { ...testConfig, open } : defaultConfig)}
      />
    </>
  );
};

export default AlarmRule;
