import React, {useEffect} from 'react';

import Header from '../../Headers/Header.js';
import {
  Col,
  Row,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from 'reactstrap';

import {useDispatch, useSelector} from 'react-redux';

import {getSingleCountry} from '../../../redux/actions/countries.actions';

import {useParams} from 'react-router-dom';
import {getImageUrl} from '../../../utils/renderImage.js';
import {useTranslation} from 'react-i18next';

const DashboardForm = ({history}) => {
  const {id} = useParams();
  //redux
  const dispatch = useDispatch();
  const {loading, country} = useSelector((state) => state.countriesReducer);
  useEffect(() => {
    dispatch(getSingleCountry(id));
  }, [dispatch, id]);
  const {t} = useTranslation();

  return (
    <>
      <Header cardsVisible={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <div className="dashboard-form-container">
              <h2 className="dashboard-form-header">{t('viewCountry')}</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('name')} (English)</Label>
                        <Input
                          type="text"
                          placeholder={t('namePlaceholder')}
                          value={country?.name?.en}
                          readOnly
                          name={'en'}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('name')} (Arabic)</Label>
                        <Input
                          type="text"
                          placeholder={t('namePlaceholder')}
                          value={country?.name?.ar}
                          readOnly
                          name={'ar'}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('name')} (Hindi)</Label>
                        <Input
                          type="text"
                          placeholder={t('namePlaceholder')}
                          value={country?.name?.hi}
                          name={'hi'}
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">
                          {t('name')} (Philipins)
                        </Label>
                        <Input
                          type="text"
                          placeholder={t('namePlaceholder')}
                          value={country?.name?.fil}
                          name={'fil'}
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">{'icons'} </Label>
                      </FormGroup>
                      <br />

                      <img
                        alt={'Gulf wrokers'}
                        src={getImageUrl(country?.icon, 50, 50)}
                      />
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className="dashboard-form-footer">
                <button
                  className="form-cancel-button"
                  onClick={() => history.push('/admin/countries')}>
                  {loading ? <Spinner color={'info'} /> : t('cancel')}
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
