import React, {useEffect, useState} from 'react';

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Spinner,
} from 'reactstrap';
// core components
import Header from '../Headers/Header.js';

import editIcon from '../../assets/images/icons/table/table-edit-icon.svg';
import deleteIcon from '../../assets/images/icons/table/table-delete-icon.svg';
import SwitchSlider from '../Switch/SwitchSlider.js';

import {useSelector, useDispatch} from 'react-redux';
import {
  deleteSubCategory,
  editSubCategoryStatus,
  listSubCategories,
} from '../../redux/actions/sub-categories.actions.js';
import {getImageUrl} from '../../utils/renderImage.js';
import {useHistory} from 'react-router-dom';
import eyeIcon from '../../assets/images/icons/table/table-eye-icon.svg';
import Pagination from '../Pagination/paginate';

const Tables = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const [searchKeyword, setSearchKeyword] = useState('');
  //redux
  const {subCategories, loading, count} = useSelector(
    (state) => state.subCategoriesReducer,
  );
  const dispatch = useDispatch();

  const history = useHistory();

  const navigateTo = (route) => history.push(route);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteSubCategory(id));
    } else return;
  };

  const activeInactiveCategory = (id) => {
    dispatch(editSubCategoryStatus(id));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(listSubCategories(postsPerPage, currentPage, searchKeyword));

    // eslint-disable-next-line
  }, [dispatch, currentPage, postsPerPage, searchKeyword]);

  return (
    <>
      <Header cardsVisible={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="table-shadow">
              <CardHeader className="border-0 table-custom-header">
                <div className="table-header-actions">
                  <input
                    placeholder={'Search...'}
                    className="table-header-input"
                    type={'text'}
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                  {loading && (
                    <div className="table-loader">
                      <Spinner color={'info'} />
                    </div>
                  )}
                  <button
                    className="mb-0 table-header-button"
                    onClick={() => navigateTo('/admin/sub-categories/add')}>
                    {'Add'}
                  </button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Icons</th>
                    <th scope="col">Status</th>

                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subCategories?.map((item) => (
                    <tr key={item?._id}>
                      <td>{item?.name?.en}</td>
                      <td>
                        <img
                          alt={'Gulf Workers'}
                          className=".table-sub-category-icon"
                          src={getImageUrl(item?.icon, 50, 50)}
                        />
                      </td>

                      <td>
                        <SwitchSlider
                          clicked={() => activeInactiveCategory(item?._id)}
                          checked={item?.status === 1}
                        />{' '}
                      </td>

                      <td>
                        <img
                          alt={'Gulf Workers'}
                          className="td-action-img"
                          src={eyeIcon}
                          onClick={() =>
                            navigateTo(`/admin/sub-categories/view/${item._id}`)
                          }
                        />
                        <img
                          alt={'Gulf Workers'}
                          className="td-action-img"
                          src={editIcon}
                          onClick={() =>
                            navigateTo(`/admin/sub-categories/edit/${item._id}`)
                          }
                        />
                        <img
                          alt={'Gulf Workers'}
                          className="td-action-img"
                          src={deleteIcon}
                          onClick={() => deleteHandler(item?._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                {count > postsPerPage && (
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={count}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    paginate={paginate}
                  />
                )}
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
