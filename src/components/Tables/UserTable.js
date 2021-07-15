import React, {useEffect} from 'react';
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
import eyeIcon from '../../assets/images/icons/table/table-eye-icon.svg';
import editIcon from '../../assets/images/icons/table/table-edit-icon.svg';
import deleteIcon from '../../assets/images/icons/table/table-delete-icon.svg';
import {useDispatch, useSelector} from 'react-redux';
import {listUsers, deleteUser} from '../../redux/actions/users.actions.js';

const Tables = ({history}) => {
  const {t} = useTranslation();
  //redux
  const dispatch = useDispatch();
  const {users, loading} = useSelector((state) => state.usersReducer);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id));
    } else return;
  };

  const navigateTo = (route) => history.push(route);

  useEffect(() => {
    dispatch(listUsers());
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
                    placeholder={t('search')}
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
                    onClick={() => navigateTo('/admin/users/add')}>
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
                        <tr>
                          <td>{item?.name}</td>
                          <td>{item?.createdAt}</td>
                          <td>{item?.fullNumber}</td>
                          <td>{item?.lastActive}</td>
                          <td>{item?.ads}</td>

                          <td>
                            <img
                              alt={'Gulf Workers'}
                              className="td-action-img"
                              src={eyeIcon}
                              onClick={() =>
                                navigateTo(`/admin/users/view/${item._id}`)
                              }
                            />
                            <img
                              alt={'Gulf Workers'}
                              className="td-action-img"
                              src={editIcon}
                              onClick={() =>
                                navigateTo(`/admin/users/edit/${item._id}`)
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
              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
