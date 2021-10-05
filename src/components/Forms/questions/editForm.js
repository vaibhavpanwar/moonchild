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

import {quesTypes, userTypes} from '../../../utils/data';
import {getSubCategByCateg} from '../../../utils/subCategory.js';

import {
  editQuestion,
  getSingleQuestion,
} from '../../../redux/actions/questions.actions.js';
import {useParams} from 'react-router-dom';
import {finder} from '../../../utils/dataHelpers.js';
import {useTranslation} from 'react-i18next';

const DashboardForm = ({history}) => {
  const {id} = useParams();

  //redux
  const dispatch = useDispatch();
  const {categories} = useSelector((state) => state.categoriesReducer);
  // const {subCategories} = useSelector((state) => state.subCategoriesReducer);
  const {loading, question: questionById} = useSelector(
    (state) => state.questionsReducer,
  );

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
  const [filterText, setFilterText] = useState({
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
    question?.en &&
    question?.hi &&
    question?.ar &&
    question?.ph &&
    filterText?.en &&
    filterText?.hi &&
    filterText?.ar &&
    filterText?.ph &&
    options &&
    userType &&
    quesType &&
    categAndSubCategValidation();

  const categAndSubCategValidation = () =>
    ![3, 4].includes(userType?.enum)
      ? selectedCategory && selectedSubCategory
      : true;

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
  const onChangeHandlerFilter = (e) =>
    setFilterText({...filterText, [e.target.name]: e.target.value});

  const submitHandler = async () => {
    const formData = {
      userType: userType?.enum,
      questionType: quesType?.enum,
      filterText: filterText,
      question,
      ...(quesType?.enum !== 1 && {
        options: options?.map((item) => {
          return {name: item?.name};
        }),
      }),

      ...(![3, 4].includes(userType?.enum) && {
        categoryId: selectedCategory?._id,
      }),
      ...(![3, 4].includes(userType?.enum) && {
        subCategoryId: selectedSubCategory?._id,
      }),
      questionId: id,
    };
    dispatch(editQuestion(formData, history));
  };

  const populateSubCategories = async () => {
    const res = await getSubCategByCateg(selectedCategory?._id);
    setSubCategoriesList(res);
  };

  useEffect(() => {
    dispatch(listCategories());
    dispatch(getSingleQuestion(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedCategory?._id) {
      populateSubCategories();
    }

    //eslint-disable-next-line
  }, [selectedCategory?._id]);

  const {t, i18n} = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    if (!!questionById?.question) {
      setQuestion(questionById?.question);
      setFilterText(questionById?.filterText);
      setSelectedCategory(questionById?.categoryId);
      setSelectedSubCategory(questionById?.subCategoryId);
      setUserType(finder(userTypes, questionById?.userType));
      setOptions(questionById?.options);
      setQuesType(finder(quesTypes, questionById?.questionType));
    }
    // eslint-disable-next-line
  }, [questionById?.name, questionById?._id]);

  useEffect(() => {
    if (quesType?.enum === 1) {
      setOptions([
        {
          name: {en: '', hi: '', ar: '', ph: ''},
        },
      ]);
    } else if (quesType?.enum === 4 && !questionById?.options?.length) {
      setOptions([
        {
          name: {en: '', hi: '', ar: '', ph: ''},
        },
        {
          name: {en: '', hi: '', ar: '', ph: ''},
        },
      ]);
    } else {
      setOptions(questionById?.options);
    }
  }, [quesType?.enum, questionById?.options]);

  return (
    <>
      <Header cardsVisible={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <div className="dashboard-form-container">
              <h2 className="dashboard-form-header">{t('editQuestion')}</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">{t('userType')}</Label>
                        <InputGroup
                          onClick={() =>
                            setUserDropdownOpen(!userDropdownOpen)
                          }>
                          <Input
                            style={{background: '#fff'}}
                            readOnly
                            placeholder={'Select ' + t('userType')}
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
                              {userTypes?.map((item, i) => (
                                <DropdownItem
                                  key={i}
                                  onClick={() => userTypeChangeHandler(item)}>
                                  {item?.name}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </InputGroupButtonDropdown>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    {![3, 4].includes(userType?.enum) && (
                      <>
                        <Col lg={4} md={6} sm={12}>
                          <FormGroup>
                            <Label for="examplePassword">{t('category')}</Label>
                            <InputGroup
                              onClick={() =>
                                setCategoryDropdownOpen(!categoryDropdownOpen)
                              }>
                              <Input
                                style={{background: '#fff'}}
                                readOnly
                                placeholder={'select' + t('category')}
                                value={selectedCategory?.name[lang]}
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
                                      key={item?._id}
                                      onClick={() =>
                                        categoryChangeHandler(item)
                                      }>
                                      {item?.name[lang]}
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
                              <p>{t('noDataFound')}</p>
                            ) : (
                              <FormGroup>
                                <Label for="examplePassword">
                                  {t('subCategory')}
                                </Label>
                                <InputGroup
                                  onClick={() =>
                                    setSubCategoryDropdownOpen(
                                      !subCategoryDropdownOpen,
                                    )
                                  }>
                                  <Input
                                    style={{background: '#fff'}}
                                    readOnly
                                    placeholder={'select' + t('subCategory')}
                                    value={selectedSubCategory?.name[lang]}
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
                                          key={item?._id}
                                          onClick={() =>
                                            subCategoryChangeHandler(item)
                                          }>
                                          {item?.name[lang]}
                                        </DropdownItem>
                                      ))}
                                    </DropdownMenu>
                                  </InputGroupButtonDropdown>
                                </InputGroup>
                              </FormGroup>
                            ))}
                        </Col>
                      </>
                    )}
                  </Row>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">{t('quesType')} </Label>
                        <InputGroup
                          onClick={() =>
                            setQuesDropdownOpen(!quesDropdownOpen)
                          }>
                          <Input
                            style={{background: '#fff'}}
                            readOnly
                            placeholder={'select' + t('quesType')}
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
                              {quesTypes?.map((item, i) => (
                                <DropdownItem
                                  key={i}
                                  onClick={() => quesTypeChangeHandler(item)}>
                                  {item?.name}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </InputGroupButtonDropdown>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr />
                  <Row form>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('ques')} (English)</Label>
                        <Input
                          type="text"
                          placeholder={'Enter ' + t('ques')}
                          value={en}
                          name={'en'}
                          onChange={onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('ques')} (Arabic)</Label>
                        <Input
                          type="text"
                          placeholder={'Enter ' + t('ques')}
                          value={ar}
                          name={'ar'}
                          onChange={onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('ques')} (Hindi)</Label>
                        <Input
                          type="text"
                          placeholder={'Enter ' + t('ques')}
                          value={hi}
                          name={'hi'}
                          onChange={onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">
                          {t('ques')} (Philipins)
                        </Label>
                        <Input
                          type="text"
                          placeholder={'Enter ' + t('ques')}
                          value={ph}
                          name={'ph'}
                          onChange={onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">
                          {t('filterText')} (English)
                        </Label>
                        <Input
                          type="text"
                          placeholder="English"
                          value={filterText.en}
                          name={'en'}
                          onChange={onChangeHandlerFilter}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">
                          {t('filterText')} (Arabic)
                        </Label>
                        <Input
                          type="text"
                          placeholder="Arabic"
                          value={filterText.ar}
                          name={'ar'}
                          onChange={onChangeHandlerFilter}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">
                          {t('filterText')} (Hindi)
                        </Label>
                        <Input
                          type="text"
                          placeholder="Hindi"
                          value={filterText.hi}
                          name={'hi'}
                          onChange={onChangeHandlerFilter}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">
                          {t('filterText')} (Philipins)
                        </Label>
                        <Input
                          type="text"
                          placeholder="Philipins"
                          value={filterText.ph}
                          name={'ph'}
                          onChange={onChangeHandlerFilter}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />

                  <hr />
                  <br />
                  {quesType &&
                    quesType?.enum !== 1 &&
                    options?.length >= 1 &&
                    options.map((item, i) => {
                      return (
                        <React.Fragment key={i}>
                          <Row form>
                            <Col lg={3} md={6} sm={12}>
                              {' '}
                              <FormGroup>
                                <Label for="exampleEmail">
                                  {t('option')}
                                  {i + 1} (English)
                                </Label>
                                <Input
                                  type="text"
                                  placeholder={'Enter' + t('option')}
                                  value={item?.name[lang]}
                                  name={'en'}
                                  onChange={(e) => handleOptionsChange(e, i)}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                              {' '}
                              <FormGroup>
                                <Label for="exampleEmail">
                                  {t('option')}
                                  {i + 1} (Arabic)
                                </Label>
                                <Input
                                  type="text"
                                  placeholder={'Enter' + t('option')}
                                  value={item?.name?.ar}
                                  name={'ar'}
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
                                  placeholder={'Enter' + t('option')}
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
                                  {t('option')}
                                  {i + 1} (Philipins)
                                </Label>
                                <Input
                                  type="text"
                                  placeholder={'Enter' + t('option')}
                                  value={item?.name?.ph}
                                  name={'ph'}
                                  onChange={(e) => handleOptionsChange(e, i)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          {quesType?.enum !== 4 && (
                            <>
                              {' '}
                              {options.length !== 1 && (
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
                                  {t('add')}
                                </button>
                              )}
                            </>
                          )}
                        </React.Fragment>
                      );
                    })}

                  <Row form></Row>
                </Form>
              </div>
              <div className="dashboard-form-footer">
                <button
                  className="form-cancel-button"
                  onClick={() => history.push('/admin/questions')}>
                  {t('cancel')}
                </button>
                <button
                  className="table-header-button"
                  onClick={submitHandler}
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
