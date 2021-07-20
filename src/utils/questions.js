import {API} from '../services/auth';

export const getAdQuestions = async (userType, categ, subCateg) => {
  try {
    if (categ && subCateg) {
      const res = await API.get(
        `/admin/v1/listQuestions?userType=${userType}&subCategoryId=${subCateg}&categoryId=${categ}`,
      );

      if (res) return res?.data?.data?.listing;
      return false;
    } else {
      const res = await API.get(`/admin/v1/listQuestions?userType=${userType}`);

      if (res) return res?.data?.data?.listing;
      return false;
    }
  } catch (err) {
    console.log(err, 'error');
    return false;
  }
};
