import React, {useState} from 'react';

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
import uploadIcon from '../../../assets/images/icons/form/upload-icon.png';
import {imageUploader, renderImage} from '../../../utils/imageUpload.js';
import {useDispatch, useSelector} from 'react-redux';
import {bannersConstants} from '../../../redux/constants';
import {addBanner} from '../../../redux/actions/banners.actions.js';
import {useTranslation} from 'react-i18next';
import {AddType} from './data.js';
import PhoneInput from 'react-phone-input-2';
import cogoToast from 'cogo-toast';

const DashboardForm = ({history}) => {
  //redux
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.bannersReducer);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsAppCountryCode, setWhatSAppCountryCode] = useState('');
  const [whatsApp, setWhatsapp] = useState('');
  const [addType, setAddType] = useState(AddType[0]?.addType);
  const [addTypeId, setAddTypeId] = useState(AddType[0]?._id);
  const [aspectRatio, setAspactRatio] = useState();

  const [icon, setIcon] = useState(null);
  const [url, setUrl] = useState('');

  const inputFileHandler = (e) => setIcon(e.target?.files?.[0]);

  const validateForm = () => !!icon;
  const submitHandler = async () => {
    if (aspectRatio >= 4186 && aspectRatio <= 0.5116) {
      dispatch({type: bannersConstants.BANNER_LOADING});
      const formData = new FormData();
      formData.append('image', icon);

      const imageUrl = await imageUploader(formData);
      if (imageUrl) {
        dispatch(
          addBanner(
            {
              bannerType: addTypeId,
              callingCode: phone ? countryCode : '',
              link: url,
              icon: imageUrl,
              phoneNumber: phone,
              whatsappCallingCode: whatsApp ? whatsAppCountryCode : '',
              whatsappPhoneNumber: whatsApp,
            },
            history,
          ),
        );
      } else {
        // pop and error
      }
    } else {
      cogoToast.error(
        'Please chose image with aspect ratio between 4:9 to 5:9',
      );
    }
  };
  const {t} = useTranslation();
  const adsTypeChangeHandler = (item) => {
    setAddType(item.addType);
    console.log(item._id);
    setAddTypeId(item._id);
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
  const onLoad = ({target: {offsetHeight, offsetWidth}}) => {
    setAspactRatio(offsetHeight / offsetWidth);
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
              <h2 className="dashboard-form-header">{t('addBanner')}</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">{t('image')}</Label>
                        <InputGroup>
                          <label className="form-control chooseFile">
                            {' '}
                            <Input
                              type="file"
                              name="icon-upload"
                              accept="image/png, image/jpg, image/jpeg"
                              placeholder={t('uploadPlaceholder')}
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

                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('url')}</Label>
                        <Input
                          type="text"
                          name="url"
                          placeholder="Enter url"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">{t('adsType')} </Label>
                        <InputGroup
                          onClick={() =>
                            setUserDropdownOpen(!userDropdownOpen)
                          }>
                          <Input
                            style={{background: '#fff'}}
                            readOnly
                            placeholder={addType}
                            value={addType}
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
                                  key={i + 1}
                                  onClick={() => adsTypeChangeHandler(item)}>
                                  {item?.addType}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </InputGroupButtonDropdown>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    {console.log(addTypeId)}
                    {addTypeId === 2 && (
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
                              // value={countryCode}
                              onChange={(phone, countryData) =>
                                phoneInputHanlder(phone, countryData)
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                          <Label for="exampleEmail">{t('whatsApp')}</Label>
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
                            // value={countryCode}
                            onChange={(phone, countryData) =>
                              whatsAppInputHanlder(phone, countryData)
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
