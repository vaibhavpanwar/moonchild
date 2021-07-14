import cogoToast from 'cogo-toast';

export const errorAlert = (msg) =>
  cogoToast.error(msg, {
    hideAfter: 5,
    position: 'top-right',
    heading: 'Something went wrong!!',
  });
export const warningAlert = (msg) =>
  cogoToast.warn(msg, {
    hideAfter: 5,
    position: 'top-right',
    heading: 'Warning!!',
  });
export const infoAlert = (msg) =>
  cogoToast.info(msg, {
    hideAfter: 5,
    position: 'top-right',
    heading: 'Important!!',
  });
export const successAlert = (msg) =>
  cogoToast.success(msg, {
    hideAfter: 5,
    position: 'top-right',
    heading: 'Success!!',
  });
