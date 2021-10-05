import React, {useState, useEffect} from 'react';

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Tooltip,
  Spinner,
} from 'reactstrap';
// core components
import Header from '../Headers/Header.js';
// import eyeIcon from '../../assets/images/icons/table/table-eye-icon.svg';
import editIcon from '../../assets/images/icons/table/table-edit-icon.svg';
import deleteIcon from '../../assets/images/icons/table/table-delete-icon.svg';
import SwitchSlider from '../Switch/SwitchSlider.js';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import Pagination from '../Pagination/paginate';
import {useHistory} from 'react-router-dom';
import {deleteAd, editAdStatus, listAds} from '../../redux/actions/ads.actions';
import moment from 'moment';
import {userTypes} from '../../utils/data';
import {finder} from '../../utils/dataHelpers';
import AdsFilterModal from '../Modals/AdsFilterModal.js';
import filterIcon from '../../assets/images/filter.png';
import {truncate} from '../../utils/truncate.js';

const Tables = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
  const [searchKeyword] = useState('');
  const [tooltipOpen, setTooltipOpen] = useState(false);

  //filter states
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const [userType, setUserType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const clearData = () => {
    setUserType({});
    setSelectedCategory({});
    setSubCategoriesList([]);
    setSelectedSubCategory({});
  };

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const [isOpen, setIsOpen] = useState(false);
  const setModalOpen = () => setIsOpen(!isOpen);

  const {t, i18n} = useTranslation();
  const lang = i18n.language;
  const dispatch = useDispatch();
  const {ads, loading, count} = useSelector((state) => state.adsReducer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const history = useHistory();
  const navigateTo = (route) => history.push(route);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteAd(id));
    } else return;
  };

  const activeInactiveAd = (id) => {
    dispatch(editAdStatus(id));
  };

  useEffect(() => {
    dispatch(listAds(postsPerPage, currentPage, searchKeyword));
  }, [dispatch, postsPerPage, currentPage, searchKeyword]);

  useEffect(() => {
    if (!userType?.enum) {
      dispatch(listAds(postsPerPage, currentPage, searchKeyword));
    }
  }, [userType?.enum, dispatch, postsPerPage, currentPage, searchKeyword]);

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
                  {/* <input
                    placeholder={t('search')}
                    className="table-header-input"
                    type={'text'}
                    value={searchKeyword}
                    onChange={(e) => {
                      setCurrentPage(1);
                      setSearchKeyword(e.target.value);
                    }}
                  /> */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                    }}>
                    <button
                      className="filter-button"
                      onClick={() => setModalOpen()}>
                      <img alt={'filter'} src={filterIcon} />
                      &nbsp; Filter
                    </button>

                    <div
                      className={`${!userType?.enum ? 'hidden-filter' : ''}`}>
                      <p
                        id="TooltipExample"
                        onClick={() => {
                          dispatch(
                            listAds(postsPerPage, currentPage, searchKeyword),
                          );
                          clearData();
                        }}
                        style={{
                          margin: 0,
                          padding: 0,
                          color: 'red',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                        }}>
                        X
                      </p>
                      <Tooltip
                        placement="top"
                        isOpen={tooltipOpen}
                        target="TooltipExample"
                        toggle={toggle}>
                        Clear Filters
                      </Tooltip>
                    </div>
                  </div>

                  <AdsFilterModal
                    customProps={{
                      open: isOpen,
                      setModalOpen,
                      subCategoriesList,
                      setSubCategoriesList,
                      userType,
                      setUserType,
                      selectedSubCategory,
                      setSelectedSubCategory,
                      selectedCategory,
                      setSelectedCategory,
                      clearData,
                    }}
                  />
                  {loading && (
                    <div className="table-loader">
                      <Spinner color={'info'} />
                    </div>
                  )}

                  <button
                    className="mb-0 table-header-button"
                    onClick={() => navigateTo('/admin/ads/addAd')}>
                    {t('add')}
                  </button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col">{t('name')}</th>
                    <th scope="col">{t('registrationDate')}</th>
                    <th scope="col">{t('userType')}</th>
                    <th scope="col">{t('category')}</th>
                    <th scope="col">{t('subCategory')}</th>
                    <th scope="col">{t('status')}</th>
                    <th scope="col">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && ads?.length === 0 ? (
                    <tr>
                      <td rowSpan={6} colSpan={6}>
                        {' '}
                        No data found
                      </td>
                    </tr>
                  ) : (
                    ads?.map((item) => (
                      <tr key={item?._id}>
                        <td>{truncate(item?.userId?.name)}</td>
                        <td>{moment(item?.createdAt).format('DD/MM/YYYY')}</td>
                        <td>{finder(userTypes, item?.userType)?.name}</td>
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
                            clicked={() => activeInactiveAd(item?._id)}
                            checked={item?.status === 1}
                          />{' '}
                        </td>

                        <td>
                          {/* <img
                            alt={'Gulf Workers'}
                            className="td-action-img"
                            src={eyeIcon}
                            onClick={() =>
                              navigateTo(`/admin/ads/viewAd/${item._id}`)
                            }
                          /> */}
                          <img
                            alt={'Gulf Workers'}
                            className="td-action-img"
                            src={editIcon}
                            onClick={() =>
                              navigateTo(`/admin/ads/editAd/${item._id}`)
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
                    ))
                  )}
                  <tr></tr>
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
