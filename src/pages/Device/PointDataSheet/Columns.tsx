import UnitValue from '@/components/UnitValue';
import { FormItemType, SheetType } from '@/utils/enum';
import { inRange } from '@/utils/redash';
import { validateFormItem } from '@/utils/utils';
import {
  ProFormCascader,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Rule } from 'antd/es/form';
import { DeviceType, funcEnum } from '../enum';
import { modbusDataTypeOptions, ObjectTypeOption, plcDataTypeOptions } from './enum';
import { SheetColumnsType } from './typings';

export const columnsMap = (deviceType: DeviceType, type: SheetType) => {
  const { formatMessage } = useIntl();

  const columns: Record<string, SheetColumnsType[]> = {
    [DeviceType.GENERIC_MODBUS_MASTER]: [
      {
        title: formatMessage({ id: 'device.form.title.slaverId' }),
        dataIndex: 'slaverId',
        valueType: 'digit',
        width: 100,
        fieldProps: {
          style: { width: '100%' },
          placeholder: formatMessage({ id: 'device.form.placeholder.slaverId' }),
        },
        formItemProps: {
          rules: [
            { required: true, message: formatMessage({ id: 'device.form.placeholder.slaverId' }) },
            {
              max: 255,
              type: 'integer',
              message: formatMessage({ id: 'device.form.rules.slaverId' }),
            },
            {
              min: 1,
              type: 'integer',
              message: formatMessage({ id: 'device.form.rules.slaverId' }),
            },
          ],
        },
      },
      {
        title: formatMessage({ id: 'device.form.title.func' }),
        dataIndex: 'function',
        valueType: 'select',
        width: 150,
        hideInTable: type === SheetType.DETAIL,
        valueEnum: funcEnum,
        renderFormItem: (_, { record }) => (
          <ProFormSelect
            noStyle
            fieldProps={{
              allowClear: false,
              placeholder: formatMessage({ id: 'device.form.placeholder.func' }),
              // TODO onChange: (value) => {
              //   if (value === 1) {
              //     editorFormRef.current?.setRowData?.(record?.uuid as string, {
              //       type: ['BYTE', 'A'],
              //       quantity: 1,
              //     });
              //   } else {
              //     editorFormRef.current?.setRowData?.(record?.uuid as string, {
              //       type: ['RAW', 'DCBA'],
              //       weight: 1,
              //     });
              //   }
              // },
            }}
            valueEnum={funcEnum}
            rules={[
              { required: true, message: formatMessage({ id: 'device.form.placeholder.func' }) },
            ]}
          />
        ),
      },
      {
        title: formatMessage({ id: 'device.form.title.dataType' }),
        dataIndex: 'type',
        width: 150,
        hideInTable: type === SheetType.DETAIL,
        ellipsis: true,
        renderFormItem: (_, { record }) => {
          let options = modbusDataTypeOptions;

          if (record?.function === 1) {
            options = options?.filter((item) => item.value === 'BYTE');
          }
          if (record?.function === 2) {
            options = options?.filter((item) => !['BYTE', 'UTF8'].includes(item.value));
          }
          if (record?.function && [3, 4].includes(record.function)) {
            options = options?.filter((item) => item.value !== 'BYTE');
          }

          return (
            <ProFormCascader
              noStyle
              disabled={record?.function === 1}
              fieldProps={{
                allowClear: false,
                popupClassName: 'data-type-cascader',
                placeholder: formatMessage({ id: 'device.form.placeholder.dataType' }),
                // TODO onChange: (value: any) => {
                //   const dataType = value?.[0];

                //   editorFormRef.current?.setRowData?.(record?.uuid as string, {
                //     quantity: Number(Quantity[dataType]),
                //     weight: dataType === 'UTF8' ? 0 : 1,
                //   });
                //   setDisabled(dataType !== 'RAW');
                // },
                options,
              }}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'device.form.placeholder.dataType' }),
                },
              ]}
            />
          );
        },
        render: (_, { dataType, dataOrder }) => {
          const currentType = modbusDataTypeOptions?.find((item) => item?.value === dataType);
          const typeLabel = currentType?.label?.split('（')?.[0];

          return typeLabel && dataOrder ? (
            <>
              {typeLabel}（{dataOrder}）
            </>
          ) : (
            '-'
          );
        },
      },
      {
        title: formatMessage({ id: 'device.form.title.address' }),
        dataIndex: 'address',
        valueType: 'digit',
        width: 100,
        hideInTable: type === SheetType.DETAIL,
        ellipsis: true,
        fieldProps: {
          style: { width: '100%' },
          placeholder: formatMessage({ id: 'device.form.placeholder.address' }),
        },
        formItemProps: {
          rules: [
            { required: true, message: formatMessage({ id: 'device.form.placeholder.address' }) },
            {
              validator: (_rule: Rule, value: number) =>
                validateFormItem(value, FormItemType.ADDRESS),
            },
          ],
        },
      },
      {
        title: formatMessage({ id: 'device.form.title.quantity' }),
        dataIndex: 'quantity',
        valueType: 'digit',
        width: 100,
        hideInTable: type === SheetType.DETAIL,
        formItemProps: {
          rules: [
            { required: true, message: formatMessage({ id: 'device.form.placeholder.quantity' }) },
            {
              min: 0,
              type: 'integer',
              message: formatMessage({ id: 'device.form.rules.quantity' }),
            },
            {
              max: 128,
              type: 'integer',
              message: formatMessage({ id: 'device.form.rules.quantity' }),
            },
          ],
        },
        renderFormItem: () => (
          <ProFormDigit
            noStyle
            // TODO disabled={disabledQty}
            fieldProps={{
              style: { width: '100%' },
              placeholder: formatMessage({ id: 'device.form.placeholder.quantity' }),
            }}
          />
        ),
      },
      {
        title: formatMessage({ id: 'device.form.title.weight' }),
        dataIndex: 'weight',
        valueType: 'digit',
        width: 80,
        hideInTable: type === SheetType.DETAIL,
        formItemProps: {
          rules: [
            { required: true, message: formatMessage({ id: 'device.form.placeholder.weight' }) },
            {
              validator: (_, value) => {
                if (inRange(value, -0.0001, 100000)) {
                  return Promise.resolve();
                }
                return Promise.reject(formatMessage({ id: 'device.form.rules.weight' }));
              },
            },
          ],
        },
        renderFormItem: (_, { record }) => {
          const dataType = record?.type?.[0];

          return (
            <ProFormText
              noStyle
              disabled={['RAW', 'UTF8'].includes(dataType)}
              fieldProps={{ placeholder: formatMessage({ id: 'device.form.placeholder.weight' }) }}
            />
          );
        },
      },
      {
        title: formatMessage({ id: 'device.form.title.frequency' }),
        dataIndex: 'frequency',
        valueType: 'digit',
        width: 120,
        hideInTable: type === SheetType.DETAIL,
        fieldProps: {
          addonAfter: 'ms',
          placeholder: formatMessage({ id: 'device.form.placeholder.frequency' }),
        },
        formItemProps: {
          rules: [
            { required: true, message: formatMessage({ id: 'device.form.placeholder.frequency' }) },
          ],
        },
        render: (_, { frequency }) => <UnitValue value={frequency} />,
      },
    ],
    [DeviceType.GENERIC_BACNET_IP]: [
      {
        title: formatMessage({ id: 'device.form.title.id' }),
        dataIndex: 'bacnetDeviceId',
        valueType: 'digit',
        width: 100,
        formItemProps: {
          rules: [{ required: true, message: formatMessage({ id: 'device.form.placeholder.id' }) }],
        },
        fieldProps: {
          style: { width: '100%' },
          placeholder: formatMessage({ id: 'device.form.placeholder.id' }),
        },
      },
      {
        title: formatMessage({ id: 'device.form.title.objectType' }),
        dataIndex: 'objectType',
        valueType: 'select',
        width: 150,
        hideInTable: type === SheetType.DETAIL,
        valueEnum: ObjectTypeOption,
        formItemProps: {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'device.form.placeholder.objectType' }),
            },
          ],
        },
        fieldProps: {
          allowClear: false,
          placeholder: formatMessage({ id: 'device.form.placeholder.objectType' }),
        },
      },
      {
        title: formatMessage({ id: 'device.form.title.objectId' }),
        dataIndex: 'objectId',
        width: 150,
        hideInTable: type === SheetType.DETAIL,
        valueType: 'digit',
        formItemProps: {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'device.form.placeholder.objectId' }),
            },
            {
              min: 0,
              message: formatMessage({ id: 'device.form.rules.bacnet.objectId' }),
              type: 'integer',
            },
            {
              max: 4194303,
              message: formatMessage({ id: 'device.form.rules.bacnet.objectId' }),
              type: 'integer',
            },
          ],
        },
        fieldProps: {
          allowClear: false,
          placeholder: formatMessage({ id: 'device.form.placeholder.objectId' }),
        },
      },
    ],
    [DeviceType.BACNET_ROUTER_GW]: [
      {
        title: formatMessage({ id: 'device.form.title.objectType' }),
        dataIndex: 'objectType',
        valueType: 'select',
        width: 150,
        valueEnum: ObjectTypeOption,
        hideInTable: type === SheetType.DETAIL,
        formItemProps: {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'device.form.placeholder.objectType' }),
            },
          ],
        },
        fieldProps: {
          allowClear: false,
          placeholder: formatMessage({ id: 'device.form.placeholder.objectType' }),
        },
      },
      {
        title: formatMessage({ id: 'device.form.title.objectId' }),
        dataIndex: 'objectId',
        width: 150,
        valueType: 'digit',
        hideInTable: type === SheetType.DETAIL,
        formItemProps: {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'device.form.placeholder.objectId' }),
            },
            {
              min: 0,
              message: formatMessage({ id: 'device.form.rules.bacnet.objectId' }),
              type: 'integer',
            },
            {
              max: 4194303,
              message: formatMessage({ id: 'device.form.rules.bacnet.objectId' }),
              type: 'integer',
            },
          ],
        },
        fieldProps: {
          allowClear: false,
          placeholder: formatMessage({ id: 'device.form.placeholder.objectId' }),
        },
      },
    ],
    [DeviceType.GENERIC_SNMP]: [
      {
        title: formatMessage({ id: 'device.form.title.oid' }),
        dataIndex: 'oid',
        ellipsis: true,
        fieldProps: {
          placeholder: formatMessage({ id: 'device.form.placeholder.oid' }),
        },
        formItemProps: {
          rules: [
            { required: true, message: formatMessage({ id: 'device.form.placeholder.oid' }) },
          ],
        },
      },
      {
        title: formatMessage({ id: 'device.form.title.frequency' }),
        dataIndex: 'frequency',
        valueType: 'digit',
        width: 100,
        hideInTable: type === SheetType.DETAIL,
        fieldProps: {
          addonAfter: 'ms',
          placeholder: formatMessage({ id: 'device.form.placeholder.frequency' }),
        },
        formItemProps: {
          rules: [
            { required: true, message: formatMessage({ id: 'device.form.placeholder.frequency' }) },
          ],
        },
      },
    ],
    [DeviceType.SIEMENS_PLC]: [
      {
        title: formatMessage({ id: 'device.form.title.siemensAddress' }),
        dataIndex: 'siemensAddress',
        width: 150,
        ellipsis: true,
        formItemProps: {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'device.form.placeholder.siemensAddress' }),
            },
          ],
        },
        fieldProps: {
          placeholder: formatMessage({ id: 'device.form.placeholder.siemensAddress' }),
        },
      },
      {
        title: formatMessage({ id: 'device.form.title.dataType' }),
        dataIndex: 'type',
        // width: 150,
        hideInTable: type === SheetType.DETAIL,
        renderFormItem: () => (
          <ProFormCascader
            noStyle
            fieldProps={{
              allowClear: false,
              popupClassName: 'plc-data-type-cascader',
              placeholder: formatMessage({ id: 'device.form.placeholder.dataType' }),
              options: plcDataTypeOptions,
            }}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'device.form.placeholder.dataType' }),
              },
            ]}
          />
        ),
        render: (_, { dataType, dataOrder }) => {
          const currentType = plcDataTypeOptions?.find((item) => item?.value === dataType);
          const typeLabel = currentType?.label?.split('（')?.[0];

          return typeLabel && dataOrder ? (
            <>
              {typeLabel}（{dataOrder}）
            </>
          ) : (
            '-'
          );
        },
        search: {
          // 格式化搜索值
          transform: (value) => ({
            dataType: value[0],
            dataOrder: value[1],
          }),
        },
      },
      {
        title: formatMessage({ id: 'device.form.title.weight' }),
        dataIndex: 'weight',
        valueType: 'digit',
        width: 100,
        hideInTable: type === SheetType.DETAIL,
        formItemProps: {
          rules: [
            { required: true, message: formatMessage({ id: 'device.form.placeholder.weight' }) },
            {
              validator: (_, value) => {
                if (inRange(value, -0.0001, 100000)) {
                  return Promise.resolve();
                }
                return Promise.reject(formatMessage({ id: 'device.form.rules.weight' }));
              },
            },
          ],
        },
        renderFormItem: (_, { record }) => {
          const type = record?.type?.[0];

          return (
            <ProFormText
              noStyle
              disabled={['RAW', 'BYTE', 'I', 'Q'].includes(type)}
              fieldProps={{ placeholder: formatMessage({ id: 'device.form.placeholder.weight' }) }}
            />
          );
        },
      },
      {
        title: formatMessage({ id: 'device.form.title.frequency' }),
        dataIndex: 'frequency',
        valueType: 'digit',
        width: 120,
        hideInTable: type === SheetType.DETAIL,
        fieldProps: {
          addonAfter: 'ms',
          placeholder: formatMessage({ id: 'device.form.placeholder.frequency' }),
        },
        formItemProps: {
          rules: [
            { required: true, message: formatMessage({ id: 'device.form.placeholder.frequency' }) },
          ],
        },
        render: (_, { frequency }) => <UnitValue value={frequency} />,
      },
    ],
  };
  return columns[deviceType];
};
