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
import nonReplyIcon from '../../assets/images/icons/table/table-non-reply.svg';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {listContactUs} from '../../redux/actions/contactUs.actions';
import Pagination from '../Pagination/paginate';
import moment from 'moment';
import ResolveModal from '../Modals/ContactUsResolveModal.js';

const Tables = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
  const [searchKeyword, setSearchKeyword] = useState('');

  //modal to resolve contact us request
  const [activeRequest, setActiveRequest] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const setModalOpen = (request) => {
    setIsOpen(!isOpen);
    if (request) {
      setActiveRequest(request);
    } else {
      setActiveRequest({});
    }
  };

  const dispatch = useDispatch();
  const {contacts, loading, count} = useSelector(
    (state) => state.contactUsReducer,
  );

  useEffect(() => {
    dispatch(listContactUs(postsPerPage, currentPage, searchKeyword));
  }, [dispatch, currentPage, postsPerPage, searchKeyword]);

  const resolveRequest = () => {
    console.log('ok');
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const {t} = useTranslation();
  return (
    <>
      <Header cardsVisible={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <ResolveModal
            open={isOpen}
            setModalOpen={setModalOpen}
            onSubmit={resolveRequest}
            setActiveRequest={setActiveRequest}
            activeRequest={activeRequest}
          />
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
                </div>
                {loading && (
                  <div className="table-loader">
                    <Spinner color={'info'} />
                  </div>
                )}
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col">{t('userName')}</th>
                    <th scope="col">{t('emailAddress')}</th>
                    <th scope="col">{t('phoneNumber')}</th>

                    <th scope="col">{t('contactDate')}</th>
                    <th scope="col">{t('status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && contacts?.length === 0 ? (
                    <tr>
                      <td rowSpan={6} colSpan={6}>
                        {' '}
                        {t('noDataFound')}
                      </td>
                    </tr>
                  ) : (
                    <>
                      {contacts?.map((item) => (
                        <tr key={item?._id}>
                          <td>{item?.name}</td>
                          <td>{item?.email ? item?.email : 'N/A'}</td>
                          <td className={'word-break'}>
                            {item?.fullNumber?.startsWith('+')
                              ? item?.fullNumber
                              : '+' + item?.fullNumber}
                          </td>
                          <td>
                            {moment(item?.createdAt).format('DD/MM/YYYY')}
                          </td>
                          <td>
                            {item?.status === 2 ? (
                              <p
                                onClick={() => setModalOpen(item)}
                                className="replied">
                                Replied
                              </p>
                            ) : (
                              <img
                                onClick={() => setModalOpen(item)}
                                alt="Gulf workers"
                                className="table-non-reply"
                                src={nonReplyIcon}
                              />
                            )}
                          </td>
                          <td></td>
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
