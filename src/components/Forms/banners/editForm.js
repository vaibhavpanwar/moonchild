import React, {useState, useEffect} from 'react';

// reactstrap components

// core components
import Header from '../../Headers/Header.js';
import {
  Col,
  Row,
  Container,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupButtonDropdown,
  Spinner,
} from 'reactstrap';
import PhoneInput from 'react-phone-input-2';

import uploadIcon from '../../../assets/images/icons/form/upload-icon.png';
import {imageUploader, renderImage} from '../../../utils/imageUpload.js';
import {useDispatch, useSelector} from 'react-redux';
import {bannersConstants} from '../../../redux/constants';
import {
  getSingleBanner,
  editBanner,
} from '../../../redux/actions/banners.actions.js';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {getImageUrl} from '../../../utils/renderImage.js';
import {finder} from '../../../utils/dataHelpers.js';
import {AddType} from './data.js';

const DashboardForm = ({history}) => {
  //redux
  const dispatch = useDispatch();

  //import loading and error as well
  const {banner, loading} = useSelector((state) => state.bannersReducer);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const [icon, setIcon] = useState(null);
  const [url, setUrl] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsAppCountryCode, setWhatSAppCountryCode] = useState('');
  const [whatsApp, setWhatsapp] = useState('');
  const [addType, setAddType] = useState([]);

  const {id} = useParams();

  useEffect(() => {
    dispatch(getSingleBanner(id));
    if (!banner) {
      dispatch(getSingleBanner(id));
    } else {
      setUrl(banner?.link);
      setPhone(banner?.phoneNumber);
      setCountryCode(banner?.callingCode);
      setWhatSAppCountryCode(banner?.whatsappCallingCode);
      setWhatsapp(banner?.whatsappPhoneNumber);
      setAddType(finder(AddType, banner?.bannerType));
    }

    // eslint-disable-next-line
  }, [dispatch, id, banner?.link]);

  const inputFileHandler = (e) => setIcon(e.target?.files?.[0]);

  const editWithIcon = async () => {
    dispatch({type: bannersConstants.BANNER_LOADING});
    const formData = new FormData();
    formData.append('image', icon);

    const imageUrl = await imageUploader(formData);
    if (imageUrl) {
      dispatch(
        editBanner(
          {
            bannerType: addType?.enum,
            bannerId: id,
            callingCode: countryCode,

            icon: imageUrl,
            link: url,

            phoneNumber: phone,
            whatsappCallingCode: whatsAppCountryCode,
            whatsappPhoneNumber: whatsApp,
          },
          history,
        ),
      );
    } else {
      //pop an error alert
      dispatch({type: bannersConstants.BANNER_ERROR});
    }
  };
  const editWithoutIcon = async () =>
    dispatch(
      editBanner(
        {
          bannerType: addType?.enum,
          bannerId: id,
          callingCode: countryCode,

          icon: banner?.icon,
          link: url,

          phoneNumber: phone,
          whatsappCallingCode: whatsAppCountryCode,
          whatsappPhoneNumber: whatsApp,
        },
        history,
      ),
    );

  const submitHandler = () => (icon ? editWithIcon() : editWithoutIcon());

  const {t} = useTranslation();
  const adsTypeChangeHandler = (item) => {
    setAddType(item);
    setUserDropdownOpen(!userDropdownOpen);
  };
  const phoneInputHanlder = (number, data) => {
    setCountryCode('+' + data?.dialCode);
    setPhone(number.slice(data.dialCode.length));
  };
  const whatsAppInputHanlder = (number, data) => {
    setWhatSAppCountryCode('+' + data?.dialCode);
    setWhatsapp(number.slice(data.dialCode.length));
  };

  return (
    <>
      <Header cardsVisible={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <div className="dashboard-form-container">
              <h2 className="dashboard-form-header">{t('editBanner')}</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">{t('image')} </Label>
                        <InputGroup>
                          <label className="form-control chooseFile">
                            {' '}
                            <Input
                              type="file"
                              accept="image/png, image/jpg, image/jpeg"
                              name={t('uploadPlaceholder')}
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
                          src={getImageUrl(banner?.icon, 80, 80)}
                        />
                      )}
                    </Col>

                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('url')}</Label>
                        <Input
                          type="text"
                          value={url}
                          name="url"
                          placeholder="Enter url"
                          onChange={(e) => setUrl(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label
                          style={{marginTop: '25px'}}
                          for="examplePassword">
                          {t('adsType')}{' '}
                        </Label>
                        <InputGroup>
                          <Input
                            style={{background: '#fff'}}
                            readOnly
                            placeholder={addType?.addType}
                            value={addType?.addType}
                          />
                          <InputGroupButtonDropdown
                            addonType="append"
                            isOpen={userDropdownOpen}
                            toggle={() =>
                              setUserDropdownOpen(!userDropdownOpen)
                            }>
                            <DropdownToggle>
                              <p>{'>'}</p>
                            </DropdownToggle>
                            <DropdownMenu>
                              {AddType?.map((item, i) => (
                                <DropdownItem
                                  key={i}
                                  onClick={() => adsTypeChangeHandler(item)}>
                                  {item?.addType}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </InputGroupButtonDropdown>
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    {addType?._id === 2 && (
                      <>
                        <Col lg={4} md={6} sm={12}>
                          <FormGroup>
                            <Label for="exampleEmail">{t('Phone')}</Label>
                            <PhoneInput
                              country={'kw'}
                              containerStyle={{
                                border: '1px solid #707070',
                              }}
                              searchStyle={{
                                width: '100%',
                              }}
                              inputStyle={{
                                width: '100%',
                              }}
                              value={countryCode + phone}
                              onChange={(phone, countryData) =>
                                whatsAppInputHanlder(phone, countryData)
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                          <Label for="exampleEmail">{t('whatsApp')} </Label>
                          <PhoneInput
                            country={'kw'}
                            containerStyle={{
                              border: '1px solid #707070',
                            }}
                            searchStyle={{
                              width: '100%',
                            }}
                            inputStyle={{
                              width: '100%',
                            }}
                            value={whatsAppCountryCode + whatsApp}
                            onChange={(phone, countryData) =>
                              phoneInputHanlder(phone, countryData)
                            }
                          />
                        </Col>
                      </>
                    )}
                  </Row>
                </Form>
              </div>
              <div className="dashboard-form-footer">
                <button
                  className="form-cancel-button"
                  onClick={() => history.push('/admin/banners')}>
                  {t('cancel')}
                </button>
                <button
                  onClick={submitHandler}
                  className="table-header-button"
                  disabled={loading}>
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
