// TODO 暂无需求，暂时隐藏
// [DeviceType.GENERIC_AIS_RECEIVER]: [
//   {
//     title: '通用配置',
//     valueType: 'group',
//     columns: [
//       {
//         title: '解析 AIS 报文',
//         dataIndex: ['config', 'commonConfig', 'parseAis'],
//         required: true,
//         renderFormItem: () => <ProSegmented width="md" />,
//         render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => (
//           <ProTag type={StatusType.PARSE}>
//             {commonConfig.parseAis}
//           </ProTag>
//         ),
//       },
//       {
//         title: '主机序列号',
//         dataIndex: ['config', 'commonConfig', 'gwsn'],
//         required: true,
//         render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) =>
//           commonConfig?.gwsn || '-',
//       },
//       {
//         title: intl.formatMessage({ id: 'device.form.title.mode' }),
//         dataIndex: ['config', 'commonConfig', 'mode'],
//         valueType: 'select',
//         valueEnum: DeviceMode,
//         required: true,
//         render: (_dom: React.ReactNode, { commonConfig }: DeviceItem) => commonConfig?.mode,
//       }
//     ],
//   },
//   {
//     valueType: 'dependency',
//     name: ['config'],
//     columns: ({ config }: DeviceItem) => modeColumns[config?.commonConfig?.mode] || [],
//   },
// ],
