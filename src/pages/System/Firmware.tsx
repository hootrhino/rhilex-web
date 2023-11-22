import CodeEditor from '@/components/CodeEditor';
import { message } from '@/components/PopupHack';
import {
  getFirmwareUpgradeLog,
  getFirmwareVendorKey,
  postFirmwareReboot,
  postFirmwareRecoverNew,
  postFirmwareUpgrade,
  postFirmwareUpload,
} from '@/services/rulex/gujiancaozuo';
import { CloudUploadOutlined, PoweroffOutlined, SyncOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProCard,
  ProForm,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Space } from 'antd';
import endsWith from 'lodash/endsWith';
import { useRef, useState } from 'react';
import ProConfirmModal from './components/ProConfirmModal';
import Title from './TItle';

type ConfirmCofig = {
  title: string;
  content: string | React.ReactNode;
  okText: string;
  afterOkText: string;
  handleOnOk?: () => void;
  handleOnEnd?: () => void;
};

const defaultUpgradeConfig = {
  title: '确定执行升级操作吗？',
  content: '升级时请确认版本，版本错误会导致升级失败，有可能会引起设备故障，请谨慎操作',
  okText: '确认升级',
  afterOkText: '升级',
};

const defaultRebootConfig = {
  title: '确定执行重启操作吗？',
  content: '重启设备会停止当前所有任务，请谨慎操作',
  okText: '确认重启',
  afterOkText: '重启',
};

const defaultRecoverConfig = {
  title: '确定执行恢复出厂操作吗？',
  content: '恢复出厂设置会删除当前所有数据，停止所有正在进行的任务，请谨慎操作',
  okText: '确认恢复',
  afterOkText: '恢复',
};

const FirmwareConfig = () => {
  const formRef = useRef<ProFormInstance>();
  const [open, setOpen] = useState<boolean>(false);
  const [confirmConfig, setConfirmConfig] = useState<ConfirmCofig>(defaultUpgradeConfig);
  const [errorMsg, setMsg] = useState<string>('');

  const { run: getVendorKey } = useRequest(() => getFirmwareVendorKey(), {
    onSuccess: (data: string) => formRef.current?.setFieldsValue({ vendorKey: data }),
  });

  // 上传固件
  const { run: uploadFile } = useRequest((params) => postFirmwareUpload({}, params), {
    manual: true,
    onSuccess: (data: string) => {
      message.success(`上传成功，固件保存在${data}路径下面`);
      setTimeout(() => formRef.current?.setFieldsValue({ upload: [] }), 500);
    },
  });

  // 查看日志
  const { data: logData } = useRequest(() => getFirmwareUpgradeLog());

  const handleOnEnd = () => {
    getVendorKey();
    setOpen(false);
    message.success(errorMsg ? errorMsg : `${confirmConfig.afterOkText}成功`);
  };

  return (
    <>
      <Title name="固件升级" />
      <ProCard split="vertical">
        <ProCard colSpan="50%">
          <ProForm
            formRef={formRef}
            layout="vertical"
            submitter={{
              render: () => (
                <Space>
                  <Button
                    key="upgrade"
                    type="primary"
                    onClick={() => {
                      setOpen(true);
                      setConfirmConfig({
                        ...defaultUpgradeConfig,
                        handleOnOk: async () => {
                          const { data } = await postFirmwareUpgrade();
                          setMsg(data);
                        },
                        handleOnEnd,
                      });
                    }}
                    icon={<CloudUploadOutlined />}
                  >
                    确定升级
                  </Button>
                  <Button
                    key="reboot"
                    type="primary"
                    danger
                    onClick={() => {
                      setOpen(true);
                      setConfirmConfig({
                        ...defaultRebootConfig,
                        handleOnOk: async () => {
                          const { data } = await postFirmwareReboot();
                          setMsg(data);
                        },
                        handleOnEnd,
                      });
                    }}
                    icon={<PoweroffOutlined />}
                  >
                    重启设备
                  </Button>
                  <Button
                    key="recover"
                    type="primary"
                    danger
                    onClick={() => {
                      setOpen(true);
                      setConfirmConfig({
                        ...defaultRecoverConfig,
                        handleOnOk: async () => {
                          const { data } = await postFirmwareRecoverNew();
                          setMsg(data);
                        },
                        handleOnEnd,
                      });
                    }}
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
                uploadFile(file?.originFileObj);
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

                  // return isZip || Upload.LIST_IGNORE;
                  return false;
                },
              }}
              width="xl"
            />
          </ProForm>
        </ProCard>
        <ProCard title="固件升级日志" colSpan="50%">
          <CodeEditor value={logData} className="w-full" theme="light" />
        </ProCard>
      </ProCard>
      <ProConfirmModal open={open} onCancel={() => setOpen(false)} {...confirmConfig} />
    </>
  );
};

export default FirmwareConfig;
