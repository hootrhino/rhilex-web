import { useState } from 'react';
import { history } from 'umi';

import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';

import { getPlugins } from '@/services/rulex/chajianguanli';
import ConfigModal from './components/Config';

type Item = Record<string, any>;

type Config = {
  open: boolean;
  uuid: string;
  type: 'PING' | 'SCANNER';
};

const Plugins = () => {
  const [config, setConfig] = useState<Config>({
    open: false,
    uuid: '',
    type: 'PING',
  });

  const handleOption = (uuid: string) => {
    if (uuid === 'ICMPSender') {
      return (
        <a
          key="ping"
          onClick={() => {
            setConfig({ open: true, uuid, type: 'PING' });
          }}
        >
          测速
        </a>
      );
    } else if (uuid === 'RULEX-MqttServer') {
      return (
        <a
          key="detail"
          onClick={() => {
            history.push(`/plugins/${uuid}/detail`);
          }}
        >
          详情
        </a>
      );
    } else if (uuid === 'MODBUS_SCANNER') {
      return (
        <a
          key="config"
          onClick={() => {
            setConfig({ open: true, uuid, type: 'SCANNER' });
          }}
        >
          配置
        </a>
      );
    } else {
      return '-';
    }
  };

  const columns: ProColumns<Item>[] = [
    {
      title: '插件名称',
      dataIndex: 'name',
      ellipsis: true,
      fixed: 'left',
    },
    {
      title: '版本',
      dataIndex: 'version',
      width: 80,
    },
    {
      title: '文档地址',
      dataIndex: 'helpLink',
      ellipsis: true,
      width: 250,
      renderText: (address) => <a href={address} target='_blank' rel="noreferrer">{address}</a>,
    },
    {
      title: '作者',
      dataIndex: 'author',
      width: 80,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      ellipsis: true,
      width: 180,
    },
    {
      title: '协议',
      dataIndex: 'license',
      width: 80,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 80,
      fixed: 'right',
      key: 'option',
      render: (_, { uuid }) => handleOption(uuid),
    },
  ];

  return (
    <>
      <PageContainer>
        <ProTable
          rowKey="uuid"
          columns={columns}
          request={async () => {
            const res = await getPlugins();

            return Promise.resolve({
              data: (res as any)?.data,
              success: true,
            });
          }}
          search={false}
          pagination={false}
          scroll={{ x: 1000 }}
        />
      </PageContainer>
      <ConfigModal
        {...config}
        onOpenChange={(visible: boolean) => setConfig({ ...config, open: visible })}
        onClose={() => setConfig({ ...config, open: false })}
      />
    </>
  );
};

export default Plugins;
