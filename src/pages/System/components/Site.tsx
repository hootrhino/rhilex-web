import { putSiteUpdate } from '@/services/rulex/zhandianpeizhi';
import { getBase64 } from '@/utils/utils';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import type { UploadFile } from 'antd';
import { Image, message, Modal, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { startsWith } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import Title from './TItle';

type SiteForm = {
  appName: string;
  logo: RcFile[];
};

const SiteConfig = () => {
  const formRef = useRef<ProFormInstance>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { siteDetail } = useModel('useSetting');

  const handleOnFinish = async (values: SiteForm) => {
    try {
      const file = values.logo?.[0] as UploadFile;
      const logo = await getBase64(file?.originFileObj as RcFile);

      await putSiteUpdate({ appName: values?.appName, siteName: siteDetail?.siteName || '', logo });
      message.success('更新成功');
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (siteDetail) {
      formRef.current?.setFieldsValue({ appName: siteDetail?.appName });
      setFileList([{ thumbUrl: siteDetail?.logo, status: 'done', name: 'App Logo', uid: 'logo' }]);
    }
  }, [siteDetail]);

  return (
    <>
      <Title name='站点配置' />
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
            className: 'upload-logo',
            beforeUpload: (file) => {
              const isImage = startsWith(file.type, 'image/');
              if (!isImage) {
                message.error('仅支持图片格式文件，请检查上传文件格式');
              }

              const isLt30KB = file.size / 1024 <= 100; // 将文件大小转换为KB
              if (!isLt30KB) {
                message.error(`文件大小不能超过 100 KB`);
              }

              return (isImage && isLt30KB) || Upload.LIST_IGNORE;
            },
            onChange: (info) => setFileList(info.fileList),
            onPreview: (file) => {
              if (file?.thumbUrl) {
                setOpen(true);
              }
            },
          }}
          rules={[{ required: true, message: '请上传系统 Logo' }]}
        />
      </ProForm>
      <Modal
        open={open}
        footer={false}
        title={fileList[0]?.name || '系统 LOGO'}
        width="40%"
        onCancel={() => setOpen(false)}
      >
        <div className="w-full h-full flex justify-center items-center">
          <Image src={fileList[0]?.thumbUrl} className="w-full" preview={false} />
        </div>
      </Modal>
    </>
  );
};

export default SiteConfig;
