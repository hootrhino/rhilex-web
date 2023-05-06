import { Modal } from 'antd';
import { useState } from 'react';
import {history} from 'umi';

type ModalProps = {
  title?: string;
  content?: string;
  url: string;
};

function useGoBack() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function showModal({ title = '离开可能会丢失数据，确定要返回列表吗？', content, url }: ModalProps) {
    Modal.confirm({
      title,
      content,
      onOk() {
        setIsModalVisible(false);
        history.push(url)
      },
      onCancel() {
        setIsModalVisible(false);
      },
    });
    setIsModalVisible(true);
  }

  return { showModal, isModalVisible };
}

export default useGoBack;
