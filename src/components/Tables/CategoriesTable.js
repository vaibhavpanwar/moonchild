import React, {useEffect} from 'react';

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
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
  listCategories,
  editCategoryStatus,
  deleteCategory,
} from '../../redux/actions/categories.actions';
import {useHistory} from 'react-router-dom';
import {getImageUrl} from '../../utils/renderImage.js';

const Tables = () => {
  //redux
  const {categories, loading} = useSelector((state) => state.categoriesReducer);

  const dispatch = useDispatch();

  const history = useHistory();

  const navigateTo = (route) => history.push(route);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteCategory(id));
    } else return;
  };

  const activeInactiveCategory = (id) => {
    dispatch(editCategoryStatus(id));
  };

  useEffect(() => {
    dispatch(listCategories());

    // eslint-disable-next-line
  }, [dispatch]);

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
                  />
                  {loading && (
                    <div className="table-loader">
                      <Spinner color={'info'} />
                    </div>
                  )}
                  <button
                    className="mb-0 table-header-button"
                    onClick={() => navigateTo('/admin/categories/add')}>
                    {'Add'}
                  </button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Icon</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((item) => (
                    <tr key={item?._id}>
                      <td>{item?.name?.en}</td>
                      <td>
                        <img
                          alt={'Gulf workers'}
                          className="table-banner-image"
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
                          src={editIcon}
                          onClick={() =>
                            navigateTo(`/admin/categories/edit/${item._id}`)
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
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0">
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1">
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}>
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}>
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}>
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
