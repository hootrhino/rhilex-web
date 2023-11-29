import { message } from '@/components/PopupHack';
import { postBackupUpload } from '@/services/rulex/shujubeifen';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormUploadDragger } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Button, Space } from 'antd';
import endsWith from 'lodash/endsWith';
import { useEffect, useRef, useState } from 'react';
import ProConfirmModal from './components/ProConfirmModal';
import Title from './TItle';

const DataBackupConfig = () => {
  const { activeKey } = useModel('useSetting');
  const { run, cancel } = useModel('useSystem');
  const formRef = useRef<ProFormInstance>();
  const [open, setOpen] = useState<boolean>(false);
  const [uploadFile, setUploadFile] = useState<any>();
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
    <>
      <Title name="数据备份" />
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
                onClick={() => (window.location.href = '/api/v1/backup/download')}
              >
                备份下载
              </Button>
              <Button type="primary" onClick={() => setOpen(true)} icon={<UploadOutlined />}>
                确定上传
              </Button>
            </Space>
          ),
        }}
      >
        <ProFormUploadDragger
          label="数据恢复"
          name="recovery"
          max={1}
          accept=".db"
          description="仅支持 db 文件"
          fieldProps={{
            style: { maxWidth: 700 },
            beforeUpload: (file) => {
              const isSql = endsWith(file.name, '.db');

              if (!isSql) {
                message.error('仅支持 .db 格式的文件，请检查上传文件格式');
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
        title="确定执行上传操作吗？"
        okText="确定上传"
        afterOkText="重启"
        content="上传时请确认版本，版本错误会导致失败，有可能会引起设备故障，请谨慎操作"
        handleOnEnd={handleOnEnd}
        handleOnOk={async () => {
          const { data } = await postBackupUpload({}, uploadFile as File);
          setMsg(data);
          cancel();
        }}
      />
    </>
  );
};

export default DataBackupConfig;
