import { IconFont } from '@/utils/utils';
import type { ModalProps } from 'antd';
import { ConfigProvider, Modal } from 'antd';

type ConfirmModalProps = ModalProps & {
  content?: string;
};

const ConfirmModal = ({
  title,
  children,
  onCancel,
  onOk,
  content,
  ...props
}: ConfirmModalProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: '#242424',
            headerBg: '#242424',
            titleColor: '#DBDBDB',
          },
        },
      }}
    >
      <Modal
        title={title ? title : '删除组件'}
        onCancel={onCancel}
        onOk={onOk}
        footer={
          <div className="flex justify-end text-[#fff] mb-[8px]">
            <div
              key="cancel"
              onClick={onCancel}
              className="py-[4px] px-[16px] mr-[8px] rounded-[4px] cursor-pointer bg-[#474747] hover:bg-[#565656]"
            >
              取消
            </div>
            <div
              key="conform"
              onClick={onOk}
              className="py-[4px] px-[16px] rounded-[4px] cursor-pointer bg-[#1F6AFF] hover:bg-[#4281ff]"
            >
              确认
            </div>
          </div>
        }
        closeIcon={<IconFont type="icon-close" />}
        {...props}
      >
        {children ? children : <div className="text-[#ADADAD]">是否删除组件: {content}</div>}
      </Modal>
    </ConfigProvider>
  );
};

export default ConfirmModal;
