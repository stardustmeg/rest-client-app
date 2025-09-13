export const formatValue = ({ value, postfix }: { value: number; postfix?: string }) =>
  `${value}${postfix ? ` ${postfix}` : ''}`;
