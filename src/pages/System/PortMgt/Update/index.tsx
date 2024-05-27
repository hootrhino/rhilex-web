import { message } from '@/components/PopupHack';
import { postHwifaceUpdate } from '@/services/rulex/jiekouguanli';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Card } from 'antd';
import { useEffect, useRef } from 'react';
import type { InterfaceItem } from '..';
import { baudRateEnum, dataBitsEnum, parityEnum, stopBitsEnum, typeOption } from '../enum';

type UpdateProps = ModalFormProps<any> & {
  uuid: string;
  reload: () => void;
};

type InterfaceFormParams = InterfaceItem & {
  config: {
    timeout: number;
    baudRate: number;
    dataBits: number;
    parity: string;
    stopBits: number;
    uart: string;
  };
};

type UpdateParams = {
  uuid: string;
  config: Record<string, any>;
};

const Update = ({ reload, uuid, ...props }: UpdateProps) => {
  const formRef = useRef<ProFormInstance>();
  const { detail, getDetail } = useModel('usePort');
  const { formatMessage } = useIntl();

  // 更新接口配置
  const handleOnFinish = async ({ config }: InterfaceFormParams) => {
    try {
      const params: UpdateParams = {
        uuid: detail?.uuid || '',
        config: config?.[0],
      };

      await postHwifaceUpdate(params);
      message.success(formatMessage({ id: 'message.success.update' }));
      reload();
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (uuid) {
      getDetail({ uuid }).then((data) =>
        formRef.current?.setFieldsValue({ ...data, config: [data?.config] }),
      );
    }
  }, [uuid]);

  return (
    <ModalForm
      formRef={formRef}
      title={formatMessage({ id: 'system.modal.title.portUpdate' })}
      modalProps={{ destroyOnClose: true, maskClosable: false }}
      onFinish={handleOnFinish}
      {...props}
    >
      <ProForm.Group>
        <ProFormText
          name="name"
          label={formatMessage({ id: 'system.form.title.name' })}
          placeholder={formatMessage({ id: 'system.form.placeholder.name' })}
          width="sm"
          disabled
          required
        />
        <ProFormSelect
          name="type"
          label={formatMessage({ id: 'system.form.title.type' })}
          placeholder={formatMessage({ id: 'system.form.placeholder.type' })}
          width="sm"
          disabled
          required
          options={typeOption}
        />
        <ProFormText
          name="alias"
          label={formatMessage({ id: 'system.form.title.alias' })}
          placeholder={formatMessage({ id: 'system.form.placeholder.alias' })}
          width="sm"
          rules={[
            { required: true, message: formatMessage({ id: 'system.form.placeholder.alias' }) },
          ]}
        />
      </ProForm.Group>
      <ProFormList
        name="config"
        label={formatMessage({ id: 'system.form.title.config' })}
        creatorButtonProps={false}
        copyIconProps={false}
        deleteIconProps={false}
        itemContainerRender={(doms) => (
          <Card type="inner" styles={{ body: { padding: '16px 18px' } }}>
            {doms}
          </Card>
        )}
      >
        <ProForm.Group>
          <ProFormDigit
            name="timeout"
            label={formatMessage({ id: 'system.form.title.timeout' })}
            width="sm"
            placeholder={formatMessage({ id: 'system.form.placeholder.timeout' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'system.form.placeholder.timeout' }),
              },
            ]}
            addonAfter="ms"
          />
          <ProFormSelect
            label={formatMessage({ id: 'system.form.title.baudRate' })}
            name="baudRate"
            width="sm"
            valueEnum={baudRateEnum}
            allowClear={false}
            placeholder={formatMessage({ id: 'system.form.placeholder.baudRate' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'system.form.placeholder.baudRate' }),
              },
            ]}
          />
          <ProFormSelect
            label={formatMessage({ id: 'system.form.title.dataBits' })}
            name="dataBits"
            width="sm"
            allowClear={false}
            valueEnum={dataBitsEnum}
            placeholder={formatMessage({ id: 'system.form.placeholder.dataBits' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'system.form.placeholder.dataBits' }),
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            label={formatMessage({ id: 'system.form.title.parity' })}
            name="parity"
            width="sm"
            allowClear={false}
            valueEnum={parityEnum}
            placeholder={formatMessage({ id: 'system.form.placeholder.parity' })}
            rules={[
              { required: true, message: formatMessage({ id: 'system.form.placeholder.parity' }) },
            ]}
          />
          <ProFormSelect
            label={formatMessage({ id: 'system.form.title.stopBits' })}
            name="stopBits"
            width="sm"
            allowClear={false}
            valueEnum={stopBitsEnum}
            placeholder={formatMessage({ id: 'system.form.placeholder.stopBits' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'system.form.placeholder.stopBits' }),
              },
            ]}
          />
          <ProFormText
            label={formatMessage({ id: 'system.form.title.uart' })}
            name="uart"
            width="sm"
            placeholder={formatMessage({ id: 'system.form.placeholder.uart' })}
            disabled
            required
          />
        </ProForm.Group>
      </ProFormList>
      <ProFormText
        name="description"
        label={formatMessage({ id: 'table.desc' })}
        placeholder={formatMessage({ id: 'placeholder.desc' })}
      />
    </ModalForm>
  );
};

export default Update;
