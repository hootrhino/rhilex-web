import { FormItemType } from '@/utils/enum';
import { omit } from '@/utils/redash';
import { validateFormItem } from '@/utils/utils';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm, FooterToolbar, ProCard } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Popconfirm } from 'antd';
import type { Rule } from 'antd/es/form';

type FormFieldType = 'group' | 'formList' | 'formSet' | 'divider' | 'dependency';

type ProColumnsType<T = Record<string, any>, ValueType = 'text'> = ProFormColumnsType<
  T,
  ValueType | FormFieldType
> & { required?: boolean };

type ProBetaSchemaFormProps<T = Record<string, any>, Values = any> = {
  columns: ProColumnsType[];
  loading: boolean;
  rootClassName?: string;
  formRef?:
    | React.MutableRefObject<ProFormInstance<T> | undefined>
    | React.RefObject<ProFormInstance<T> | undefined>;
  handleOnReset: () => void;
  onFinish?: (formData: T) => Promise<boolean | void>;
  onValuesChange?: (changedValues: any, values: Values) => void;
};

// 辅助函数：根据不同条件生成规则
const getRules = (col: any) => {
  const baseRule = [{ required: col.required, message: `请输入${col.title}` }];

  const activeKey =
    typeof col.dataIndex === 'object' &&
    col.dataIndex.length > 0 &&
    col.dataIndex[col.dataIndex.length - 1];
  const isPort = ['port', 'webHookPort'].includes(activeKey);

  if (['name'].includes(col.dataIndex) || isPort) {
    return [
      ...baseRule,
      {
        validator: (_rule: Rule, value: string) =>
          validateFormItem(value, isPort ? FormItemType.PORT : FormItemType.NAME),
      },
    ];
  }
  if (['select'].includes(col.valueType)) {
    return [{ required: col.required, message: `请选择${col.title}` }];
  }
  if (['timeout', 'frequency', 'idleTimeout'].includes(activeKey)) {
    return [{ required: col.required, message: `请输入${col.title.props.title}（毫秒）` }];
  }
  return baseRule;
};

// 辅助函数：生成占位符
const getFieldProps = (col: any) => {
  const activeKey =
    typeof col.dataIndex === 'object' &&
    col.dataIndex.length > 0 &&
    col.dataIndex[col.dataIndex.length - 1];

  if (['select'].includes(col.valueType)) {
    return {
      placeholder: `请选择${col.title}`,
      allowClear: false,
    };
  }
  if (['timeout', 'frequency', 'idleTimeout'].includes(activeKey)) {
    return {
      placeholder: `请输入${col.title.props.title}（毫秒）`,
    };
  }
  return {
    placeholder: `请输入${col.title}`,
  };
};

const processColumns = (columns: ProColumnsType[]) =>
  columns?.map((col: any) => {
    if (col.valueType === 'group') {
      return {
        ...col,
        columns: processColumns(col.columns as ProColumnsType[]),
      };
    }
    if (col.valueType === 'dependency') {
      return {
        ...col,
        columns: (params: ProColumnsType[]) => processColumns(col.columns(params)),
      };
    }
    if (col.valueType === 'formList') {
      const fieldProps =
        col.mode === 'single'
          ? {
              ...col.fieldProps,
              creatorButtonProps: false,
              copyIconProps: false,
              deleteIconProps: false,
            }
          : {
              ...col.fieldProps,
              creatorButtonProps: {
                position: 'top',
                creatorButtonText: <FormattedMessage id="button.new.formList" />,
                ...col?.fieldProps?.creatorButtonProps,
              },
              creatorRecord: col?.initialValue,
            };
      return {
        ...omit(col, ['mode']),
        columns: processColumns(col.columns),
        fieldProps,
      };
    }

    return {
      ...omit(col, ['required']),
      width: col?.width || 'md',
      fieldProps: {
        ...getFieldProps(col),
        ...col?.fieldProps,
      },
      formItemProps: {
        rules: getRules(col),
        ...col?.formItemProps,
      },
    };
  });

const ProBetaSchemaForm = ({
  columns,
  loading,
  handleOnReset,
  ...props
}: ProBetaSchemaFormProps) => {
  const { formatMessage } = useIntl();

  return (
    <ProCard>
      <BetaSchemaForm
        layoutType="Form"
        columns={processColumns(columns)}
        submitter={{
          render: ({ reset, submit }) => (
            <FooterToolbar>
              <Popconfirm
                key="reset"
                title="重置可能会丢失数据，确定要重置吗？"
                onConfirm={() => {
                  reset();
                  handleOnReset();
                }}
              >
                <Button>{formatMessage({ id: 'button.reset' })}</Button>
              </Popconfirm>

              <Button key="submit" type="primary" onClick={submit} loading={loading}>
                {formatMessage({ id: 'button.submit' })}
              </Button>
            </FooterToolbar>
          ),
        }}
        {...props}
      />
    </ProCard>
  );
};

export default ProBetaSchemaForm;
