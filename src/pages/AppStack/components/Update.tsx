import { message } from '@/components/PopupHack';

import SchemaForm from '@/components/SchemaForm';
import { getAppDetail, postApp, putApp } from '@/services/rulex/qingliangyingyong';
import { useEffect, useState } from 'react';
import { history, useParams, useRequest } from 'umi';
import { AppStackItem } from '..';
import { columns1, columns2 } from './columns';

type InitValueType = Omit<AppStackItem, 'autoStart'> & {
  autoStart: string;
};

const DefaultListUrl = '/app-stack/list';

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
  const { run: getDetail } = useRequest(() => getAppDetail({ uuid: id || '' }), {
    manual: true,
    formatResult: (res) => res?.data,
    onSuccess: (data) => {
      setValue({ ...data, autoStart: data?.autoStart.toString() });
    },
  });

  // 新建
  const { run: add, loading: addLoading } = useRequest((params) => postApp(params), {
    manual: true,
    onSuccess: () => {
      message.success('新建成功');
      history.push(DefaultListUrl);
    },
  });

  // 编辑
  const { run: update, loading: updateLoading } = useRequest((params) => putApp(params), {
    manual: true,
    onSuccess: () => {
      message.success('更新成功');
      history.push(DefaultListUrl);
    },
  });

  const handleOnFinish = async (values: any) => {
    try {
      const params = { ...values, autoStart: values?.autoStart === 'true' ? true : false };
      if (id) {
        update({ ...params, uuid: id });
      } else {
        add(params);
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
      loading={addLoading || updateLoading}
      goBack={DefaultListUrl}
      columns={id ? columns2 : columns1}
      initialValue={initialValue}
      onFinish={handleOnFinish}
    />
  );
};

export default UpdateForm;
