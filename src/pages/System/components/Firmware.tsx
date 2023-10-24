import { message } from '@/components/PopupHack';
import {
  getFirmwareVendorKey,
  postFirmwareUpgrade,
  postFirmwareUpload,
} from '@/services/rulex/gujiancaozuo';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Space, Upload } from 'antd';
import { startsWith } from 'lodash';
import { useRef } from 'react';

const FirmwareConfig = () => {
  const formRef = useRef<ProFormInstance>();

  // TODO 没有返回值
  useRequest(() => getFirmwareVendorKey(), {
    onSuccess: (data) => console.log(data),
  });

  // 上传固件
  const { run: uploadFile } = useRequest((params) => postFirmwareUpload({}, params), {
    manual: true,
    onSuccess: () => {
      // TODO 后端会返回保存路径
      message.success(`上传成功，固件保存在xx路径下面`);
      setTimeout(() => formRef.current?.setFieldsValue({ upload: [] }), 500)
    },
  });

  const { run: upgrade } = useRequest(() => postFirmwareUpgrade(), {
    manual: true,
    onSuccess: () => {
      message.success('升级成功');
    },
  });

  return (
    <>
      <div className="text-[20px] mb-[24px] font-medium">固件升级</div>
      <ProForm
        formRef={formRef}
        layout="horizontal"
        labelCol={{ span: 2 }}
        submitter={{
          render: () => (
            <Space>
              <Button type="primary" onClick={upgrade}>
                确定升级
              </Button>
            </Space>
          ),
        }}
        onValuesChange={(changedValue) => {
          if (changedValue?.upload) {
            const file = changedValue?.upload?.[0];
            if (file?.status === 'done') {
              const blob = new Blob([file.originFileObj], { type: file.type });
              uploadFile(blob);
            }
          }
        }}
      >
        <ProFormTextArea name="vendorKey" label="一机一密" placeholder="请输入一机一密" disabled />
        <ProFormUploadButton
          label="固件上传"
          name="upload"
          max={1}
          accept="application/zip"
          fieldProps={{
            beforeUpload: (file) => {
              const isImage = startsWith(file.type, 'application/zip');
              if (!isImage) {
                message.error('仅支持zip格式文件，请检查上传文件格式');
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
