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
import {ScrollMenu} from 'react-horizontal-scrolling-menu';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

import {useTranslation} from 'react-i18next';
import {
  deleteQuestion,
  listQuestions,
  editQuestionStatus,
  editQuestionFilterStatus,
  suffleQuestion,
} from '../../redux/actions/questions.actions.js';
import {listCategories} from '../../redux/actions/categories.actions.js';
import {listSubCategories} from '../../redux/actions/sub-categories.actions';

import {finder} from '../../utils/dataHelpers.js';
import {quesTypes, userTypes} from '../Forms/questions/data.js';
import SwitchSlider from '../Switch/SwitchSlider.js';
import MenuItem from '../horizontalScroll/MenuItem.js';
import {questionsConstants} from '../../redux/constants/questions.constants.js';

const Tables = ({history}) => {
  const dispatch = useDispatch();
  const {questions, loading, count} = useSelector(
    (state) => state.questionsReducer,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
  const [userSelected, setUserSelected] = useState([1]);
  const [categorySelected, setCategorySelected] = useState([1]);
  const [subCategorySelected, setSubCategorySelected] = useState([1]);

  const [user, setUser] = useState(1);
  const [isUserNotServiceOffice, setIsUserServiceOffice] = useState(true);
  const [categoryId, setCategoryId] = useState();
  const [subCategoryId, setSubCategoryId] = useState();

  const [searchKeyword, setSearchKeyword] = useState('');
  const {categories} = useSelector((state) => state.categoriesReducer);
  const {subCategories} = useSelector((state) => state.subCategoriesReducer);

  // const [userType, setUserType] = useState(null);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const navigateTo = (route) => history.push(route);
  const isUserSelected = (id) => !!userSelected.find((el) => el === id);
  const isCategorySelected = (id) => !!categorySelected.find((el) => el === id);
  const isSubCategorySelected = (id) =>
    !!subCategorySelected.find((el) => el === id);

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
    dispatch(
      listQuestions(
        postsPerPage,
        currentPage,
        searchKeyword,
        user,
        categoryId,
        subCategoryId,
      ),
    );
  }, [
    dispatch,
    postsPerPage,
    currentPage,
    searchKeyword,
    user,
    categoryId,
    subCategoryId,
  ]);
  useEffect(() => {
    // console.log(categories.length, 'categoriesleagth');
    if (categories?.length > 0 && subCategories.length > 0) {
      if (isUserNotServiceOffice) {
        setCategoryId(categories[0]?._id);
        setSubCategoryId(subCategories[0]?._id);
      }
    }
  }, [categories, subCategories, isUserNotServiceOffice]);
  const {t, i18n} = useTranslation();
  const lang = i18n.language;

  const handleClick =
    (item) =>
    ({getItemById, scrollToItem}) => {
      console.log(categoryId, subCategoryId, 'categoryID');
      if (item._id === 3 || item._id === 4) {
        if (subCategoryId !== '' || categoryId !== '') {
          console.log('already Empty');
          setCategoryId('');
          setSubCategoryId('');
        }

        setIsUserServiceOffice(false);
      } else {
        setIsUserServiceOffice(true);
      }

      if (user === item._id) {
        setUser('');
      } else {
        setUser(item._id);
      }

      const itemSelected = isUserSelected(item._id);

      setUserSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== item._id)
          : [item._id],
      );
    };
  // };
  const handleCatClick =
    (item, i) =>
    ({getItemById, scrollToItem}) => {
      setCategoryId(item._id);

      if (categoryId === item._id) {
        setCategoryId('');
      } else {
        setCategoryId(item._id);
      }

      const itemSelected = isCategorySelected(i);

      setCategorySelected((currentSelected) =>
        itemSelected ? currentSelected.filter((el) => el !== i) : [i],
      );
    };
  const handleSubCatClick =
    (item, i) =>
    ({getItemById, scrollToItem}) => {
      if (subCategoryId === item._id) {
        setSubCategoryId('');
      } else {
        setSubCategoryId(item._id);
      }

      const itemSelected = isSubCategorySelected(i);

      setSubCategorySelected((currentSelected) =>
        itemSelected ? currentSelected.filter((el) => el !== i) : [i],
      );
    };
  const onEnd = (result) => {
    if (!result.destination) {
      return;
    }

    let sourceIdx = parseInt(result.source.index);
    let destIdx = parseInt(result.destination.index);
    if (sourceIdx === destIdx) return;
    else {
      let clone = questions;
      let draggedLink = clone[sourceIdx];
      let newList = clone.slice();
      newList.splice(sourceIdx, 1);
      newList.splice(destIdx, 0, draggedLink);

      dispatch({
        type: questionsConstants.QUESTION_SUFFLE,
        payload: newList,
      });
      dispatch(
        suffleQuestion({
          from: clone[sourceIdx]._id,
          to: clone[destIdx]._id,
        }),
      );
    }
  };

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
                    type={'text'} // search for menu item
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
              <div className="cardScroll mx-4">
                <h6>User Type:</h6>
                <ScrollMenu>
                  {userTypes?.map((item, i) => (
                    <MenuItem
                      itemId={item._id} // NOTE: itemId is required for track items
                      title={item?.name}
                      key={item._id}
                      onClick={handleClick(item)}
                      selected={isUserSelected(item._id)}
                      currentItem={user}
                    />
                  ))}
                </ScrollMenu>
                {user !== 4 && user !== 3 && (
                  <>
                    <h6>Categories:</h6>
                    <ScrollMenu>
                      {categories?.map((item, i) => (
                        <MenuItem
                          itemId={item._id} // NOTE: itemId is required for track items
                          title={item?.name[lang]}
                          key={item._id}
                          onClick={handleCatClick(item, i + 1)}
                          selected={isCategorySelected(i + 1)}
                        />
                      ))}
                    </ScrollMenu>
                    <h6>Sub Categories:</h6>
                    <ScrollMenu>
                      {subCategories?.map((item, i) => (
                        <MenuItem
                          itemId={item._id} // NOTE: itemId is required for track items
                          title={item?.name[lang]}
                          key={item._id}
                          onClick={handleSubCatClick(item, i + 1)}
                          selected={isSubCategorySelected(i + 1)}
                        />
                      ))}
                    </ScrollMenu>
                  </>
                )}
              </div>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col">{t('ques')}</th>
                    {/* <th scope="col">{t('userType')}</th> */}
                    <th scope="col">{t('quesType')}</th>
                    {/* <th scope="col">{t('category')}</th>
                    <th scope="col">{t('subCategory')}</th> */}
                    <th scope="col">{t('featured')}</th>
                    <th scope="col">{t('options')}</th>
                    <th scope="col">{t('status')}</th>
                    <th scope="col">{t('actions')}</th>
                  </tr>
                </thead>
                <>
                  {!loading && questions?.length === 0 ? (
                    <tbody>
                      <tr>
                        <td rowSpan={6} colSpan={6}>
                          {' '}
                          {t('noDataFound')}
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <>
                      {console.log(questions, 'questions')}
                      <DragDropContext onDragEnd={onEnd}>
                        <Droppable droppableId={'questionList'}>
                          {(provided, snapshot) => (
                            <tbody
                              style={{width: '100%'}}
                              ref={provided.innerRef}>
                              {questions?.map((item, index) => (
                                <Draggable
                                  draggableId={item?._id}
                                  key={item?._id}
                                  index={index}>
                                  {(provided, snapshot) => (
                                    <tr
                                      className={`${
                                        snapshot.isDragging ? 'dragging' : ''
                                      }`}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      key={item?._id}>
                                      <td>
                                        {item?.question[lang]?.slice(0, 100)}{' '}
                                        ...
                                      </td>
                                      {/*  <td>
                            {finder(userTypes, item?.userType)?.name}{' '}
                            {finder(userTypes, item?.userType)?.enum}
                          </td>*/}
                                      <td>
                                        {
                                          finder(quesTypes, item?.questionType)
                                            ?.name
                                        }{' '}
                                        {
                                          finder(quesTypes, item?.questionType)
                                            ?.enum
                                        }
                                      </td>
                                      {/* <td>
                            {item?.categoryId?.name[lang]
                              ? item?.categoryId?.name[lang]
                              : 'N/A'}
                          </td>
                          <td>
                            {item?.subCategoryId?.name[lang]
                              ? item?.subCategoryId?.name[lang]
                              : 'N/A'}
                          </td>*/}

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
                                            dispatch(
                                              editQuestionStatus(item?._id),
                                            )
                                          }
                                          checked={item?.status === 1}
                                          name={item?.id}
                                        />{' '}
                                      </td>

                                      <td>
                                        {/* <img
                              alt={'Gulf Workers'}
                              className="td-action-img"
                              src={eyeIcon}
                              onClick={() =>
                                navigateTo(
                                  `/admin/questions/viewQuestion/${item._id}`,
                                )
                              }
                            /> */}
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
                                          onClick={() =>
                                            deleteHandler(item?._id)
                                          }
                                        />
                                      </td>
                                    </tr>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </tbody>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </>
                  )}
                </>
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
