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

import {quesTypes, userTypes} from './data.js';
import {getSubCategByCateg} from '../../../utils/subCategory.js';

import {addQuestion} from '../../../redux/actions/questions.actions.js';

const DashboardForm = ({history}) => {
  //redux
  const dispatch = useDispatch();
  const {categories} = useSelector((state) => state.categoriesReducer);
  const {loading} = useSelector((state) => state.questionsReducer);

  const [userType, setUserType] = useState(null);
  const [quesType, setQuesType] = useState(null);
  const [quesDropdownOpen, setQuesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [subCategoryDropdownOpen, setSubCategoryDropdownOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subCategoriesList, setSubCategoriesList] = useState([]);

  const [question, setQuestion] = useState({
    en: '',
    hi: '',
    ar: '',
    ph: '',
  });
  const [options, setOptions] = useState([
    {
      name: {en: '', hi: '', ar: '', ph: ''},
    },
  ]);

  const {en, hi, ar, ph} = question;

  const validateForm = () =>
    selectedCategory &&
    question?.en &&
    question?.hi &&
    question?.ar &&
    question?.ph &&
    options &&
    selectedSubCategory &&
    userType &&
    quesType;

  //dynamic options field

  // handle input change
  const handleOptionsChange = (e, index) => {
    const {name: nameTag, value} = e.target;
    const list = [...options];
    list[index].name[nameTag] = value;
    setOptions(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...options];
    list.splice(index, 1);
    setOptions(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setOptions([
      ...options,
      {
        name: {en: '', hi: '', ar: '', ph: ''},
      },
    ]);
  };

  const quesTypeChangeHandler = (item) => {
    setQuesType(item);
    setQuesDropdownOpen(!quesDropdownOpen);
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

  const onChangeHandler = (e) =>
    setQuestion({...question, [e.target.name]: e.target.value});

  const submitHandler = async () => {
    const formData = {
      userType: userType?.enum,
      questionType: quesType?.enum,
      question,
      options,
      categoryId: selectedCategory?._id,
      subCategoryId: selectedSubCategory?._id,
    };
    dispatch(addQuestion(formData, history));

    // dispatch({type: subCategoriesConstants.SUB_CATEGORY_LOADING});
    // const formData = new FormData();
    // formData.append('image', icon);

    // const imageUrl = await imageUploader(formData);
    // if (imageUrl) {
    //   dispatch(
    //     addSubCategory(
    //       {
    //         question,
    //         icon: imageUrl,
    //         categoryId: selectedCategory._id,
    //       },
    //       history,
    //     ),
    //   );
    // } else {
    //   // pop and error
    // }
  };

  const populateSubCategories = async () => {
    const res = await getSubCategByCateg(selectedCategory?._id);
    setSubCategoriesList(res);
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

  useEffect(() => {
    if (quesType?.enum === 1) {
      setOptions([
        {
          name: {en: '', hi: '', ar: '', ph: ''},
        },
      ]);
    } else {
      setOptions([
        {
          name: {en: '', hi: '', ar: '', ph: ''},
        },
        {
          name: {en: '', hi: '', ar: '', ph: ''},
        },
      ]);
    }
  }, [quesType?.enum]);

  return (
    <>
      <Header cardsVisible={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <div className="dashboard-form-container">
              <h2 className="dashboard-form-header">Add Question</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">Question Type </Label>
                        <InputGroup>
                          <Input
                            style={{background: '#fff'}}
                            readOnly
                            placeholder={'select question type'}
                            value={quesType?.name}
                          />
                          <InputGroupButtonDropdown
                            addonType="append"
                            isOpen={quesDropdownOpen}
                            toggle={() =>
                              setQuesDropdownOpen(!quesDropdownOpen)
                            }>
                            <DropdownToggle>
                              <p>{'>'}</p>
                            </DropdownToggle>
                            <DropdownMenu>
                              {quesTypes?.map((item) => (
                                <DropdownItem
                                  onClick={() => quesTypeChangeHandler(item)}>
                                  {item?.name}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </InputGroupButtonDropdown>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">User Type </Label>
                        <InputGroup>
                          <Input
                            style={{background: '#fff'}}
                            readOnly
                            placeholder={'Select User Type'}
                            value={userType?.name}
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
                              {userTypes?.map((item) => (
                                <DropdownItem
                                  onClick={() => userTypeChangeHandler(item)}>
                                  {item?.name}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </InputGroupButtonDropdown>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
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
                            isOpen={categoryDropdownOpen}
                            toggle={() =>
                              setCategoryDropdownOpen(!categoryDropdownOpen)
                            }>
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
                      {selectedCategory?._id &&
                        (subCategoriesList?.length === 0 ? (
                          <p>No sub categories found</p>
                        ) : (
                          <FormGroup>
                            <Label for="examplePassword">Sub Category </Label>
                            <InputGroup>
                              <Input
                                style={{background: '#fff'}}
                                readOnly
                                placeholder={'select sub category'}
                                value={selectedSubCategory?.name?.en}
                              />
                              <InputGroupButtonDropdown
                                addonType="append"
                                isOpen={subCategoryDropdownOpen}
                                toggle={() =>
                                  setSubCategoryDropdownOpen(
                                    !subCategoryDropdownOpen,
                                  )
                                }>
                                <DropdownToggle>
                                  <p>{'>'}</p>
                                </DropdownToggle>
                                <DropdownMenu>
                                  {subCategoriesList?.map((item) => (
                                    <DropdownItem
                                      onClick={() =>
                                        subCategoryChangeHandler(item)
                                      }>
                                      {item?.name?.en}
                                    </DropdownItem>
                                  ))}
                                </DropdownMenu>
                              </InputGroupButtonDropdown>
                            </InputGroup>
                          </FormGroup>
                        ))}
                      {/* <FormGroup>
                        <Label for="examplePassword">Upload Icon </Label>
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
                      </FormGroup> */}
                    </Col>
                  </Row>
                  <hr />
                  <Row form>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Question (English)</Label>
                        <Input
                          type="text"
                          placeholder="Enter question"
                          value={en}
                          name={'en'}
                          onChange={onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Question (Arabic)</Label>
                        <Input
                          type="text"
                          placeholder="Enter question"
                          value={ar}
                          name={'ar'}
                          onChange={onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Question (Hindi)</Label>
                        <Input
                          type="text"
                          placeholder="Enter question"
                          value={hi}
                          name={'hi'}
                          onChange={onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Question (Philipins)</Label>
                        <Input
                          type="text"
                          placeholder="Enter question"
                          value={ph}
                          name={'ph'}
                          onChange={onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {quesType &&
                    options?.length > 1 &&
                    options.map((item, i) => {
                      return (
                        <>
                          <Row form>
                            <Col lg={3} md={6} sm={12}>
                              {' '}
                              <FormGroup>
                                <Label for="exampleEmail">
                                  Option{i + 1} (English)
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Enter option"
                                  value={item?.name?.en}
                                  name={'en'}
                                  onChange={(e) => handleOptionsChange(e, i)}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                              {' '}
                              <FormGroup>
                                <Label for="exampleEmail">Option (Hindi)</Label>
                                <Input
                                  type="text"
                                  placeholder="Enter option"
                                  value={item?.name?.hi}
                                  name={'hi'}
                                  onChange={(e) => handleOptionsChange(e, i)}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                              {' '}
                              <FormGroup>
                                <Label for="exampleEmail">
                                  Option{i + 1} (Philipins)
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Enter option"
                                  value={item?.name?.ph}
                                  name={'ph'}
                                  onChange={(e) => handleOptionsChange(e, i)}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                              {' '}
                              <FormGroup>
                                <Label for="exampleEmail">
                                  Option{i + 1} (Arabic)
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Enter option"
                                  value={item?.name?.ar}
                                  name={'ar'}
                                  onChange={(e) => handleOptionsChange(e, i)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          {quesType?.enum !== 4 && (
                            <>
                              {' '}
                              {options.length !== 2 && (
                                <button
                                  className="btn remove-button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleRemoveClick(i);
                                  }}>
                                  X
                                </button>
                              )}
                              {options.length - 1 === i && (
                                <button
                                  className="  btn
                                add-button"
                                  onClick={handleAddClick}>
                                  Add
                                </button>
                              )}
                            </>
                          )}
                        </>
                      );
                    })}

                  <Row form></Row>
                </Form>
              </div>
              <div className="dashboard-form-footer">
                <button
                  className="form-cancel-button"
                  onClick={() => history.push('/admin/sub-categories')}>
                  Cancel
                </button>
                <button
                  className="table-header-button"
                  onClick={submitHandler}
                  disabled={!validateForm() || loading}>
                  {loading ? <Spinner color={'info'} /> : 'Add'}
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
