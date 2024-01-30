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
        // isLive: true,
        url: `ws://${window?.location?.host}/ws?token=WebRtspPlayer&liveId=${hash}`,
        // url: 'ws://106.15.225.172:9400/ws?token=WebRtspPlayer&liveId=123a4509de8a99aa0f680cb5847e0765'
      },
      {
        isLive: true,
        enableWorker: true,
        // -- 延迟配置开始 解决延迟 缓存时间设置越长、流畅性越好、延迟越高
        liveBufferLatencyChasing: true,
        liveBufferLatencyMaxLatency: 0.9,
        liveBufferLatencyMinRemain: 0.2,
        // -- 延迟配置结束
      },
    );
    playerRef.current = player;
    if (videoRef.current) {
      player.attachMediaElement(videoRef.current);
      player.load();
      player.play();
      // -- 断流检测开始 处理卡断关键 - 断流检测
      player.on(mpegts.Events.ERROR, (e) => {
        // TODO 异常处理
        console.log('发生异常:', e);
      });
      player.on(mpegts.Events.LOADING_COMPLETE, (e) => {
        // TODO 直播结束
        console.log('直播结束:', e);
      });
      player.on(mpegts.Events.STATISTICS_INFO, (e) => {
        // TODO 检查是否卡顿，长时间卡顿可以展示相关的 loading 动画
        // 判断卡顿的方法是将上一次的解码帧与当前解码帧做对比，如果值一致则出现了卡顿
        // 当解码帧的值长时间没有变化时，我们可以视为推流已结束，此时可以主动结束直播
        console.log('解码帧数:', e.decodedFrames);
      });
      // -- 断流检测结束
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
