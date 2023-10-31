import { getSiteDetail, putSiteUpdate } from '@/services/rulex/zhandianpeizhi';
import { getBase64 } from '@/utils/utils';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import type { UploadFile } from 'antd';
import { message, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { startsWith } from 'lodash';
import { useRef, useState } from 'react';

type SiteForm = {
  appName: string;
  logo: RcFile[];
};

const SiteConfig = () => {
  const formRef = useRef<ProFormInstance>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { data: detail } = useRequest(() => getSiteDetail(), {
    onSuccess: (data) => {
      formRef.current?.setFieldsValue({ appName: data?.appName });
      setFileList([{ thumbUrl: data?.logo, status: 'done', name: 'appLogo', uid: 'logo' }]);
    },
  });

  const handleOnFinish = async (values: SiteForm) => {
    try {
      const file = values.logo?.[0] as UploadFile;
      const logo = await getBase64(file?.originFileObj as RcFile);

      await putSiteUpdate({ appName: values?.appName, siteName: detail?.siteName || '', logo });
      message.success('更新成功');
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
        onValuesChange={(changedValue) => console.log(changedValue)}
        submitter={{
          render: (props, dom) => dom,
        }}
      >
        <ProFormText
          name="appName"
          label="系统名称"
          placeholder="请输入系统名称"
          width="xl"
          rules={[{ required: true, message: '请输入系统名称' }]}
        />

        <ProFormUploadButton
          label="系统 Logo"
          name="logo"
          accept="image/*"
          fieldProps={{
            maxCount: 1,
            listType: 'picture-card',
            isImageUrl: () => true,
            fileList,
            beforeUpload: (file) => {
              const isImage = startsWith(file.type, 'image/');
              if (!isImage) {
                message.error('仅支持图片格式文件，请检查上传文件格式');
              }

              const isLt30KB = file.size / 1024 <= 30; // 将文件大小转换为KB
              if (!isLt30KB) {
                message.error(`文件大小不能超过 30 KB`);
              }

              return (isImage && isLt30KB) || Upload.LIST_IGNORE;
            },
            onChange: (info) => setFileList(info.fileList),
          }}
          rules={[{ required: true, message: '请上传系统 Logo' }]}
        />
      </ProForm>
    </>
  );
};

export default SiteConfig;
