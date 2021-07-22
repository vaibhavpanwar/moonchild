import React, {useState, useEffect} from 'react';

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
import {useDispatch, useSelector} from 'react-redux';
import {listCategories} from '../../../redux/actions/categories.actions.js';
import uploadIcon from '../../../assets/images/icons/form/upload-icon.png';
import {imageUploader} from '../../../utils/imageUpload.js';
import {subCategoriesConstants} from '../../../redux/constants/sub-categories.constants.js';
import {addSubCategory} from '../../../redux/actions/sub-categories.actions.js';
import {useTranslation} from 'react-i18next';

const DashboardForm = ({history}) => {
  //redux
  const dispatch = useDispatch();
  const {categories} = useSelector((state) => state.categoriesReducer);
  const {loading} = useSelector((state) => state.subCategoriesReducer);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownOpen, setdropDowOpen] = useState(false);
  const [icon, setIcon] = useState(null);
  const [name, setName] = useState({
    en: '',
    hi: '',
    ar: '',
    ph: '',
  });

  const {en, hi, ar, ph} = name;

  const onChangeHandler = (e) =>
    setName({...name, [e.target.name]: e.target.value});

  const inputFileHandler = (e) => setIcon(e.target?.files?.[0]);

  const validateForm = () => icon && selectedCategory && name;

  const categoryChangeHandler = (i) => {
    setSelectedCategory(i);
    setdropDowOpen(!dropdownOpen);
  };

  const submitHandler = async () => {
    dispatch({type: subCategoriesConstants.SUB_CATEGORY_LOADING});
    const formData = new FormData();
    formData.append('image', icon);

    const imageUrl = await imageUploader(formData);
    if (imageUrl) {
      dispatch(
        addSubCategory(
          {
            name,
            icon: imageUrl,
            categoryId: selectedCategory._id,
          },
          history,
        ),
      );
    } else {
      // pop and error
    }
  };

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

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
              <h2 className="dashboard-form-header">{t('addSubCategory')}</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('name')} (English)</Label>
                        <Input
                          type="text"
                          placeholder={t('namePlaceHolder')}
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
                          placeholder={t('namePlaceHolder')}
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
                          placeholder={t('namePlaceHolder')}
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
                          placeholder={t('namePlaceHolder')}
                          value={ph}
                          name={'ph'}
                          onChange={onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">{t('category')} </Label>
                        <InputGroup>
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
                                  onClick={() => categoryChangeHandler(item)}>
                                  {item?.name?.en}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </InputGroupButtonDropdown>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">{t('icons')} </Label>
                        <InputGroup>
                          <label className="form-control chooseFile">
                            {' '}
                            <Input
                              type="file"
                              name="icon-upload"
                              accept="image/png, image/jpg, image/jpeg"
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
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className="dashboard-form-footer">
                <button
                  className="form-cancel-button"
                  onClick={() => history.push('/admin/sub-categories')}>
                  {t('cacel')}
                </button>
                <button
                  className="table-header-button"
                  onClick={submitHandler}
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
