import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Spinner,
  Row,
} from 'reactstrap';
// core components
import Header from '../Headers/Header.js';
// import eyeIcon from '../../assets/images/icons/table/table-eye-icon.svg';
import editIcon from '../../assets/images/icons/table/table-edit-icon.svg';
import deleteIcon from '../../assets/images/icons/table/table-delete-icon.svg';
import {useDispatch, useSelector} from 'react-redux';
import {listUsers, deleteUser} from '../../redux/actions/users.actions.js';
import Pagination from '../Pagination/paginate';
import moment from 'moment';
import {truncate} from '../../utils/truncate.js';

const Tables = ({history}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
  const [searchKeyword, setSearchKeyword] = useState('');

  const {t} = useTranslation();
  //redux
  const dispatch = useDispatch();
  const {users, loading, count} = useSelector((state) => state.usersReducer);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id));
    } else return;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const navigateTo = (route) => history.push(route);

  useEffect(() => {
    dispatch(listUsers(postsPerPage, currentPage, searchKeyword));

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
                    placeholder={t('search')}
                    className="table-header-input"
                    type={'text'}
                    value={searchKeyword}
                    onChange={(e) => {
                      setCurrentPage(1);
                      setSearchKeyword(e.target.value);
                    }}
                  />
                  {loading && (
                    <div className="table-loader">
                      <Spinner color={'info'} />
                    </div>
                  )}

                  <button
                    className="mb-0 table-header-button"
                    onClick={() => navigateTo('/admin/users/addUser')}>
                    {t('add')}
                  </button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col">{t('name')}</th>
                    <th scope="col">{t('registrationDate')}</th>
                    <th scope="col">{t('phoneNumber')}</th>
                    <th scope="col">{t('lastDateActive')}</th>
                    <th scope="col">{t('numberOfAds')}</th>
                    <th scope="col">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && users?.length === 0 ? (
                    <tr>
                      <td rowSpan={6} colSpan={6}>
                        {' '}
                        No data found
                      </td>
                    </tr>
                  ) : (
                    <>
                      {users?.map((item) => (
                        <tr key={item?._id}>
                          <td>{item?.name ? truncate(item?.name) : 'N/A'}</td>
                          <td>
                            {moment(item?.createdAt).format('DD/MM/YYYY')}
                          </td>
                          <td>
                            {item.fullNumber
                              ? truncate(item?.fullNumber)
                              : 'N/A'}
                          </td>
                          <td>
                            {' '}
                            {moment(item?.lastOnline).format('DD/MM/YYYY')}
                          </td>
                          <td>{item?.numberOfAdds}</td>

                          <td>
                            {/* <img
                              alt={'Gulf Workers'}
                              className="td-action-img"
                              src={eyeIcon}
                              onClick={() =>
                                navigateTo(`/admin/users/viewUser/${item._id}`)
                              }
                            /> */}
                            <img
                              alt={'Gulf Workers'}
                              className="td-action-img"
                              src={editIcon}
                              onClick={() =>
                                navigateTo(`/admin/users/editUser/${item._id}`)
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
                    </>
                  )}
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
