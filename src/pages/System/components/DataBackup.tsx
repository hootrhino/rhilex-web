import { message } from '@/components/PopupHack';
import { postBackupUpload } from '@/services/rulex/shujubeifen';
import { DownloadOutlined, InboxOutlined, UploadOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-components';
import { Button, Space, Upload } from 'antd';
import { endsWith } from 'lodash';
import { useRef, useState } from 'react';
import Title from './TItle';

const DataBackupConfig = () => {
  const formRef = useRef<ProFormInstance>();

  const [showList, setShowList] = useState<boolean>(true);

  // 数据恢复
  const handleOnFinish = async ({ recovery }: any) => {
    try {
      const uploadFile = recovery?.fileList?.[0]?.originFileObj;
      await postBackupUpload({}, uploadFile as File);
      setShowList(false);
      formRef.current?.setFieldsValue({ recovery: undefined });
      message.success('上传成功');
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      <Title name="数据备份" />
      <ProForm
        formRef={formRef}
        layout="vertical"
        onFinish={handleOnFinish}
        submitter={{
          render: (props) => (
            <Space>
              <Button
                icon={<DownloadOutlined />}
                onClick={() => (window.location.href = '/api/v1/backup/download')}
              >
                备份下载
              </Button>
              <Button type="primary" onClick={props.submit} icon={<UploadOutlined />}>
                确定上传
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
    </>
  );
};

export default DataBackupConfig;
