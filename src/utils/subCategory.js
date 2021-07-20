import {API} from '../services/auth';

export const getSubCategByCateg = async (id) => {
  try {
    const res = await API.get(`/admin/v1/listSubCategory?categoryId=${id}`);

    if (res) return res?.data?.data?.listing;
    return false;
  } catch (err) {
    return false;
  }
};
