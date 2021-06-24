export const errorParser = async (error) => {
  if (!error) return 'Network Error';
  return (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.message
  );
};
