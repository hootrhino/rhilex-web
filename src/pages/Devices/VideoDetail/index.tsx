import { useWebSocket } from 'ahooks';
import type { ModalProps } from 'antd';
import { Button, Modal } from 'antd';
import CryptoJS from 'crypto-js';
import { useEffect, useRef } from 'react';
import flvjs from 'flv.js';

type VideoDetailProps = ModalProps & {
  liveUrl: string;
};

const VideoDetail = ({ onCancel, liveUrl, ...props }: VideoDetailProps) => {
  const videoRef = useRef(null);

//   const mediaSourceRef = useRef(null);
//   const sourceBufferRef = useRef(null);

//   const hash = liveUrl && CryptoJS.MD5(liveUrl);

//   const { sendMessage, readyState, latestMessage, disconnect } = useWebSocket(
//     `ws://106.15.225.172:9400/ws?token=WebRtspPlayer&liveId=123a4509de8a99aa0f680cb5847e0765`,
//   );

//   const handleUpdateEnd = () => {
//     if (!sourceBufferRef.current.updating && mediaSourceRef.current.readyState === 'open') {
//       mediaSourceRef.current.endOfStream();
//     }
//   };

//   useEffect(() => {
//     if (videoRef.current) {
//       console.log(mediaSourceRef.current);
//       const handleSourceOpen = () => {
//       mediaSourceRef.current.removeEventListener('sourceopen', handleSourceOpen);
// if (mediaSourceRef.current.readyState === 'open') {
//   const sourceBuffer = mediaSourceRef.current?.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
//   sourceBufferRef.current = sourceBuffer;
//   sourceBuffer.addEventListener('updateend', handleUpdateEnd);
// }

//     };

//     const mediaSource = new MediaSource();
//     mediaSourceRef.current = mediaSource;
//     videoRef.current.src = URL.createObjectURL(mediaSource);

//     mediaSource.addEventListener('sourceopen', handleSourceOpen);
//     }
//   }, [latestMessage?.data]);

  return (
    <Modal
      destroyOnClose
      title="查看视频"
      width="50%"
      onCancel={onCancel}
      maskClosable={false}
      footer={
        <Button
          type="primary"
          onClick={onCancel}
        >
          关闭
        </Button>
      }
      {...props}
    >
      <video controls width="100%" id='videoElement' ref={videoRef}></video>
    </Modal>
  );
};

export default VideoDetail;
