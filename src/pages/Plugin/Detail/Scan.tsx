import ProLog from '@/components/ProLog';
import { getHwifaceList } from '@/services/rulex/jiekouguanli';
import { handleNewMessage } from '@/utils/utils';
import type { ProFormProps } from '@ant-design/pro-components';
import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Space } from 'antd';
import type { LabeledValue } from 'antd/es/select';
import { useEffect } from 'react';
import { PluginUUID } from '../enum';

type ScanProps = ProFormProps & {
  dataSource: string[];
  changeData: (value: string[]) => void;
  changeDisabled: (value: boolean) => void;
};

const Scan = ({ dataSource, changeData, changeDisabled, ...props }: ScanProps) => {
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
        fieldProps={{
          optionRender: (option: LabeledValue) => (
            <Space>
              <span>{option?.label}</span>
              <span className="text-[12px] text-[#000000A6]">{option?.value}</span>
            </Space>
          ),
        }}
        request={async () => {
          const { data } = await getHwifaceList();

          return data.map((item) => ({ label: item.name, value: item.uuid }));
        }}
        onChange={(value) => changeDisabled(!value)}
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
