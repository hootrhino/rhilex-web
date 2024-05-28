import { getIntl, getLocale } from '@umijs/max';
import type { TableProps } from 'antd';
import { Table } from 'antd';

type UploadSheetConfirmProps = Omit<TableProps, 'columns' | 'dataSource'> & {
  fileName: string;
  initialValue: Record<string, any>;
};

const UploadSheetConfirm = ({ fileName, initialValue, ...props }: UploadSheetConfirmProps) => {
  const columns = Object.keys(initialValue)?.map((key) => ({
    title: key,
    dataIndex: key,
    hidden: key === 'uuid',
  }));
  const dataSource = [{ ...initialValue }];

  return (
    <>
      <div className="mb-[12px]">
        {getIntl(getLocale()).formatMessage({ id: 'component.modal.title.upload' })}
      </div>
      <Table
        rowKey="uuid"
        bordered
        pagination={false}
        size="small"
        dataSource={dataSource}
        columns={columns}
        {...props}
      />
      <div className="mt-[24px]">
        {getIntl(getLocale()).formatMessage({ id: 'component.modal.content.upload' })}
        <span className="px-[5px] font-bold">{fileName}</span>
        {getLocale() === 'en-US' ? '?' : '？'}
      </div>
    </>
  );
};

export default UploadSheetConfirm;
