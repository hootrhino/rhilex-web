import { message } from '@/components/PopupHack';
import ProConfirmModal from '@/components/ProConfirmModal';
import {
  getFirmwareUpgradeLog,
  getFirmwareVendorKey,
  postFirmwareReboot,
  postFirmwareRecoverNew,
  postFirmwareRestartRulex,
  postFirmwareUpgrade,
  postFirmwareUpload,
} from '@/services/rulex/gujiancaozuo';
import { IconFont } from '@/utils/utils';
import {
  CloudUploadOutlined,
  PoweroffOutlined,
  SyncOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { Button, Modal, Progress, Space, Upload } from 'antd';
import endsWith from 'lodash/endsWith';
import { useState } from 'react';
import Title from './components/Title';

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
  // const formRef = useRef<ProFormInstance>();
  const { run, cancel } = useModel('useSystem');
  const [open, setOpen] = useState<boolean>(false);
  const [confirmConfig, setConfirmConfig] = useState<ConfirmCofig>(defaultUpgradeConfig);
  const [errorMsg, setMsg] = useState<string>('');
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [uploadProgress, setProgress] = useState<number>(0);

  // const { run: getVendorKey } = useRequest(() => getFirmwareVendorKey(), {
  //   onSuccess: (data: string) => formRef.current?.setFieldsValue({ vendorKey: data }),
  // });

  // 上传固件
  const { run: uploadFile } = useRequest((params) => postFirmwareUpload({}, params), {
    manual: true,
    onSuccess: () => {
      setProgress(100);
      message.success('上传成功');
      setTimeout(() => {
        setShowProgress(false);
        setProgress(0);
      }, 500);
    },
  });

  // 查看日志
  const { data: logData } = useRequest(() => getFirmwareUpgradeLog());

  const handleOnEnd = () => {
    // getVendorKey();
    setOpen(false);
    run();
    message.success(errorMsg ? errorMsg : `${confirmConfig.afterOkText}成功`);
  };

  return (
    <>
      <Title name="固件升级" />
      <ProCard split="vertical">
        <ProCard colSpan="50%">
          <ProDescriptions
            column={1}
            title={<div className="font-normal text-[14px]">设备授权信息</div>}
            request={async () => {
              const { data } = await getFirmwareVendorKey();
              return Promise.resolve({
                success: true,
                data,
              });
            }}
            labelStyle={{ justifyContent: 'flex-end', minWidth: 135 }}
          >
            <ProDescriptions.Item label="设备生产序列号" dataIndex="device_id" />
            <ProDescriptions.Item label="设备硬件 MAC 地址" dataIndex="mac" />
            <ProDescriptions.Item label="许可证" dataIndex="license" />
            <ProDescriptions.Item label="证书签发人" dataIndex="authorize_admin" />
            <ProDescriptions.Item label="证书签发人密钥" dataIndex="authorize_password" />
            <ProDescriptions.Item label="证书授权开始时间" dataIndex="begin_authorize" />
            <ProDescriptions.Item label="证书授权结束时间" dataIndex="end_authorize" />
          </ProDescriptions>

          <Space className="mt-[30px]">
            <Upload
              accept="application/zip"
              showUploadList={false}
              beforeUpload={(file) => {
                const isZip = file.type === 'application/zip' || endsWith(file?.name, '.zip');

                if (!isZip) {
                  message.error('仅支持 zip 格式文件，请检查上传文件格式');
                }

                return new Promise((resolve) => {
                  resolve(file);
                });
              }}
              onChange={(info) => {
                const file = info.file;

                if (file?.percent === 100) {
                  if (file?.status === 'done') {
                    uploadFile(file?.originFileObj);
                  }
                  setProgress(99);
                } else {
                  if (file?.percent === 0) {
                    setShowProgress(true);
                  }
                  setProgress(file?.percent || 0);
                }
              }}
            >
              <Button key="upload" type="primary" icon={<UploadOutlined />}>
                上传固件
              </Button>
            </Upload>
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
                    cancel();
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
                    cancel();
                  },
                  handleOnEnd,
                });
              }}
              icon={<PoweroffOutlined />}
            >
              重启设备
            </Button>
            <Button
              key="restartRulex"
              type="primary"
              className="flex items-center"
              danger
              onClick={() => {
                setOpen(true);
                setConfirmConfig({
                  ...defaultRebootConfig,
                  handleOnOk: async () => {
                    const { data } = await postFirmwareRestartRulex();
                    setMsg(data);
                    cancel();
                  },
                  handleOnEnd,
                });
              }}
              icon={<IconFont type="icon-restart-rulex" className="text-[16px]" />}
            >
              重启固件
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
                    cancel();
                  },
                  handleOnEnd,
                });
              }}
              icon={<SyncOutlined />}
            >
              恢复出厂
            </Button>
          </Space>
          <Modal title="上传固件" open={showProgress} footer={false}>
            <Progress percent={uploadProgress} size="small" />
          </Modal>
        </ProCard>
        <ProCard title="固件升级日志" colSpan="50%">
          <div className="w-full break-words whitespace-pre">{logData}</div>
        </ProCard>
      </ProCard>
      <ProConfirmModal open={open} onCancel={() => setOpen(false)} {...confirmConfig} />
    </>
  );
};

export default FirmwareConfig;
