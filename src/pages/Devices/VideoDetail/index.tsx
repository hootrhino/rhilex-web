import type { ModalProps } from 'antd';
import { Button, Modal } from 'antd';
import CryptoJS from 'crypto-js';
import mpegts from 'mpegts.js';
import { useRef } from 'react';

type VideoDetailProps = ModalProps & {
  liveUrl: string;
};
// TODO ws建立连接&销毁优化
const VideoDetail = ({ onCancel, liveUrl, ...props }: VideoDetailProps) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const hash = liveUrl && CryptoJS.MD5(liveUrl);

  if (mpegts.getFeatureList().mseLivePlayback) {
    const player = mpegts.createPlayer(
      {
        type: 'flv',
        isLive: true,
        url: `ws://${window?.location?.host}/ws?token=WebRtspPlayer&liveId=${hash}`,
        // url: 'ws://106.15.225.172:9400/ws?token=WebRtspPlayer&liveId=123a4509de8a99aa0f680cb5847e0765'
      },
      { enableWorker: true },
    );
    playerRef.current = player;
    if (videoRef.current) {
      player.attachMediaElement(videoRef.current);
      player.load();
      player.play();
    }
  }

  return (
    <Modal
      destroyOnClose
      title="查看视频"
      width="50%"
      onCancel={() => {
        onCancel();
        playerRef.current?.destroy();
      }}
      maskClosable={false}
      footer={
        <Button type="primary" onClick={onCancel}>
          关闭
        </Button>
      }
      {...props}
    >
      <video controls width="100%" id="videoElement" ref={videoRef}></video>
    </Modal>
  );
};

export default VideoDetail;
