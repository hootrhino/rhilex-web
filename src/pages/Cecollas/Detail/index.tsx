import type { EnhancedProDescriptionsItemProps } from '@/components/ProDescriptions';
import ProDescriptions from '@/components/ProDescriptions';
import { getCecollasDetail } from '@/services/rhilex/yunbianxietong';
import { omit } from '@/utils/redash';
import { useIntl, useRequest } from '@umijs/max';
import { Drawer, DrawerProps } from 'antd';
import { useEffect } from 'react';
import { baseColumns, typeColumns } from '../columns';
import { CecollasType } from '../enum';

type DetailProps = DrawerProps & {
  uuid: string;
};

const Detail = ({ uuid, open, ...props }: DetailProps) => {
  const { formatMessage, locale } = useIntl();

  const labelWidth = locale === 'en-US' ? 150 : 100;

  // 获取详情
  const { data: detail, run: getDetail } = useRequest(
    (params: API.getCecollasDetailParams) => getCecollasDetail(params),
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (uuid && open) {
      getDetail({ uuid });
    }
  }, [uuid, open]);

  return (
    <Drawer
      open={open}
      title={formatMessage({ id: 'cecollas.title.detail' })}
      placement="right"
      width="50%"
      destroyOnClose
      maskClosable={false}
      {...props}
    >
      <>
        <ProDescriptions
          title={formatMessage({ id: 'common.title.base' })}
          dataSource={detail && omit(detail, ['config'])}
          columns={baseColumns as EnhancedProDescriptionsItemProps[]}
          column={3}
          labelWidth={labelWidth}
          rootClassName="detail-descriptions"
        />

        {detail && detail.type && Object.keys(CecollasType).includes(detail.type) && (
          <ProDescriptions
            title={formatMessage({ id: 'cecollas.title.config' })}
            dataSource={detail.config}
            columns={typeColumns(detail.type) as EnhancedProDescriptionsItemProps[]}
            column={3}
            labelWidth={labelWidth}
            rootClassName="detail-descriptions"
          />
        )}
      </>
    </Drawer>
  );
};

export default Detail;
