import React, {useEffect, useState} from 'react';

// reactstrap components
import {
  Card,
  CardHeader,
  Spinner,
  Table,
  Container,
  Row,
  CardFooter,
} from 'reactstrap';
// core components
import Header from '../Headers/Header.js';
import roundIcon from '../../assets/images/icons/table/table-notifications-action-icon.svg';
import {useTranslation} from 'react-i18next';
import {listNotifications} from '../../redux/actions/notifications.actions.js';
import {useDispatch, useSelector} from 'react-redux';
import Pagination from '../Pagination/paginate';
import {useHistory} from 'react-router-dom';
import moment from 'moment';

const Tables = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
  const [searchKeyword, setSearchKeyword] = useState('');
  const {t, i18n} = useTranslation();
  const lang = i18n.language;
  const dispatch = useDispatch();
  const {notifications, loading, count} = useSelector(
    (state) => state.notificationsReducer,
  );

  const history = useHistory();

  const navigateTo = (route) => history.push(route);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(listNotifications(postsPerPage, currentPage, searchKeyword));
  }, [dispatch, postsPerPage, currentPage, searchKeyword]);

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
                  {loading && <Spinner color={'info'} />}
                  <button
                    onClick={() =>
                      navigateTo('/admin/notifications/addNotification')
                    }
                    className="mb-0 table-header-button">
                    {t('sendNotifications')}
                  </button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col">{t('userName')}</th>
                    <th scope="col">{t('message')}</th>
                    <th scope="col">{t('sendTo')}</th>
                    <th scope="col">{t('sentDate')}</th>
                    <th scope="col">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && notifications?.length === 0 ? (
                    <tr>
                      <td rowSpan={6} colSpan={6}>
                        {' '}
                        {t('noDataFound')}
                      </td>
                    </tr>
                  ) : (
                    <>
                      {notifications?.map((item) => (
                        <tr key={item?._id}>
                          <td>{item?.title[lang]}</td>
                          <td>{item?.message[lang]}</td>
                          <td>{item?.topic}</td>
                          <td>
                            {moment(item?.createdAt).format('DD/MM/YYYY')}
                          </td>
                          <td>
                            <img
                              alt={'Gulf Workers'}
                              className="td-action-img"
                              src={roundIcon}
                              onClick={() =>
                                navigateTo(
                                  `/admin/notifications/addNotification/${item?._id}`,
                                )
                              }
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
