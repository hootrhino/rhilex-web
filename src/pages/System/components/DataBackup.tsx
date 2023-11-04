import { message } from '@/components/PopupHack';
import { getBackup, postBackup } from '@/services/rulex/shujubeifen';
import { getBlob } from '@/utils/utils';
import { DownloadOutlined, InboxOutlined, UploadOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Space, Upload } from 'antd';
import { endsWith, startsWith } from 'lodash';
import { useRef } from 'react';
import Title from './TItle';

const DataBackupConfig = () => {
  const formRef = useRef<ProFormInstance>();

  // 数据恢复
  const handleOnFinish = async(values: any) => {
    try {
      const blobFile = getBlob(values?.recovery?.file);
      await postBackup({}, blobFile as File);

      message.success('上传成功');
      return true;
    } catch (error) {
      return false;
    }
  }

  // 数据下载
  const { run: backup } = useRequest(() => getBackup(), {
    manual: true,
    onSuccess: () => {
      message.success('下载成功');
    },
  });

  return (
    <>
      <Title name="数据备份" />
      <ProForm
        formRef={formRef}
        layout="horizontal"
        labelCol={{ span: 2 }}
        onFinish={handleOnFinish}
        submitter={{
          render: (props) => (
            <Space>
              <Button icon={<DownloadOutlined />} onClick={backup}>
                备份下载
              </Button>
              <Button
                type="primary"
                onClick={props.submit}
                icon={<UploadOutlined />}
              >
                确定上传
              </Button>
            </Space>
          ),
        }}
      >
        <ProForm.Item name="recovery" label="数据恢复">
          <Upload.Dragger
            className="w-full"
            accept=".sql,text/sql"
            maxCount={1}
            beforeUpload={(file) => {
              const isSql = startsWith(file.type, 'text/sql') || endsWith(file.name, '.sql');
              if (!isSql) {
                message.error('仅支持sql文件，请检查上传文件格式');
              }

              return isSql || Upload.LIST_IGNORE;
            }}
            style={{maxWidth: 700}}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
            <p className="ant-upload-hint">仅支持sql文件</p>
          </Upload.Dragger>
        </ProForm.Item>
      </ProForm>
    </>
  );
};

export default DataBackupConfig;
