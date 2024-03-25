import HeadersDetail from '@/components/HttpHeaders/Detail';
import { getOutendsDetail } from '@/services/rulex/shuchuziyuanguanli';
import { omit } from '@/utils/redash';
import { ProDescriptions } from '@ant-design/pro-components';
import { Drawer, DrawerProps } from 'antd';
import { useEffect } from 'react';
import { useRequest } from 'umi';
import { baseColumns, configColumns } from '../columns';
import { typeEnum } from '../enum';

type DetailProps = DrawerProps & {
  uuid: string;
};

const Detail = ({ uuid, ...props }: DetailProps) => {
  const { data, run, loading } = useRequest(() => getOutendsDetail({ uuid }), {
    manual: true,
  });

  useEffect(() => {
    if (uuid) {
      run();
    }
  }, [uuid]);

  return (
    <Drawer title="资源详情" placement="right" width="30%" {...props}>
      <ProDescriptions
        column={1}
        columns={baseColumns}
        labelStyle={{ justifyContent: 'flex-end', minWidth: 130 }}
        title="基本配置"
        dataSource={data && omit(data, ['config'])}
        loading={loading}
      />
      {data?.type && Object.keys(typeEnum).includes(data?.type) && (
        <>
          <ProDescriptions
            column={1}
            columns={configColumns[data?.type]}
            labelStyle={{ justifyContent: 'flex-end', minWidth: 130 }}
            title="资源配置"
            dataSource={data}
            loading={loading}
          />
          {data?.type === 'HTTP' && <HeadersDetail data={data?.config?.headers} />}
        </>
      )}
    </Drawer>
  );
};

export default Detail;
