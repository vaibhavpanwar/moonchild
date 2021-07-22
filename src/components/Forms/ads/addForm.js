import React, {useEffect, useState} from 'react';

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

import {userTypes} from '../questions/data';
import {getSubCategByCateg} from '../../../utils/subCategory.js';

import {useDispatch, useSelector} from 'react-redux';
import {listCategories} from '../../../redux/actions/categories.actions.js';
import {listCountries} from '../../../redux/actions/countries.actions';
import {getAdQuestions} from '../../../utils/questions.js';
import {adsConstants} from '../../../redux/constants/ads.constants.js';
import {imageUploader} from '../../../utils/imageUpload.js';
import {addAd} from '../../../redux/actions/ads.actions.js';
import {useHistory} from 'react-router-dom';
import {listUsers} from '../../../redux/actions/users.actions.js';
import {useTranslation} from 'react-i18next';

const DashboardForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {categories} = useSelector((state) => state.categoriesReducer);
  const {countries} = useSelector((state) => state.countriesReducer);
  const {users} = useSelector((state) => state.usersReducer);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userType, setUserType] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedUserAccount, setSelectedUserAccount] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [subCategoriesList, setSubCategoriesList] = useState([]);

  const [countryDropdownOpen, setCountrydropdownOpen] = useState(false);
  const [userAccountDropdownOpen, setUserAccountDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [subCategoryDropdownOpen, setSubCategoryDropdownOpen] = useState(false);

  const [quesList, setQuesList] = useState([]);
  const [quesLoading, setQuesLoading] = useState(false);
  const [subCategLoading, setSubCategLoading] = useState(false);
  const [icon, setIcon] = useState(null);
  // const [name, setName] = useState({
  //   en: '',
  //   hi: '',
  //   ar: '',
  //   ph: '',
  // });

  const [answers, setAnswers] = useState([]);
  const [answersT3, setAnswersT3] = useState([]);

  const inputFileHandler = (e) => setIcon(e.target?.files?.[0]);
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
  const userAccountChangeHandler = (i) => {
    setSelectedUserAccount(i);

    setUserAccountDropdownOpen(!userAccountDropdownOpen);
  };
  const subCategoryChangeHandler = (i) => {
    setSelectedSubCategory(i);
    setSubCategoryDropdownOpen(!subCategoryDropdownOpen);
  };
  const countryChangeHandler = (i) => {
    setSelectedCountry(i);
    setCountrydropdownOpen(!countryDropdownOpen);
  };

  const populateSubCategories = async () => {
    setSubCategLoading(true);
    const res = await getSubCategByCateg(selectedCategory?._id);
    setSubCategLoading(false);
    setSubCategoriesList(res);
  };

  const populateQuestions = async () => {
    if (
      [1, 2].includes(userType?.enum) &&
      selectedCategory &&
      selectedSubCategory
    ) {
      setQuesLoading(true);

      const res = await getAdQuestions(
        userType?.enum,
        selectedCategory?._id,
        selectedSubCategory?._id,
      );
      setQuesList(res);
      setQuesLoading(false);
    } else if ([3, 4].includes(userType?.enum)) {
      setQuesLoading(true);

      const res = await getAdQuestions(userType?.enum);
      setQuesList(res);
      setQuesLoading(false);
    } else {
      setQuesList([]);
      setQuesLoading(false);
    }
  };

  const setAnswersValue = (questionId, questionType, givenAnswer) => {
    let newArray = answers;
    let answerObject = {
      questionId: questionId,
    };
    if (questionType === 1) {
      answerObject.text = givenAnswer;
    } else {
      answerObject.optionId = [givenAnswer];
    }
    let currentAnswerIndex = answers?.findIndex(
      (answer) => answer.questionId === questionId,
    );
    if (currentAnswerIndex < 0) {
      newArray.push(answerObject);
      setAnswers(newArray);
    } else {
      if (questionType === 1 && givenAnswer.length === 0) {
        setAnswers([
          ...newArray.slice(0, currentAnswerIndex),
          ...newArray.slice(currentAnswerIndex + 1),
        ]);
      } else {
        setAnswers([
          ...newArray.slice(0, currentAnswerIndex),
          answerObject,
          ...newArray.slice(currentAnswerIndex + 1),
        ]);
      }
    }
  };
  const setAnswersT3Value = (questionId, givenAnswer) => {
    console.log(questionId, givenAnswer);
    let newArray = answersT3;
    let answerObject = {
      questionId: questionId,
      optionId: [givenAnswer],
    };

    const currentQuestion = answersT3?.find(
      (answer) => answer.questionId === questionId,
    );
    if (!currentQuestion) {
      newArray.push(answerObject);
      setAnswersT3(newArray);
    } else {
      let currentOptionIndex = currentQuestion?.optionId?.findIndex(
        (answer) => answer === givenAnswer,
      );
      if (currentOptionIndex < 0) {
        const updatedQues = {
          ...currentQuestion,
          optionId: [...currentQuestion.optionId, givenAnswer],
        };

        const newArray1 = newArray.map((item) =>
          item.questionId === questionId ? updatedQues : item,
        );
        setAnswersT3(newArray1);
      } else {
        const newOptArray = currentQuestion.optionId?.filter(
          (e) => e !== givenAnswer,
        );
        if (newOptArray?.length === 0) {
          // remove ques from array
          setAnswersT3((oldState) =>
            oldState.filter((item) => item.questionId !== questionId),
          );
        } else {
          //remove option from that ques ojects array
          const updatedQuestion = {...currentQuestion, optionId: newOptArray};
          const newArray2 = newArray.map((item) =>
            item.questionId === questionId ? updatedQuestion : item,
          );
          setAnswersT3(newArray2);
        }
      }
    }
  };

  const validateForm = () =>
    userType &&
    quesList?.length > 0 &&
    answers?.length + answersT3?.length === quesList?.length &&
    countryValidate() &&
    selectedUserAccount;

  const countryValidate = () =>
    userType?.enum !== 1 ? !!selectedCountry : true;

  useEffect(() => {
    if (userType?.enum || selectedCategory || selectedCategory) {
      populateQuestions();
    }
    //eslint-disable-next-line
  }, [userType, selectedSubCategory, selectedCategory]);

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listCountries());
    dispatch(listUsers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory?._id) {
      populateSubCategories();
    }

    //eslint-disable-next-line
  }, [selectedCategory?._id]);

  const addWithIcon = async () => {
    dispatch({type: adsConstants.AD_LOADING});
    const formData = new FormData();
    formData.append('image', icon);

    const imageUrl = await imageUploader(formData);
    if (imageUrl) {
      dispatch(
        addAd(
          {
            icon: imageUrl,
            userType: userType?.enum,
            countryId: selectedCountry?._id,
            additionalQuestion: [...answers, ...answersT3],
            userId: selectedUserAccount?._id,
          },
          history,
        ),
      );
    } else {
      // pop and error
    }
  };
  const addWithoutIcon = async () => {
    dispatch(
      addAd(
        {
          userType: userType?.enum,

          additionalQuestion: [...answers, ...answersT3],
          ...(![3, 4].includes(userType?.enum) && {
            categoryId: selectedCategory?._id,
          }),
          ...(![3, 4].includes(userType?.enum) && {
            subCategoryId: selectedSubCategory?._id,
          }),

          ...(userType?.enum !== 1 && {countryId: selectedCountry?._id}),
          userId: selectedUserAccount?._id,
        },
        history,
      ),
    );
  };

  const submitHandler = async () =>
    userType?.enum === 3 && icon ? addWithIcon() : addWithoutIcon();

  const {t, i18n} = useTranslation();
  const lang = i18n.language;
  return (
    <>
      <Header cardsVisible={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <div className="dashboard-form-container">
              <h2 className="dashboard-form-header">{t('addAd')}</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">{t('userType')}</Label>
                        <InputGroup>
                          <Input
                            style={{background: '#fff'}}
                            readOnly
                            placeholder={`Select ${t('userType')}`}
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
                    {![3, 4].includes(userType?.enum) && userType && (
                      <>
                        <Col lg={4} md={6} sm={12}>
                          <FormGroup>
                            <Label for="examplePassword">
                              {t('category')}{' '}
                            </Label>
                            <InputGroup>
                              <Input
                                style={{background: '#fff'}}
                                readOnly
                                placeholder={`select ${t('category')}`}
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
                          {subCategLoading && <Spinner color={'info'} />}
                          {selectedCategory?._id &&
                            (!subCategLoading &&
                            subCategoriesList?.length === 0 ? (
                              <p>{t('noDataFound')}</p>
                            ) : (
                              <FormGroup>
                                <Label for="examplePassword">
                                  {t('subCategory')}
                                </Label>
                                <InputGroup>
                                  <Input
                                    style={{background: '#fff'}}
                                    readOnly
                                    placeholder={`select   ${t('subCategory')}`}
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
                  {userType?.enum === 3 && (
                    <Row form>
                      <Col lg={4} md={6} sm={12}>
                        <FormGroup>
                          <Label for="examplePassword"> {t('icons')} </Label>
                          <InputGroup>
                            <label className="form-control chooseFile">
                              {' '}
                              <Input
                                type="file"
                                accept="image/png, image/jpg, image/jpeg"
                                name="icon-upload"
                                placeholder={t('uploadPlaceholder')}
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
                  )}

                  <Row form>
                    {![1].includes(userType?.enum) && userType && (
                      <Col lg={4} md={6} sm={12}>
                        <FormGroup>
                          <Label for="examplePassword"> {t('country')} </Label>
                          <InputGroup>
                            <Input
                              style={{background: '#fff'}}
                              readOnly
                              placeholder={'select category'}
                              value={selectedCountry?.name[lang]}
                            />
                            <InputGroupButtonDropdown
                              addonType="append"
                              isOpen={countryDropdownOpen}
                              toggle={() =>
                                setCountrydropdownOpen(!countryDropdownOpen)
                              }>
                              <DropdownToggle>
                                <p>{'>'}</p>
                              </DropdownToggle>
                              <DropdownMenu>
                                {countries?.map((item) => (
                                  <DropdownItem
                                    onClick={() => countryChangeHandler(item)}>
                                    {item?.name[lang]}
                                  </DropdownItem>
                                ))}
                              </DropdownMenu>
                            </InputGroupButtonDropdown>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    )}

                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">{t('user')}</Label>
                        <InputGroup>
                          <Input
                            style={{background: '#fff'}}
                            readOnly
                            placeholder={'select user'}
                            value={selectedUserAccount?.name}
                          />
                          <InputGroupButtonDropdown
                            addonType="append"
                            isOpen={userAccountDropdownOpen}
                            toggle={() =>
                              setUserAccountDropdownOpen(
                                !userAccountDropdownOpen,
                              )
                            }>
                            <DropdownToggle>
                              <p>{'>'}</p>
                            </DropdownToggle>
                            <DropdownMenu>
                              {users?.map((item) => (
                                <DropdownItem
                                  onClick={() =>
                                    userAccountChangeHandler(item)
                                  }>
                                  {item?.name}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </InputGroupButtonDropdown>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />

                  <hr />
                  <br />

                  <p> {t('otherDetails')}</p>
                  <br />

                  <br />
                  {quesLoading && <Spinner color={'info'} />}
                  {!quesLoading && quesList?.length === 0 ? (
                    <p>{t('noQuesData')}</p>
                  ) : (
                    <Row form>
                      {quesList?.map((item) => (
                        <>
                          {item?.questionType === 1 && (
                            <Col
                              style={{marginBottom: '100px'}}
                              key={item?._id}
                              lg={4}
                              md={6}
                              sm={12}>
                              <label> {item.question?.en}</label>
                              <br />
                              <FormGroup>
                                <InputGroup>
                                  <Input
                                    style={{
                                      background: '#fff',
                                      maxWidth: '250px',
                                    }}
                                    placeholder={'Answer here'}
                                    value={
                                      answers.find(
                                        (e) => e.questionId === item._id,
                                      )?.text
                                    }
                                    onChange={(e) => {
                                      e.preventDefault();
                                      setAnswersValue(
                                        item?._id,
                                        item?.questionType,
                                        e.target.value,
                                      );
                                    }}
                                  />
                                </InputGroup>
                              </FormGroup>
                            </Col>
                          )}
                          {item?.questionType === 3 && (
                            <Col
                              style={{marginBottom: '100px'}}
                              key={item?._id}
                              lg={4}
                              md={6}
                              sm={12}>
                              <label> {item.question?.en}</label>
                              <br />
                              <div
                                style={{
                                  display: 'flex',
                                  gap: '10px',
                                  alignItems: 'center',
                                }}>
                                {item?.options?.map((opt) => (
                                  <>
                                    <input
                                      type="checkbox"
                                      value={opt?.name[lang]}
                                      name="gender"
                                      checked={answersT3
                                        .find(
                                          (val) => val.questionId === item?._id,
                                        )
                                        ?.optionId?.includes(opt?._id)}
                                      onClick={(e) => {
                                        setAnswersT3Value(
                                          item?._id,

                                          opt?._id,
                                          opt?.name[lang],
                                        );
                                      }}
                                    />
                                    {opt?.name[lang]}
                                  </>
                                ))}
                              </div>
                            </Col>
                          )}
                          {[2, 4].includes(item?.questionType) && (
                            <Col
                              style={{marginBottom: '50px'}}
                              key={item?._id}
                              lg={4}
                              md={6}
                              sm={12}>
                              <label> {item.question?.en}</label>
                              <br />
                              <form
                                style={{
                                  display: 'flex',
                                  gap: '10px',
                                  alignItems: 'center',
                                }}>
                                {item?.options?.map((opt, i) => (
                                  <>
                                    <input
                                      type="radio"
                                      // checked={
                                      //   answers.find(
                                      //     (val) => val.questionId === item?._id,
                                      //   )?.optionId === opt?._id
                                      // }
                                      checked={
                                        item.options.find(
                                          (val) =>
                                            val._id ===
                                            answers.find(
                                              (e) => e.questionId === item._id,
                                            )?.optionId[0],
                                        )?._id === opt?._id
                                      }
                                      onClick={(e) => {
                                        setAnswersValue(
                                          item?._id,
                                          item?.questionType,
                                          opt?._id,
                                          opt?.name[lang],
                                        );
                                      }}
                                      value={opt?.name[lang]}
                                    />
                                    {opt?.name[lang]}
                                  </>
                                ))}
                              </form>
                            </Col>
                          )}
                        </>
                      ))}
                    </Row>
                  )}
                </Form>
              </div>
              <div className="dashboard-form-footer">
                <button
                  onClick={() => {
                    history.push('/admin/ads');
                  }}
                  className="form-cancel-button">
                  {t('cancel')}
                </button>
                <button
                  onClick={submitHandler}
                  disabled={!validateForm()}
                  className="table-header-button">
                  {t('add')}
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
