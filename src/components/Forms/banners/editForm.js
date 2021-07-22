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
import {imageUploader} from '../../../utils/imageUpload.js';
import {useDispatch, useSelector} from 'react-redux';
import {bannersConstants} from '../../../redux/constants';
import {
  getSingleBanner,
  editBanner,
} from '../../../redux/actions/banners.actions.js';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const DashboardForm = ({history}) => {
  //redux
  const dispatch = useDispatch();

  //import loading and error as well
  const {banner, loading} = useSelector((state) => state.bannersReducer);

  const [icon, setIcon] = useState(null);
  const [url, setUrl] = useState('');

  const {id} = useParams();

  useEffect(() => {
    dispatch(getSingleBanner(id));
    if (!banner) {
      dispatch(getSingleBanner(id));
    } else {
      setUrl(banner?.link);
    }

    // eslint-disable-next-line
  }, [dispatch, id, banner?.link]);

  const inputFileHandler = (e) => setIcon(e.target?.files?.[0]);

  const validateForm = () => !!url;

  const editWithIcon = async () => {
    dispatch({type: bannersConstants.BANNER_LOADING});
    const formData = new FormData();
    formData.append('image', icon);

    const imageUrl = await imageUploader(formData);
    if (imageUrl) {
      dispatch(editBanner({link: url, icon: imageUrl, bannerId: id}, history));
    } else {
      //pop an error alert
      dispatch({type: bannersConstants.BANNER_ERROR});
    }
  };
  const editWithoutIcon = async () =>
    dispatch(
      editBanner({link: url, icon: banner?.icon, bannerId: id}, history),
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
                          </label>

                          <div className="upload-icon">
                            <img
                              alt={'upload'}
                              style={{maxWidth: '15px'}}
                              src={uploadIcon}
                            />
                          </div>
                        </InputGroup>
                      </FormGroup>
                      <br />

                      <img
                        alt={'Gulf wrokers'}
                        src={`https://api.gccworkers.app/common/v1/resizer/${banner?.icon}/80/80`}
                      />
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
