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
  editQuestionStatus,
  editQuestionFilterStatus,
} from '../../redux/actions/questions.actions.js';
import {listCategories} from '../../redux/actions/categories.actions.js';
import {listSubCategories} from '../../redux/actions/sub-categories.actions';
import {finder} from '../../utils/dataHelpers.js';
import {quesTypes, userTypes} from '../Forms/questions/data.js';
import SwitchSlider from '../Switch/SwitchSlider.js';
// core components

const Tables = ({history}) => {
  const dispatch = useDispatch();
  const {questions, loading, count} = useSelector(
    (state) => state.questionsReducer,
  );
  //const {categories} = useSelector((state) => state.categoriesReducer);
  //const {subCategories} = useSelector((state) => state.subCategoriesReducer);

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
    dispatch(listSubCategories());
    dispatch(listCategories());
  }, [dispatch]);
  useEffect(() => {
    dispatch(listQuestions(postsPerPage, currentPage, searchKeyword));
  }, [dispatch, postsPerPage, currentPage, searchKeyword]);
  const {t, i18n} = useTranslation();
  const lang = i18n.language;
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
                    onClick={() =>
                      history.push('/admin/questions/addQuestion')
                    }>
                    {t('add')}
                  </button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col">{t('ques')}</th>
                    <th scope="col">{t('userType')}</th>
                    <th scope="col">{t('quesType')}</th>
                    <th scope="col">{t('category')}</th>
                    <th scope="col">{t('subCategory')}</th>
                    <th scope="col">{t('featured')}</th>
                    <th scope="col">{t('options')}</th>
                    <th scope="col">{t('status')}</th>
                    <th scope="col">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && questions?.length === 0 ? (
                    <tr>
                      <td rowSpan={6} colSpan={6}>
                        {' '}
                        {t('noDataFound')}
                      </td>
                    </tr>
                  ) : (
                    <>
                      {questions?.map((item) => (
                        <tr key={item?._id}>
                          <td>{item?.question[lang]?.slice(0, 100)} ...</td>
                          <td>
                            {finder(userTypes, item?.userType)?.name}{' '}
                            {finder(userTypes, item?.userType)?.enum}
                          </td>
                          <td>
                            {finder(quesTypes, item?.questionType)?.name}{' '}
                            {finder(quesTypes, item?.questionType)?.enum}
                          </td>
                          <td>
                            {item?.categoryId?.name[lang]
                              ? item?.categoryId?.name[lang]
                              : 'N/A'}
                          </td>
                          <td>
                            {item?.subCategoryId?.name[lang]
                              ? item?.subCategoryId?.name[lang]
                              : 'N/A'}
                          </td>

                          <td>
                            <SwitchSlider
                              clicked={() =>
                                dispatch(
                                  editQuestionFilterStatus(
                                    item?._id,
                                    !item?.featuredFilter,
                                  ),
                                )
                              }
                              checked={item?.featuredFilter}
                              name={item?.id}
                            />{' '}
                          </td>
                          <td>{item?.options?.length}</td>
                          <td>
                            <SwitchSlider
                              clicked={() =>
                                dispatch(editQuestionStatus(item?._id))
                              }
                              checked={item?.status === 1}
                              name={item?.id}
                            />{' '}
                          </td>

                          <td>
                            <img
                              alt={'Gulf Workers'}
                              className="td-action-img"
                              src={eyeIcon}
                              onClick={() =>
                                navigateTo(
                                  `/admin/questions/viewQuestion/${item._id}`,
                                )
                              }
                            />
                            <img
                              alt={'Gulf Workers'}
                              className="td-action-img"
                              src={editIcon}
                              onClick={() =>
                                navigateTo(
                                  `/admin/questions/editQuestion/${item._id}`,
                                )
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
