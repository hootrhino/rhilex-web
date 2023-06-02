import { useEffect, useRef } from 'react';

import { history, useParams } from 'umi';

import {
  BetaSchemaForm,
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProFormInstance,
} from '@ant-design/pro-components';
import { useRequest } from 'ahooks';

import cloneDeep from 'lodash/cloneDeep';

import FormFooter from '@/components/FromFooter';
import { message } from '@/components/PopupHack';
import { getDevices, postDevices, putDevices } from '@/services/rulex/shebeiguanli';

import useGoBack from '@/hooks/useGoBack';
import { AutoComplete, Segmented } from 'antd';
import omit from 'lodash/omit';
import { columns } from './columns';
import { initialValue } from './initialValue';

export const toolTip = (
  <a
    href="https://github.com/i4de/rulex/blob/master/device/custom_protocol_device.md"
    target="_blank"
    rel="noreferrer"
  >
    详细戳这里
  </a>
);

export const DEFAULT_DEVICE_CONFIG = {
  type: 1,
  rw: 1,
  checkAlgorithm: 'NONECHECK',
  bufferSize: 0,
  timeSlice: 10,
  timeout: 30,
  checksumValuePos: 0,
  checksumBegin: 0,
  checksumEnd: 0,
  weight: 1,
  initValue: 0,
  autoRequest: 'false',
  onCheckError: 'IGNORE',
};

export const DEFAULT_REGISTER_CONFIG = {
  weight: 1,
  initValue: 0,
  slaverId: 1,
  address: 0,
  quantity: 1,
};

const processColumns = (columns: any) => {
  return columns.map((col: any) => {
    if (col.valueType === 'group') {
      return { ...col, columns: processColumns(col.columns) };
    }

    if (col.valueType === 'dependency') {
      // console.log(col?.name);
      return {
        ...col,
        columns: (params: any) => {
          console.log(params, col?.name);
          return processColumns(col.columns(params));
        },
      };
    }
    if (col.valueType === 'formList') {
      if (col.mode === 'single') {
        return {
          ...omit(col, ['mode']),
          columns: processColumns(col.columns),
          fieldProps: {
            creatorButtonProps: false,
            copyIconProps: false,
            deleteIconProps: false,
          },
        };
      } else {
        return {
          ...omit(col, ['mode']),
          columns: processColumns(col.columns),
          fieldProps: {
            min: 1,
            creatorButtonProps: { position: 'top' },
            creatorRecord: col?.initialValue,
            itemRender: ({ listDom, action }: any, { record }: any) => (
              <ProCard
                bordered
                extra={action}
                title={record?.name}
                style={{
                  marginBlockEnd: 8,
                }}
              >
                {listDom}
              </ProCard>
            ),
          },
        };
      }
    }

    return {
      ...omit(col, ['required']),
      width: 'lg',
      fieldProps: {
        placeholder: col?.valueType === 'select' ? `请选择${col?.title}` : `请输入${col?.title}`,
      },
      formItemProps: {
        rules: [
          {
            required: col?.required,
            message: col?.valueType === 'select' ? `请选择${col?.title}` : `请输入${col?.title}`,
          },
        ],
      },
      tooltip: col?.tooltip === true ? toolTip : col?.tooltip,
    };
  });
};

