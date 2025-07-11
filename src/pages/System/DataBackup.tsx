import { message } from '@/components/PopupHack';
import ProConfirmModal from '@/components/ProConfirmModal';
import { postBackupUpload } from '@/services/rhilex/shujubeifen';
import { endsWith } from '@/utils/redash';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProForm, ProFormUploadDragger } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Button, Space, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';

const DataBackupConfig = () => {
  const { activeKey } = useModel('useSystem');
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState<boolean>(false);
  const [uploadFile, setUploadFile] = useState<File>();

  const handleReset = () => {
    formRef.current?.setFieldsValue({ recovery: undefined });
  };

  useEffect(() => {
    handleReset();
  }, [activeKey]);

  return (
    <ProCard title={formatMessage({ id: 'system.tab.backup' })} headStyle={{ paddingBlock: 0 }}>
      <ProForm
        formRef={formRef}
        layout="vertical"
        onValuesChange={async (changedValue) => {
          if (changedValue?.recovery) {
            const file = changedValue?.recovery?.[0];

            if (file?.status === 'done') {
              setUploadFile(file.originFileObj);
            }
          }
        }}
        submitter={{
          render: () => (
            <ProForm.Item className="max-w-[700px] flex justify-end flex-wrap">
              <Space>
                <Button
                  icon={<DownloadOutlined />}
                  onClick={() => (window.location.href = '/api/v1/backup/runningLog')}
                >
                  {formatMessage({ id: 'system.button.backup.runningLog' })}
                </Button>
                <Button
                  icon={<DownloadOutlined />}
                  onClick={() => (window.location.href = '/api/v1/backup/snapshot')}
                >
                  {formatMessage({ id: 'system.button.backup.snapshot' })}
                </Button>
                <Button
                  ghost
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={() => (window.location.href = '/api/v1/backup/download')}
                >
                  {formatMessage({ id: 'system.button.backup.download' })}
                </Button>
                <Button
                  type="primary"
                  onClick={() => setOpen(true)}
                  icon={<UploadOutlined />}
                  disabled={!uploadFile}
                >
                  {formatMessage({ id: 'system.button.backup.upload' })}
                </Button>
              </Space>
            </ProForm.Item>
          ),
        }}
      >
        <ProFormUploadDragger
          name="recovery"
          max={1}
          accept="application/zip"
          title={formatMessage({ id: 'antd.upload.title' })}
          description={formatMessage({ id: 'system.desc.recovery' })}
          fieldProps={{
            style: { maxWidth: 700 },
            beforeUpload: (file) => {
              const isSql = file.type === 'application/zip' || endsWith(file?.name, '.zip');

              if (!isSql) {
                message.error(formatMessage({ id: 'system.message.error.upload' }));
                return Upload.LIST_IGNORE;
              }

              return new Promise((resolve) => {
                resolve(file);
              });
            },
          }}
          width="xl"
        />
      </ProForm>
      <ProConfirmModal
        open={open}
        onCancel={() => setOpen(false)}
        okText={formatMessage({ id: 'system.button.confirm.upload' })}
        content={formatMessage({ id: 'system.modal.content.upload' })}
        handleOnOk={async () => {
          await postBackupUpload({}, uploadFile);
        }}
      />
    </ProCard>
  );
};

export default DataBackupConfig;
