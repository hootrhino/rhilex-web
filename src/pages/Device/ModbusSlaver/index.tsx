import PageContainer from '@/components/ProPageContainer';
import { getModbusSlaverSheetList } from '@/services/rulex/modbusSlaverjicunqiguanli';
import { defaultPagination } from '@/utils/constant';
import { ProTable } from '@ant-design/pro-components';
import { history, useIntl, useParams } from '@umijs/max';

const ModbusSlaverRegisters = () => {
  const { formatMessage } = useIntl();
  const { deviceId } = useParams();

  const columns = [
    {
      title: '线圈寄存器',
      children: [
        {
          title: formatMessage({ id: 'device.form.title.siemensAddress' }),
          dataIndex: 'addressCoils',
        },
        {
          title: formatMessage({ id: 'device.form.title.value' }),
          dataIndex: 'valueCoils',
          width: 120,
        },
      ],
    },
    {
      title: '离散寄存器',
      children: [
        {
          title: formatMessage({ id: 'device.form.title.siemensAddress' }),
          dataIndex: 'addressDiscrete',
        },
        {
          title: formatMessage({ id: 'device.form.title.value' }),
          dataIndex: 'valueDiscrete',
          width: 120,
        },
      ],
    },
    {
      title: '保持寄存器',
      children: [
        {
          title: formatMessage({ id: 'device.form.title.siemensAddress' }),
          dataIndex: 'addressHolding',
        },
        {
          title: formatMessage({ id: 'device.form.title.value' }),
          dataIndex: 'valueHolding',
          width: 120,
        },
      ],
    },
    {
      title: '输入寄存器',
      children: [
        {
          title: formatMessage({ id: 'device.form.title.siemensAddress' }),
          dataIndex: 'addressInput',
        },
        {
          title: formatMessage({ id: 'device.form.title.value' }),
          dataIndex: 'valueInput',
          width: 120,
        },
      ],
    },
  ];

  return (
    <PageContainer
      title={formatMessage({ id: 'device.title.registers' })}
      onBack={() => history.push('/device/list')}
    >
      <ProTable
        rowKey="uuid"
        search={false}
        columns={columns}
        request={async ({
          current = defaultPagination.defaultCurrent,
          pageSize = defaultPagination.defaultPageSize,
        }) => {
          console.log(current);
          const { data } = await getModbusSlaverSheetList({
            current,
            size: pageSize,
            device_uuid: deviceId,
          });

          return Promise.resolve({
            data: data?.records,
            total: data?.total || 0,
            success: true,
          });
        }}
        pagination={defaultPagination}
        bordered
      />
    </PageContainer>
  );
};

export default ModbusSlaverRegisters;
