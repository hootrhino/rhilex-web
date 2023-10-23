import { message } from '@/components/PopupHack';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-components';
import { Button, Space, Upload } from 'antd';
import { startsWith } from 'lodash';
import { useRef } from 'react';

const FirmwareConfig = () => {
  const formRef = useRef<ProFormInstance>();

  const handleOnFinish = async (values) => {
    console.log(values);
    try {
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      <div className="text-[20px] mb-[24px] font-medium">固件升级</div>
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout="horizontal"
        labelCol={{ span: 2 }}
        submitter={{
          render: () => (
            <Space className="flex justify-end">
              <Button type="primary">确定升级</Button>
            </Space>
          ),
        }}
      >
        <ProFormTextArea name="" label="一机一密" placeholder="请输入一机一密" disabled />
        <ProFormUploadButton
          label="固件上传"
          name="upload"
          max={1}
          accept="application/zip"
          fieldProps={{
            beforeUpload: (file) => {
              const isImage = startsWith(file.type, 'image/');
              if (!isImage) {
                message.error('仅支持图片格式文件，请检查上传文件格式');
              }

              return isImage || Upload.LIST_IGNORE;
            },
          }}
        />
      </ProForm>
    </>
  );
};

export default FirmwareConfig;
