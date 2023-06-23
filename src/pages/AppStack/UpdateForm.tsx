import { message } from '@/components/PopupHack';

import SchemaForm from '@/components/SchemaForm';
import { getApp, postApp, putApp } from '@/services/rulex/qingliangyingyong';
import { useEffect, useState } from 'react';
import { history, useParams, useRequest } from 'umi';
import { columns1, columns2 } from './columns';

type InitValueType = {
  name: string;
  version: string;
  type: string;
  [key: string]: any;
};

const UpdateForm = () => {
  const { id } = useParams();
  const [initialValue, setValue] = useState<InitValueType>({
    name: '',
    version: '1.0.0',
    type: 'lua',
    autoStart: 'true',
    luaSource: '',
    description: '',
  });

  // 获取详情
  const { run: getDetail } = useRequest(() => getApp({ uuid: id || '' }), {
    manual: true,
    formatResult: (res) => res?.data,
    onSuccess: (data) => {
      setValue({ ...data, autoStart: data?.autoStart.toString() });
    },
  });

  // 新建 & 编辑
  const handleOnFinish = async (values: any) => {
    try {
      const params = { ...values, autoStart: values?.autoStart === 'true' ? true : false };
      if (id) {
        await putApp({ ...params, uuid: id });
        message.success('更新成功');
      } else {
        await postApp(params);
        message.success('新建成功');
      }
      history.push('/app-stack/list');
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
      initialValue={initialValue}
      onFinish={handleOnFinish}
    />
  );
};

export default UpdateForm;
