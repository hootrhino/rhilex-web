import { getSiteDetail, putSiteReset, putSiteUpdate } from '@/services/rulex/zhandianpeizhi';
import { getBase64 } from '@/utils/utils';
import { SyncOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import type { UploadFile } from 'antd';
import { Button, Image, message, Modal, Space, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { startsWith } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import Title from './components/Title';

const SiteConfig = () => {
  const formRef = useRef<ProFormInstance>();
  const { initialState, setInitialState } = useModel('@@initialState');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [previewImage, setPreview] = useState<string | undefined>();

  // site setting
  const { data: detail, run: getDetail } = useRequest(() => getSiteDetail(), {
    onSuccess: res => {
      setInitialState({
        ...initialState,
        settings: {
          ...initialState.settings,
          title: res?.appName,
          logo: res?.logo === '/logo.png' ? res?.logo : `${window?.location?.origin}/api/v1/site/logo`,
        },
      });
    }
  });

  const handleOnFinish = async (values: { appName: string }) => {
    try {
      let logo = '';
      const file = fileList?.[0] as UploadFile;
      if (file?.originFileObj) {
        logo = await getBase64(file?.originFileObj as RcFile);
      } else {
        logo = file.thumbUrl || '';
      }
      const params = {
        appName: values?.appName,
        siteName: detail?.siteName || '',
        logo,
      };

      await putSiteUpdate(params);
      getDetail();

      message.success('更新成功');
      return true;
    } catch (error) {
      return false;
    }
  };

  // 恢复默认设置
  const { run: reset } = useRequest(() => putSiteReset(), {
    manual: true,
    onSuccess: () => {
      message.success('恢复成功');
      getDetail();
    }
  });

  useEffect(() => {
    if (detail) {
      formRef.current?.setFieldsValue({ appName: detail?.appName });
      setFileList([{ thumbUrl: detail?.logo, status: 'done', name: '系统 LOGO', uid: 'logo' }]);
    }
  }, [detail]);

  return (
    <>
      <Title name="站点配置" />
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout="horizontal"
        labelCol={{ span: 2 }}
        submitter={{
          render: (props, dom) => (
            <Space>
              {dom}
              <Button type="primary" onClick={reset} icon={<SyncOutlined />}>
                恢复默认配置
              </Button>
            </Space>
          ),
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
        required
          label="系统 Logo"
          name="logo"
          accept="image/*"
          fieldProps={{
            maxCount: 1,
            listType: 'picture-card',
            isImageUrl: () => true,
            fileList,
            className: 'upload-logo',
            showUploadList: { showPreviewIcon: true, showRemoveIcon: false },
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
                setPreview(file?.thumbUrl);
                setOpen(true);
              }
            },
          }}
        />
      </ProForm>
      <Modal
        open={open}
        footer={false}
        title="系统 LOGO"
        width="40%"
        onCancel={() => setOpen(false)}
      >
        <div className="w-full h-full flex justify-center items-center bg-[#f5f5f5]">
          <Image src={previewImage} className="w-full" preview={false} />
        </div>
      </Modal>
    </>
  );
};

export default SiteConfig;
