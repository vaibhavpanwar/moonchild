import React from 'react';
import AddForm from '../../../components/Forms/categories/addForm';
const addCategory = ({history}) => {
  console.log('history');
  return <AddForm history={history} />;
};

export default addCategory;
