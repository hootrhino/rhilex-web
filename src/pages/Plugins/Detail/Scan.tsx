import CodeEditor from '@/components/CodeEditor';
import { ProForm, ProFormSelect } from '@ant-design/pro-components';

import { useModel } from '@umijs/max';
import { Space } from 'antd';
import { useEffect } from 'react';

const Scan = () => {
  const { data: portList, run: getPort } = useModel('usePort');

  useEffect(() => {
    getPort();
  }, []);

  return (
    <>
      <ProFormSelect
        name="portUuid"
        label="系统串口"
        options={portList?.map((item) => ({
          label: (
            <Space>
              <span>{item?.name}</span>
              <span className="text-[12px] text-[#000000A6]">{item?.alias}</span>
            </Space>
          ),
          value: item.uuid,
        }))}
      />
      <ProForm.Item name="output" label="扫描结果">
        <CodeEditor readOnly />
      </ProForm.Item>
    </>
  );
};

export default Scan;
