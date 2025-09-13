export const formatValue = ({
  value,
  postfix,
  defaultValue,
}: {
  value: number | string;
  postfix?: string;
  defaultValue?: string | number;
}) => (value !== 0 ? `${value}${postfix ? ` ${postfix}` : ''}` : (defaultValue ?? '-'));
