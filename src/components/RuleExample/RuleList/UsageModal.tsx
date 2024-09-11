import CodeEditor, { Lang } from '@/components/CodeEditor';
import type { OutendItem } from '@/pages/Outend';
import { outendTypeOption } from '@/pages/Outend/enum';
import { getRulesGetCanUsedResources } from '@/services/rhilex/guizeguanli';
import { getOutendsList } from '@/services/rhilex/shuchuziyuanguanli';
import { getRfcomCode } from '@/templates/BuildIn/comTpl';
import { getActions, getQuickCode } from '@/templates/BuildIn/dataToTpl';
import { getDebugCode } from '@/templates/BuildIn/standardTpl';
import { getAppStackCode } from '@/templates/Quick/appStackTpl';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import { Button, Empty, Space } from 'antd';
import { useRef, useState } from 'react';
import { defaultConfig } from '.';
import { TplItem, ValConfig } from '../typings';
import CopyButton from './CopyButton';

type UsageModalProps = ModalFormProps & {
  data: TplItem;
  changeConfig: (value: ValConfig) => void;
};

const UsageModal = ({ data, changeConfig, ...props }: UsageModalProps) => {
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const { product } = useModel('useSystem');
  const [copyData, setCopyData] = useState<string>('');

  const { data: resourceData } = useRequest(() => getRulesGetCanUsedResources());

  const handleOnCancel = () => {
    formRef.current?.resetFields();
    changeConfig(defaultConfig);
  };

  const handleOnValuesChange = (changedValue: any) => {
    let newCode = data.apply || '';
    // data:ToTarget
    if (['dataToTargetQuick', 'dataToTarget'].includes(data?.key)) {
      if (changedValue?.targetType) {
        newCode =
          data?.key === 'dataToTargetQuick'
            ? getQuickCode(changedValue?.targetType, 'uuid')
            : getActions(changedValue?.targetType, 'uuid');
      }
      if (changedValue?.targetId) {
        const type = formRef.current?.getFieldValue('targetType');
        newCode =
          data?.key === 'dataToTargetQuick'
            ? getQuickCode(type, changedValue?.targetId)
            : getActions(type, changedValue?.targetId);
      }
    }

    // debug
    if (data?.key === 'standardDebug') {
      newCode = getDebugCode(changedValue?.debugText);
    }

    // rfcom
    if (data?.key === 'rfcom' && changedValue?.rfcomId) {
      newCode = getRfcomCode(changedValue?.rfcomId);
    }

    // appStack
    if (data?.key === 'appStack' && changedValue?.ip) {
      newCode = getAppStackCode(product, changedValue?.ip);
    }

    formRef.current?.setFieldsValue({
      code: newCode,
    });
    setCopyData(newCode);
  };

  return (
    <ModalForm
      formRef={formRef}
      title={formatMessage({ id: 'component.modal.title.settingVar' })}
      layout="horizontal"
      modalProps={{ destroyOnClose: true, onCancel: handleOnCancel, maskClosable: false }}
      onValuesChange={handleOnValuesChange}
      submitter={{
        render: () => [
          <Button key="cancel" onClick={handleOnCancel}>
            {formatMessage({ id: 'button.cancel' })}
          </Button>,
          <CopyButton apply={copyData} key="copy-item" />,
        ],
      }}
      initialValues={{
        code: data.apply,
        debugText: 'success',
        ip: '8.8.8.8',
      }}
      {...props}
    >
      {['dataToTargetQuick', 'dataToTarget'].includes(data?.key) && (
        <>
          <ProFormSelect
            label={formatMessage({ id: 'ruleConfig.form.title.targetType' })}
            name="targetType"
            width="md"
            labelCol={{ span: 4 }}
            options={Object.keys(outendTypeOption).map((key) => ({
              label: outendTypeOption[key],
              value: key,
            }))}
            allowClear={false}
            fieldProps={{
              optionRender: ({ label, value }) => (
                <Space>
                  <span>{label}</span>
                  <span className="text-[12px] text-[#000000A6]">{value}</span>
                </Space>
              ),
            }}
            onChange={() => formRef.current?.setFieldsValue({ targetId: undefined })}
            placeholder={formatMessage({ id: 'form.placeholder.type' })}
          />
          <ProFormDependency name={['targetType']}>
            {({ targetType }) => (
              <ProFormSelect
                width="md"
                labelCol={{ span: 4 }}
                name="targetId"
                label={formatMessage({ id: 'ruleConfig.form.title.targetId' })}
                fieldProps={{
                  notFoundContent: (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={formatMessage({ id: 'ruleConfig.empty.targetId' })}
                    />
                  ),
                  optionRender: (option) => (
                    <Space>
                      <span>{option?.label}</span>
                      <span className="text-[12px] text-[#000000A6]">{option?.value}</span>
                    </Space>
                  ),
                }}
                params={{ targetType }}
                request={async () => {
                  const res = await getOutendsList();

                  return (res as any)?.data
                    ?.filter((item: OutendItem) => item.type === targetType)
                    .map((item: OutendItem) => ({
                      label: item.name,
                      value: item.uuid,
                    }));
                }}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'placeholder.select' }, { text: ' UUID' }),
                  },
                ]}
                placeholder={formatMessage({ id: 'placeholder.select' }, { text: ' UUID' })}
                allowClear={false}
              />
            )}
          </ProFormDependency>
        </>
      )}
      {data?.key === 'standardDebug' && (
        <ProFormText
          label={formatMessage({ id: 'component.tpl.standard.debug.arg' })}
          name="debugText"
          width="md"
          placeholder={formatMessage({ id: 'component.tpl.standard.debug.arg.placeholder' })}
        />
      )}
      {data?.key === 'rfcom' && (
        <ProFormSelect
          label={formatMessage({ id: 'component.tpl.rfcom.arg' })}
          name="rfcomId"
          width="md"
          options={
            resourceData &&
            resourceData['rfcoms']?.map((item: any) => ({
              label: item.name,
              value: item.uuid,
            }))
          }
          allowClear={false}
          fieldProps={{
            optionRender: ({ label, value }) => (
              <Space>
                <span>{label}</span>
                <span className="text-[12px] text-[#000000A6]">{value}</span>
              </Space>
            ),
          }}
          placeholder={formatMessage({ id: 'component.tpl.rfcom.arg.placeholder' })}
        />
      )}
      {data?.key === 'appStack' && (
        <ProFormSelect
          label="IP"
          name="ip"
          width="md"
          options={['8.8.8.8', '114.114.114.114', '202.108.22.5', '202.108.22.103']}
          allowClear={false}
          placeholder={formatMessage({ id: 'placeholder.select' }, { text: ' IP' })}
        />
      )}
      <ProForm.Item name="code">
        <CodeEditor readOnly lang={Lang.LUA} />
      </ProForm.Item>
    </ModalForm>
  );
};

export default UsageModal;
