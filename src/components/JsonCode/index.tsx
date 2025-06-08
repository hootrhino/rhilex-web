type JsonCodeProps = {
  code?: string;
};

const JsonCode = ({ code = '' }: JsonCodeProps) => {
  return (
    <pre className="p-4 overflow-auto text-[rgba(42,46,54,0.65)] text-[14px] leading-[1.45] whitespace-pre-wrap bg-[rgba(150,150,150,0.1)] rounded-[3px]">
      <code>{code}</code>
    </pre>
  );
};

export default JsonCode;
