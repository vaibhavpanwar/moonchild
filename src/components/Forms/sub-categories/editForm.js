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
import {imageUploader} from '../../../utils/imageUpload.js';
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

const DashboardForm = ({history}) => {
  //redux
  const dispatch = useDispatch();
  const {subCategory, loading} = useSelector(
    (state) => state.subCategoriesReducer,
  );
  const {categories} = useSelector((state) => state.categoriesReducer);

  //local state
  const [icon, setIcon] = useState(null);
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownOpen, setdropDowOpen] = useState(false);

  const {id} = useParams();

  const getCategory = (id) => categories?.find((item) => item?._id === id);

  useEffect(() => {
    dispatch(listCategories());
    dispatch(getSingleSubCategory(id));
    if (!subCategory) {
      dispatch(getSingleSubCategory(id));
    } else {
      setName(subCategory?.name?.en);
      setSelectedCategory(getCategory(subCategory?.categoryId));
    }

    // eslint-disable-next-line
  }, [dispatch, id, subCategory?.name?.en]);

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
            name: {en: name, ar: 'string', hi: 'string', ph: 'string'},
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
          name: {en: name, ar: 'string', hi: 'string', ph: 'string'},
          icon: subCategory?.icon,
          categoryId: selectedCategory._id,
          subCategoryId: id,
        },
        history,
      ),
    );

  const submitHandler = () => (icon ? editWithIcon() : editWithoutIcon());

  return (
    <>
      <Header cardsVisible={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <div className="dashboard-form-container">
              <h2 className="dashboard-form-header">Edit Sub-Category</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name</Label>
                        <Input
                          type="text"
                          value={name}
                          name="name"
                          placeholder="Enter url"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">Icon </Label>
                        <InputGroup>
                          <label className="form-control chooseFile">
                            {' '}
                            <Input
                              type="file"
                              name="icon-upload"
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
                        src={getImageUrl(subCategory?.icon, 50, 50)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">Category </Label>
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
                  </Row>
                </Form>
              </div>
              <div className="dashboard-form-footer">
                <button
                  className="form-cancel-button"
                  onClick={() => history.push('/admin/sub-categories')}>
                  Cancel
                </button>
                <button
                  onClick={submitHandler}
                  className="table-header-button"
                  disabled={!validateForm() || loading}>
                  {loading ? <Spinner color={'info'} /> : 'Update'}
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
