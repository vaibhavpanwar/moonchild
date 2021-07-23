import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router';

import Header from '../../Headers/Header.js';
import {Col, Row, Container, Form, Label} from 'reactstrap';
import {finder} from '../../../utils/dataHelpers';
import {userTypes} from '../questions/data';
import {getImageUrl} from '../../../utils/renderImage';
import {getSingleAd} from '../../../redux/actions/ads.actions';
import {useTranslation} from 'react-i18next';

const DashboardForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {ad, loading} = useSelector((state) => state.adsReducer);
  const {id} = useParams();
  useEffect(() => {
    dispatch(getSingleAd(id));
  }, [dispatch, id]);

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
            <div className="dashboard-form-container">
              <h2 className="dashboard-form-header">{t('viewAd')}</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <Label for="exampleEmail">{t('user')}</Label>
                      <br />
                      <p>{ad?.userId?.name ? ad?.userId?.name : 'N/A'}</p>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <Label for="exampleEmail">{t('category')}</Label>
                      <br />
                      <p>
                        {ad?.categoryId?.name[lang]
                          ? ad?.categoryId?.name[lang]
                          : 'N/A'}
                      </p>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <Label for="exampleEmail">{t('subCategory')}</Label>
                      <br />
                      <p>
                        {ad?.subCategoryId?.name[lang]
                          ? ad?.subCategoryId?.name[lang]
                          : 'N/A'}
                      </p>
                    </Col>
                  </Row>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <Label for="exampleEmail">{t('userType')}</Label>
                      <br />
                      <p>{finder(userTypes, ad?.userType)?.name}</p>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <Label for="exampleEmail">{t('icons')}</Label>
                      <br />
                      {ad?.icon ? (
                        <img
                          alt={'Gulf wrokers'}
                          src={getImageUrl(ad?.icon, 150, 150)}
                        />
                      ) : (
                        <p>{t('noIcon')}</p>
                      )}
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <Label for="exampleEmail">{t('country')}</Label>
                      <br />
                      <p>
                        {ad?.countryId?.name[lang]
                          ? ad?.countryId?.name[lang]
                          : 'N/A'}
                      </p>
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <hr />
                  <br />
                  <h4> {t('additionalQuestions')}</h4>
                  <Row>
                    {ad?.additionalQuestion?.map((item) =>
                      item?.questionId?.questionType === 1 ? (
                        <Col lg={4} md={6} sm={12}>
                          <label>{item?.questionId?.question[lang]}</label>
                          <br />
                          <p>{item?.text}</p>
                        </Col>
                      ) : (
                        <Col lg={4} md={6} sm={12}>
                          <label>{item?.questionId?.question[lang]}</label>
                          {item?.optionId?.map((e) => (
                            <p>{e?.name[lang]}</p>
                          ))}
                        </Col>
                      ),
                    )}
                  </Row>
                </Form>
              </div>
              <div className="dashboard-form-footer">
                <button
                  className="form-cancel-button"
                  onClick={() => history.push('/admin/ads')}>
                  {loading ? 'Loading..' : t('cancel')}
                </button>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default DashboardForm;
