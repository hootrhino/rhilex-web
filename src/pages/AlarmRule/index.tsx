import { message } from '@/components/PopupHack';
import PageContainer from '@/components/ProPageContainer';
import { getDevicesDetail } from '@/services/rhilex/shebeiguanli';
import {
  deleteAlarmRuleDel,
  getAlarmRuleDetail,
  getAlarmRuleList,
  postAlarmRuleCreate,
  putAlarmRuleUpdate,
} from '@/services/rhilex/yujingzhongxin';
import { defaultPagination, DEVICE_LIST } from '@/utils/constant';
import { generateRandomId } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import type {
  ActionType,
  ProColumns,
  ProDescriptionsItemProps,
  ProFormInstance,
} from '@ant-design/pro-components';
import { BetaSchemaForm, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
import { Button, Modal, Popconfirm } from 'antd';
import { useEffect, useRef, useState } from 'react';

type AlarmRuleItem = {
  uuid: string;
  name: string;
  expr: string;
  interval: number;
  threshold: number;
  description: string;
};

enum ConfigType {
  DETAIL = 'detail',
  FORM = 'form',
}

type Config = {
  open: boolean;
  uuid: string;
  type: ConfigType;
};

const defaultConfig = {
  open: false,
  uuid: '',
  type: ConfigType.DETAIL,
};

const AlarmRule = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const { deviceId } = useParams();

  const [modalConfig, setConfig] = useState<Config>(defaultConfig);

  // 获取设备详情
  const { data: deviceDetail, run: getDeviceDetail } = useRequest(
    (params: API.getDevicesDetailParams) => getDevicesDetail(params),
    {
      manual: true,
    },
  );

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

  const columns: ProColumns<AlarmRuleItem>[] = [
    {
      title: 'UUID',
      dataIndex: 'uuid',
      hideInForm: true,
    },
    {
      title: formatMessage({ id: 'table.title.name' }),
      dataIndex: 'name',
      fieldProps: { placeholder: formatMessage({ id: 'alarm.form.placeholder.name' }) },
      formItemProps: {
        rules: [{ required: true, message: formatMessage({ id: 'alarm.form.placeholder.name' }) }],
      },
    },
    {
      title: formatMessage({ id: 'alarm.table.title.expr' }),
      dataIndex: 'expr',
      valueType: 'textarea',
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
      title: formatMessage({ id: 'table.title.desc' }),
      dataIndex: 'description',
      ellipsis: true,
      fieldProps: { placeholder: formatMessage({ id: 'form.placeholder.desc' }) },
    },
    {
      title: formatMessage({ id: 'table.title.option' }),
      width: 180,
      key: 'option',
      valueType: 'option',
      hideInDescriptions: true,
      hideInForm: true,
      render: (_, { uuid }) => [
        <a
          key="detail"
          onClick={() => {
            setConfig({ open: true, uuid, type: ConfigType.DETAIL });
          }}
        >
          {formatMessage({ id: 'button.detail' })}
        </a>,

        <a
          key="edit"
          onClick={() => {
            setConfig({ open: true, uuid, type: ConfigType.FORM });
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
    if (deviceId) {
      getDeviceDetail({ uuid: deviceId });
    }
  }, [deviceId]);

  useEffect(() => {
    if (modalConfig.uuid && modalConfig.type === ConfigType.FORM) {
      getDetail({ uuid: modalConfig.uuid });
    }
  }, [modalConfig]);

  return (
    <PageContainer
      onBack={() => history.push(DEVICE_LIST)}
      title={formatMessage({ id: 'alarm.rule.title.list' }, { name: deviceDetail?.name })}
    >
      <ProTable
        rowKey="uuid"
        actionRef={actionRef}
        rootClassName="stripe-table"
        search={false}
        columns={columns}
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
            onClick={() => setConfig({ open: true, uuid: '', type: ConfigType.FORM })}
            icon={<PlusOutlined />}
          >
            {formatMessage({ id: 'button.new' })}
          </Button>,
        ]}
      />
      <Modal
        destroyOnClose
        width="50%"
        maskClosable={false}
        open={modalConfig.open && modalConfig.type === ConfigType.DETAIL}
        title={formatMessage({ id: 'alarm.rule.title.detail' })}
        footer={
          <Button type="primary" onClick={() => setConfig(defaultConfig)}>
            {formatMessage({ id: 'button.close' })}
          </Button>
        }
        onCancel={() => setConfig(defaultConfig)}
      >
        <ProDescriptions
          columns={columns as ProDescriptionsItemProps<Record<string, any>, AlarmRuleItem>[]}
          request={async () => {
            const { data } = await getAlarmRuleDetail({ uuid: modalConfig.uuid });
            return Promise.resolve({
              success: true,
              data,
            });
          }}
        />
      </Modal>
      <BetaSchemaForm<AlarmRuleItem>
        width="35%"
        formRef={formRef}
        layoutType="ModalForm"
        open={modalConfig.open && modalConfig.type === ConfigType.FORM}
        onOpenChange={(open) => setConfig(open ? { ...modalConfig, open } : defaultConfig)}
        title={formatMessage({
          id: modalConfig.uuid ? 'alarm.rule.title.update' : 'alarm.rule.title.new',
        })}
        columns={columns as any[]}
        modalProps={{ maskClosable: false, destroyOnClose: true }}
        initialValues={{ name: `RULE_${generateRandomId()}` }}
        onFinish={async (values) => {
          try {
            const params = { ...values };
            if (modalConfig.uuid) {
              await putAlarmRuleUpdate({ ...params, uuid: modalConfig.uuid });
              message.success(formatMessage({ id: 'message.success.update' }));
            } else {
              await postAlarmRuleCreate({ ...params });
              message.success(formatMessage({ id: 'message.success.new' }));
            }
            actionRef.current?.reload();
            setConfig(defaultConfig);
            return true;
          } catch (error) {
            return false;
          }
        }}
      />
    </PageContainer>
  );
};

export default AlarmRule;
