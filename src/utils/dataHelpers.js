export const finder = (array, id) => array?.find((i) => i?._id === id);
// export const multipleFinder = (array, id) =>
//   array?.filter((i) => i?._id === id);

export const multipleFinder = (dynamicArray, staticArray) => {
  console.log(dynamicArray, staticArray, 'okoko');
  for (let i = 0; i < dynamicArray?.length; i++) {
    var unique = [];
    const found = staticArray?.find((el) => el?._id === dynamicArray[i]?._id);
    if (found) {
      unique.push(found);
    } else {
      return;
    }
  }
  console.log(unique, 'updted');
  return unique;
};
export const multipleFinderLang = (dynamicArray, staticArray) => {
  console.log(dynamicArray, staticArray, 'okoko');
  for (let i = 0; i < dynamicArray?.length; i++) {
    var unique = [];
    const found = staticArray?.find((el) => el?._id === dynamicArray[i]);
    if (found) {
      unique.push(found);
    } else {
      return;
    }
  }
  console.log(unique, 'updted');
  return unique;
};

export const getPendingRequestsNumber = (array) =>
  array.filter((el) => el.status === 1)?.length;

export const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};
