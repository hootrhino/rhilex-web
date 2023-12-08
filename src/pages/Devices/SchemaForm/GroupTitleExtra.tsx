import { modal } from '@/components/PopupHack';
import { DownloadOutlined, QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';
import UploadRule from './UploadRule';

type GroupTitleExtraProps = {
  title: string;
};

const GroupTitleExtra = ({ title }: GroupTitleExtraProps) => {
  return (
    <div className="flex items-center">
      <span>{title}</span>
      <div className="pl-[12px] pr-[24px]">
        <a key="upload">
          <UploadOutlined className="pr-[5px]" />
          上传点位表
        </a>
        <span className="pl-[5px]">
          <span className="font-light">(</span>
          <a
            className="text-[12px]"
            onClick={() =>
              modal.info({
                title: 'Modbus 点位表上传规则',
                autoFocusButton: null,
                width: '40%',
                content: <UploadRule />,
              })
            }
          >
            <QuestionCircleOutlined className="pr-[2px]" />
            查看详细规则
          </a>
          <span className="font-light">)</span>
        </span>
      </div>

      <a key="download">
        <DownloadOutlined className="pr-[5px]" />
        下载点位表
      </a>
    </div>
  );
};
export default GroupTitleExtra;
