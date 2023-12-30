import ProOutputList from '@/components/ProOutputList';
import { getHwifaceList } from '@/services/rulex/jiekouguanli';
import { ProFormSelect } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Space } from 'antd';

type ScanProps = {
  uuid: string;
  showOutput: boolean;
};

const Scan = ({ uuid, showOutput }: ScanProps) => {
  const {
    topicData: { scanLog },
  } = useModel('useWebsocket');

  return (
    <>
      <ProFormSelect
        name="portUuid"
        label="系统串口"
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
      <ProOutputList
        showOutput={showOutput}
        data={scanLog}
        topic={`plugin/ModbusScanner/${uuid}`}
      />
    </>
  );
};

export default Scan;
