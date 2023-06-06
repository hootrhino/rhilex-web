import { message } from '@/components/PopupHack';

import SchemaForm from '@/components/SchemaForm';
import { getApp, postApp, putApp } from '@/services/rulex/qingliangyingyong';
import { useEffect } from 'react';
import { history, useParams, useRequest } from 'umi';
import { columns1, columns2 } from './columns';

const UpdateForm = () => {
  const { id } = useParams();

  // 获取详情
  const { run: getDetail, data: detail } = useRequest(() => getApp({ uuid: id || '' }), {
    manual: true,
    formatResult: (res) => res?.data,
  });

  // 新建 & 编辑
  const handleOnFinish = async (values: any) => {
    try {
      const params = { ...values, autoStart: Boolean(values?.autoStart) };
      if (id) {
        await putApp({ ...params, uuid: id });

        message.success('更新成功');
        history.push('/app-stack/list');
      } else {
        await postApp(params);
        message.success('新建成功');
        history.push('/app-stack/list');
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);

  return (
    <SchemaForm
      title={id ? '更新应用' : '新建应用'}
      goBack="/app-stack/list"
      columns={id ? columns2 : columns1}
      initialValue={
        id
          ? detail
          : {
              name: '',
              version: '1.0.0',
              type: 'lua',
              autoStart: 'true',
              luaSource: '',
              description: '',
            }
      }
      onFinish={handleOnFinish}
    />
  );
};

export default UpdateForm;
