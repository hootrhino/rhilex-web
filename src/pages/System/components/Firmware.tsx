import { message } from '@/components/PopupHack';
import {
  getFirmwareVendorKey,
  postFirmwareUpgrade,
  postFirmwareUpload,
} from '@/services/rulex/gujiancaozuo';
import { CloudUploadOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormTextArea, ProFormUploadDragger } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Upload } from 'antd';
import { startsWith } from 'lodash';
import { useRef } from 'react';
import Title from './TItle';
import { getBlob } from '@/utils/utils';

const FirmwareConfig = () => {
  const formRef = useRef<ProFormInstance>();

  useRequest(() => getFirmwareVendorKey(), {
    onSuccess: (data: string) => formRef.current?.setFieldsValue({ vendorKey: data }),
  });

  // 上传固件
  const { run: uploadFile } = useRequest((params) => postFirmwareUpload({}, params), {
    manual: true,
    onSuccess: (data: string) => {
      message.success(`上传成功，固件保存在${data}路径下面`);
      setTimeout(() => formRef.current?.setFieldsValue({ upload: [] }), 500);
    },
  });

  const { run: upgrade, loading } = useRequest(() => postFirmwareUpgrade(), {
    manual: true,
    onSuccess: () => {
      message.success('升级成功');
    },
  });

  return (
    <>
      <Title name='固件升级' />
      <ProForm
        formRef={formRef}
        layout="horizontal"
        labelCol={{ span: 2 }}
        submitter={{
          render: () => (
            <Button type="primary" onClick={upgrade} loading={loading} icon={<CloudUploadOutlined />}>
              确定升级
            </Button>
          ),
        }}
        onValuesChange={(changedValue) => {
          if (changedValue?.upload) {
            const file = changedValue?.upload?.[0];
            if (file?.status === 'done') {
              const blobFile = getBlob(file);

              uploadFile(blobFile);
            }
          }
        }}
      >
        <ProFormTextArea name="vendorKey" label="一机一密" placeholder="" disabled width="xl" />
        <ProFormUploadDragger
          label="固件上传"
          name="upload"
          max={1}
          accept="application/zip"
          description='仅支持zip格式文件'
          fieldProps={{
            style: {width: 550},
            beforeUpload: (file) => {
              const isImage = startsWith(file.type, 'application/zip');
              if (!isImage) {
                message.error('仅支持zip格式文件，请检查上传文件格式');
              }

              return isImage || Upload.LIST_IGNORE;
            },
          }}
          width="xl"
        />
      </ProForm>
    </>
  );
};

export default FirmwareConfig;
