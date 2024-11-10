import { message, modal } from '@/components/PopupHack';
import ProConfirmModal from '@/components/ProConfirmModal';
import PageContainer from '@/components/ProPageContainer';
import type { DetailConfig } from '@/models/useCommon';
import { defaultConfig } from '@/models/useCommon';
import {
  deleteCecollasDel,
  getCecollasCecollaErrMsg,
  getCecollasListByGroup,
  putCecollasRestart,
} from '@/services/rhilex/yunbianxietong';
import { defaultPagination, DEFAULT_GROUP_KEY_CECOLLAS, MAX_TOTAL } from '@/utils/constant';
import {
  DownOutlined,
  ExceptionOutlined,
  FolderOpenOutlined,
  PlusOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProCard, ProList, ProTable } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import { Button, Dropdown, Popconfirm, Space } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useRef, useState } from 'react';
import { baseColumns } from './columns';
import Detail from './Detail';
import { groupData } from './enum';
import Update from './Update';

type CecollasItem = {
  uuid: string;
  name: string;
  type: string;
  state: number;
  errMsg: string;
  description: string;
  [key: string]: any;
};

const Cecollas = () => {
  const actionRef = useRef<ActionType>();
  const { formatMessage } = useIntl();
  const { isFreeTrial, detailConfig, total, changeConfig, initialConfig, changeTotal } =
    useModel('useCommon');
  const [open, setOpen] = useState<boolean>(false);
  const [updateConfig, changeUpdateConfig] = useState<DetailConfig>(defaultConfig);
  const [activeCecollas, setActiveCecollas] = useState<string>('');

  // 删除
  const { run: remove } = useRequest(
    (params: API.deleteDevicesDelParams) => deleteCecollasDel(params),
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
    (params: API.getDevicesDeviceErrMsgParams) => getCecollasCecollaErrMsg(params),
    {
      manual: true,
      onSuccess: (res) =>
        modal.error({
          title: formatMessage({ id: 'cecollas.modal.title.error' }),
          content: <div className="break-words">{res}</div>,
          okText: formatMessage({ id: 'button.close' }),
        }),
    },
  );

  const getMenuItems = ({ state = 0 }) => {
    const baseItems = [
      {
        key: 'restart',
        label: formatMessage({ id: 'button.reload' }),
        icon: <PoweroffOutlined />,
        danger: true,
      },
    ] as ItemType[];
    const showErr = state === 0;
    const errItem = {
      key: 'error',
      label: formatMessage({ id: 'button.error' }),
      icon: <ExceptionOutlined />,
    };

    let newItems = [...baseItems];

    return [...newItems, showErr ? errItem : null];
  };

  const handleOnMenu = ({ key }: MenuInfo, { uuid }: CecollasItem) => {
    switch (key) {
      case 'restart':
        setOpen(true);
        setActiveCecollas(uuid);
        break;
      case 'error':
        getErrorMsg({ uuid });
        break;
      default:
        break;
    }
  };

  const columns: ProColumns<CecollasItem>[] = [
    ...(baseColumns as ProColumns<CecollasItem>[]),
    {
      title: formatMessage({ id: 'table.title.option' }),
      width: 230,
      key: 'option',
      valueType: 'option',
      render: (_, record) => {
        const { uuid, state } = record;

        return (
          <Space>
            <a key="detail" onClick={() => changeConfig({ open: true, uuid })}>
              {formatMessage({ id: 'button.detail' })}
            </a>
            <a key="edit" onClick={() => changeUpdateConfig({ open: true, uuid })}>
              {formatMessage({ id: 'button.edit' })}
            </a>
            <Popconfirm
              title={formatMessage({ id: 'cecollas.popconfirm.title.remove' })}
              onConfirm={() => remove({ uuid })}
              okText={formatMessage({ id: 'button.yes' })}
              cancelText={formatMessage({ id: 'button.no' })}
              key="remove"
            >
              <a>{formatMessage({ id: 'button.remove' })}</a>
            </Popconfirm>
            <Dropdown
              menu={{
                items: getMenuItems({ state }),
                onClick: (info: MenuInfo) => handleOnMenu(info, record),
              }}
            >
              <a>
                {formatMessage({ id: 'button.advancedOption' })} <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <PageContainer>
        <ProCard split="vertical">
          <ProCard
            // title="云平台分组"
            colSpan="270px"
            headStyle={{ paddingInline: 16 }}
            bodyStyle={{ paddingInline: 16 }}
          >
            <ProList
              actionRef={actionRef}
              rowKey="uuid"
              headerTitle={false}
              toolBarRender={false}
              request={async () => {
                return Promise.resolve({
                  data: groupData,
                  success: true,
                });
              }}
              rowClassName="active-group"
              metas={{
                title: {
                  dataIndex: 'label',
                },
                avatar: {
                  render: () => <FolderOpenOutlined className="pl-[10px]" />,
                },
              }}
            />
          </ProCard>
          <ProCard title={formatMessage({ id: 'cecollas.title.list' })}>
            <ProTable
              actionRef={actionRef}
              rowKey="uuid"
              rootClassName="stripe-table"
              columns={columns}
              search={false}
              request={async ({ current, pageSize }) => {
                const { data } = await getCecollasListByGroup({
                  current,
                  size: pageSize,
                  uuid: DEFAULT_GROUP_KEY_CECOLLAS,
                });

                return Promise.resolve({
                  data: data?.records,
                  total: data?.total || 0,
                  success: true,
                });
              }}
              onDataSourceChange={(d) => changeTotal(d.length)}
              pagination={defaultPagination}
              toolBarRender={() => [
                <Button
                  key="new"
                  type="primary"
                  icon={<PlusOutlined />}
                  disabled={isFreeTrial && total >= MAX_TOTAL}
                  onClick={() => changeUpdateConfig({ open: true, uuid: '' })}
                >
                  {formatMessage({ id: 'button.new' })}
                </Button>,
              ]}
            />
          </ProCard>
        </ProCard>
      </PageContainer>
      <Detail {...detailConfig} onClose={initialConfig} />
      <Update
        {...updateConfig}
        onOpenChange={(open) => changeUpdateConfig({ open, uuid: open ? updateConfig.uuid : '' })}
        reload={() => actionRef.current?.reload()}
      />
      <ProConfirmModal
        open={open}
        onCancel={() => setOpen(false)}
        handleOnOk={async () => {
          await putCecollasRestart({ uuid: activeCecollas });
        }}
      />
    </>
  );
};

export default Cecollas;
