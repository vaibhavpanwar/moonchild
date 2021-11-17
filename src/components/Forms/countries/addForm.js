import React, {useState} from 'react';

import Header from '../../Headers/Header.js';
import {
  Col,
  Row,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  Spinner,
} from 'reactstrap';

import {useDispatch, useSelector} from 'react-redux';
import uploadIcon from '../../../assets/images/icons/form/upload-icon.png';
import {addCountry} from '../../../redux/actions/countries.actions';
import cogoToast from 'cogo-toast';
import {countriesConstants} from '../../../redux/constants/countries.constants.js';
import {imageUploader, renderImage} from '../../../utils/imageUpload.js';
import {useTranslation} from 'react-i18next';

const DashboardForm = ({history}) => {
  //redux
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.countriesReducer);
  const [icon, setIcon] = useState(null);
  const [name, setName] = useState({
    en: '',
    hi: '',
    ar: '',
    fil: '',
  });
  const [aspectRatio, setAspactRatio] = useState();
  const {en, hi, ar, fil} = name;

  const inputFileHandler = (e) => setIcon(e.target?.files?.[0]);
  const onChangeHandler = (e) =>
    setName({...name, [e.target.name]: e.target.value});

  const validateForm = () => !!name;

  const submitHandler = async () => {
    if (aspectRatio === 1) {
      dispatch({type: countriesConstants.COUNTRY_LOADING});
      const formData = new FormData();
      formData.append('image', icon);

      const imageUrl = await imageUploader(formData);
      if (imageUrl) {
        dispatch(
          addCountry(
            {
              name,
              icon: imageUrl,
            },
            history,
          ),
        );
      } else {
        cogoToast.error('Something went wrong', {
          hideAfter: 3,
          position: 'top-right',
        });
      }
    } else {
      cogoToast.error('Please chose image with same width and height');
    }
  };

  const onLoad = ({target: {offsetHeight, offsetWidth}}) => {
    setAspactRatio(offsetHeight / offsetWidth);
  };
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
              <h2 className="dashboard-form-header">{t('addCountry')}</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('name')} (English)</Label>
                        <Input
                          type="text"
                          placeholder={t('namePlaceholder')}
                          value={en}
                          name={'en'}
                          onChange={onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('name')} (Arabic)</Label>
                        <Input
                          type="text"
                          placeholder={t('namePlaceholder')}
                          value={ar}
                          name={'ar'}
                          onChange={onChangeHandler}
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
                          value={hi}
                          name={'hi'}
                          onChange={onChangeHandler}
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
                          value={fil}
                          name={'fil'}
                          onChange={onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">{t('icons')} </Label>
                        <InputGroup>
                          <label className="form-control chooseFile">
                            {' '}
                            <Input
                              type="file"
                              accept="image/png, image/jpg, image/jpeg"
                              name="icon-upload"
                              placeholder="Ppload file"
                              onChange={inputFileHandler}>
                              {' '}
                            </Input>
                            {icon && (
                              <p className="file-input-name">{icon?.name}</p>
                            )}
                            <div className="upload-icon">
                              <img
                                alt={'upload'}
                                style={{maxWidth: '15px'}}
                                src={uploadIcon}
                              />
                            </div>
                          </label>
                        </InputGroup>
                      </FormGroup>
                      <br />
                      {icon && (
                        <img
                          src={renderImage(icon)}
                          className="input-image"
                          alt={'gcc'}
                        />
                      )}
                      {icon && (
                        <img
                          className="aspect-ratio-image"
                          src={renderImage(icon)}
                          onLoad={onLoad}
                          alt={'gcc'}
                        />
                      )}
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className="dashboard-form-footer">
                <button
                  className="form-cancel-button"
                  onClick={() => history.push('/admin/countries')}>
                  {t('cancel')}
                </button>
                <button
                  onClick={submitHandler}
                  className="table-header-button"
                  disabled={!validateForm() || loading}>
                  {loading ? <Spinner color={'info'} /> : t('add')}
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
