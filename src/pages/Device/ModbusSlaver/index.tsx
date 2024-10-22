import PageContainer from '@/components/ProPageContainer';
import { getModbusSlaverSheetList } from '@/services/rhilex/modbusSlaverjicunqiguanli';
import { defaultPagination, DEVICE_LIST } from '@/utils/constant';
import { ProTable } from '@ant-design/pro-components';
import { history, useIntl, useParams } from '@umijs/max';
import { Tag } from 'antd';

const ModbusSlaverRegisters = () => {
  const { formatMessage } = useIntl();
  const { deviceId } = useParams();

  const columns = [
    {
      title: formatMessage({ id: 'device.tab.coil' }),
      children: [
        {
          title: formatMessage({ id: 'device.form.title.siemensAddress' }),
          dataIndex: 'addressCoils',
        },
        {
          title: formatMessage({ id: 'device.form.title.value' }),
          dataIndex: 'valueCoils',
          renderText: (record: string) => (
            <Tag color={Number(record) === 0 ? 'red' : 'green'}>
              {Number(record) === 0 ? 'OFF' : 'ON'}
            </Tag>
          ),
        },
      ],
    },
    {
      title: formatMessage({ id: 'device.tab.discrete' }),
      children: [
        {
          title: formatMessage({ id: 'device.form.title.siemensAddress' }),
          dataIndex: 'addressDiscrete',
        },
        {
          title: formatMessage({ id: 'device.form.title.value' }),
          dataIndex: 'valueDiscrete',
        },
      ],
    },
    {
      title: formatMessage({ id: 'device.tab.holding' }),
      children: [
        {
          title: formatMessage({ id: 'device.form.title.siemensAddress' }),
          dataIndex: 'addressHolding',
        },
        {
          title: formatMessage({ id: 'device.form.title.value' }),
          dataIndex: 'valueHolding',
        },
      ],
    },
    {
      title: formatMessage({ id: 'device.tab.input' }),
      children: [
        {
          title: formatMessage({ id: 'device.form.title.siemensAddress' }),
          dataIndex: 'addressInput',
        },
        {
          title: formatMessage({ id: 'device.form.title.value' }),
          dataIndex: 'valueInput',
        },
      ],
    },
  ];

  return (
    <PageContainer
      title={formatMessage({ id: 'device.title.registers' })}
      onBack={() => history.push(DEVICE_LIST)}
    >
      <ProTable
        rowKey="uuid"
        rootClassName="stripe-table modbus-slaver-table"
        search={false}
        columns={columns}
        request={async ({
          current = defaultPagination.defaultCurrent,
          pageSize = defaultPagination.defaultPageSize,
        }) => {
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
