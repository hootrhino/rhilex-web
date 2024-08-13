import { modal } from '@/components/PopupHack';
import PageContainer from '@/components/ProPageContainer';
import ProTag, { StatusType } from '@/components/ProTag';
import { getTransceiverList, postTransceiverCtrl } from '@/services/rulex/tongxinmozu';
import { pick } from '@/utils/redash';
import { IconFont } from '@/utils/utils';
import {
  DownOutlined,
  ExceptionOutlined,
  MacCommandOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { Dropdown, message, Space } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useState } from 'react';
import Command from './Command';
import Detail from './Detail';
import {
  ModalType,
  TopicType,
  TransceiverTopic,
  TransceiverType,
  TransceiverTypeOption,
} from './enum';

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

type ModalConfig = {
  open: boolean;
  name: string;
  type: number;
  modalType: ModalType;
};

const DEFAULT_CONFIG = {
  open: false,
  name: '',
  type: -1,
  modalType: ModalType.DETAIL,
};

const CommunicationModule = () => {
  const { formatMessage, locale } = useIntl();

  const [config, setConfig] = useState<ModalConfig>(DEFAULT_CONFIG);

  // 重启
  const { run: restart } = useRequest(
    (params: TransceiverCtrlParams) => postTransceiverCtrl(params),
    {
      manual: true,
      onSuccess: () => {
        message.success(formatMessage({ id: 'message.success.restart' }));
      },
    },
  );

  // 获取高级操作
  const getMenuItems = ({ status, type }: ComItem) => {
    if ([TransceiverType.MN4G, TransceiverType.BLE, TransceiverType.LORA].includes(type)) {
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
      if ([TransceiverType.MN4G, TransceiverType.BLE].includes(type)) {
        menuItem = [
          {
            key: 'restart',
            danger: true,
            label: formatMessage({ id: 'button.restart' }),
            icon: <PoweroffOutlined />,
          },
          ...menuItem,
        ];
      }

      return menuItem;
    } else {
      if ([0, 2].includes(status)) {
        return [
          {
            key: 'error',
            label: formatMessage({ id: 'button.error' }),
            icon: <ExceptionOutlined />,
          },
        ];
      }
      return [];
    }
  };

  const handleOnMenu = ({ key }: MenuInfo, { name, type, errMsg }: ComItem) => {
    switch (key) {
      case 'command':
        if (!name) return;

        setConfig({ ...config, open: true, name, type, modalType: ModalType.COMMAND });
        break;
      case 'error':
        modal.error({
          title: formatMessage({ id: 'com.modal.title.error' }),
          content: <div className="flex flex-wrap">{errMsg}</div>,
          okText: formatMessage({ id: 'button.close' }),
        });
        break;
      case 'restart':
        modal.confirm({
          title: formatMessage({ id: 'modal.title.confirm' }),
          content: formatMessage({ id: 'com.modal.content.restart' }),
          onOk: () =>
            restart({ name, args: '', topic: TransceiverTopic[type]?.[TopicType.RESTART] }),
          okText: formatMessage({ id: 'com.button.confirm.restart' }),
          cancelText: formatMessage({ id: 'button.cancel' }),
        });
        break;
      default:
        break;
    }
  };

  // 重置 modal 配置
  const handleOnReset = () => {
    setConfig(DEFAULT_CONFIG);
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
      width: locale !== 'zh-CN' ? 160 : 140,
      render: (_, record) => [
        <a
          key="detail"
          onClick={() => {
            if (!record?.name) return;

            setConfig({
              ...config,
              open: true,
              name: record?.name,
              type: record?.type,
              modalType: ModalType.DETAIL,
            });
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
        {...pick(config, ['name', 'type'])}
        open={config.open && config.modalType === ModalType.COMMAND}
        onCancel={handleOnReset}
      />
      <Detail
        {...pick(config, ['name', 'type'])}
        open={config.open && config.modalType === ModalType.DETAIL}
        onCancel={handleOnReset}
      />
    </>
  );
};

export default CommunicationModule;
