import { message, modal } from '@/components/PopupHack';
import {
  getFirmwareVendorKey,
  postFirmwareReboot,
  postFirmwareRecoverNew,
  postFirmwareUpgrade,
  postFirmwareUpload,
} from '@/services/rulex/gujiancaozuo';
import { CloudUploadOutlined, PoweroffOutlined, SyncOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProForm, ProFormTextArea, ProFormUploadDragger } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Space, Upload } from 'antd';
import endsWith from 'lodash/endsWith';
import { useRef, useState } from 'react';
import Title from './TItle';
import { getFirmwareUpgradeLog } from '@/services/rulex/gujiancaozuo';
import CodeEditor from '@/components/CodeEditor';
import { useCountDown } from 'ahooks';

const FirmwareConfig = () => {
  const formRef = useRef<ProFormInstance>();
  const [targetDate, setTargetDate] = useState<number>();

  const {run: getVendorKey} = useRequest(() => getFirmwareVendorKey(), {
    onSuccess: (data: string) => formRef.current?.setFieldsValue({ vendorKey: data }),
  });

  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      getVendorKey();
      setTargetDate(undefined);
      message.success('升级成功');
    },
  });

  // 上传固件
  const { run: uploadFile } = useRequest((params) => postFirmwareUpload({}, params), {
    manual: true,
    onSuccess: (data: string) => {
      message.success(`上传成功，固件保存在${data}路径下面`);
      setTimeout(() => formRef.current?.setFieldsValue({ upload: [] }), 500);
    },
  });

  // 重启设备
  const { run: reboot } = useRequest(() => postFirmwareReboot(), {
    manual: true,
    onSuccess: () => {
      message.success('重启成功');
    },
  });

  // 恢复出厂
  const { run: recover } = useRequest(() => postFirmwareRecoverNew(), {
    manual: true,
    onSuccess: () => {
      message.success('恢复成功');
    },
  });

// 查看日志
const { data: logData } = useRequest(() => getFirmwareUpgradeLog());

  return (
    <>
      <Title name="固件升级" />
      <ProCard split="vertical">
        <ProCard colSpan="50%">
        <ProForm
        formRef={formRef}
        layout='vertical'
        submitter={{
          render: () => (
            <Space>
              <Button
                key="upgrade"
                type="primary"
                onClick={() =>
                  modal.confirm({
                    title: '确定执行升级操作吗？',
                    content:
                      '升级时请确认版本，版本错误会导致升级失败，有可能会引起设备故障，请谨慎操作',
                    okText: '确认升级',
                    onOk: async() => {
                      setTargetDate(Date.now() + 10000);
                      await postFirmwareUpgrade();
                    },
                  })
                }
                icon={<CloudUploadOutlined />}
                disabled={countdown !== 0}
              >
                {countdown === 0 ? '确定升级' : `${Math.round(countdown / 1000)}s 后升级成功`}
              </Button>
              <Button
                key="reboot"
                type="primary"
                danger
                onClick={() =>
                  modal.confirm({
                    title: '确定执行重启操作吗？',
                    content: '重启设备会停止当前所有任务，请谨慎操作',
                    okText: '确认重启',
                    onOk: reboot,
                  })
                }
                icon={<PoweroffOutlined />}
              >
                重启设备
              </Button>
              <Button
                key="recover"
                type="primary"
                danger
                onClick={() =>
                  modal.confirm({
                    title: '确定执行恢复出厂操作吗？',
                    content: '恢复出厂设置会删除当前所有数据，停止所有正在进行的任务，请谨慎操作',
                    okText: '确认恢复',
                    onOk: recover,
                  })
                }
                icon={<SyncOutlined />}
              >
                恢复出厂
              </Button>
            </Space>
          ),
        }}
        onValuesChange={async (changedValue) => {
          if (changedValue?.upload) {
            const file = changedValue?.upload?.[0];

            if (file?.status === 'done') {

              uploadFile(file?.originFileObj);

            }
          }
        }}
      >
        <ProFormTextArea name="vendorKey" label="一机一密" placeholder="" disabled width="xl" />
        <ProFormUploadDragger
          label="固件上传"
          name="upload"
          max={1}
          accept="application/zip"
          description="仅支持 zip 格式文件"
          fieldProps={{
            style: { maxWidth: 550 },
            beforeUpload: (file) => {
              const isZip = file.type === 'application/zip' || endsWith(file?.name, '.zip');

              if (!isZip) {
                message.error('仅支持 zip 格式文件，请检查上传文件格式');
              }

              return isZip || Upload.LIST_IGNORE;
            },
          }}
          width="xl"
        />
      </ProForm>
        </ProCard>
        <ProCard title='固件升级日志' colSpan='50%'>
          <CodeEditor value={logData} className='w-full' theme='light' />
        </ProCard>
      </ProCard>

    </>
  );
};

export default FirmwareConfig;
