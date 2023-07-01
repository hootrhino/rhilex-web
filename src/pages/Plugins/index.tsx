import { useState } from 'react';
import { history, Link } from 'umi';

import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';

import { getPlugins } from '@/services/rulex/chajianguanli';
import Ping from './components/Ping';

type Item = Record<string, any>;

const Plugins = () => {
  const [pingConfig, setConfig] = useState<{ open: boolean; uuid: string }>({
    open: false,
    uuid: '',
  });

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
      renderText: (address) => <Link to={address}>{address}</Link>,
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
      render: (_, { uuid }) => {
        const ping = [
          <a
            key="ping"
            onClick={() => {
              setConfig({ open: true, uuid });
            }}
          >
            测速
          </a>,
        ];

        return uuid === 'RULEX-MqttServer'
          ? [
              ...ping,
              <a
                key="detail"
                onClick={() => {
                  history.push(`/plugins/${uuid}/detail`);
                }}
              >
                详情
              </a>,
            ]
          : ping;
      },
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
      <Ping
        {...pingConfig}
        onOpenChange={(visible: boolean) => setConfig({ ...pingConfig, open: visible })}
        onClose={() => setConfig({ ...pingConfig, open: false })}
      />
    </>
  );
};

export default Plugins;
