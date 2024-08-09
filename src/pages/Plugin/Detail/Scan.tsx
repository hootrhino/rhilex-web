import type { LogRef } from '@/components/ProLog';
import ProLog from '@/components/ProLog';
import { getHwifaceList } from '@/services/rulex/jiekouguanli';
import { handleNewMessage } from '@/utils/utils';
import type { ProFormProps } from '@ant-design/pro-components';
import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Space } from 'antd';
import { useEffect, useRef } from 'react';
import { PluginUUID } from '../enum';

type ScanProps = ProFormProps & {
  dataSource: string[];
  changeData: (value: string[]) => void;
  changeDisabled: (value: boolean) => void;
};

const Scan = ({ dataSource, changeData, changeDisabled, ...props }: ScanProps) => {
  const { formatMessage } = useIntl();
  const { latestMessage } = useModel('useWebsocket');
  const logRef = useRef<LogRef>(null);

  const handleOnClearLog = () => {
    changeData([]);
    logRef.current?.clearLog();
  };

  useEffect(() => {
    const portUuid = props.formRef?.current?.getFieldValue('portUuid');

    if (portUuid) {
      const newScanData = handleNewMessage(
        dataSource,
        latestMessage?.data,
        `plugin/ModbusScanner/${PluginUUID.SCANNER}`,
      );

      changeData(newScanData);
    } else {
      handleOnClearLog();
    }
  }, [latestMessage]);

  useEffect(() => {
    handleOnClearLog();
  }, []);

  return (
    <ProForm submitter={false} {...props}>
      <ProFormSelect
        name="portUuid"
        label={formatMessage({ id: 'plugin.form.title.portUuid' })}
        fieldProps={{
          optionRender: (option) => (
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
          ref={logRef}
        />
      </ProForm.Item>
    </ProForm>
  );
};

export default Scan;
