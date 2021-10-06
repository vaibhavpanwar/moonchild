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
// export const multipleFinder = (dynamicArray, staticArray) => {
//   console.log(dynamicArray, staticArray, 'okoko');
//   for (let i = 0; i < dynamicArray?.length; i++) {
//     var unique = [];
//     const found = staticArray?.find((el) => el?._id === dynamicArray[i]?._id);
//     if (found) {
//       unique.push(found);
//     } else {
//       return;
//     }
//   }

//   return unique;
// };
// export  const multipleFinder= (vars) => {
//     const unique = [];
//     const wow = vars.map((x) =>
//       unique.filter(
//         (a) => a.owningCompany.fullName === x.owningCompany.fullName
//       ).length > 0
//         ? null
//         : unique.push(x)
//     );

//     return unique;
//   };

/*


array 1 full objects    array 2 only enum


array1.filter(elem=> )

for (let i = 0; i < array.length; i++) {
  const unique=[]
  const found=array2.find(el=> el?._id===array1[i]?._id)
  if(found)unique.push
  else{ return}
}
return unique
array,for




*/
