import { IconFont } from '@/utils/utils';
import { LoadingOutlined } from '@ant-design/icons';
import type { ModalProps } from 'antd';
import { Button, Modal, Spin } from 'antd';
import { useEffect, useState } from 'react';

type VideoDetailProps = ModalProps & {
  liveId: string;
};

const VideoDetail = ({ onCancel, liveId, ...props }: VideoDetailProps) => {
  const [isError, setError] = useState<boolean>(false);

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
            <IconFont type="icon-fallback" className="text-[60px]" />
          </Spin>
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
