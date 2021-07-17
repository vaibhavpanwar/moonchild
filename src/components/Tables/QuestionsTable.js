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
import {useSelector, useDispatch} from 'react-redux';
import Pagination from '../Pagination/paginate';

import eyeIcon from '../../assets/images/icons/table/table-eye-icon.svg';
import {useTranslation} from 'react-i18next';
import {
  deleteQuestion,
  listQuestions,
} from '../../redux/actions/questions.actions.js';
// core components

const Tables = ({history}) => {
  const dispatch = useDispatch();
  const {questions, loading, count} = useSelector(
    (state) => state.questionsReducer,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
  const [searchKeyword, setSearchKeyword] = useState('');

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const navigateTo = (route) => history.push(route);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteQuestion(id));
    } else return;
  };

  useEffect(() => {
    dispatch(listQuestions(postsPerPage, currentPage, searchKeyword));
  }, [dispatch, postsPerPage, currentPage, searchKeyword]);
  const {t} = useTranslation();
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
                    onClick={() => history.push('/admin/questions/add')}>
                    {t('add')}
                  </button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col">{t('userType')}</th>
                    <th scope="col">{t('quesType')}</th>
                    <th scope="col">{t('categoryId')}</th>
                    <th scope="col">{t('suvCategoryId')}</th>
                    <th scope="col">{t('options')}</th>
                    <th scope="col">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && questions?.length === 0 ? (
                    <tr>
                      <td rowSpan={6} colSpan={6}>
                        {' '}
                        No data found
                      </td>
                    </tr>
                  ) : (
                    <>
                      {questions?.map((item) => (
                        <tr key={item?._id}>
                          <td>{item?.userType}</td>
                          <td>{item?.questionType}</td>
                          <td>{item?.categoryId}</td>
                          <td>{item?.subCategoryId}</td>
                          <td>{item?.options[0]?.name?.en}</td>

                          <td>
                            <img
                              alt={'Gulf Workers'}
                              className="td-action-img"
                              src={eyeIcon}
                              onClick={() =>
                                navigateTo(`/admin/questions/view/${item._id}`)
                              }
                            />
                            <img
                              alt={'Gulf Workers'}
                              className="td-action-img"
                              src={editIcon}
                              onClick={() =>
                                navigateTo(`/admin/questions/edit/${item._id}`)
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
