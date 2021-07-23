import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  Modal,
  Button,
  FormGroup,
  Label,
  InputGroup,
  InputGroupButtonDropdown,
  Col,
  Input,
  Row,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import {listAdsByFilter} from '../../redux/actions/ads.actions';
import {listCategories} from '../../redux/actions/categories.actions';
import {getSubCategByCateg} from '../../utils/subCategory';
import {userTypes} from '../Forms/questions/data';

const AdsFilterModal = ({open, setModalOpen}) => {
  const {t} = useTranslation();
  // const {lang} = i18n.language;
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [subCategoryDropdownOpen, setSubCategoryDropdownOpen] = useState(false);
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const [userType, setUserType] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const dispatch = useDispatch();

  const {categories} = useSelector((state) => state.categoriesReducer);

  const populateSubCategories = async () => {
    const res = await getSubCategByCateg(selectedCategory?._id);
    setSubCategoriesList(res);
  };

  const userTypeChangeHandler = (item) => {
    setUserType(item);
    setUserDropdownOpen(!userDropdownOpen);
  };

  const categoryChangeHandler = (i) => {
    setSubCategoriesList([]);
    setSelectedSubCategory(null);
    setSelectedCategory(i);
    setCategoryDropdownOpen(!categoryDropdownOpen);
  };
  const subCategoryChangeHandler = (i) => {
    setSelectedSubCategory(i);
    setSubCategoryDropdownOpen(!subCategoryDropdownOpen);
  };

  const searchHandler = () => {
    dispatch(
      listAdsByFilter(
        15,
        1,
        userType?.enum,
        selectedCategory?._id,
        selectedSubCategory?._id,
      ),
    );
    setModalOpen();
  };

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory?._id) {
      populateSubCategories();
    }

    //eslint-disable-next-line
  }, [selectedCategory?._id]);

  const clearData = () => {
    setUserType({});
    setSelectedCategory({});
    setSubCategoriesList([]);
    setSelectedSubCategory({});
  };

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={open}
      toggle={() => setModalOpen()}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Filter Ads
        </h5>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={() => setModalOpen()}>
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <FormGroup>
              <Label for="examplePassword">{t('userType')} </Label>
              <InputGroup>
                <Input
                  style={{background: '#fff'}}
                  readOnly
                  placeholder={t('userType')}
                  value={userType?.name ? userType?.name : 'Select User Type'}
                />
                <InputGroupButtonDropdown
                  addonType="append"
                  isOpen={userDropdownOpen}
                  toggle={() => setUserDropdownOpen(!userDropdownOpen)}>
                  <DropdownToggle>
                    <p>{'>'}</p>
                  </DropdownToggle>
                  <DropdownMenu>
                    {userTypes?.map((item) => (
                      <DropdownItem onClick={() => userTypeChangeHandler(item)}>
                        {item?.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </InputGroupButtonDropdown>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col lg={12} md={12} sm={12}>
            <FormGroup>
              <Label for="examplePassword">{t('category')} </Label>
              <InputGroup>
                <Input
                  style={{background: '#fff'}}
                  readOnly
                  placeholder={'select category'}
                  value={
                    selectedCategory?.name?.en
                      ? selectedCategory?.name?.en
                      : 'Select Category'
                  }
                />
                <InputGroupButtonDropdown
                  addonType="append"
                  isOpen={categoryDropdownOpen}
                  toggle={() => setCategoryDropdownOpen(!categoryDropdownOpen)}>
                  <DropdownToggle>
                    <p>{'>'}</p>
                  </DropdownToggle>
                  <DropdownMenu>
                    {categories?.map((item) => (
                      <DropdownItem onClick={() => categoryChangeHandler(item)}>
                        {item?.name?.en}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </InputGroupButtonDropdown>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col lg={12} md={12} sm={12}>
            {selectedCategory?._id &&
              (subCategoriesList?.length === 0 ? (
                <p>{t('noDataFound')}</p>
              ) : (
                <FormGroup>
                  <Label for="examplePassword">{t('subCategory')}</Label>
                  <InputGroup>
                    <Input
                      style={{background: '#fff'}}
                      readOnly
                      placeholder={t('select') + t('subCategory')}
                      value={
                        selectedSubCategory?.name?.en
                          ? selectedSubCategory?.name?.en
                          : 'Select Sub Category'
                      }
                    />
                    <InputGroupButtonDropdown
                      addonType="append"
                      isOpen={subCategoryDropdownOpen}
                      toggle={() =>
                        setSubCategoryDropdownOpen(!subCategoryDropdownOpen)
                      }>
                      <DropdownToggle>
                        <p>{'>'}</p>
                      </DropdownToggle>
                      <DropdownMenu>
                        {subCategoriesList?.map((item) => (
                          <DropdownItem
                            onClick={() => subCategoryChangeHandler(item)}>
                            {item?.name?.en}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </InputGroupButtonDropdown>
                  </InputGroup>
                </FormGroup>
              ))}
          </Col>
          <Col sm={12}>
            <Button color="secondary" onClick={clearData} type="button">
              Clear
            </Button>
          </Col>
        </Row>
      </div>
      <div className="modal-footer">
        <Button
          color="secondary"
          data-dismiss="modal"
          type="button"
          onClick={() => setModalOpen()}>
          Close
        </Button>
        <Button
          color="primary"
          type="button"
          onClick={searchHandler}
          disabled={!userType}>
          Search
        </Button>
      </div>
    </Modal>
  );
};

export default AdsFilterModal;
