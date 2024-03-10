import fallback from '@/assets/images/fallback.svg';
import { LoadingOutlined } from '@ant-design/icons';
import type { ModalProps } from 'antd';
import { Button, Modal, Spin } from 'antd';
import { useEffect, useState } from 'react';

type VideoDetailProps = ModalProps & {
  liveId: string;
};

// TODO ws建立连接&销毁优化
const VideoDetail = ({ onCancel, liveId, ...props }: VideoDetailProps) => {
  const [isError, setError] = useState<boolean>(false);
  // const videoRef = useRef(null);
  // const playerRef = useRef(null);
  // const hash = liveUrl && CryptoJS.MD5(liveUrl);

  // if (mpegts.getFeatureList().mseLivePlayback) {
  //   const player = mpegts.createPlayer(
  //     {
  //       type: 'flv',
  //       // isLive: true,
  //       url: `ws://${window?.location?.host}/ws?token=WebRtspPlayer&liveId=${hash}`,
  //       // url: 'ws://106.15.225.172:9400/ws?token=WebRtspPlayer&liveId=123a4509de8a99aa0f680cb5847e0765'
  //     },
  //     {
  //       isLive: true,
  //       enableWorker: true,
  //       // -- 延迟配置开始 解决延迟 缓存时间设置越长、流畅性越好、延迟越高
  //       liveBufferLatencyChasing: true,
  //       liveBufferLatencyMaxLatency: 0.9,
  //       liveBufferLatencyMinRemain: 0.2,
  //       // -- 延迟配置结束
  //     },
  //   );
  //   playerRef.current = player;
  //   if (videoRef.current) {
  //     player.attachMediaElement(videoRef.current);
  //     player.load();
  //     player.play();
  //     // -- 断流检测开始 处理卡断关键 - 断流检测
  //     player.on(mpegts.Events.ERROR, (e) => {
  //       // TODO 异常处理
  //       console.log('发生异常:', e);
  //     });
  //     player.on(mpegts.Events.LOADING_COMPLETE, (e) => {
  //       // TODO 直播结束
  //       console.log('直播结束:', e);
  //     });
  //     player.on(mpegts.Events.STATISTICS_INFO, (e) => {
  //       // TODO 检查是否卡顿，长时间卡顿可以展示相关的 loading 动画
  //       // 判断卡顿的方法是将上一次的解码帧与当前解码帧做对比，如果值一致则出现了卡顿
  //       // 当解码帧的值长时间没有变化时，我们可以视为推流已结束，此时可以主动结束直播
  //       console.log('解码帧数:', e.decodedFrames);
  //     });
  //     // -- 断流检测结束
  //   }
  // }
  // 视频详情
  // const { run: getVideoDetail, data: detail } = useRequest(
  //   (params: API.getJpegStreamDetailParams) => getJpegStreamDetail(params),
  //   {
  //     manual: true,
  //   },
  // );

  useEffect(() => {
    if (liveId) {
      // getVideoDetail({ liveId });
    }
  }, [liveId]);

  return (
    <Modal
      destroyOnClose
      title="查看视频"
      width="50%"
      centered
      maskClosable={false}
      onCancel={onCancel}
      bodyStyle={{ display: 'flex', justifyContent: 'center' }}
      footer={
        <Button type="primary" onClick={onCancel}>
          关闭
        </Button>
      }
      {...props}
    >
      {isError ? (
        <div className="h-[240px] w-[360px] bg-[#f5f5f5] flex justify-center items-center">
          <Spin indicator={<LoadingOutlined />}>
            <img src={fallback} className="h-[60px]" />
          </Spin>{' '}
        </div>
      ) : (
        <img
          src={`http://${window.location.hostname}:9401/h264_stream/push?liveId=${liveId}`}
          className="max-h-[720px] w-full"
          onError={() => setError(true)}
        />
      )}
    </Modal>
  );
};

export default VideoDetail;
