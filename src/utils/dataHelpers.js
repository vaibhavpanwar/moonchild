export const finder = (array, id) => array?.find((i) => i?._id === id);
export const multipleFinder = (array, id) =>
  array?.filter((i) => i?._id === id);
