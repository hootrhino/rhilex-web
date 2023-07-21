import { cn, getBase64 } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import {
  Col,
  ColorPicker,
  Divider,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Slider,
  Space,
  Upload,
} from 'antd';
import type { RcFile } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { POSITION_OPTION, REPEAT_OPTION, SIZE_OPTION } from './constants';

import { Config, DEFAULT_CONFIG } from '@/models/useEditor';
import '../index.less';

const Item = ({ label, children, ...props }: any) => {
  return (
    <Row {...props} className="mt-[10px]" align="middle">
      <Col flex="70px">{label}</Col>
      <Col flex="auto">{children}</Col>
    </Row>
  );
};

const uploadButton = (
  <Space align="center">
    <PlusOutlined />
    <span>上传</span>
  </Space>
);

const CanvasSetting = () => {
  const { setConfig } = useModel('useEditor');
  const [canvasConfig, setCanvasConfig] = useState<Config>(DEFAULT_CONFIG);

  const [currentImg, setImg] = useState<UploadFile | undefined>(undefined);
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

  const handleBgConfig = (changeSetting: { [key: string]: any }) => {
    setCanvasConfig({
      ...canvasConfig,
      background: { ...canvasConfig.background, ...changeSetting },
    });
  };

  useEffect(() => {
    setConfig({ ...canvasConfig });
  }, [canvasConfig]);

  useEffect(() => {
    if (currentImg?.uid) {
      handleBgConfig({ image: currentImg?.url || undefined, color: canvasConfig.background.color });
    } else {
      handleBgConfig({ image: undefined, color: canvasConfig.background.color });
    }
  }, [currentImg]);

  return (
    <div className="p-[10px]">
      <div className="w-full">
        <Item label="屏幕大小">
          <Space>
            <InputNumber
              size="small"
              min={1}
              max={100000}
              value={canvasConfig?.width}
              onChange={(value) => setCanvasConfig({ ...canvasConfig, width: value as number })}
            />
            <InputNumber
              size="small"
              min={1}
              max={100000}
              value={canvasConfig?.height}
              onChange={(value) => setCanvasConfig({ ...canvasConfig, height: value as number })}
            />
          </Space>
        </Item>
        <Item label="缩放比例">
          <Slider
            value={canvasConfig?.scale}
            onChange={(scale: number) => setCanvasConfig({ ...canvasConfig, scale })}
          />
        </Item>
        <Item label="背景颜色">
          <ColorPicker
            value={canvasConfig?.background.color}
            onChange={(value, hex) => {
              handleBgConfig({ color: hex, image: undefined });
              setImg(undefined);
            }}
            className="w-[190px]"
          />
        </Item>
        <Space align="start" className="mt-[10px]" size={0}>
          <div className="mb-[10px] w-[70px]">背景图片</div>
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
                  setImg(file.uid === currentImg?.uid ? undefined : file);
                }}
              >
                <div
                  className={cn(
                    currentImg?.uid === file.uid
                      ? 'border-solid border-2 border-sky-500'
                      : 'border-none',
                  )}
                >
                  {originNode}
                </div>
              </div>
            )}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={() => setPreviewOpen(false)}
          >
            <img alt="preview" src={previewImage} className="w-full" />
          </Modal>
        </Space>
        <Divider />
        <Item label="重复方式">
          <Select
            className="w-full"
            value={canvasConfig.background.repeat}
            options={REPEAT_OPTION}
            onChange={(changedValue: string) => handleBgConfig({ repeat: changedValue })}
            disabled={!canvasConfig.background.image}
          />
        </Item>
        <Item label="图片位置">
          <Select
            className="w-full"
            value={canvasConfig.background.position}
            options={POSITION_OPTION}
            onChange={(changedValue: string) => handleBgConfig({ position: changedValue })}
            disabled={!canvasConfig.background.image}
          />
        </Item>
        <Item label="图片大小">
          <Select
            className="w-full"
            value={canvasConfig.background.size}
            options={SIZE_OPTION}
            onChange={(changedValue: string) => handleBgConfig({ size: changedValue })}
            disabled={!canvasConfig.background.image}
          />
        </Item>
      </div>
    </div>
  );
};
export default CanvasSetting;
