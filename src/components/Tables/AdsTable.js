import React, {useState, useEffect} from 'react';

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
import eyeIcon from '../../assets/images/icons/table/table-eye-icon.svg';
import editIcon from '../../assets/images/icons/table/table-edit-icon.svg';
import deleteIcon from '../../assets/images/icons/table/table-delete-icon.svg';
import SwitchSlider from '../Switch/SwitchSlider.js';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import Pagination from '../Pagination/paginate';
import {useHistory} from 'react-router-dom';
import {deleteAd, editAdStatus, listAds} from '../../redux/actions/ads.actions';
import moment from 'moment';

const Tables = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
  const [searchKeyword, setSearchKeyword] = useState('');

  const {t} = useTranslation();
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
                    <th scope="col">{t('category')}</th>
                    <th scope="col">{t('subCategory')}</th>
                    <th scope="col">{t('status')}</th>
                    <th scope="col">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {ads?.map((item) => (
                    <tr key={item?._id}>
                      <td>{item?.userId?.name}</td>
                      <td>{moment(item?.createdAt).format('DD/MM/YYYY')}</td>

                      <td>{item?.categoryId?.name?.en}</td>
                      <td>{item?.subCategoryId?.name?.en}</td>

                      <td>
                        <SwitchSlider
                          clicked={() => activeInactiveAd(item?._id)}
                          checked={item?.status === 1}
                        />{' '}
                      </td>

                      <td>
                        <img
                          alt={'Gulf Workers'}
                          className="td-action-img"
                          src={eyeIcon}
                          onClick={() =>
                            navigateTo(`/admin/categories/viewAd/${item._id}`)
                          }
                        />
                        <img
                          alt={'Gulf Workers'}
                          className="td-action-img"
                          src={editIcon}
                          onClick={() =>
                            navigateTo(`/admin/categories/editAd/${item._id}`)
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
