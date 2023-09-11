import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import type { ProDescriptionsItemProps, ProDescriptionsProps } from '@ant-design/pro-components';
import { ProDescriptions, ProTable } from '@ant-design/pro-components';
import { Drawer, DrawerProps, Tag } from 'antd';
import omit from 'lodash/omit';
import { useEffect } from 'react';
import { useRequest } from 'umi';

type DetailProps = DrawerProps & {
  uuid: string;
};

type EnhancedProDescriptionsProps = ProDescriptionsProps & {
  show?: boolean;
};

const EnhancedProDescriptions = ({
  labelStyle = { justifyContent: 'flex-end', minWidth: 130 },
  loading = false,
  column = 3,
  show = true,
  ...props
}: EnhancedProDescriptionsProps) => {
  return (
    show && <ProDescriptions labelStyle={labelStyle} loading={loading} column={column} {...props} />
  );
};

const Detail = ({ uuid, ...props }: DetailProps) => {
  const { data, run, loading } = useRequest(() => getDevicesDetail({ uuid }), {
    manual: true,
    formatResult: (res) => res?.data,
  });

  const deviceType = data?.type;
  const mode = data?.config?.commonConfig?.mode;
  const transport = data?.config?.commonConfig?.transport;

  const columnsMap: Record<string, ProDescriptionsItemProps<Record<string, any>>[]> = {
    BASE: [
      {
        title: '设备名称',
        dataIndex: 'name',
        ellipsis: true,
      },
      {
        title: '设备类型',
        dataIndex: 'type',
        valueEnum: {
          GENERIC_SNMP: '通用SNMP协议采集',
          USER_G776: '通用串口DTU',
          GENERIC_PROTOCOL: '通用串口协议',
          GENERIC_MODBUS: '通用Modbus Master',
        },
      },
      {
        title: '备注信息',
        dataIndex: 'description',
      },
    ],
    COMMON: [
      {
        title: '采集频率（毫秒）',
        dataIndex: 'frequency',
        hideInDescriptions: deviceType === 'GENERIC_PROTOCOL',
      },
      {
        title: '数据标签',
        dataIndex: 'tag',
        hideInDescriptions: deviceType !== 'USER_G776',
      },

      {
        title: '通信形式',
        dataIndex: 'transport',
        hideInDescriptions: deviceType !== 'GENERIC_PROTOCOL',
      },
      {
        title: '超时时间（毫秒）',
        dataIndex: 'timeout',
        hideInDescriptions: deviceType !== 'GENERIC_MODBUS',
      },
      {
        title: '重试次数',
        dataIndex: 'retryTime',
        hideInDescriptions: deviceType !== 'GENERIC_PROTOCOL',
      },
      {
        title: '协议分隔符',
        dataIndex: 'separator',
        hideInDescriptions: deviceType !== 'USER_G776',
        valueEnum: {
          LF: 'LF',
          CRLF: 'CRLF',
        },
      },
      {
        title: '是否启动轮询',
        dataIndex: 'autoRequest',
        hideInDescriptions: deviceType === 'GENERIC_PROTOCOL',
        renderText: (autoRequest) => (
          <Tag color={autoRequest ? 'success' : 'error'}>{autoRequest ? '开启' : '关闭'}</Tag>
        ),
      },
      {
        title: '工作模式',
        dataIndex: 'mode',
        hideInDescriptions: deviceType !== 'GENERIC_MODBUS',
        valueEnum: {
          RTU: 'RTU',
          TCP: 'TCP',
        },
      },
    ],
    SNMP: [
      {
        title: '主机地址',
        dataIndex: 'target',
        copyable: true,
      },
      {
        title: '主机端口',
        dataIndex: 'port',
      },
      {
        title: '通信形式',
        dataIndex: 'transport',
        valueEnum: { tcp: 'TCP', udp: 'UDP' },
      },
      {
        title: 'Community',
        dataIndex: 'community',
      },
      {
        title: '安全模式',
        dataIndex: 'securityModel',
        valueEnum: new Map([
          [0, '不认证'],
          [3, 'V3 认证'],
        ]),
      },
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '消息选项',
        dataIndex: 'snmpV3MsgFlags',
        valueEnum: new Map([
          [0, 'NoAuthNoPriv'],
          [1, 'AuthNoPriv'],
          [2, 'AuthPriv'],
          [3, 'Reportable'],
        ]),
      },
      {
        title: 'SNMP 认证协议',
        dataIndex: 'snmpV3AuthProtocol',
        valueEnum: new Map([
          [1, 'NoAuth'],
          [2, 'MD5'],
          [3, 'SHA'],
          [4, 'SHA224'],
          [5, 'SHA256'],
          [6, 'SHA384'],
          [7, 'SHA512'],
        ]),
      },
      {
        title: 'SNMP 认证密钥',
        dataIndex: 'authenticationPassphrase',
      },
      {
        title: '私有认证协议',
        dataIndex: 'privacyProtocol',
        valueEnum: new Map([
          [1, 'NoPriv'],
          [2, 'DES'],
          [3, 'AES'],
          [4, 'AES192'],
          [5, 'AES256'],
          [6, 'AES192C'],
          [7, 'AES256C'],
        ]),
      },
      {
        title: '私有认证协议密钥',
        dataIndex: 'privacyPassphrase',
      },
    ],
    UART: [
      {
        title: '超时时间（毫秒',
        dataIndex: 'timeout',
      },
      {
        title: '波特率',
        dataIndex: 'baudRate',
        valueEnum: new Map([
          [4800, '4800'],
          [9600, '9600'],
          [115200, '115200'],
        ]),
      },
      {
        title: '数据位',
        dataIndex: 'dataBits',
        valueEnum: new Map([
          [1, '1'],
          [2, '2'],
          [3, '3'],
          [4, '4'],
          [5, '5'],
          [6, '6'],
          [7, '7'],
          [8, '8'],
        ]),
      },
      {
        title: '奇偶校验',
        dataIndex: 'parity',
        valueEnum: { E: '奇校验', O: '偶校验', N: '不校验' },
      },
      {
        title: '停止位',
        dataIndex: 'stopBits',
        valueEnum: new Map([
          [1, '1'],
          [1.5, '1.5'],
          [2, '2'],
        ]),
      },
      {
        title: '串口路径',
        dataIndex: 'uart',
      },
    ],
    TCP: [
      {
        title: '服务地址',
        dataIndex: 'host',
      },
      {
        title: '服务端口',
        dataIndex: 'port',
      },
    ],
    HOST: [
      {
        title: '超时时间（毫秒）',
        dataIndex: 'timeout',
      },
      {
        title: '服务地址',
        dataIndex: 'host',
      },
      {
        title: '服务端口',
        dataIndex: 'port',
      },
    ],
    REGISTERS: [
      {
        title: '数据标签',
        dataIndex: 'tag',
      },
      {
        title: '数据别名',
        dataIndex: 'alias',
      },
      {
        title: 'Modbus 功能',
        dataIndex: 'function',
        valueEnum: new Map([
          [1, '01 读线圈状态'],
          [2, '02 读离散输入状态'],
          [3, '03 读保持寄存器'],
          [4, '04 读输入寄存器'],
        ]),
      },
      {
        title: '从设备 ID',
        dataIndex: 'slaverId',
      },
      {
        title: '起始地址',
        dataIndex: 'address',
      },
      {
        title: '读取数量',
        dataIndex: 'quantity',
      },
    ],
  };

  useEffect(() => {
    if (uuid) {
      run();
    }
  }, [uuid]);

  return (
    <Drawer title="设备详情" placement="right" width="50%" {...props}>
      <EnhancedProDescriptions
        title="基本信息"
        dataSource={omit(data, 'config')}
        columns={columnsMap['BASE']}
        loading={loading}
      />
      <EnhancedProDescriptions
        title="通用信息"
        dataSource={data?.config?.commonConfig}
        columns={columnsMap['COMMON']}
        loading={loading}
      />
      <EnhancedProDescriptions
        title="SNMP 配置"
        dataSource={data?.config?.snmpConfig}
        columns={columnsMap['SNMP']}
        loading={loading}
        show={deviceType === 'GENERIC_SNMP'}
      />
      <EnhancedProDescriptions
        title="串口配置"
        dataSource={data?.config?.uartConfig}
        columns={columnsMap['UART']}
        loading={loading}
        show={
          deviceType === 'USER_G776' ||
          (deviceType === 'GENERIC_PROTOCOL' && transport === 'rawserial')
        }
      />
      <EnhancedProDescriptions
        title="RTU 配置"
        dataSource={data?.config?.rtuConfig}
        columns={columnsMap['UART']}
        loading={loading}
        show={deviceType === 'GENERIC_MODBUS' && mode === 'RTU'}
      />
      <EnhancedProDescriptions
        title="TCP 配置"
        dataSource={data?.config?.tcpConfig}
        columns={columnsMap['TCP']}
        loading={loading}
        show={deviceType === 'GENERIC_MODBUS' && mode === 'TCP'}
      />
      <EnhancedProDescriptions
        title="TCP 配置"
        dataSource={data?.config?.hostConfig}
        columns={columnsMap['HOST']}
        loading={loading}
        show={deviceType === 'GENERIC_PROTOCOL' && transport === 'rawtcp'}
      />
      {deviceType === 'GENERIC_MODBUS' && data?.config?.registers?.length > 0 && (
        <>
          <ProDescriptions title="寄存器配置" />
          <ProTable
            rowKey="id"
            columns={columnsMap['REGISTERS']}
            dataSource={data?.config?.registers}
            search={false}
            pagination={false}
            options={false}
            loading={loading}
          />
        </>
      )}
    </Drawer>
  );
};

export default Detail;
