import { message, modal } from '@/components/PopupHack';
import ProConfirmModal from '@/components/ProConfirmModal';
import PageContainer from '@/components/ProPageContainer';
import {
  deleteOutendsDel,
  getOutendsList,
  getOutendsOutendErrMsg,
  putOutendsRestart,
} from '@/services/rhilex/shuchuziyuanguanli';
import { MAX_TOTAL } from '@/utils/constant';
import { DownOutlined, ExceptionOutlined, PlusOutlined, PoweroffOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history, useIntl, useModel, useRequest } from '@umijs/max';
import { Button, Dropdown, Popconfirm } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useRef, useState } from 'react';
import { baseColumns } from './Columns';

export type OutendItem = {
  name: string;
  type: string;
  state: number;
  description: string;
  uuid: string;
  [key: string]: any;
};

const Outend = () => {
  const actionRef = useRef<ActionType>();
  const { formatMessage } = useIntl();
  const { isFreeTrial, total, changeTotal } = useModel('useCommon');

  const [open, setOpen] = useState<boolean>(false);
  const [restartId, setRestartId] = useState<string>('');

  // 删除
  const handleOnDelete = async (values: API.deleteOutendsDelParams) => {
    try {
      await deleteOutendsDel(values);
      actionRef?.current?.reload();
      message.success(formatMessage({ id: 'message.success.remove' }));
      return true;
    } catch (error) {
      return false;
    }
  };

  // 查看异常弹窗
  const { run: getErrorMsg } = useRequest(
    (params: API.getDevicesDeviceErrMsgParams) => getOutendsOutendErrMsg(params),
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

  const getMenuItems = ({ state }: OutendItem) => {
    let newItems = [
      {
        key: 'restart',
        label: formatMessage({ id: 'button.reload' }),
        icon: <PoweroffOutlined />,
        danger: true,
      },
    ] as ItemType[];

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

  const handleOnMenu = ({ key }: MenuInfo, { uuid }: OutendItem) => {
    switch (key) {
      case 'restart':
        setOpen(true);
        setRestartId(uuid);
        break;
      case 'error':
        getErrorMsg({ uuid });
        break;
      default:
        break;
    }
  };

  const actionColumns: ProColumns<OutendItem>[] = [
    {
      title: formatMessage({ id: 'table.title.option' }),
      valueType: 'option',
      key: 'option',
      width: 230,
      render: (_, { uuid, state }) => [
        <a key="detail" onClick={() => history.push(`/outend/detail/${uuid}`)}>
          {formatMessage({ id: 'button.detail' })}
        </a>,
        <a key="edit" onClick={() => history.push(`/outend/edit/${uuid}`)}>
          {formatMessage({ id: 'button.edit' })}
        </a>,
        <Popconfirm
          title={formatMessage({ id: 'outend.modal.title.remove' })}
          onConfirm={() => handleOnDelete({ uuid })}
          key="remove"
        >
          <a>{formatMessage({ id: 'button.remove' })}</a>
        </Popconfirm>,
        <Dropdown
          key="advance-action"
          menu={{
            items: getMenuItems({ state } as OutendItem),
            onClick: (info: MenuInfo) => handleOnMenu(info, { uuid } as OutendItem),
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
          columns={[...baseColumns, ...actionColumns] as ProColumns<OutendItem>[]}
          rootClassName="stripe-table"
          request={async () => {
            const res = await getOutendsList();

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
              type="primary"
              key="new"
              onClick={() => history.push('/outend/new')}
              icon={<PlusOutlined />}
              disabled={isFreeTrial && total >= MAX_TOTAL}
            >
              {formatMessage({ id: 'button.new' })}
            </Button>,
          ]}
        />
      </PageContainer>
      <ProConfirmModal
        open={open}
        onCancel={() => setOpen(false)}
        handleOnOk={async () => {
          await putOutendsRestart({ uuid: restartId });
        }}
      />
    </>
  );
};

export default Outend;
