export const getImageUrl = (name, width = 80, height = 80) =>
  `https://api.gccworkers.app/common/v1/resizer/${name}/${height}/${width}`;