// const columns = [
//   {
//     valueType: 'group',
//     columns: [
//       {
//         title: '设备名称',
//         dataIndex: 'name',
//         width: 'lg',
//         fieldProps: {
//           placeholder: '请输入设备名称',
//         },
//         formItemProps: {
//           rules: [
//             {
//               required: true,
//               message: '请输入设备名称',
//             },
//           ],
//         },
//       },
//       {
//         title: '设备类型',
//         dataIndex: 'type',
//         width: 'lg',
//         valueType: 'select',
//         valueEnum: {
//           GENERIC_SNMP: 'SNMP协议采集器',
//           USER_G776: '有人4G串口通信DTU',
//           GENERIC_PROTOCOL: '自定义串口协议',
//           GENERIC_MODBUS: '通用Modbus协议采集器',
//         },
//         fieldProps: {
//           placeholder: '请选择设备类型',
//         },
//         formItemProps: {
//           rules: [
//             {
//               required: true,
//               message: '请选择设备类型',
//             },
//           ],
//         },
//       },
//       {
//         title: '备注信息',
//         dataIndex: 'description',
//         width: 'lg',
//         fieldProps: {
//           placeholder: '请输入备注信息',
//         },
//       },
//     ],
//   },
//   {
//     valueType: 'dependency',
//     name: ['type'],
//     columns: ({ type }: any) => {
//       return [
//         {
//           title: '通用配置',
//           valueType: 'group',
//           columns: [
//             {
//               valueType: 'formList',
//               dataIndex: ['config', 'commonConfig'],
//               fieldProps: {
//                 creatorButtonProps: false,
//                 copyIconProps: false,
//                 deleteIconProps: false,
//               },
//               columns: [
//                 {
//                   valueType: 'group',
//                   columns: [
//                     {
//                       title: '采集频率（毫秒）',
//                       dataIndex: 'frequency',
//                       valueType: 'digit',
//                       width: 'lg',
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入采集频率',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       title: '是否启动轮询',
//                       dataIndex: 'autoRequest',
//                       width: 'lg',
//                       hideInForm: type === 'GENERIC_PROTOCOL',
//                       renderFormItem: () => (
//                         <Segmented
//                           block
//                           options={[
//                             { label: '是', value: 'true' },
//                             { label: '否', value: 'false' },
//                           ]}
//                         />
//                       ),
//                     },
//                     {
//                       title: '数据标签',
//                       dataIndex: 'tag',
//                       width: 'lg',
//                       hideInForm: type !== 'USER_G776',
//                       fieldProps: {
//                         placeholder: '请输入数据标签',
//                       },
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入数据标签',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       title: '通信形式',
//                       dataIndex: 'transport',
//                       valueType: 'select',
//                       width: 'lg',
//                       hideInForm: type !== 'GENERIC_PROTOCOL',
//                       valueEnum: { rs485rawserial: 'RS485串口连接' },
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请选择通信形式',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       title: '重试次数',
//                       dataIndex: 'retryTime',
//                       valueType: 'digit',
//                       width: 'lg',
//                       hideInForm: type !== 'GENERIC_PROTOCOL',
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入重试次数',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       title: '超时时间（毫秒）',
//                       dataIndex: 'timeout',
//                       valueType: 'digit',
//                       width: 'lg',
//                       hideInForm: type !== 'GENERIC_MODBUS',
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入超时时间',
//                           },
//                         ],
//                       },
//                     },
//                   ],
//                 },
//                 {
//                   valueType: 'group',
//                   columns: [
//                     {
//                       title: '协议分隔符',
//                       dataIndex: 'separator',
//                       valueType: 'select',
//                       width: 'lg',
//                       hideInForm: type !== 'USER_G776',
//                       valueEnum: {
//                         LF: 'LF',
//                         CRLF: 'CRLF',
//                       },
//                       fieldProps: {
//                         placeholder: '请输入协议分隔符',
//                       },
//                     },
//                     {
//                       title: '工作模式',
//                       dataIndex: 'mode',
//                       valueType: 'select',
//                       width: 'lg',
//                       hideInForm: type !== 'GENERIC_MODBUS',
//                       valueEnum: {
//                         rtu: 'RTU',
//                         tcp: 'TCP',
//                       },
//                       fieldProps: {
//                         placeholder: '请选择工作模式',
//                       },
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请选择工作模式',
//                           },
//                         ],
//                       },
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           title: 'SNMP 配置',
//           valueType: 'group',
//           hideInForm: type !== 'GENERIC_SNMP',
//           columns: [
//             {
//               valueType: 'formList',
//               dataIndex: ['config', 'snmpConfig'],
//               fieldProps: {
//                 creatorButtonProps: false,
//                 copyIconProps: false,
//                 deleteIconProps: false,
//               },
//               columns: [
//                 {
//                   valueType: 'group',
//                   columns: [
//                     {
//                       title: '主机地址',
//                       dataIndex: 'target',
//                       width: 'lg',
//                       tooltip: toolTip,
//                       fieldProps: {
//                         placeholder: '请输入主机地址',
//                       },
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入主机地址',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       title: '主机端口',
//                       dataIndex: 'port',
//                       valueType: 'digit',
//                       width: 'lg',
//                       tooltip: toolTip,
//                       fieldProps: {
//                         placeholder: '请输入主机端口',
//                       },
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入主机端口',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       title: '通信形式',
//                       dataIndex: 'transport',
//                       valueType: 'select',
//                       width: 'lg',
//                       tooltip: toolTip,
//                       valueEnum: { tcp: 'TCP', udp: 'UDP' },
//                       fieldProps: {
//                         placeholder: '请选择通信形式',
//                       },
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请选择通信形式',
//                           },
//                         ],
//                       },
//                     },
//                   ],
//                 },
//                 {
//                   valueType: 'group',
//                   columns: [
//                     {
//                       title: 'Community',
//                       dataIndex: 'community',
//                       width: 'lg',
//                       tooltip: toolTip,
//                       fieldProps: {
//                         placeholder: '请输入 Community',
//                       },
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入 Community',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       title: '安全模式',
//                       dataIndex: 'securityModel',
//                       valueType: 'select',
//                       width: 'lg',
//                       tooltip: toolTip,
//                       valueEnum: new Map([
//                         [1, '不认证'],
//                         [0, 'V3 认证'],
//                       ]),
//                       fieldProps: {
//                         placeholder: '请选择安全模式',
//                       },
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请选择安全模式',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       valueType: 'dependency',
//                       name: ['securityModel'],
//                       columns: ({ securityModel }: any) => [
//                         {
//                           title: '用户名',
//                           dataIndex: 'username',
//                           width: 'lg',
//                           tooltip: toolTip,
//                           hideInForm: securityModel !== 3,
//                           fieldProps: {
//                             placeholder: '请输入用户名',
//                           },
//                           formItemProps: {
//                             rules: [
//                               {
//                                 required: true,
//                                 message: '请输入用户名',
//                               },
//                             ],
//                           },
//                         },
//                       ],
//                     },
//                   ],
//                 },
//                 {
//                   valueType: 'dependency',
//                   name: ['securityModel'],
//                   columns: ({ securityModel }: any) =>
//                     securityModel === 3
//                       ? [
//                           {
//                             valueType: 'group',
//                             columns: [
//                               {
//                                 title: '消息选项',
//                                 dataIndex: 'snmpV3MsgFlags',
//                                 width: 'lg',
//                                 valueType: 'select',
//                                 tooltip: toolTip,
//                                 valueEnum: new Map([
//                                   [0, 'NoAuthNoPriv'],
//                                   [1, 'AuthNoPriv'],
//                                   [2, 'AuthPriv'],
//                                   [3, 'Reportable'],
//                                 ]),
//                                 fieldProps: {
//                                   placeholder: '请选择消息选项',
//                                 },
//                                 formItemProps: {
//                                   rules: [
//                                     {
//                                       required: true,
//                                       message: '请选择消息选项',
//                                     },
//                                   ],
//                                 },
//                               },
//                               {
//                                 title: 'SNMP 认证协议',
//                                 dataIndex: 'snmpV3AuthProtocol',
//                                 width: 'lg',
//                                 valueType: 'select',
//                                 tooltip: toolTip,
//                                 valueEnum: new Map([
//                                   [1, 'NoAuth'],
//                                   [2, 'MD5'],
//                                   [3, 'SHA'],
//                                   [4, 'SHA224'],
//                                   [5, 'SHA256'],
//                                   [6, 'SHA384'],
//                                   [7, 'SHA512'],
//                                 ]),
//                                 fieldProps: {
//                                   placeholder: '请选择 SNMP 认证协议',
//                                 },
//                                 formItemProps: {
//                                   rules: [
//                                     {
//                                       required: true,
//                                       message: '请选择 SNMP 认证协议',
//                                     },
//                                   ],
//                                 },
//                               },
//                               {
//                                 title: 'SNMP 认证密钥',
//                                 dataIndex: 'authenticationPassphrase',
//                                 width: 'lg',
//                                 tooltip: toolTip,
//                                 fieldProps: {
//                                   placeholder: '请选择 SNMP 认证密钥',
//                                 },
//                                 formItemProps: {
//                                   rules: [
//                                     {
//                                       required: true,
//                                       message: '请选择 SNMP 认证密钥',
//                                     },
//                                   ],
//                                 },
//                               },
//                             ],
//                           },
//                           {
//                             valueType: 'group',
//                             columns: [
//                               {
//                                 title: '私有认证协议',
//                                 dataIndex: 'privacyProtocol',
//                                 width: 'lg',
//                                 valueType: 'select',
//                                 tooltip: toolTip,
//                                 valueEnum: new Map([
//                                   [1, 'NoPriv'],
//                                   [2, 'DES'],
//                                   [3, 'AES'],
//                                   [4, 'AES192'],
//                                   [5, 'AES256'],
//                                   [6, 'AES192C'],
//                                   [7, 'AES256C'],
//                                 ]),
//                                 fieldProps: {
//                                   placeholder: '请选择私有认证协议',
//                                 },
//                                 formItemProps: {
//                                   rules: [
//                                     {
//                                       required: true,
//                                       message: '请选择私有认证协议',
//                                     },
//                                   ],
//                                 },
//                               },
//                               {
//                                 title: '私有认证协议密钥',
//                                 dataIndex: 'privacyPassphrase',
//                                 width: 'lg',
//                                 tooltip: toolTip,
//                                 fieldProps: {
//                                   placeholder: '请输入私有认证协议密钥',
//                                 },
//                                 formItemProps: {
//                                   rules: [
//                                     {
//                                       required: true,
//                                       message: '请输入私有认证协议密钥',
//                                     },
//                                   ],
//                                 },
//                               },
//                             ],
//                           },
//                         ]
//                       : [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           title: type === 'USER_G776' ? '串口配置' : 'RTU 配置',
//           valueType: 'group',
//           hideInForm: !['USER_G776', 'GENERIC_MODBUS'].includes(type),
//           columns: [
//             {
//               valueType: 'formList',
//               dataIndex: ['config', type === 'USER_G776' ? 'uartConfig' : 'rtuConfig'],
//               fieldProps: {
//                 creatorButtonProps: false,
//                 copyIconProps: false,
//                 deleteIconProps: false,
//               },
//               columns: [
//                 {
//                   valueType: 'group',
//                   columns: [
//                     {
//                       title: '超时时间（毫秒）',
//                       dataIndex: 'timeout',
//                       valueType: 'digit',
//                       width: 'lg',
//                       tooltip: toolTip,
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入超时时间',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       title: '波特率',
//                       dataIndex: 'baudRate',
//                       valueType: 'select',
//                       width: 'lg',
//                       tooltip: toolTip,
//                       valueEnum: new Map([
//                         [4800, '4800'],
//                         [9600, '9600'],
//                         [115200, '115200'],
//                       ]),

