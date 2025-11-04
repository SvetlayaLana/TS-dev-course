export const parseDate = (val: string) => {
  const parsed = new Date(val);
  return isNaN(parsed.getTime()) ? null : parsed;
};
