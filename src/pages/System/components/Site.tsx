import { getSiteDetail } from '@/services/rulex/zhandianpeizhi';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { message, Space, Upload } from 'antd';
import { startsWith } from 'lodash';
import { useRef } from 'react';

const SiteConfig = () => {
  const formRef = useRef<ProFormInstance>();

  // TODO 详情接口字段名跟更新接口字段名不一致
  useRequest(() => getSiteDetail(), {
    onSuccess: (data) => console.log(data),
  });

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
      <div className="text-[20px] mb-[24px] font-medium">站点配置</div>
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout="horizontal"
        labelCol={{ span: 2 }}
        submitter={{
          render: (props, dom) => <Space className="flex justify-end">{dom}</Space>,
        }}
      >
        <ProFormText
          name="siteName"
          label="系统名称"
          placeholder="请输入系统名称"
          width="xl"
          rules={[{ required: true, message: '请输入系统名称' }]}
        />
        <ProFormUploadButton
          label="系统 Logo"
          name="logo"
          max={1}
          accept="image/*"
          fieldProps={{
            beforeUpload: (file) => {
              const isImage = startsWith(file.type, 'image/');
              if (!isImage) {
                message.error('仅支持图片格式文件，请检查上传文件格式');
              }

              return isImage || Upload.LIST_IGNORE;
            },
          }}
          rules={[{ required: true, message: '请上传系统 Logo' }]}
        />
      </ProForm>
    </>
  );
};

export default SiteConfig;