//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请选择串口通信波特率',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       title: '数据位',
//                       dataIndex: 'dataBits',
//                       valueType: 'digit',
//                       width: 'lg',
//                       tooltip: toolTip,
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入串口通信数据位',
//                           },
//                         ],
//                       },
//                     },
//                   ],
//                 },
//                 {
//                   valueType: 'group',
//                   columns: [
//                     {
//                       title: '奇偶校验',
//                       dataIndex: 'parity',
//                       valueType: 'select',
//                       width: 'lg',
//                       tooltip: toolTip,
//                       valueEnum: { E: '奇校验', O: '偶校验', N: '不校验' },
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请选择奇偶校验',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       title: '停止位',
//                       dataIndex: 'stopBits',
//                       valueType: 'digit',
//                       width: 'lg',
//                       tooltip: toolTip,
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入串口通信停止位',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       title: '串口路径',
//                       dataIndex: 'uart',
//                       tooltip: toolTip,
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入本地系统的串口路径',
//                           },
//                         ],
//                       },
//                       renderFormItem: () => (
//                         <AutoComplete
//                           style={{ width: 440 }}
//                           options={[]}
//                           placeholder="请输入本地系统的串口路径"
//                         />
//                       ),
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           title: '设备配置',
//           valueType: 'group',
//           hideInForm: type !== 'GENERIC_PROTOCOL',
//           columns: [
//             {
//               valueType: 'formList',
//               dataIndex: ['config', 'deviceConfig'],
//               fieldProps: {
//                 min: 1,
//                 creatorButtonProps: { position: 'top' },
//                 creatorRecord: {
//                   type: 1,
//                   rw: 1,
//                   checkAlgorithm: 'NONECHECK',
//                   bufferSize: 0,
//                   timeSlice: 10,
//                   timeout: 30,
//                   checksumValuePos: 0,
//                   checksumBegin: 0,
//                   checksumEnd: 0,
//                   weight: 1,
//                   initValue: 0,
//                   autoRequest: 'false',
//                   onCheckError: 'IGNORE',
//                 },
//                 itemRender: ({ listDom, action }: any, { record }: any) => (
//                   <ProCard
//                     bordered
//                     extra={action}
//                     title={record?.name}
//                     style={{
//                       marginBlockEnd: 8,
//                     }}
//                   >
//                     {listDom}
//                   </ProCard>
//                 ),
//               },
//               columns: [
//                 {
//                   valueType: 'group',
//                   columns: [
//                     {
//                       title: '协议名称',
//                       dataIndex: 'name',
//                       width: 'lg',
//                       tooltip: toolTip,
//                       fieldProps: {
//                         placeholder: '请输入协议名称',
//                       },
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入协议名称',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       title: '协议类型',
//                       dataIndex: 'type',
//                       width: 'lg',
//                       valueType: 'select',
//                       tooltip: toolTip,
//                       valueEnum: new Map([
//                         [1, '静态协议'],
//                         [2, '动态协议'],
//                         [3, '自定义时间片读'],
//                         [4, '自定义时间片读写'],
//                       ]),
//                       fieldProps: {
//                         placeholder: '请选择协议类型',
//                       },
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请选择协议类型',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       title: '备注信息',
//                       dataIndex: 'description',
//                       width: 'lg',
//                     },
//                   ],
//                 },
//                 {
//                   valueType: 'group',
//                   columns: [
//                     {
//                       title: '读取权限',
//                       dataIndex: 'rw',
//                       width: 'lg',
//                       valueType: 'select',
//                       valueEnum: new Map([
//                         [1, '只读'],
//                         [2, '只写'],
//                         [3, '读写'],
//                       ]),
//                       fieldProps: {
//                         placeholder: '请选择读取权限',
//                       },
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请选择读取权限',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       valueType: 'dependency',
//                       name: ['type'],
//                       columns: ({ type }: any) => {
//                         return [
//                           {
//                             title: '缓冲区大小',
//                             dataIndex: 'bufferSize',
//                             valueType: 'digit',
//                             width: 'lg',
//                             hideInForm: type !== 1,
//                             formItemProps: {
//                               rules: [
//                                 {
//                                   required: true,
//                                   message: '请输入缓冲区大小',
//                                 },
//                               ],
//                             },
//                           },
//                           {
//                             title: '定时请求倒计时（毫秒）',
//                             dataIndex: 'timeSlice',
//                             valueType: 'digit',
//                             width: 'lg',
//                             hideInForm: ![3, 4].includes(type),
//                             formItemProps: {
//                               rules: [
//                                 {
//                                   required: true,
//                                   message: '请输入定时请求倒计时',
//                                 },
//                               ],
//                             },
//                           },
//                         ];
//                       },
//                     },
//                     {
//                       title: '指令等待时间（毫秒）',
//                       dataIndex: 'timeout',
//                       valueType: 'digit',
//                       width: 'lg',
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入指令等待时间',
//                           },
//                         ],
//                       },
//                     },
//                   ],
//                 },
//                 {
//                   valueType: 'dependency',
//                   name: ['type'],
//                   columns: ({ type }: any) =>
//                     [1, 2].includes(type)
//                       ? [
//                           {
//                             valueType: 'group',
//                             columns: [
//                               {
//                                 title: '数据校验算法',
//                                 dataIndex: 'checkAlgorithm',
//                                 valueType: 'select',
//                                 width: 'lg',
//                                 valueEnum: {
//                                   XOR: 'XOR 校验',
//                                   CRC16: 'CRC16 校验',
//                                   NONECHECK: '不校验（默认）',
//                                 },
//                                 formItemProps: {
//                                   rules: [
//                                     {
//                                       required: true,
//                                       message: '请选择校验算法',
//                                     },
//                                   ],
//                                 },
//                               },
//                               {
//                                 title: '校验值比对位',
//                                 dataIndex: 'checksumValuePos',
//                                 valueType: 'digit',
//                                 width: 'lg',
//                                 formItemProps: {
//                                   rules: [
//                                     {
//                                       required: true,
//                                       message: '请输入校验值比对位',
//                                     },
//                                   ],
//                                 },
//                               },
//                               {
//                                 title: '校验算法起始位置',
//                                 dataIndex: 'checksumBegin',
//                                 valueType: 'digit',
//                                 width: 'lg',
//                                 formItemProps: {
//                                   rules: [
//                                     {
//                                       required: true,
//                                       message: '请输入校验算法起始位置',
//                                     },
//                                   ],
//                                 },
//                               },
//                             ],
//                           },
//                           {
//                             valueType: 'group',
//                             columns: [
//                               {
//                                 title: '校验算法结束位置',
//                                 dataIndex: 'checksumEnd',
//                                 valueType: 'digit',
//                                 width: 'lg',
//                                 formItemProps: {
//                                   rules: [
//                                     {
//                                       required: true,
//                                       message: '请输入校验算法结束位置',
//                                     },
//                                   ],
//                                 },
//                               },
//                               {
//                                 valueType: 'dependency',
//                                 name: ['checkAlgorithm'],
//                                 columns: ({ checkAlgorithm }: any) => [
//                                   {
//                                     title: '校验失败处理',
//                                     dataIndex: 'onCheckError',
//                                     valueType: 'select',
//                                     width: 'lg',
//                                     hideInForm: checkAlgorithm === 'NONECHECK',
//                                     valueEnum: {
//                                       LOG: '输出到日志',
//                                       IGNORE: '忽略错误',
//                                     },
//                                     formItemProps: {
//                                       rules: [
//                                         {
//                                           required: true,
//                                           message: '请选择校验失败处理',
//                                         },
//                                       ],
//                                     },
//                                   },
//                                 ],
//                               },
//                               {
//                                 title: '是否启动轮询',
//                                 dataIndex: 'autoRequest',
//                                 width: 'lg',
//                                 hideInForm: type === 'GENERIC_PROTOCOL',
//                                 renderFormItem: () => (
//                                   <Segmented
//                                     block
//                                     options={[
//                                       { label: '是', value: 'true' },
//                                       { label: '否', value: 'false' },
//                                     ]}
//                                   />
//                                 ),
//                               },
//                             ],
//                           },
//                           {
//                             valueType: 'group',
//                             columns: [
//                               {
//                                 title: '协议请求参数',
//                                 dataIndex: ['protocol', 'in'],
//                                 width: 'lg',
//                                 fieldProps: {
//                                   placeholder: '请输入设备名称',
//                                 },
//                                 formItemProps: {
//                                   rules: [
//                                     {
//                                       required: true,
//                                       message: '请输入协议请求参数',
//                                     },
//                                   ],
//                                 },
//                               },
//                               {
//                                 title: '权重系数',
//                                 dataIndex: 'weight',
//                                 valueType: 'digit',
//                                 width: 'lg',
//                               },
//                               {
//                                 title: '初始值',
//                                 dataIndex: 'initValue',
//                                 valueType: 'digit',
//                                 width: 'lg',
//                               },
//                             ],
//                           },
//                         ]
//                       : [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           title: '寄存器配置',
//           valueType: 'group',
//           hideInForm: type !== 'GENERIC_MODBUS',
//           columns: [
//             {
//               valueType: 'formList',
//               dataIndex: ['config', 'registers'],
//               fieldProps: {
//                 min: 1,
//                 creatorButtonProps: { position: 'top' },
//                 creatorRecord: {
//                   weight: 1,
//                   initValue: 0,
//                   slaverId: 1,
//                   address: 0,
//                   quantity: 1,
//                 },
//                 itemRender: ({ listDom, action }: any, { record }: any) => (
//                   <ProCard
//                     bordered
//                     extra={action}
//                     title={record?.name}
//                     style={{
//                       marginBlockEnd: 8,
//                     }}
//                   >
//                     {listDom}
//                   </ProCard>
//                 ),
//               },
//               columns: [
//                 {
//                   valueType: 'group',
//                   columns: [
//                     {
//                       title: '数据标签',
//                       dataIndex: 'tag',
//                       width: 'lg',
//                       fieldProps: {
//                         placeholder: '请输入数据标签',
//                       },
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入数据标签',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       title: '权重系数',
//                       dataIndex: 'weight',
//                       valueType: 'digit',
//                       width: 'lg',
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入权重系数',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       title: '初始值',
//                       dataIndex: 'initValue',
//                       valueType: 'digit',
//                       width: 'lg',
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入初始值',
//                           },
//                         ],
//                       },
//                     },
//                   ],
//                 },
//                 {
//                   valueType: 'group',
//                   columns: [
//                     {
//                       title: 'Modbus 功能',
//                       dataIndex: 'function',
//                       width: 'lg',
//                       valueType: 'select',
//                       valueEnum: new Map([
//                         [1, '01 读线圈状态'],
//                         [2, '02 读离散输入状态'],
//                         [3, '03 读保持寄存器'],
//                         [4, '04 读输入寄存器'],
//                         [5, '05 写单个线圈'],
//                         [6, '06 写单个保持寄存器'],
//                         [15, '15 写多个线圈'],
//                         [16, '16 写多个保持寄存器'],
//                       ]),
//                       fieldProps: {
//                         placeholder: '请选择 Modbus 功能',
//                       },
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请选择 Modbus 功能',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       title: '从设备 ID',
//                       dataIndex: 'slaverId',
//                       valueType: 'digit',
//                       width: 'lg',
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入从设备 ID',
//                           },
//                           {
//                             max: 255,
//                             type: 'integer',
//                             message: '从设备 ID 在 1-255 之间',
//                           },
//                           {
//                             min: 1,
//                             type: 'integer',
//                             message: '从设备 ID 在 1-255 之间',
//                           },
//                         ],
//                       },
//                     },
//                     {
//                       title: '起始地址',
//                       dataIndex: 'address',
//                       valueType: 'digit',
//                       width: 'lg',
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入起始地址',
//                           },
//                         ],
//                       },
//                     },
//                   ],
//                 },
//                 {
//                   valueType: 'group',
//                   columns: [
//                     {
//                       title: '读取数量',
//                       dataIndex: 'quantity',
//                       valueType: 'digit',
//                       width: 'lg',
//                       formItemProps: {
//                         rules: [
//                           {
//                             required: true,
//                             message: '请输入读取数量',
//                           },
//                           {
//                             min: 1,
//                             type: 'integer',
//                             message: '读取数量在 1-255 之间',
//                           },
//                           {
//                             max: 255,
//                             type: 'integer',
//                             message: '读取数量在 1-255 之间',
//                           },
//                         ],
//                       },
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//       ];
//     },
//   },
// ];

const BaseForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { id } = useParams();
  const { showModal } = useGoBack();

  // console.log(navigator);

  // 新建&编辑
  const onFinish = async (values: any) => {
    try {
      let params = cloneDeep(values);
      const deviceConfigFormat = new Object();

      params?.config?.deviceConfig?.forEach((item: any) => {
        deviceConfigFormat[item?.name] = {
          ...item,
          autoRequest: Boolean(item?.autoRequest),
          autoRequestGap: 0,
          timeSlice: [3, 4].includes(item?.type) ? item?.timeSlice : 0,
        };
      });

      params = {
        ...params,
        config: {
          ...params?.config,
          commonConfig: {
            ...params?.config?.commonConfig?.[0],
            autoRequest: Boolean(params?.config?.commonConfig?.[0]?.autoRequest),
          },
          snmpConfig: params?.config?.snmpConfig?.[0],
          deviceConfig: deviceConfigFormat,
          uartConfig: params?.config?.uartConfig?.[0],
          rtuConfig: params?.config?.rtuConfig?.[0],
          tcpConfig: params?.config?.tcpConfig?.[0],
          registers: params?.config?.registers?.map((item: Record<string, any>) => ({
            ...item,
            value: '',
          })),
        },
      };

      if (id) {
        await putDevices({ ...params, uuid: id });
      } else {
        await postDevices(params);
      }
      message.success(id ? '更新成功' : '新建成功');
      history.push('/device/list');
      return true;
    } catch (error) {
      return false;
    }
  };

  // 获取详情
  const { run: getDetail, data: detail } = useRequest(() => getDevices({ params: { uuid: id } }), {
    manual: true,
    onSuccess: (res: any) =>
      formRef.current?.setFieldsValue({
        ...res?.data,
        config: {
          ...res?.data?.config,
          commonConfig: [res?.data?.config?.commonConfig],
          deviceConfig:
            res?.data?.config?.deviceConfig && Object.values(res?.data?.config?.deviceConfig),
          snmpConfig: [res?.data?.config?.snmpConfig],
          uartConfig: [res?.data?.config?.uartConfig],
          rtuConfig: [res?.data?.config?.rtuConfig],
          tcpConfig: [res?.data?.config?.tcpConfig],
        },
      }),
  });

  useEffect(() => {
    if (id) {
      getDetail();
    } else {
      formRef.current?.setFieldsValue({
        ...initialValue,
      });
    }
  }, [id]);

  return (
    <PageContainer
      header={{ title: id ? '编辑设备' : '新建设备' }}
      onBack={() => showModal({ url: '/device/list' })}
    >
      <ProConfigProvider
        valueTypeMap={{
          segmented: {
            renderFormItem: () => (
              <Segmented
                block
                style={{ width: 440 }}
                options={[
                  { label: '是', value: 'true' },
                  { label: '否', value: 'false' },
                ]}
              />
            ),
          },
          autoComplete: {
            renderFormItem: () => (
              <AutoComplete
                style={{ width: 440 }}
                options={[]}
                placeholder="请输入本地系统的串口路径"
              />
            ),
          },
        }}
        hashed={false}
      >
        <ProCard>
          <BetaSchemaForm
            layoutType="Form"
            formRef={formRef}
            columns={processColumns(columns)}
            onFinish={onFinish}
            submitter={{
              render: ({ reset, submit }) => {
                return (
                  <FormFooter
                    onReset={() => (id ? formRef.current?.setFieldsValue(detail) : reset())}
                    onSubmit={submit}
                  />
                );
              },
            }}
          />
        </ProCard>
      </ProConfigProvider>
    </PageContainer>
  );
};

export default BaseForm;
