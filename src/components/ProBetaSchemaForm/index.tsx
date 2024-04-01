import { omit } from '@/utils/redash';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm, FooterToolbar, ProCard } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';

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
        placeholder: ['select'].includes(col?.valueType as string)
          ? `请选择${col?.title}`
          : `请输入${col?.title}`,
        ...col?.fieldProps,
      },
      formItemProps: {
        rules: [
          {
            required: col?.required,
            message: ['select'].includes(col?.valueType as string)
              ? `请选择${col?.title}`
              : `请输入${col?.title}`,
          },
        ],
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
                <Button>重置</Button>
              </Popconfirm>

              <Button key="submit" type="primary" onClick={submit} loading={loading}>
                提交
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
