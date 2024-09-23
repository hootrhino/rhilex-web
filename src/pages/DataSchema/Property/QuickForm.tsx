import type { ModalFormProps } from '@ant-design/pro-components';
import { ModalForm, ProFormSelect } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';

type QuickPropertyFormProps = ModalFormProps & {
  reload: () => void;
};

const QuickPropertyForm = ({ reload, ...props }: QuickPropertyFormProps) => {
  const { formatMessage } = useIntl();

  return (
    <ModalForm
      title={formatMessage({ id: 'schemaMgt.modal.title.property.new.quick' })}
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      submitter={{
        searchConfig: { submitText: formatMessage({ id: 'schemaMgt.button.apply' }) },
      }}
      onFinish={async (values) => {
        // TODO
        console.log(values);
        reload();
        return true;
      }}
      {...props}
    >
      <ProFormSelect
        label={formatMessage({ id: 'schemaMgt.form.title.templateId' })}
        name="templateId"
        width="lg"
        allowClear={false}
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'schemaMgt.form.rules.templateId' }),
          },
        ]}
        placeholder={formatMessage({ id: 'schemaMgt.form.rules.templateId' })}
      />
    </ModalForm>
  );
};

export default QuickPropertyForm;
