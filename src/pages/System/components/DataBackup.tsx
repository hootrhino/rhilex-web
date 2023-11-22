import { message } from '@/components/PopupHack';
import { postBackupUpload } from '@/services/rulex/shujubeifen';
import {
  DownloadOutlined,
  ExclamationCircleOutlined,
  InboxOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { useCountDown } from 'ahooks';
import { Button, Modal, Space, Upload } from 'antd';
import { endsWith } from 'lodash';
import { useRef, useState } from 'react';
import Title from './TItle';

const DataBackupConfig = () => {
  const formRef = useRef<ProFormInstance>();
  const [targetDate, setTargetDate] = useState<number>();
  const [showList, setShowList] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [uploadFile, setUploadFile] = useState<any>();

  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      setShowList(false);
      setTargetDate(undefined);
      formRef.current?.setFieldsValue({ recovery: undefined });
      history.push('/');
    },
  });

  return (
    <>
      <Title name="数据备份" />
      <ProForm
        formRef={formRef}
        layout="vertical"
        onFinish={async ({ recovery }) => {
          const uploadFile = recovery?.fileList?.[0]?.originFileObj;
          setUploadFile(uploadFile);
          setOpen(true);
        }}
        submitter={{
          render: (props) => (
            <Space>
              <Button
                icon={<DownloadOutlined />}
                onClick={() => (window.location.href = '/api/v1/backup/download')}
              >
                备份下载
              </Button>
              <Button
                type="primary"
                onClick={props.submit}
                icon={<UploadOutlined />}
                disabled={countdown !== 0}
              >
                {countdown === 0 ? '确定上传' : `${Math.round(countdown / 1000)}s 后重启`}
              </Button>
            </Space>
          ),
        }}
      >
        <ProForm.Item
          name="recovery"
          label="数据恢复"
          rules={[{ required: true, message: '请上传文件' }]}
        >
          <Upload.Dragger
            className="w-full"
            accept=".db"
            maxCount={1}
            multiple={false}
            showUploadList={showList}
            beforeUpload={(file) => {
              const isSql = endsWith(file.name, '.db');
              if (!isSql) {
                message.error('仅支持 .db 格式的文件，请检查上传文件格式');
              }
              setShowList(true);
              // return isSql || Upload.LIST_IGNORE;
              return false;
            }}
            style={{ maxWidth: 700 }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
            <p className="ant-upload-hint">仅支持 db 文件</p>
          </Upload.Dragger>
        </ProForm.Item>
      </ProForm>
      <Modal
        title={
          <Space align="center">
            <ExclamationCircleOutlined style={{ color: '#faad14', fontSize: 22 }} />
            <span>确定执行上传操作吗？</span>
          </Space>
        }
        open={open}
        destroyOnClose
        onCancel={() => setOpen(false)}
        rootClassName="none-header-border"
        footer={
          <Space>
            <Button onClick={() => setOpen(false)}>取消</Button>
            <Button
              type="primary"
              onClick={async () => {
                setTargetDate(Date.now() + 10000);
                await postBackupUpload({}, uploadFile as File);
              }}
            >
              {countdown === 0 ? '确定上传' : `${Math.round(countdown / 1000)}s 后重启`}
            </Button>
          </Space>
        }
      >
        上传时请确认版本，版本错误会导致失败，有可能会引起设备故障，请谨慎操作
      </Modal>
    </>
  );
};

export default DataBackupConfig;
