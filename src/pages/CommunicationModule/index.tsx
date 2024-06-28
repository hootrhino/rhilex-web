import { modal } from '@/components/PopupHack';
import PageContainer from '@/components/ProPageContainer';
import ProTag, { StatusType } from '@/components/ProTag';
import { getTransceiverList, postTransceiverCtrl } from '@/services/rulex/tongxinmozu';
import { IconFont } from '@/utils/utils';
import {
  DownOutlined,
  ExceptionOutlined,
  MacCommandOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { getLocale, useIntl, useRequest } from '@umijs/max';
import { Dropdown, message, Space } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useState } from 'react';
import Command from './Command';
import Detail from './Detail';
import { TransceiverType, TransceiverTypeOption } from './enum';

export type ComItem = {
  name: string;
  type: number;
  model: string;
  status: number;
  vendor: string;
  [key: string]: any;
};

export type TransceiverCtrlParams = {
  name: string;
  topic: string;
  args: string;
};

const CommunicationModule = () => {
  const { formatMessage } = useIntl();

  const [activeName, setActiveName] = useState<string>('');
  const [activeType, setActiveType] = useState<number>(-1);
  const [openCommand, setOpenCommand] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  // 重启 4G 网卡
  const { run: restart4G } = useRequest(
    (params: TransceiverCtrlParams) => postTransceiverCtrl(params),
    {
      manual: true,
      onSuccess: () => {
        message.success(formatMessage({ id: 'message.success.restart' }));
      },
    },
  );

  const getMenuItems = ({ status, type }: ComItem) => {
    const baseItem = [
      {
        key: 'command',
        label: formatMessage({ id: 'com.button.cmd' }),
        icon: <MacCommandOutlined />,
      },
    ];
    let menuItem: ItemType[] = [...baseItem];

    if ([0, 2].includes(status)) {
      menuItem = [
        ...menuItem,
        {
          key: 'error',
          label: formatMessage({ id: 'button.error' }),
          icon: <ExceptionOutlined />,
        },
      ];
    }
    if (type === TransceiverType.MN4G) {
      menuItem = [
        {
          key: 'restart4g',
          danger: true,
          label: formatMessage({ id: 'com.button.restart4g' }),
          icon: <PoweroffOutlined />,
        },
        ...menuItem,
      ];
    }

    return menuItem;
  };

  const handleOnMenu = ({ key }: MenuInfo, { name, errMsg }: ComItem) => {
    switch (key) {
      case 'command':
        if (!name) return;

        setOpenCommand(true);
        setActiveName(name);
        break;
      case 'error':
        modal.error({
          title: formatMessage({ id: 'com.modal.title.error' }),
          content: <div className="flex flex-wrap">{errMsg}</div>,
          okText: formatMessage({ id: 'button.close' }),
        });
        break;
      case 'restart4g':
        modal.confirm({
          title: formatMessage({ id: 'modal.title.confirm' }),
          content: formatMessage({ id: 'com.modal.content.restart' }),
          onOk: restart4G,
          okText: formatMessage({ id: 'com.button.confirm.restart' }),
          cancelText: formatMessage({ id: 'button.cancel' }),
        });
        break;
      default:
        break;
    }
  };

  const columns: ProColumns<ComItem>[] = [
    {
      title: formatMessage({ id: 'com.table.title.name' }),
      dataIndex: 'name',
    },
    {
      title: formatMessage({ id: 'com.table.title.type' }),
      dataIndex: 'type',
      renderText: (type: number) => (
        <Space>
          <IconFont
            type={`icon-com-${TransceiverTypeOption[type].icon}`}
            style={{ fontSize: 18 }}
          />
          <span>{TransceiverTypeOption[type].text}</span>
        </Space>
      ),
    },
    {
      title: formatMessage({ id: 'com.table.title.model' }),
      dataIndex: 'model',
    },
    {
      title: formatMessage({ id: 'com.table.title.vendor' }),
      dataIndex: 'vendor',
    },
    {
      title: formatMessage({ id: 'com.table.title.status' }),
      dataIndex: 'status',
      renderText: (status: number) => <ProTag type={StatusType.COM}>{status}</ProTag>,
    },
    {
      title: formatMessage({ id: 'table.option' }),
      valueType: 'option',
      width: getLocale() === 'en-US' ? 160 : 140,
      render: (_, record) => [
        <a
          key="detail"
          onClick={() => {
            if (!record?.name) return;

            setOpenDetail(true);
            setActiveName(record?.name);
            setActiveType(record?.type);
          }}
        >
          {formatMessage({ id: 'button.detail' })}
        </a>,
        <Dropdown
          key="more"
          menu={{
            items: getMenuItems(record),
            onClick: (info: MenuInfo) => handleOnMenu(info, record),
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
          rowKey="name"
          rootClassName="stripe-table"
          columns={columns}
          search={false}
          pagination={false}
          request={async () => {
            const { data } = await getTransceiverList();

            return Promise.resolve({
              data,
              success: true,
            });
          }}
        />
      </PageContainer>
      <Command
        name={activeName}
        open={openCommand}
        onCancel={() => {
          setOpenCommand(false);
          setActiveName('');
        }}
      />
      <Detail
        name={activeName}
        type={activeType}
        open={openDetail}
        onCancel={() => {
          setOpenDetail(false);
          setActiveName('');
        }}
      />
    </>
  );
};

export default CommunicationModule;
