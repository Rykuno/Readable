export const getTime = timestamp => {
  const date = new Date(timestamp);
  const month = date.getMonth()+1;
  const day = date.getDate();
  const year = date.getUTCFullYear();
  return `${month}-${day}-${year}`;
};
