export const truncate = (str) =>
  str?.length >= 14 ? `${str.slice(0, 15)}  ....` : str;
