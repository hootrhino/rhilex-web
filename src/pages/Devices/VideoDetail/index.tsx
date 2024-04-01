import { cn, getPlayAddress } from '@/utils/utils';
import { SyncOutlined } from '@ant-design/icons';
import type { ModalProps } from 'antd';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { OutputMode } from '../enum';

type VideoDetailProps = ModalProps & {
  deviceName: string | undefined;
  outputMode: OutputMode;
};

const VideoDetail = ({ deviceName = '', outputMode, onCancel, ...props }: VideoDetailProps) => {
  const [playUrl, setPlayUrl] = useState<string>('');

  const getAddress = () => {
    const address = getPlayAddress(deviceName || '', outputMode, 'pull');
    return `${address}&t=${new Date().getTime()}`;
  };

  const handleOnCancel = (e) => {
    onCancel!(e);
    setPlayUrl('');
  };

  useEffect(() => {
    setPlayUrl(getAddress());
  }, [deviceName, outputMode]);

  return (
    <Modal
      destroyOnClose
      title="查看视频"
      width="50%"
      centered
      maskClosable={false}
      onCancel={handleOnCancel}
      styles={{
        body: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#000',
          margin: 24,
          padding: 0,
          height: 480,
        },
      }}
      footer={
        <Button type="primary" onClick={handleOnCancel}>
          关闭
        </Button>
      }
      {...props}
    >
      <img
        id="jpegVideo"
        key={new Date().getTime()}
        src={playUrl}
        className={cn('h-[480px] w-[640px] object-cover', !playUrl ? 'hidden' : 'block')}
      />
      {!playUrl && (
        <div className="w-full h-full flex justify-center items-center text-[#fff]">
          <SyncOutlined spin />
          <span className="pl-[10px]">视频正在加载...</span>
        </div>
      )}
    </Modal>
  );
};

export default VideoDetail;
