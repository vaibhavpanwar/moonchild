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

import {useDispatch, useSelector} from 'react-redux';
import {
  deleteBanner,
  editBannerStatus,
  listBanners,
} from '../../redux/actions/banners.actions.js';
import {getImageUrl} from '../../utils/renderImage.js';
import Pagination from '../Pagination/paginate';
import {useTranslation} from 'react-i18next';

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
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                  {loading && (
                    <div className="table-loader">
                      <Spinner color={'info'} />
                    </div>
                  )}

                  <button
                    className="mb-0 table-header-button"
                    onClick={() => navigateTo('/admin/banners/add')}>
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
                <tbody>
                  {banners?.map((item) => (
                    <tr key={item?._id}>
                      <td>
                        <img
                          alt={'Gulf workers'}
                          className="table-banner-image"
                          src={getImageUrl(item?.icon)}
                        />
                      </td>
                      <td>
                        <a
                          className="table-banner-link"
                          href={item?.link}
                          target="_blank"
                          rel={'noreferrer'}>
                          {item?.link}
                        </a>
                      </td>

                      <td>
                        <SwitchSlider
                          clicked={() => activeInactiveBanner(item?._id)}
                          checked={item?.status === 2}
                          name={item?.id}
                        />{' '}
                      </td>

                      <td>
                        <img
                          alt={'Gulf workers'}
                          className="td-action-img"
                          src={editIcon}
                          onClick={() =>
                            navigateTo(`/admin/banners/edit/${item._id}`)
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
                  ))}
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
