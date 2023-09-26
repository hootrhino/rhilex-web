import type { TooltipProps } from 'antd';
import { Tooltip } from 'antd';

type EditorTooltipProps = Omit<TooltipProps, 'title'> & {
  fontSize?: number;
  title: string | React.ReactNode;
};

const EditorTooltip = ({
  color = '#4281ff',
  fontSize = 12,
  title,
  children,
  ...props
}: EditorTooltipProps) => {
  const titleFormat = <span style={{ fontSize }}>{title}</span>;
  return (
    <Tooltip title={titleFormat} color={color} {...props}>
      {children}
    </Tooltip>
  );
};

export default EditorTooltip;
