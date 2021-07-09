import React, {useEffect} from 'react';
import {useHistory} from 'react-router';

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
} from 'reactstrap';
// core components
import Header from '../Headers/Header.js';
import editIcon from '../../assets/images/icons/table/table-edit-icon.svg';
import deleteIcon from '../../assets/images/icons/table/table-delete-icon.svg';
import SwitchSlider from '../Switch/SwitchSlider.js';

import {useDispatch, useSelector} from 'react-redux';
import {
  deleteBanner,
  editBannerStatus,
  listBanners,
} from '../../redux/actions/banners.actions.js';

const Tables = () => {
  const dispatch = useDispatch();
  //import loading and errors as well
  const {banners} = useSelector((state) => state.bannersReducer);

  const history = useHistory();

  const navigateTo = (route) => history.push(route);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteBanner(id));
    } else return;
  };

  const activeInactiveBanner = (id) => {
    dispatch(editBannerStatus(id));
  };

  useEffect(() => {
    dispatch(listBanners());

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

                  <button
                    className="mb-0 table-header-button"
                    onClick={() => navigateTo('/admin/banners/add')}>
                    {'Add'}
                  </button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Url</th>
                    <th scope="col">Status</th>

                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {banners?.map((item) => (
                    <tr key={item?._id}>
                      <td>
                        <img
                          alt={'Gulf workers'}
                          className="table-banner-image"
                          src={`https://api.gccworkers.app/common/v1/resizer/${item?.icon}/80/80`}
                        />
                      </td>
                      <td>
                        <a
                          className="table-banner-link"
                          href={item?.link}
                          target="_blank"
                          rel={'noreferrer'}>
                          {item?.link}
                        </a>
                      </td>

                      <td>
                        <SwitchSlider
                          clicked={() => activeInactiveBanner(item?._id)}
                          checked={item?.status === 2}
                          name={item?.id}
                        />{' '}
                      </td>

                      <td>
                        <img
                          alt={'Gulf workers'}
                          className="td-action-img"
                          src={editIcon}
                          onClick={() =>
                            navigateTo(`/admin/banners/edit/${item._id}`)
                          }
                        />
                        <img
                          alt={'Gulf workers'}
                          className="td-action-img"
                          onClick={() => deleteHandler(item?._id)}
                          src={deleteIcon}
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
