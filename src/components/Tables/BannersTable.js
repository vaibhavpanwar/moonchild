import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router';

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
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteBanner,
  editBannerStatus,
  listBanners,
  suffleBanner,
} from '../../redux/actions/banners.actions.js';
import {getImageUrl} from '../../utils/renderImage.js';
import Pagination from '../Pagination/paginate';
import {useTranslation} from 'react-i18next';
import {bannersConstants} from '../../redux/constants/banners.constants.js';

const Tables = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
  const [searchKeyword, setSearchKeyword] = useState('');

  const dispatch = useDispatch();
  //import loading and errors as well
  const {banners, loading, count} = useSelector(
    (state) => state.bannersReducer,
  );

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
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(listBanners(postsPerPage, currentPage, searchKeyword));

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
      let clone = banners;
      let draggedLink = clone[sourceIdx];
      let newList = clone.slice();
      newList.splice(sourceIdx, 1);
      newList.splice(destIdx, 0, draggedLink);

      dispatch({
        type: bannersConstants.BANNER_SUFFLE,
        payload: newList,
      });
      dispatch(
        suffleBanner({
          from: clone[sourceIdx]._id,
          to: clone[destIdx]._id,
        }),
      );
    }
  };

  //i18n
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
                    onClick={() => navigateTo('/admin/banners/addBanner')}>
                    {t('add')}
                  </button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col">{t('image')}</th>
                    <th scope="col">{t('url')}</th>
                    <th scope="col">{t('status')}</th>

                    <th scope="col">{t('actions')}</th>
                  </tr>
                </thead>
                <>
                  {!loading && banners?.length === 0 ? (
                    <tbody>
                      {' '}
                      <tr>
                        <td rowSpan={6} colSpan={6}>
                          {' '}
                          {t('noDataFound')}
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
                            {banners?.map((item, index) => (
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
                                    <td>
                                      {item?.icon ? (
                                        <img
                                          alt={'Gulf workers'}
                                          className="table-banner-image"
                                          src={getImageUrl(item?.icon)}
                                        />
                                      ) : (
                                        <p>N/A</p>
                                      )}
                                    </td>
                                    <td>
                                      {item?.link ? (
                                        <a
                                          className="table-banner-link"
                                          href={item?.link}
                                          target="_blank"
                                          rel={'noreferrer'}>
                                          {item?.link}
                                        </a>
                                      ) : (
                                        <p>N/A</p>
                                      )}
                                    </td>

                                    <td>
                                      <SwitchSlider
                                        clicked={() =>
                                          activeInactiveBanner(item?._id)
                                        }
                                        checked={item?.status === 1}
                                        name={item?.id}
                                      />{' '}
                                    </td>

                                    <td>
                                      <img
                                        alt={'Gulf workers'}
                                        className="td-action-img"
                                        src={editIcon}
                                        onClick={() =>
                                          navigateTo(
                                            `/admin/banners/editBanner/${item._id}`,
                                          )
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
