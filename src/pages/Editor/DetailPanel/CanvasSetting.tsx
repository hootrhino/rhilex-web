import { cn, getBase64 } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { ColorPicker, message, Modal, Space, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
import { POSITION_OPTION, REPEAT_OPTION, SIZE_OPTION } from './constants';

import type { CanvasForm } from '@/models/useEditor';
import { detailFormItemLayout } from '@/utils/constant';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormDigit, ProFormSelect, ProFormSlider } from '@ant-design/pro-components';
import '../index.less';

const CanvasSetting = () => {
  const { canvasData, setCanvasData } = useModel('useEditor');
  const formRef = useRef<ProFormInstance>();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleOnValuesChange = (changedValue: CanvasForm) => {
    let newData = {
      ...canvasData,
      width: changedValue?.width || canvasData?.width,
      height: changedValue?.height || canvasData?.height,
      scale: changedValue?.scale || canvasData?.scale,
    };

    if (changedValue?.background) {
      let bg = {
        ...newData.background,
        ...changedValue?.background,
      };

      if (changedValue?.background?.color) {
        bg = {
          ...bg,
          color: changedValue?.background?.color,
          image: ''
        }
      }

      newData = {
        ...newData,
        background: {
          ...bg,
        },
      };
    }

    setCanvasData(newData);
  };

  useEffect(() => {
    formRef.current?.setFieldsValue({ ...canvasData });
  }, [canvasData]);

  return (
    <ProForm
      {...detailFormItemLayout}
      formRef={formRef}
      layout="horizontal"
      submitter={false}
      className="px-[10px] py-[20px]"
      onValuesChange={handleOnValuesChange}
    >
      <ProForm.Item label="屏幕大小" className="mb-0">
        <Space>
          <ProFormDigit name="width" min={1} max={100000} placeholder="请输入宽度" />
          <ProFormDigit name="height" min={1} max={100000} placeholder="请输入高度" />
        </Space>
      </ProForm.Item>
      <ProFormSlider label="缩放比例" name="scale" />
      <ProForm.Item
        label="背景颜色"
        name={['background', 'color']}
        transform={(value) => ({
          background: { color: typeof value === 'string' ? value : value?.toHexString() },
        })}
      >
        <ColorPicker className="w-full" format="hex" />
      </ProForm.Item>
      <ProForm.Item label="背景图片" name={['background', 'image']}>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          beforeUpload={(file) => {
            const isPNG = file.type === 'image/png';
            if (!isPNG) {
              message.error(`${file.name} 不是图片`);
            }
            return isPNG || Upload.LIST_IGNORE;
          }}
          className="whitespace-normal"
          itemRender={(originNode, file) => (
            <div
              key={file.uid}
              onClick={() => {
                setCanvasData({
                  ...canvasData,
                  background: {
                    ...canvasData.background,
                    image: file?.url === canvasData?.background?.image ? '' : file?.url,
                  },
                });
              }}
            >
              <div
                className={cn(
                  canvasData?.background?.image === file.url
                    ? 'border-solid border-2 border-sky-500'
                    : 'border-none',
                )}
              >
                {originNode}
              </div>
            </div>
          )}
        >
          {fileList.length >= 8 ? null : (
            <Space align="center">
              <PlusOutlined />
              <span>上传</span>
            </Space>
          )}
        </Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewOpen(false)}
        >
          <img alt="preview" src={previewImage} className="w-full" />
        </Modal>
      </ProForm.Item>

      <ProFormSelect
        label="重复方式"
        name={['background', 'repeat']}
        options={REPEAT_OPTION}
        placeholder="请选择重复方式"
      />
      <ProFormSelect
        label="图片位置"
        name={['background', 'position']}
        options={POSITION_OPTION}
        placeholder="请选择图片位置"
      />
      <ProFormSelect
        label="图片大小"
        name={['background', 'size']}
        options={SIZE_OPTION}
        placeholder="请选择图片大小"
      />
    </ProForm>
  );
};
export default CanvasSetting;
