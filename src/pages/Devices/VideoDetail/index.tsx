// import { getJpegStreamDetail } from '@/services/rulex/liumeitiguanli';
// import { useRequest } from '@umijs/max';
import type { ModalProps } from 'antd';
import { Button, Modal } from 'antd';

type VideoDetailProps = ModalProps & {
  playUrl: string;
  showImg: boolean;
  changeOnShowImg: (value: boolean) => void;
};

const VideoDetail = ({
  playUrl,
  showImg,
  changeOnShowImg,
  onCancel,
  ...props
}: VideoDetailProps) => {
  return (
    <Modal
      destroyOnClose
      title="查看视频"
      width="50%"
      centered
      maskClosable={false}
      onCancel={onCancel}
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
        <Button type="primary" onClick={onCancel}>
          关闭
        </Button>
      }
      {...props}
    >
      {playUrl && showImg && (
        <img
          src={playUrl}
          width={640}
          onError={() => changeOnShowImg(false)}
          className="h-full object-cover"
        />
      )}
    </Modal>
  );
};

export default VideoDetail;
