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
  suffleSubCategory,
} from '../../redux/actions/sub-categories.actions.js';
import {getImageUrl} from '../../utils/renderImage.js';
import {useHistory} from 'react-router-dom';
//import eyeIcon from '../../assets/images/icons/table/table-eye-icon.svg';
import Pagination from '../Pagination/paginate';
import {useTranslation} from 'react-i18next';

import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {subCategoriesConstants} from '../../redux/constants/sub-categories.constants.js';

const Tables = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
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

  const onEnd = (result) => {
    if (!result.destination) {
      return;
    }
    let sourceIdx = parseInt(result.source.index);
    let destIdx = parseInt(result.destination.index);
    if (sourceIdx === destIdx) return;
    else {
      let clone = subCategories;
      let draggedLink = clone[sourceIdx];
      let newList = clone.slice();
      newList.splice(sourceIdx, 1);
      newList.splice(destIdx, 0, draggedLink);

      dispatch({
        type: subCategoriesConstants.SUB_CATEGORY_SUFFLE,
        payload: newList,
      });
      dispatch(
        suffleSubCategory({
          from: clone[sourceIdx]._id,
          to: clone[destIdx]._id,
        }),
      );
    }
  };

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
                      navigateTo('/admin/sub-categories/addSubCategory')
                    }>
                    {t('add')}
                  </button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col"> {t('category')} </th>
                    <th scope="col"> {t('subCategories')} </th>
                    <th scope="col">{t('icons')}</th>
                    <th scope="col">{t('status')}</th>

                    <th scope="col">{t('actions')}</th>
                  </tr>
                </thead>
                <>
                  {!loading && subCategories?.length === 0 ? (
                    <tbody>
                      {' '}
                      <tr>
                        <td rowSpan={6} colSpan={6}>
                          {' '}
                          No data found
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <DragDropContext onDragEnd={onEnd}>
                      <Droppable droppableId={'countriesList'}>
                        {(provided, snapshot) => (
                          <tbody
                            style={{width: '100%'}}
                            ref={provided.innerRef}>
                            {subCategories?.map((item, index) => (
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
                                    {...provided.dragHandleProps}>
                                    <td>{item.categoryId?.name[lang]}</td>
                                    <td>{item?.name[lang]}</td>
                                    <td>
                                      <img
                                        alt={'Gulf Workers'}
                                        className=".table-sub-category-icon"
                                        src={getImageUrl(item?.icon, 50, 50)}
                                      />
                                    </td>

                                    <td>
                                      <SwitchSlider
                                        clicked={() =>
                                          activeInactiveCategory(item?._id)
                                        }
                                        checked={item?.status === 1}
                                      />{' '}
                                    </td>

                                    <td>
                                      {/* <img
                                        alt={'Gulf Workers'}
                                        className="td-action-img"
                                        src={eyeIcon}
                                        onClick={() =>
                                          navigateTo(
                                            `/admin/sub-categories/viewSubCategory/${item._id}`,
                                          )
                                        }
                                      /> */}
                                      <img
                                        alt={'Gulf Workers'}
                                        className="td-action-img"
                                        src={editIcon}
                                        onClick={() =>
                                          navigateTo(
                                            `/admin/sub-categories/editSubCategory/${item._id}`,
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
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </tbody>
                        )}
                      </Droppable>
                    </DragDropContext>
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
