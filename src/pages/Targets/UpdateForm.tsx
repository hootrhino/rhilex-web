import FormFooter from '@/components/FromFooter';
import { message } from '@/components/PopupHack';
import useGoBack from '@/hooks/useGoBack';
import { getOutends, postOutends, putOutends } from '@/services/rulex/shuchuziyuanguanli';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useEffect, useRef } from 'react';
import { history, useParams, useRequest } from 'umi';

const renderMongoForm = () => {
  return (
    <div className="mongo-config">
      <ProFormText
        label="MongoDB URL"
        name={['config', 'mongoUrl']}
        rules={[{ required: true, message: '请输入 MongoDB URL' }]}
      />
      <ProFormText
        label="MongoDB 数据库"
        name={['config', 'database']}
        rules={[{ required: true, message: '请输入 MongoDB 数据库' }]}
      />
      <ProFormText
        label="MongoDB 集合"
        name={['config', 'collection']}
        rules={[{ required: true, message: '请输入 MongoDB 集合' }]}
      />
    </div>
  );
};

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { id } = useParams();
  const { showModal } = useGoBack();

  // 新建&编辑
  const onFinish = async (values: any) => {
    try {
      if (id) {
        await putOutends({ ...values, uuid: id });
      } else {
        await postOutends(values);
      }
      message.success(id ? '更新成功' : '新建成功');
      history.push('/outends/list');
      return true;
    } catch (error) {
      return false;
    }
  };

  // 获取详情
  const { run: getDetail, data: detail } = useRequest(() => getOutends({ params: { uuid: id } }), {
    manual: true,
    onSuccess: (data: any) => {
      formRef.current?.setFieldsValue(data);
    },
  });

  useEffect(() => {
    if (id) {
      getDetail();
    } else {
      formRef.current?.setFieldsValue({
        type: 'MONGO_SINGLE',
      });
    }
  }, [id]);

  return (
    <>
      <PageContainer
        header={{ title: id ? '编辑目标' : '新建目标' }}
        onBack={() => showModal({url: '/outends/list'})}
      >
        <ProCard>
          <ProForm
            className="source"
            formRef={formRef}
            submitter={{
              render: ({ reset, submit }) => {
                return (
                  <FormFooter
                    onReset={() => (id ? formRef.current?.setFieldsValue(detail) : reset())}
                    onSubmit={submit}
                  />
                );
              },
            }}
            onFinish={onFinish}
            initialValues={{config: {mongoUrl: 'mongodb://127.0.0.1:27017',database: 'test', collection: 'test'}}}
          >
            <ProFormText
              label="目标名称"
              name="name"
              rules={[
                {
                  required: true,
                  message: '目标名称为必填项',
                },
              ]}
            />
            <ProFormSelect
              label="目标类型"
              name="type"
              options={[{ label: 'MongoDB', value: 'MONGO_SINGLE' }]}
              placeholder="请选择目标类型"
              rules={[{ required: true, message: '请选择目标类型' }]}
            />
            <ProFormDependency name={['type']}>
              {({ type }) => {
                return type ? (
                  <ProForm.Item label="目标配置">
                    <ProCard bordered bodyStyle={{ paddingBlockEnd: 0 }}>
                      {type === 'MONGO_SINGLE' && renderMongoForm()}
                    </ProCard>
                  </ProForm.Item>
                ) : null;
              }}
            </ProFormDependency>
            <ProFormTextArea
              label="备注信息"
              name="description"
            />
          </ProForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default UpdateForm;
