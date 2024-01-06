import { App } from 'antd';
import { history } from 'umi';

type ModalProps = {
  title?: string;
  content?: string;
  url: string;
};

function useGoBack() {
  const { modal } = App.useApp();

  function showModal({
    title = '离开可能会丢失数据，确定要返回列表吗？',
    content,
    url,
  }: ModalProps) {
    modal.confirm({
      title,
      content,
      onOk() {
        history.push(url);
      },
    });
  }

  return { showModal };
}

export default useGoBack;
