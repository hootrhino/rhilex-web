import { history } from '@umijs/max';
import { useRef, useState } from 'react';

import {
  DownOutlined,
  ExceptionOutlined,
  HddOutlined,
  PlusOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Popconfirm } from 'antd';

import { message, modal } from '@/components/PopupHack';
import ProConfirmModal from '@/components/ProConfirmModal';
import PageContainer from '@/components/ProPageContainer';
import {
  deleteInendsDel,
  getInendsInendErrMsg,
  getInendsList,
  putInendsRestart,
} from '@/services/rhilex/shuruziyuanguanli';
import { MAX_TOTAL } from '@/utils/constant';
import { useIntl, useModel, useRequest } from '@umijs/max';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { baseColumns } from './Columns';
import Detail from './Detail';
import { InendType } from './enum';

export type InendItem = {
  name: string;
  type: InendType;
  state: number;
  description: string;
  config: Record<string, any>;
  uuid: string;
};

const Inend = () => {
  const actionRef = useRef<ActionType>();
  const { detailConfig, isFreeTrial, total, changeConfig, initialConfig, changeTotal } =
    useModel('useCommon');

  const { formatMessage } = useIntl();
  const [open, setOpen] = useState<boolean>(false);
  const [restartId, setRestartId] = useState<string>('');

  // 删除
  const { run: remove } = useRequest(
    (params: API.deleteInendsDelParams) => deleteInendsDel(params),
    {
      manual: true,
      onSuccess: () => {
        actionRef.current?.reload();
        message.success(formatMessage({ id: 'message.success.remove' }));
      },
    },
  );

  // 查看异常弹窗
  const { run: getErrorMsg } = useRequest(
    (params: API.getDevicesDeviceErrMsgParams) => getInendsInendErrMsg(params),
    {
      manual: true,
      onSuccess: (res) =>
        modal.error({
          title: formatMessage({ id: 'common.title.exception' }),
          content: <div className="break-words">{res}</div>,
          okText: formatMessage({ id: 'button.close' }),
        }),
    },
  );

  const getMenuItems = ({ type, state }: InendItem) => {
    let newItems = [
      {
        key: 'restart',
        label: formatMessage({ id: 'button.reload' }),
        icon: <PoweroffOutlined />,
        danger: true,
      },
      { key: 'rule', label: formatMessage({ id: 'button.ruleConfig' }), icon: <SettingOutlined /> },
    ];

    if (
      [
        InendType.COAP_SERVER,
        InendType.UDP_SERVER,
        InendType.HTTP_SERVER,
        InendType.TCP_SERVER,
      ].includes(type)
    ) {
      newItems = [
        ...newItems,
        {
          key: 'sub-device',
          label: formatMessage({ id: 'button.subDevice' }),
          icon: <HddOutlined />,
        },
      ];
    }

    if (state === 0) {
      newItems = [
        ...newItems,
        {
          key: 'error',
          label: formatMessage({ id: 'button.error' }),
          icon: <ExceptionOutlined />,
        },
      ];
    }

    return newItems;
  };

  const handleOnMenu = ({ key }: MenuInfo, { uuid, type }: InendItem) => {
    switch (key) {
      case 'restart':
        setOpen(true);
        setRestartId(uuid);
        break;
      case 'rule':
        localStorage.setItem(
          'testDataConfig',
          JSON.stringify({
            enableBatchRequest: false,
            ruleType: type,
          }),
        );
        history.push(`/inend/${uuid}/rule`);
        break;
      case 'sub-device':
        history.push(`/inend/${uuid}/sub-device`);
        break;
      case 'error':
        getErrorMsg({ uuid });
        break;
      default:
        break;
    }
  };

  const actionColumns: ProColumns<InendItem>[] = [
    {
      title: formatMessage({ id: 'table.title.option' }),
      width: 230,
      key: 'option',
      valueType: 'option',
      render: (_, { uuid, type, state }) => [
        <a key="detail" onClick={() => changeConfig({ open: true, uuid })}>
          {formatMessage({ id: 'button.detail' })}
        </a>,
        <a key="edit" onClick={() => history.push(`/inend/edit/${uuid}`)}>
          {formatMessage({ id: 'button.edit' })}
        </a>,
        <Popconfirm
          title={formatMessage({ id: 'inend.popconfirm.title.remove' })}
          onConfirm={() => remove({ uuid })}
          okText={formatMessage({ id: 'button.yes' })}
          cancelText={formatMessage({ id: 'button.no' })}
          key="remove"
        >
          <a>{formatMessage({ id: 'button.remove' })}</a>
        </Popconfirm>,
        <Dropdown
          key="advance-action"
          menu={{
            items: getMenuItems({ type, state } as InendItem),
            onClick: (info: MenuInfo) => handleOnMenu(info, { uuid, type } as InendItem),
          }}
        >
          <a>
            {formatMessage({ id: 'button.advancedOption' })} <DownOutlined />
          </a>
        </Dropdown>,
      ],
    },
  ];

  return (
    <>
      <PageContainer>
        <ProTable
          rowKey="uuid"
          actionRef={actionRef}
          columns={[...baseColumns, ...actionColumns] as ProColumns<InendItem>[]}
          rootClassName="stripe-table"
          request={async () => {
            const res = await getInendsList();

            return Promise.resolve({
              data: (res as any)?.data,
              success: true,
            });
          }}
          search={false}
          pagination={false}
          onDataSourceChange={(d) => changeTotal(d.length)}
          toolBarRender={() => [
            <Button
              key="new"
              type="primary"
              icon={<PlusOutlined />}
              disabled={isFreeTrial && total >= MAX_TOTAL}
              onClick={() => history.push('/inend/new')}
            >
              {formatMessage({ id: 'button.new' })}
            </Button>,
          ]}
        />
      </PageContainer>
      <Detail {...detailConfig} onClose={initialConfig} />
      <ProConfirmModal
        open={open}
        onCancel={() => setOpen(false)}
        handleOnOk={async () => {
          await putInendsRestart({ uuid: restartId });
        }}
      />
    </>
  );
};

export default Inend;
