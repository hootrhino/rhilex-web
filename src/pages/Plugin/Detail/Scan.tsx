import ProLog from '@/components/ProLog';
import { getHwifaceList } from '@/services/rulex/jiekouguanli';
import { handleNewMessage } from '@/utils/utils';
import type { ProFormProps } from '@ant-design/pro-components';
import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Space } from 'antd';
import { useEffect } from 'react';
import { PluginUUID } from '../enum';

type ScanProps = ProFormProps & {
  dataSource: string[];
  changeData: (value: string[]) => void;
};

const Scan = ({ dataSource, changeData, ...props }: ScanProps) => {
  const { formatMessage } = useIntl();
  const { latestMessage } = useModel('useWebsocket');

  useEffect(() => {
    const newScanData = handleNewMessage(
      dataSource,
      latestMessage?.data,
      `plugin/ModbusScanner/${PluginUUID.SCANNER}`,
    );

    changeData(newScanData);
  }, [latestMessage]);

  return (
    <ProForm submitter={false} {...props}>
      <ProFormSelect
        name="portUuid"
        label={formatMessage({ id: 'plugin.form.title.portUuid' })}
        request={async () => {
          const { data } = await getHwifaceList();

          return data?.map((item) => ({
            label: (
              <Space>
                <span>{item?.name}</span>
                <span className="text-[12px] text-[#000000A6]">{item?.alias}</span>
              </Space>
            ),
            value: item.uuid,
          }));
        }}
      />
      <ProForm.Item name="output" label={formatMessage({ id: 'plugin.form.title.output' })}>
        <ProLog
          hidePadding
          topic={`plugin/ModbusScanner/${PluginUUID.SCANNER}`}
          dataSource={dataSource}
        />
      </ProForm.Item>
    </ProForm>
  );
};

export default Scan;
