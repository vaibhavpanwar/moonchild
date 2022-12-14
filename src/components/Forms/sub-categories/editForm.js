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
  DropdownMenu,
  DropdownItem,
  InputGroupButtonDropdown,
  DropdownToggle,
  Spinner,
} from 'reactstrap';
import uploadIcon from '../../../assets/images/icons/form/upload-icon.png';
import {imageUploader, renderImage} from '../../../utils/imageUpload.js';
import {useDispatch, useSelector} from 'react-redux';
import {
  categoriesConstants,
  subCategoriesConstants,
} from '../../../redux/constants';
import {getImageUrl} from '../../../utils/renderImage';
import {useParams} from 'react-router-dom';
import {
  editSubCategory,
  getSingleSubCategory,
} from '../../../redux/actions/sub-categories.actions.js';
import {listCategories} from '../../../redux/actions/categories.actions.js';
import {useTranslation} from 'react-i18next';
import cogoToast from 'cogo-toast';

const DashboardForm = ({history}) => {
  //redux
  const dispatch = useDispatch();
  const {subCategory, loading} = useSelector(
    (state) => state.subCategoriesReducer,
  );
  const {categories} = useSelector((state) => state.categoriesReducer);
  const [aspectRatio, setAspactRatio] = useState();
  //local state
  const [icon, setIcon] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownOpen, setdropDowOpen] = useState(false);
  const [name, setName] = useState({
    en: '',
    hi: '',
    ar: '',
    fil: '',
  });

  const {id} = useParams();

  const getCategory = (id) => categories?.find((item) => item?._id === id);

  useEffect(() => {
    dispatch(listCategories());
    dispatch(getSingleSubCategory(id));

    // eslint-disable-next-line
  }, [dispatch, id]);

  const {t} = useTranslation();
  useEffect(() => {
    if (!!subCategory?.name) {
      setName(subCategory?.name);
      setSelectedCategory(getCategory(subCategory?.categoryId));
    }
    // eslint-disable-next-line
  }, [subCategory?.name, subCategory?.categoryId]);

  const onChangeHandler = (e) =>
    setName({...name, [e.target.name]: e.target.value});

  const inputFileHandler = (e) => setIcon(e.target?.files?.[0]);

  const validateForm = () => !!name && selectedCategory;

  const categoryChangeHandler = (i) => {
    setSelectedCategory(i);
    setdropDowOpen(!dropdownOpen);
  };

  const editWithIcon = async () => {
    dispatch({type: subCategoriesConstants.SUB_CATEGORY_LOADING});
    const formData = new FormData();
    formData.append('image', icon);

    const imageUrl = await imageUploader(formData);
    if (imageUrl) {
      dispatch(
        editSubCategory(
          {
            name,
            icon: imageUrl,
            categoryId: selectedCategory._id,
            subCategoryId: id,
          },
          history,
        ),
      );
    } else {
      //pop an error alert
      dispatch({type: categoriesConstants.CATEGORY_ERROR});
    }
  };
  const editWithoutIcon = async () =>
    dispatch(
      editSubCategory(
        {
          name,
          icon: subCategory?.icon,
          categoryId: selectedCategory._id,
          subCategoryId: id,
        },
        history,
      ),
    );

  const submitHandler = () => {
    if (aspectRatio === 1) {
      icon ? editWithIcon() : editWithoutIcon();
    } else {
      cogoToast.error('Please chose image with same width and height');
    }
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
              <h2 className="dashboard-form-header">{t('editSubCategory')}</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('name')} (English)</Label>
                        <Input
                          type="text"
                          placeholder={t('namePlaceholder')}
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
                          placeholder={t('namePlaceholder')}
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
                          placeholder={t('namePlaceholder')}
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
                          placeholder={t('namePlaceholder')}
                          value={name?.fil}
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
                      {icon ? (
                        <img
                          src={renderImage(icon)}
                          className="input-image"
                          alt={'gcc'}
                        />
                      ) : (
                        <img
                          alt={'Gulf wrokers'}
                          src={getImageUrl(subCategory?.icon, 50, 50)}
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
                        <Label for="examplePassword">{t('category')}</Label>
                        <InputGroup
                          onClick={() => setdropDowOpen(!dropdownOpen)}>
                          <Input
                            style={{background: '#fff'}}
                            readOnly
                            placeholder={'select category'}
                            value={selectedCategory?.name?.en}
                          />
                          <InputGroupButtonDropdown
                            addonType="append"
                            isOpen={dropdownOpen}
                            toggle={() => setdropDowOpen(!dropdownOpen)}>
                            <DropdownToggle>
                              <p>{'>'}</p>
                            </DropdownToggle>
                            <DropdownMenu>
                              {categories?.map((item) => (
                                <DropdownItem
                                  key={item?._id}
                                  onClick={() => categoryChangeHandler(item)}>
                                  {item?.name?.en}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </InputGroupButtonDropdown>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className="dashboard-form-footer">
                <button
                  className="form-cancel-button"
                  onClick={() => history.push('/admin/sub-categories')}>
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
