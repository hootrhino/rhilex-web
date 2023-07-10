import {
  POSITION_OPTION,
  REPEAT_OPTION,
  SIZE_OPTION,
} from '@/pages/Configuration/Editor/constants';
import { cn, getBase64, tryToJSON } from '@/utils/utils';
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
import { useState } from 'react';
import { useModel } from 'umi';

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

const BackgroundSettings = () => {
  const { bgSetting: setting, setBgSetting: setSetting } = useModel('useEditor');
  const [checked, setCheck] = useState<string>('');

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

  return (
    <div className="p-[10px]">
      <div className="w-full">
        <Item label="屏幕大小">
          <Space>
            <InputNumber size="small" min={1} max={100000} defaultValue={1920} />
            <InputNumber size="small" min={1} max={100000} defaultValue={1080} />
          </Space>
        </Item>
        <Item label="背景颜色">
          <ColorPicker
            value={setting.color}
            onChange={(value, hex) => setSetting({ ...setting, color: hex })}
            className="w-[190px]"
          />
        </Item>
        <Space align="start" className="mt-[10px]" size={14}>
          <div className="mb-[10px]">背景图片</div>
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
                  setCheck(file.uid === checked ? '' : file.uid);
                  setSetting({
                    ...setting,
                    image: file.url,
                    color: '#F5F5F5',
                    repeat: 'no-repeat',
                    position: tryToJSON('center'),
                    size: tryToJSON('auto auto'),
                  });
                }}
              >
                <div
                  className={cn(
                    checked === file.uid ? 'border-solid border-2 border-sky-500' : 'border-none',
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
            value={setting.repeat}
            options={REPEAT_OPTION}
            onChange={(changedValue: string) => setSetting({ ...setting, repeat: changedValue })}
          />
        </Item>
        {setting.repeat === 'watermark' && (
          <Item label="水印角度">
            <Slider
              min={0}
              max={360}
              step={1}
              value={setting.angle}
              onChange={(changedValue: number) => setSetting({ ...setting, angle: changedValue })}
            />
          </Item>
        )}
        <Item label="图片位置">
          <Select
            className="w-full"
            value={setting.position}
            options={POSITION_OPTION}
            onChange={(changedValue: string) => setSetting({ ...setting, position: changedValue })}
          />
        </Item>
        <Item label="图片大小">
          <Select
            className="w-full"
            value={setting.size}
            options={SIZE_OPTION}
            onChange={(changedValue: string) => setSetting({ ...setting, size: changedValue })}
          />
        </Item>
      </div>
    </div>
  );
};
export default BackgroundSettings;
