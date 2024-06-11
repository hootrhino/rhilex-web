// TODO 暂无需求，暂时隐藏
// [DeviceType.GENERIC_CAMERA]: [
//   {
//     title: intl.formatMessage({ id: 'device.form.title.group.common' }),
//     valueType: 'group',
//     key: 'camera',
//     columns: [
//       {
//         title: intl.formatMessage({ id: 'device.form.title.inputMode' }),
//         dataIndex: ['config', 'inputMode'],
//         valueType: 'select',
//         valueEnum: InputModeOption,
//         required: true,
//         render: (_dom: React.ReactNode, { inputMode }: DeviceItem) => InputModeOption[inputMode],
//       },
//       {
//         valueType: 'dependency',
//         name: ['config'],
//         columns: ({ config }: DeviceItem) => [
//           {
//             title: intl.formatMessage({ id: 'device.form.title.inputAddr' }),
//             dataIndex: ['config', 'inputAddr'],
//             required: true,
//             renderFormItem: () =>
//               config.inputMode === InputMode.LOCAL_CAMERA ? (
//                 <ProFormSelect
//                   noStyle
//                   request={async () => {
//                     const { data } = await getOsGetVideos();

//                     return data?.map((item) => ({
//                       label: (
//                         <Space>
//                           <span>{item?.name}</span>
//                           <span className="text-[12px] text-[#000000A6]">{item?.deviceId}</span>
//                         </Space>
//                       ),
//                       value: item.name,
//                     }));
//                   }}
//                 />
//               ) : (
//                 <ProFormText width="md" noStyle />
//               ),
//             render: (_dom: React.ReactNode, { inputAddr }: DeviceItem) => inputAddr,
//           },
//         ],
//       },
//       {
//         title: intl.formatMessage({ id: 'device.form.title.outputMode' }),
//         dataIndex: ['config', 'outputMode'],
//         valueType: 'select',
//         valueEnum: OutputModeOption,
//         required: true,
//         tooltip: intl.formatMessage({ id: 'device.tooltip.outputMode' }),
//         render: (_dom: React.ReactNode, { outputMode }: DeviceItem) =>
//           OutputModeOption[outputMode],
//       },
//       {
//         valueType: 'dependency',
//         name: ['config'],
//         columns: ({ config }: DeviceItem) => {
//           const mode = config?.outputMode;

//           return [
//             {
//               title: intl.formatMessage({ id: 'device.form.title.outputEncode' }),
//               dataIndex: ['config', 'outputEncode'],
//               valueType: 'select',
//               valueEnum:
//                 mode === OutputMode.REMOTE_STREAM_SERVER
//                   ? pick(OutputEncodeOption, [OutputEncode.H264_STREAM])
//                   : pick(OutputEncodeOption, [OutputEncode.JPEG_STREAM]),
//               required: true,
//               render: (_dom: React.ReactNode, { outputEncode }: DeviceItem) =>
//                 OutputEncodeOption[outputEncode],
//             },
//           ];
//         },
//       },
//       {
//         valueType: 'dependency',
//         name: ['name', 'config'],
//         columns: ({ config, name }: DeviceItem) => {
//           const mode = config?.outputMode;
//           const playUrl = getPlayAddress(name, mode, 'pull');

//           return [
//             {
//               title: intl.formatMessage({ id: 'device.form.title.outputAddr' }),
//               dataIndex: ['config', 'outputAddr'],
//               hideInForm: mode !== OutputMode.REMOTE_STREAM_SERVER,
//               render: (_dom: React.ReactNode, { outputAddr }: DeviceItem) => outputAddr,
//             },
//             {
//               title: (
//                 <Typography.Paragraph
//                   copyable={{
//                     text: `<img src="${playUrl}" width="640" height="480" alt="视频监控" />`,
//                   }}
//                   className="text-[#00000073]"
//                 >
//                   {intl.formatMessage({ id: 'device.form.title.playAddr' })}
//                 </Typography.Paragraph>
//               ),
//               dataIndex: ['config', 'playAddr'],
//               hideInForm: true,
//               hideInDescriptions: mode === OutputMode.REMOTE_STREAM_SERVER,
//               render: () => {
//                 const htmlCode = `<img src="${playUrl}" width="640" height="480" alt="视频监控" />`;
//                 return (
//                   <div className="bg-[#9696961A] p-[16px] text-[#2a2e36a6] rounded-[3px] whitespace-pre-wrap break-all">
//                     {htmlCode}
//                   </div>
//                 );
//               },
//             },
//           ];
//         },
//       },
//     ],
//   },
// ],
