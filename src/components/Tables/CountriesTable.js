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
  deleteCountry,
  editCountryStatus,
  listCountries,
} from '../../redux/actions/countries.actions';
import {getImageUrl} from '../../utils/renderImage.js';
import {useHistory} from 'react-router-dom';
import eyeIcon from '../../assets/images/icons/table/table-eye-icon.svg';
import Pagination from '../Pagination/paginate';
import {useTranslation} from 'react-i18next';

const Tables = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
  const [searchKeyword, setSearchKeyword] = useState('');
  //redux
  const {countries, loading, count} = useSelector(
    (state) => state.countriesReducer,
  );
  const dispatch = useDispatch();

  const history = useHistory();

  const navigateTo = (route) => history.push(route);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteCountry(id));
    } else return;
  };

  const activeInactiveCountry = (id) => {
    dispatch(editCountryStatus(id));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(listCountries(postsPerPage, currentPage, searchKeyword));

    // eslint-disable-next-line
  }, [dispatch, currentPage, postsPerPage, searchKeyword]);

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
                    onClick={() => navigateTo('/admin/countries/add')}>
                    {t('add')}
                  </button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col"> {t('name')} </th>
                    <th scope="col">{t('icons')}</th>
                    <th scope="col">{t('status')}</th>

                    <th scope="col">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && countries?.length === 0 ? (
                    <tr>
                      <td rowSpan={6} colSpan={6}>
                        {' '}
                        No data found
                      </td>
                    </tr>
                  ) : (
                    <>
                      {countries?.map((item) => (
                        <tr key={item?._id}>
                          <td>{item?.name?.en}</td>
                          <td>
                            <img
                              alt={'Gulf Workers'}
                              className=".table-sub-category-icon"
                              src={getImageUrl(item?.icon, 50, 50)}
                            />
                          </td>

                          <td>
                            <SwitchSlider
                              clicked={() => activeInactiveCountry(item?._id)}
                              checked={item?.status === 1}
                            />{' '}
                          </td>

                          <td>
                            <img
                              alt={'Gulf Workers'}
                              className="td-action-img"
                              src={eyeIcon}
                              onClick={() =>
                                navigateTo(`/admin/countries/view/${item._id}`)
                              }
                            />
                            <img
                              alt={'Gulf Workers'}
                              className="td-action-img"
                              src={editIcon}
                              onClick={() =>
                                navigateTo(`/admin/countries/edit/${item._id}`)
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