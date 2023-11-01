import { DownloadOutlined } from '@ant-design/icons';
import { ProForm, ProFormUploadButton } from '@ant-design/pro-components';
import { Button, message, Upload } from 'antd';
import { endsWith, startsWith } from 'lodash';

const DataBackupConfig = () => {
  return (
    <>
      <div className="text-[20px] mb-[24px] font-medium">数据备份</div>
      <ProForm
        // formRef={formRef}
        layout="horizontal"
        labelCol={{ span: 2 }}
        submitter={false}
      >
        <ProFormUploadButton
          label="数据恢复"
          name="recovery"
          max={1}
          accept=".sql,text/sql"
          fieldProps={{
            beforeUpload: (file) => {
              const isSql = startsWith(file.type, 'text/sql') || endsWith(file.name, '.sql');
              if (!isSql) {
                message.error('仅支持sql文件，请检查上传文件格式');
              }

              return isSql || Upload.LIST_IGNORE;
            },
          }}
          width="xl"
        />
        <ProForm.Item label="数据备份" name="backup">
          <Button icon={<DownloadOutlined />}>单击下载</Button>
        </ProForm.Item>
      </ProForm>
    </>
  );
};

export default DataBackupConfig;
