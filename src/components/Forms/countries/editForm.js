import React, {useState, useEffect} from 'react';

// reactstrap components

// core components
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
import uploadIcon from '../../../assets/images/icons/form/upload-icon.png';
import {imageUploader, renderImage} from '../../../utils/imageUpload.js';
import {useDispatch, useSelector} from 'react-redux';
import {countriesConstants} from '../../../redux/constants';
import {getImageUrl} from '../../../utils/renderImage';
import {useParams} from 'react-router-dom';

import {
  editCountry,
  getSingleCountry,
} from '../../../redux/actions/countries.actions.js';
import {useTranslation} from 'react-i18next';

const DashboardForm = ({history}) => {
  //redux
  const dispatch = useDispatch();
  const {country, loading} = useSelector((state) => state.countriesReducer);

  //local state
  const [icon, setIcon] = useState(null);

  const [name, setName] = useState({
    en: '',
    hi: '',
    ar: '',
    ph: '',
  });

  const {id} = useParams();

  useEffect(() => {
    dispatch(getSingleCountry(id));

    // eslint-disable-next-line
  }, [dispatch, id]);

  useEffect(() => {
    if (!!country?.name) {
      setName(country?.name);
    }
    // eslint-disable-next-line
  }, [country?.name]);

  const onChangeHandler = (e) =>
    setName({...name, [e.target.name]: e.target.value});

  const inputFileHandler = (e) => setIcon(e.target?.files?.[0]);

  const validateForm = () => !!name;

  const editWithIcon = async () => {
    dispatch({type: countriesConstants.COUNTRY_LOADING});
    const formData = new FormData();
    formData.append('image', icon);

    const imageUrl = await imageUploader(formData);
    if (imageUrl) {
      dispatch(
        editCountry(
          {
            name,
            icon: imageUrl,

            countryId: id,
          },
          history,
        ),
      );
    } else {
      //pop an error alert
    }
  };
  const editWithoutIcon = async () =>
    dispatch(
      editCountry(
        {
          name,
          icon: country?.icon,

          countryId: id,
        },
        history,
      ),
    );

  const submitHandler = () => (icon ? editWithIcon() : editWithoutIcon());

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
              <h2 className="dashboard-form-header">{t('editCountry')}</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('name')} (English)</Label>
                        <Input
                          type="text"
                          placeholder="Enter name"
                          value={name?.en}
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
                          placeholder="Enter name"
                          value={name?.ar}
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
                          placeholder="Enter name"
                          value={name?.hi}
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
                          placeholder="Enter name"
                          value={name?.ph}
                          name={'ph'}
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
                      {icon ? (
                        <img
                          src={renderImage(icon)}
                          className="input-image"
                          alt={'gcc'}
                        />
                      ) : (
                        <img
                          alt={'Gulf wrokers'}
                          src={getImageUrl(country?.icon, 50, 50)}
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
                  {loading ? <Spinner color={'info'} /> : t('update')}
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
