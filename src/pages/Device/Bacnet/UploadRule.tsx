import { getIntl, getLocale } from '@umijs/max';
import { Table } from 'antd';
import { ObjectType } from './enum';

const dataSource = [
  {
    bacnetDeviceId: 1,
    tag: 'tag1',
    alias: 'tag1',
    objectType: ObjectType.AI,
    objectId: 1,
  },
];

const columns = [
  {
    title: 'bacnetDeviceId',
    dataIndex: 'bacnetDeviceId',
  },
  {
    title: 'tag',
    dataIndex: 'tag',
  },
  {
    title: 'alias',
    dataIndex: 'alias',
  },
  {
    title: 'objectType',
    dataIndex: 'objectType',
  },
  {
    title: 'objectId',
    dataIndex: 'objectId',
  },
];

type UploadRuleProps = {
  fileName: string;
};

const UploadRule = ({ fileName }: UploadRuleProps) => {
  return (
    <>
      <div className="mb-[12px]">
        {getIntl(getLocale()).formatMessage({ id: 'device.modal.title.upload' })}
      </div>
      <Table bordered dataSource={dataSource} columns={columns} pagination={false} size="small" />
      <div className="mt-[24px]">
        {getIntl(getLocale()).formatMessage({ id: 'device.modal.content.upload' })}
        <span className="px-[5px] font-bold">{fileName}</span>？
      </div>
    </>
  );
};

export default UploadRule;
