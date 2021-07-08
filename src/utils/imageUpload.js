import {API} from '../services/auth';

export const imageUploader = async (formData) => {
  try {
    const res = await API.post('/common/v1/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (res) return res?.data?.data?.image;
    return false;
  } catch (err) {
    return false;
  }
};
