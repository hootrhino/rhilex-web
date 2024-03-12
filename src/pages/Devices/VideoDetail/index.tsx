// import { getJpegStreamDetail } from '@/services/rulex/liumeitiguanli';
// import { useRequest } from '@umijs/max';
import type { ModalProps } from 'antd';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';

type VideoDetailProps = ModalProps & {
  liveId: string;
};

const VideoDetail = ({ onCancel, liveId, ...props }: VideoDetailProps) => {
  const [isError, setError] = useState<boolean>(false);
  const [imgSrc, setSrc] = useState<string>('');

  // 视频详情
  // const { run: getVideoDetail, data: detail } = useRequest(
  //   (params: API.getJpegStreamDetailParams) => getJpegStreamDetail(params),
  //   {
  //     manual: true,
  //   },
  // );

  const handleOnClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onCancel) {
      onCancel(e);
    }
    setSrc('');
  }

  useEffect(() => {
    if (liveId && window.location.hostname) {
      // getVideoDetail({ liveId });
      setSrc(`http://${window.location.hostname}:9401/jpeg_stream/pull?liveId=${liveId}`)
    }
  }, [liveId]);

  return (
    <Modal
      destroyOnClose
      title="查看视频"
      width="50%"
      centered
      maskClosable={false}
      onCancel={handleOnClose}
      bodyStyle={{
        display: 'flex',
        justifyContent: 'center',
        background: '#000',
        margin: 24,
        padding: 0,
        // height: '100%',
      }}
      footer={
        <Button type="primary" onClick={handleOnClose}>
          关闭
        </Button>
      }
      {...props}
    >
      {!isError && (
        <img
          src={imgSrc}
          //  width={detail?.resolution?.width}
          width={640}
          onError={() => setError(true)}
          className="object-cover"
        />
      )}
    </Modal>
  );
};

export default VideoDetail;
