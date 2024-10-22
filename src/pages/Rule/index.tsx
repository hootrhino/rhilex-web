import { message } from '@/components/PopupHack';
import PageContainer from '@/components/ProPageContainer';
import ProTag, { StatusType } from '@/components/ProTag';
import type { DetailConfig } from '@/models/useCommon';
import { defaultConfig } from '@/models/useCommon';
import { deleteRulesDel } from '@/services/rhilex/guizeguanli';
import { getDevicesDetail, getRulesByDevice } from '@/services/rhilex/shebeiguanli';
import { getInendsDetail, getRulesByInend } from '@/services/rhilex/shuruziyuanguanli';
import { DEVICE_LIST } from '@/utils/constant';
import { PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { ProTable, type ProColumns } from '@ant-design/pro-components';
import { history, useIntl, useModel, useParams, useRequest } from '@umijs/max';
import { Button, Popconfirm } from 'antd';
import { useState } from 'react';
import Debug from './Debug';
import Detail from './Detail';
import Log from './Log';
import QuickForm from './QuickForm';

export type RuleItem = {
  uuid: string;
  name: string;
  status: number;
  description?: string;
  [key: string]: any;
};

type DebugConfig = {
  topic: string;
  open: boolean;
};

const defaultDebugConfig = {
  topic: '',
  open: false,
};

const Rule = () => {
  const { groupId, deviceId, inendId } = useParams();
  const { formatMessage } = useIntl();
  const { detailConfig, changeConfig, initialConfig } = useModel('useCommon');

  const [dataSource, setDataSource] = useState<RuleItem[]>([]);
  const [title, setTitle] = useState<string>();
  const [goBackUrl, setUrl] = useState<string>('');
  const [goNewUrl, setNewUrl] = useState<string>('');
  const [logConfig, setLogConfig] = useState<DetailConfig>(defaultConfig);
  const [debugConfig, setDebugConfig] = useState<DebugConfig>(defaultDebugConfig);
  const [openQuickForm, setOpen] = useState<boolean>(false);

  const { refresh: reloadDeviceRule } = useRequest(
    () => getRulesByDevice({ deviceId: deviceId || '' }),
    {
      ready: !!deviceId,
      refreshDeps: [deviceId],
      onSuccess: (res) => setDataSource(res),
    },
  );

  const { refresh: reloadInendRule } = useRequest(
    () => getRulesByInend({ inendId: inendId || '' }),
    {
      ready: !!inendId,
      refreshDeps: [inendId],
      onSuccess: (res) => setDataSource(res),
    },
  );

  useRequest(() => getInendsDetail({ uuid: inendId || '' }), {
    ready: !!inendId,
    refreshDeps: [inendId],
    onSuccess: (res) => {
      setTitle(res?.name);
      setUrl('/inend/list');
      setNewUrl(`/inend/${inendId}/rule/new`);
    },
  });

  useRequest(() => getDevicesDetail({ uuid: deviceId || '' }), {
    ready: !!deviceId,
    refreshDeps: [deviceId],
    onSuccess: (res) => {
      setTitle(res?.name);
      setUrl(DEVICE_LIST);
      setNewUrl(`/device/${groupId}/${deviceId}/rule/new`);
    },
  });

  const handleOnReload = () => {
    if (groupId && deviceId) {
      reloadDeviceRule();
    } else {
      reloadInendRule();
    }
  };

  // 删除
  const { run: remove } = useRequest((params: API.deleteRulesDelParams) => deleteRulesDel(params), {
    manual: true,
    onSuccess: () => {
      handleOnReload();
      message.success(formatMessage({ id: 'message.success.remove' }));
    },
  });

  const columns: ProColumns<RuleItem>[] = [
    {
      title: 'UUID',
      dataIndex: 'uuid',
      ellipsis: true,
      copyable: true,
    },
    {
      title: formatMessage({ id: 'table.title.name' }),
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'table.title.status' }),
      dataIndex: 'status',
      width: 100,
      renderText: (status) => <ProTag type={StatusType.RULE}>{status}</ProTag>,
    },
    {
      title: formatMessage({ id: 'table.title.desc' }),
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'table.title.option' }),
      valueType: 'option',
      key: 'option',
      width: 230,
      render: (_, { uuid }) => [
        <a
          key="debug"
          onClick={() => {
            setDebugConfig({ open: true, topic: `rule/log/test/${uuid}` });
          }}
        >
          {formatMessage({ id: 'button.test' })}
        </a>,
        <a key="log" onClick={() => setLogConfig({ open: true, uuid })}>
          {formatMessage({ id: 'button.log' })}
        </a>,
        <a
          key="detail"
          onClick={() => {
            changeConfig({ open: true, uuid });
          }}
        >
          {formatMessage({ id: 'button.detail' })}
        </a>,
        <a
          key="edit"
          onClick={() => {
            const editUrl = goNewUrl.replace('new', `edit/${uuid}`);
            history.push(editUrl);
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
    <PageContainer
      onBack={() => history.push(goBackUrl)}
      title={`${title} - ${formatMessage({ id: 'ruleConfig.title' })}`}
    >
      <ProTable
        rowKey="uuid"
        columns={columns}
        rootClassName="stripe-table"
        dataSource={dataSource}
        search={false}
        pagination={false}
        options={{ reload: handleOnReload }}
        toolBarRender={() => [
          <Button
            ghost
            type="primary"
            key="new-custom-rule"
            onClick={() => history.push(goNewUrl)}
            icon={<PlusOutlined />}
          >
            {formatMessage({ id: 'ruleConfig.button.custom' })}
          </Button>,
          <Button
            type="primary"
            key="new-quick-rule"
            onClick={() => setOpen(true)}
            icon={<ThunderboltOutlined />}
          >
            {formatMessage({ id: 'ruleConfig.button.quick' })}
          </Button>,
        ]}
      />
      <Detail onClose={initialConfig} {...detailConfig} />
      <Log onCancel={() => setLogConfig(defaultConfig)} {...logConfig} />
      <Debug
        onOpenChange={(visible: boolean) => setDebugConfig({ ...debugConfig, open: visible })}
        {...debugConfig}
      />
      <QuickForm
        open={openQuickForm}
        onOpenChange={(open) => setOpen(open)}
        reload={handleOnReload}
      />
    </PageContainer>
  );
};

export default Rule;
