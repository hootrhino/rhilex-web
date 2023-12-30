import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';

import { message } from '@/components/PopupHack';
import { getPlugwareList } from '@/services/rulex/chajianguanli';
import { useModel } from '@umijs/max';
import { Space } from 'antd';
import Detail from './Detail';

export type PluginItem = {
  name: string;
  version: string;
  helpLink: string;
  [key: string]: any;
};

const Plugins = () => {
  const { setDetailConfig, run } = useModel('usePlugin');

  const handleOption = (uuid: string) => {
    if (uuid === 'ICMPSender') {
      return (
        <a
          key="ping"
          onClick={() => {
            setDetailConfig({ open: true, uuid, name: 'ping', title: '网络测速' });
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
            setDetailConfig({ open: true, uuid, name: 'clients', title: '客户端列表', args: [] });
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
            setDetailConfig({ open: true, uuid, name: 'scan', title: 'Modbus 扫描仪' });
          }}
        >
          配置
        </a>
      );
    } else if (uuid === 'WEB_TTYD_TERMINAL') {
      return (
        <Space>
          <a
            key="start"
            onClick={() => {
              run({ uuid, name: 'start', args: '' }).then(() => {
                // 启动并打开终端
                message.success('启动成功');
                setDetailConfig({ open: true, uuid, name: 'start', title: '终端', args: '' });
                // setTimeout(() => {
                //   setDetailConfig({ ...detailConfig, open: true });
                // }, 1000);
              });
            }}
          >
            启动
          </a>
          <a
            key="stop"
            onClick={() => {
              run({ uuid, name: 'stop', args: '' }).then(() => {
                message.success('停止成功');
                setDetailConfig({ open: false, uuid, name: 'stop', title: '', args: '' });
              });
            }}
          >
            停止
          </a>
        </Space>
      );
    } else {
      return '-';
    }
  };

  const columns: ProColumns<PluginItem>[] = [
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
      renderText: (address) => (
        <a href={address} target="_blank" rel="noreferrer">
          {address}
        </a>
      ),
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
            const res = await getPlugwareList();

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
      <Detail />
    </>
  );
};

export default Plugins;
