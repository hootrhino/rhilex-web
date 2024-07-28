import PageContainer from '@/components/ProPageContainer';
import { getModbusSlaverSheetList } from '@/services/rulex/modbusSlaverdianweiguanli';
import { ProTable } from '@ant-design/pro-components';
import { history, useIntl, useParams } from '@umijs/max';
import { useState } from 'react';

enum Registers {
  COILS = 'Coils',
  DISCRETE = 'Discrete',
  HOLDING = 'Holding',
  INPUT = 'Input',
}

const ModbusSlaverRegisters = () => {
  const { formatMessage } = useIntl();
  const { deviceId } = useParams();
  const [activeKey, setActiveKey] = useState<string>(Registers.COILS);

  const columns = [
    {
      title: formatMessage({ id: 'device.form.title.siemensAddress' }),
      dataIndex: 'address',
    },
    {
      title: formatMessage({ id: 'device.form.title.value' }),
      dataIndex: 'value',
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
        params={{ registerType: activeKey }}
        request={async ({ ...keyword }) => {
          const { data } = await getModbusSlaverSheetList({
            current: 1,
            size: 256,
            device_uuid: deviceId,
            ...keyword,
          });

          return Promise.resolve({
            data: data?.records,
            total: data?.total || 0,
            success: true,
          });
        }}
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: activeKey,
            items: [
              {
                key: Registers.COILS,
                label: formatMessage({ id: 'device.tab.coils' }),
              },
              {
                key: Registers.DISCRETE,
                label: formatMessage({ id: 'device.tab.discrete' }),
              },
              {
                key: Registers.HOLDING,
                label: formatMessage({ id: 'device.tab.holding' }),
              },
              {
                key: Registers.INPUT,
                label: formatMessage({ id: 'device.tab.input' }),
              },
            ],
            onChange: (key) => {
              setActiveKey(key as string);
            },
          },
        }}
        pagination={false}
      />
    </PageContainer>
  );
};

export default ModbusSlaverRegisters;
