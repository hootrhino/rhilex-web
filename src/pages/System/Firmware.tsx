import { message } from '@/components/PopupHack';
import ProConfirmModal from '@/components/ProConfirmModal';
import type { EnhancedProDescriptionsItemProps } from '@/components/ProDescriptions';
import ProDescriptions from '@/components/ProDescriptions';
import {
  getFirmwareUpgradeLog,
  getFirmwareVendorKey,
  postFirmwareReboot,
  postFirmwareRecoverNew,
  postFirmwareUpgrade,
} from '@/services/rulex/gujiancaozuo';
import { endsWith } from '@/utils/redash';
import {
  CloudUploadOutlined,
  PoweroffOutlined,
  SyncOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { getIntl, getLocale, useIntl, useModel, useRequest } from '@umijs/max';
import type { ProgressProps } from 'antd';
import { Button, Modal, Progress, Space, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { useState } from 'react';

type ConfirmCofig = {
  title: string;
  content: string | React.ReactNode;
  okText: string;
  afterOkText: string;
  handleOnOk?: () => void;
  handleOnEnd?: () => void;
};

const intl = getIntl(getLocale());

const title = intl.formatMessage({ id: 'modal.title.confirm' });

const defaultUpgradeConfig = {
  title,
  content: intl.formatMessage({ id: 'system.modal.content.upgrade' }),
  okText: intl.formatMessage({ id: 'system.button.confirm.upgrade' }),
  afterOkText: intl.formatMessage({ id: 'system.button.upgrade' }),
};

const defaultRebootConfig = {
  title,
  content: intl.formatMessage({ id: 'system.modal.content.reboot' }),
  okText: intl.formatMessage({ id: 'system.button.confirm.reboot' }),
  afterOkText: intl.formatMessage({ id: 'button.reboot' }),
};

const defaultRecoverConfig = {
  title,
  content: intl.formatMessage({ id: 'system.modal.content.recover' }),
  okText: intl.formatMessage({ id: 'system.button.confirm.recover' }),
  afterOkText: intl.formatMessage({ id: 'button.recover' }),
};

export const twoColors: ProgressProps['strokeColor'] = {
  '0%': '#1677FF',
  '100%': '#52c41a',
};

const FirmwareConfig = () => {
  const { run, cancel } = useModel('useSystem');
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState<boolean>(false);
  const [confirmConfig, setConfirmConfig] = useState<ConfirmCofig>(defaultUpgradeConfig);
  const [errorMsg, setMsg] = useState<string>('');
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [uploadProgress, setProgress] = useState<number>(0);

  // 查看日志
  const { data: logData } = useRequest(() => getFirmwareUpgradeLog());

  const handleOnEnd = () => {
    // getVendorKey();
    setOpen(false);
    run();
    message.success(errorMsg ? errorMsg : `${confirmConfig.afterOkText}成功`);
  };

  const handleFileUpload = (file: RcFile | undefined) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    // 创建一个 XMLHttpRequest 对象
    const xhr = new XMLHttpRequest();

    // 设置上传的 URL
    xhr.open('POST', '/api/v1/firmware/upload', true);
    setShowProgress(true);

    // 监听上传进度
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        // 计算上传进度
        const progressPercentage = Math.round((event.loaded / event.total) * 100);
        // 在这里更新进度条的显示
        if (progressPercentage === 100 && xhr.status === 200) {
          setProgress(progressPercentage);
        } else {
          setProgress(progressPercentage - 1);
        }
      }
    };

    // 处理上传成功的逻辑
    xhr.onload = () => {
      if (xhr.status === 200) {
        setProgress(100);
        message.success(formatMessage({ id: 'message.success.upload' }));
        setTimeout(() => {
          setShowProgress(false);
          setProgress(0);
        }, 500);
      }
    };

    // 处理上传错误的逻辑
    xhr.onerror = () => {
      console.error('上传失败，请稍后再试');
      setShowProgress(false);
      setProgress(0);
    };

    // 发送上传请求
    xhr.send(formData);
  };

  const columns = [
    {
      title: formatMessage({ id: 'system.table.title.deviceId' }),
      dataIndex: 'device_id',
    },
    {
      title: formatMessage({ id: 'system.table.title.mac' }),
      dataIndex: 'mac',
    },
    {
      title: formatMessage({ id: 'system.table.title.license' }),
      dataIndex: 'license',
    },
    {
      title: formatMessage({ id: 'system.table.title.authorizeAdmin' }),
      dataIndex: 'authorize_admin',
    },
    {
      title: formatMessage({ id: 'system.table.title.beginAuthorize' }),
      dataIndex: 'begin_authorize',
      valueType: 'dateTime',
    },
    {
      title: formatMessage({ id: 'system.table.title.endAuthorize' }),
      dataIndex: 'end_authorize',
      valueType: 'dateTime',
    },
  ];

  return (
    <>
      <ProCard
        split="vertical"
        title={formatMessage({ id: 'system.tab.firmware' })}
        headStyle={{ paddingBlockEnd: 12 }}
      >
        <ProCard colSpan="50%" title={formatMessage({ id: 'system.title.firmware.auth' })}>
          <ProDescriptions
            columns={columns as EnhancedProDescriptionsItemProps[]}
            labelWidth={getLocale() === 'en-US' ? 140 : 110}
            request={async () => {
              const { data } = await getFirmwareVendorKey();
              return Promise.resolve({
                success: true,
                data,
              });
            }}
          />

          <Space className="mt-[24px] w-full justify-end">
            <Upload
              accept="application/zip"
              showUploadList={false}
              beforeUpload={(file) => {
                const isZip = file.type === 'application/zip' || endsWith(file?.name, '.zip');

                if (!isZip) {
                  message.error(formatMessage({ id: 'system.message.error.upload' }));
                  // return false;
                  return Upload.LIST_IGNORE;
                }

                handleFileUpload(file);

                return false;
              }}
            >
              <Button key="upload" type="primary" icon={<UploadOutlined />}>
                {formatMessage({ id: 'system.button.firmware.upload' })}
              </Button>
            </Upload>
            <Button
              danger
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
              {formatMessage({ id: 'system.button.confirm.upgrade' })}
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
              {formatMessage({ id: 'button.reboot' })}
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
              {formatMessage({ id: 'system.button.firmware.recover' })}
            </Button>
          </Space>
          <Modal
            title={formatMessage({ id: 'system.title.firmware.upload' })}
            open={showProgress}
            footer={false}
            onCancel={() => setOpen(false)}
            destroyOnClose
          >
            <Progress
              percent={uploadProgress}
              size="small"
              status={uploadProgress === 100 ? 'success' : 'active'}
              strokeColor={twoColors}
            />
          </Modal>
        </ProCard>
        <ProCard title={formatMessage({ id: 'system.title.firmware.log' })} colSpan="50%">
          <div className="w-full break-words whitespace-pre">{logData}</div>
        </ProCard>
      </ProCard>
      <ProConfirmModal open={open} onCancel={() => setOpen(false)} {...confirmConfig} />
    </>
  );
};

export default FirmwareConfig;
