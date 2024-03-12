import { getJpegStreamDetail } from '@/services/rulex/liumeitiguanli';
import { useRequest } from '@umijs/max';
import type { ModalProps } from 'antd';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';

type VideoDetailProps = ModalProps & {
  liveId: string;
};

const VideoDetail = ({ onCancel, liveId, ...props }: VideoDetailProps) => {
  const [isError, setError] = useState<boolean>(false);

  // 视频详情
  const { run: getVideoDetail, data: detail } = useRequest(
    (params: API.getJpegStreamDetailParams) => getJpegStreamDetail(params),
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (liveId) {
      getVideoDetail({ liveId });
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
      bodyStyle={{ display: 'flex', justifyContent: 'center', background: '#000', margin: 24, padding: 0, minHeight: 500 }}
      footer={
        <Button type="primary" onClick={onCancel}>
          关闭
        </Button>
      }
      {...props}
    >
      {!isError && <img
          src={`http://${window.location.hostname}:9401/jpeg_stream/pull?liveId=${liveId}`}
          width={detail?.resolution?.width}
          onError={() => setError(true)}
        />}
    </Modal>
  );
};

export default VideoDetail;
