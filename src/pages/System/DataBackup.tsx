import { message } from '@/components/PopupHack';
import ProConfirmModal from '@/components/ProConfirmModal';
import { postBackupUpload } from '@/services/rulex/shujubeifen';
import { endsWith } from '@/utils/redash';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProForm, ProFormUploadDragger } from '@ant-design/pro-components';
import { history, useIntl, useModel } from '@umijs/max';
import { Button, Space, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';

const DataBackupConfig = () => {
  const { run, cancel, activeKey } = useModel('useSystem');
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState<boolean>(false);
  const [uploadFile, setUploadFile] = useState<File>();
  const [errorMsg, setMsg] = useState<string>('');

  const handleReset = () => {
    formRef.current?.setFieldsValue({ recovery: undefined });
  };

  const handleOnEnd = () => {
    handleReset();
    if (errorMsg) {
      message.error(errorMsg);
    } else {
      history.push('/');
      run();
    }
  };

  useEffect(() => {
    handleReset();
  }, [activeKey]);

  return (
    <ProCard title={formatMessage({ id: 'system.tab.backup' })}>
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
          ),
        }}
      >
        <ProFormUploadDragger
          name="recovery"
          max={1}
          accept="application/zip"
          description={formatMessage({ id: 'system.desc.recovery' })}
          fieldProps={{
            style: { maxWidth: 700 },
            beforeUpload: (file) => {
              const isSql = file.type === 'application/zip' || endsWith(file?.name, '.zip');

              if (!isSql) {
                message.error(formatMessage({ id: 'system.message.error.recovery' }));
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
        title={formatMessage({ id: 'modal.title.confirm' })}
        okText={formatMessage({ id: 'system.button.confirm.upload' })}
        afterOkText={formatMessage({ id: 'button.restart' })}
        content={formatMessage({ id: 'system.modal.content.upload' })}
        handleOnEnd={handleOnEnd}
        handleOnOk={async () => {
          const { data } = await postBackupUpload({}, uploadFile);
          setMsg(data);
          cancel();
        }}
      />
    </ProCard>
  );
};

export default DataBackupConfig;
