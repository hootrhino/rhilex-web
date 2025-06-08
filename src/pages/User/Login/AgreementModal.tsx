import { useIntl } from '@umijs/max';
import type { ModalFuncProps } from 'antd';
import { Button, Modal } from 'antd';

type UserAgreementProps = ModalFuncProps;

const UserAgreementModal = (props: UserAgreementProps) => {
  const { formatMessage } = useIntl();

  const dataSource = [
    {
      desc: 'login.modal.content.intro.desc',
    },
    {
      title: 'login.modal.content.passages1.title',
      desc: 'login.modal.content.passages1.desc',
    },
    {
      title: 'login.modal.content.passages2.title',
      desc: 'login.modal.content.passages2.desc',
    },
    {
      title: 'login.modal.content.passages3.title',
      items: [
        'login.modal.content.passages3.items1',
        <div key="passages3-items2">
          {formatMessage({ id: 'login.modal.content.passages3.items2' })}
          <ul>
            <li key="passages3-items2_1">
              {formatMessage({ id: 'login.modal.content.passages3.items2_1' })}
            </li>
            <li key="passages3-items2_2">
              {formatMessage({ id: 'login.modal.content.passages3.items2_2' })}
            </li>
            <li key="passages3-items2_3">
              {formatMessage({ id: 'login.modal.content.passages3.items2_3' })}
            </li>
          </ul>
        </div>,
      ],
    },
    {
      title: 'login.modal.content.passages4.title',
      items: [
        'login.modal.content.passages4.items1',
        'login.modal.content.passages4.items2',
        'login.modal.content.passages4.items3',
      ],
    },
    {
      title: 'login.modal.content.passages5.title',
      desc: 'login.modal.content.passages5.desc',
    },
    {
      title: 'login.modal.content.passages6.title',
      desc: 'login.modal.content.passages6.desc',
    },
    {
      title: 'login.modal.content.passages7.title',
      items: ['login.modal.content.passages7.items1', 'login.modal.content.passages7.items2'],
    },
    {
      title: 'login.modal.content.passages8.title',
      items: ['login.modal.content.passages8.items1', 'login.modal.content.passages8.items2'],
    },
    {
      title: 'login.modal.content.passages9.title',
      desc: 'login.modal.content.passages9.desc',
    },
    {
      title: 'login.modal.content.passages10.title',
      desc: 'login.modal.content.passages10.desc',
    },
  ];

  return (
    <Modal
      destroyOnClose
      width="50%"
      title={formatMessage({ id: 'login.modal.title' })}
      maskClosable={false}
      footer={
        <Button type="primary" onClick={props.onCancel}>
          {formatMessage({ id: 'button.close' })}
        </Button>
      }
      styles={{ body: { height: 600, overflow: 'auto' } }}
      {...props}
    >
      {dataSource.map((item) => (
        <div key={`user-agreement-${Math.random()}`}>
          {item?.title && (
            <h2 className="text-[18px] mt-[24px]">{formatMessage({ id: item.title })}</h2>
          )}

          {item?.items && item?.items.length > 0 ? (
            <ol>
              {item?.items?.map((i) => (
                <li key={`user-agreement-item-${Math.random()}`}>
                  {typeof i === 'string' ? formatMessage({ id: i }) : i}
                </li>
              ))}
            </ol>
          ) : (
            <p>{formatMessage({ id: item.desc })}</p>
          )}
        </div>
      ))}
      <p className="mt-[48px] font-bold">
        {formatMessage({ id: 'login.modal.content.passages11.desc' })}
      </p>
    </Modal>
  );
};

export default UserAgreementModal;
