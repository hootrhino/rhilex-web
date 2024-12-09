import { message } from '@/components/PopupHack';
import UnitValue from '@/components/UnitValue';
import type { OutendItem } from '@/pages/Outend';
import { getOutendsList } from '@/services/rhilex/shuchuziyuanguanli';
import {
  deleteAlarmRuleDel,
  getAlarmRuleDetail,
  getAlarmRuleList,
  postAlarmRuleCreate,
  putAlarmRuleUpdate,
} from '@/services/rhilex/yujingzhongxin';
import { defaultPagination } from '@/utils/constant';
import { generateRandomId } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import type {
  ActionType,
  ProColumns,
  ProFormInstance,
  RequestOptionsType,
} from '@ant-design/pro-components';
import { BetaSchemaForm, ProTable } from '@ant-design/pro-components';
import { Link, useIntl, useModel, useRequest } from '@umijs/max';
import { Button, Popconfirm } from 'antd';
import { useEffect, useRef } from 'react';

type AlarmRuleItem = {
  uuid: string;
  name: string;
  expr: string;
  interval: number;
  threshold: number;
  handleId: string;
  description?: string;
};

const AlarmRule = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const { detailConfig, changeConfig, initialConfig } = useModel('useCommon');

  // 告警详情
  const { run: getDetail } = useRequest(
    (params: API.getAlarmRuleDetailParams) => getAlarmRuleDetail(params),
    {
      manual: true,
      onSuccess: (res) => formRef.current?.setFieldsValue({ ...res }),
    },
  );

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

  const columns: ProColumns<AlarmRuleItem>[] = [
    {
      title: 'UUID',
      dataIndex: 'uuid',
      hideInForm: true,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'table.title.name' }),
      dataIndex: 'name',
      ellipsis: true,
      fieldProps: { placeholder: formatMessage({ id: 'alarm.form.placeholder.name' }) },
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'alarm.form.placeholder.name' }) }],
      },
    },
    {
      title: formatMessage({ id: 'alarm.table.title.expr' }),
      dataIndex: 'expr',
      valueType: 'textarea',
      ellipsis: true,
      fieldProps: { placeholder: formatMessage({ id: 'alarm.form.placeholder.expr' }) },
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'alarm.form.placeholder.expr' }) }],
      },
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
      fieldProps: {
        style: { width: '100%' },
        addonAfter: formatMessage({ id: 'alarm.unit.sec' }),
        placeholder: formatMessage({ id: 'alarm.form.placeholder.interval' }),
      },
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'alarm.form.placeholder.interval' }) },
        ],
      },
      render: (_dom: React.ReactNode, { interval }: AlarmRuleItem) => (
        <UnitValue value={interval} unit="s" />
      ),
    },
    {
      title: formatMessage({ id: 'alarm.table.title.threshold' }),
      dataIndex: 'threshold',
      valueType: 'digit',
      fieldProps: {
        style: { width: '100%' },
        placeholder: formatMessage({ id: 'alarm.form.placeholder.threshold' }),
      },
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'alarm.form.placeholder.threshold' }) },
        ],
      },
    },
    {
      title: formatMessage({ id: 'alarm.table.title.handleId' }),
      dataIndex: 'handleId',
      valueType: 'select',
      ellipsis: true,
      fieldProps: {
        placeholder: formatMessage({ id: 'alarm.form.placeholder.handleId' }),
      },
      formItemProps: {
        rules: [
          { required: true, message: formatMessage({ id: 'alarm.form.placeholder.handleId' }) },
        ],
      },
      request: async () => outends,
      renderText: (handleId) => {
        const outend = outends?.find((item: RequestOptionsType) => item.value === handleId);
        return outend ? <Link to={`/outend/detail/${outend.value}`}>{outend.label}</Link> : '-';
      },
    },
    {
      title: formatMessage({ id: 'table.title.desc' }),
      dataIndex: 'description',
      ellipsis: true,
      fieldProps: { placeholder: formatMessage({ id: 'form.placeholder.desc' }) },
      renderText: (description) => description || '-',
    },
    {
      title: formatMessage({ id: 'table.title.option' }),
      width: 100,
      key: 'option',
      valueType: 'option',
      hideInDescriptions: true,
      hideInForm: true,
      render: (_, { uuid }) => [
        <a
          key="edit"
          onClick={() => {
            changeConfig({ open: true, uuid });
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

  useEffect(() => {
    if (detailConfig.uuid) {
      getDetail({ uuid: detailConfig.uuid });
    }
  }, [detailConfig.uuid]);

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
            onClick={() => changeConfig({ open: true, uuid: '' })}
            icon={<PlusOutlined />}
          >
            {formatMessage({ id: 'button.new' })}
          </Button>,
        ]}
      />
      <BetaSchemaForm<AlarmRuleItem>
        width="35%"
        formRef={formRef}
        layoutType="ModalForm"
        open={detailConfig.open}
        onOpenChange={(open) => {
          if (open) {
            changeConfig({ ...detailConfig, open });
          } else {
            initialConfig();
          }
        }}
        title={formatMessage({
          id: detailConfig.uuid ? 'alarm.rule.title.update' : 'alarm.rule.title.new',
        })}
        columns={columns as any[]}
        modalProps={{ maskClosable: false, destroyOnClose: true }}
        initialValues={{ name: `RULE_${generateRandomId()}` }}
        onFinish={async (values) => {
          try {
            const params = { ...values };
            if (detailConfig.uuid) {
              await putAlarmRuleUpdate({ ...params, uuid: detailConfig.uuid });
              message.success(formatMessage({ id: 'message.success.update' }));
            } else {
              await postAlarmRuleCreate({ ...params });
              message.success(formatMessage({ id: 'message.success.new' }));
            }
            actionRef.current?.reload();
            initialConfig();
            return true;
          } catch (error) {
            return false;
          }
        }}
      />
    </>
  );
};

export default AlarmRule;
