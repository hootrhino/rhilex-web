import ProLog from '@/components/ProLog';
import { PluginUUID } from '@/models/usePlugin';
import { getHwifaceList } from '@/services/rulex/jiekouguanli';
import type { ProFormProps } from '@ant-design/pro-components';
import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Space } from 'antd';

type ScanProps = ProFormProps & {
  dataSource: string[];
  uuid: PluginUUID | undefined;
};

const Scan = ({ uuid, dataSource, ...props }: ScanProps) => {
  const { formatMessage } = useIntl();

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
        <ProLog hidePadding topic={`plugin/ModbusScanner/${uuid}`} dataSource={dataSource} />
      </ProForm.Item>
    </ProForm>
  );
};

export default Scan;
