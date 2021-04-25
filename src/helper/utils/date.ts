export function GetFullDate(
  inpDate: number | Date,
  type?: { YYYYMMDD?: boolean },
): string {
  let date: Date;
  if (!inpDate) return;
  if (typeof inpDate == 'number') {
    date = new Date(inpDate);
  } else {
    date = inpDate;
  }
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }`;
}
