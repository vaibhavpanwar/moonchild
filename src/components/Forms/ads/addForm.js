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

import {userTypes} from '../questions/data';
import {getSubCategByCateg} from '../../../utils/subCategory.js';

import {useDispatch, useSelector} from 'react-redux';
import {listCategories} from '../../../redux/actions/categories.actions.js';
import {listCountries} from '../../../redux/actions/countries.actions';
import {getAdQuestions} from '../../../utils/questions.js';

const DashboardForm = () => {
  const dispatch = useDispatch();
  const {categories} = useSelector((state) => state.categoriesReducer);
  const {countries} = useSelector((state) => state.countriesReducer);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userType, setUserType] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [subCategoriesList, setSubCategoriesList] = useState([]);

  const [countryDropdownOpen, setCountrydropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [subCategoryDropdownOpen, setSubCategoryDropdownOpen] = useState(false);

  const [quesList, setQuesList] = useState([]);
  const [quesLoading, setQuesLoading] = useState(false);
  // const [name, setName] = useState({
  //   en: '',
  //   hi: '',
  //   ar: '',
  //   ph: '',
  // });

  const [answers, setAnswers] = useState([]);
  const [answersT3, setAnswersT3] = useState([]);
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
  const countryChangeHandler = (i) => {
    setSelectedCountry(i);
    setCountrydropdownOpen(!countryDropdownOpen);
  };

  const populateSubCategories = async () => {
    const res = await getSubCategByCateg(selectedCategory?._id);
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

  const setAnswersValue = (questionId, questionType, givenAnswer, optName) => {
    console.log(questionId, questionType, givenAnswer);
    let newArray = answers;
    let answerObject = {
      questionId: questionId,
    };
    if (questionType === 1) {
      answerObject.text = givenAnswer;
    } else {
      answerObject.optionId = givenAnswer;
      answerObject.optionName = optName;
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
  const setAnswersT3Value = (questionId, givenAnswer, optName) => {
    console.log(questionId, givenAnswer);
    let newArray = answersT3;
    let answerObject = {
      questionId: questionId,
      optionId: [givenAnswer],
    };
    // if (questionType === 1) {
    //   answerObject.text = givenAnswer;
    // } else {
    //   answerObject.optionId = givenAnswer;
    //   answerObject.optionName = optName;
    // }
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

        setAnswersT3(
          newArray.map((item) =>
            item.questionId === questionId ? updatedQues : item,
          ),
        );
      } else {
        const newOptArray = currentQuestion.optionId?.filter(
          (e) => e !== givenAnswer,
        );
        if (newOptArray?.length === 0) {
          // remove ques from array
          setAnswersT3(
            newArray.filter((item) => item.questionId !== questionId),
          );
        } else {
          //remove option from that ques ojects array
          const updatedQuestion = {...currentQuestion, optionId: newOptArray};
          setAnswersT3(
            newArray.map((item) =>
              item.questionId === questionId ? updatedQuestion : item,
            ),
          );
        }
      }

      // if (questionType === 1 && givenAnswer.length === 0) {
      //   setAnswers([
      //     ...newArray.slice(0, currentAnswerIndex),
      //     ...newArray.slice(currentAnswerIndex + 1),
      //   ]);
      // } else {
      //   setAnswers([
      //     ...newArray.slice(0, currentAnswerIndex),
      //     answerObject,
      //     ...newArray.slice(currentAnswerIndex + 1),
      //   ]);
      // }
    }
  };

  useEffect(() => {
    if (userType?.enum || selectedCategory || selectedCategory) {
      populateQuestions();
    }
    //eslint-disable-next-line
  }, [userType, selectedSubCategory, selectedCategory]);

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listCountries());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory?._id) {
      populateSubCategories();
    }

    //eslint-disable-next-line
  }, [selectedCategory?._id]);

  return (
    <>
      <Header cardsVisible={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <div className="dashboard-form-container">
              <h2 className="dashboard-form-header">Add Ads</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
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
                    {![3, 4].includes(userType?.enum) && userType && (
                      <>
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
                                      onClick={() =>
                                        categoryChangeHandler(item)
                                      }>
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
                                <Label for="examplePassword">
                                  Sub Category{' '}
                                </Label>
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
                        </Col>
                      </>
                    )}
                  </Row>
                  <Row form>
                    {![1].includes(userType?.enum) && userType && (
                      <Col lg={4} md={6} sm={12}>
                        <FormGroup>
                          <Label for="examplePassword">Country </Label>
                          <InputGroup>
                            <Input
                              style={{background: '#fff'}}
                              readOnly
                              placeholder={'select category'}
                              value={selectedCountry?.name?.en}
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
                                    {item?.name?.en}
                                  </DropdownItem>
                                ))}
                              </DropdownMenu>
                            </InputGroupButtonDropdown>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    )}
                  </Row>
                  <br />

                  <hr />
                  <br />

                  <p>Other Details</p>
                  <br />

                  <br />
                  {quesLoading && <Spinner color={'info'} />}
                  {!quesLoading && quesList?.length === 0 ? (
                    <p>
                      No ques found for selected preferences, please select
                      different options
                    </p>
                  ) : (
                    <Row form>
                      {quesList?.map((item) => (
                        <>
                          {/* {item?.questionType === 4 && (
                            <Col
                              style={{marginBottom: '100px'}}
                              key={item?._id}
                              lg={4}
                              md={6}
                              sm={12}>
                              <label> {item.question?.en}</label>

                              <br />
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
                                      type="radio"
                                      value={opt?.name?.en}
                                      name="gender"
                                      checked={
                                        !!item.options.find(
                                          (val) =>
                                            val._id ===
                                            answers.find(
                                              (e) => e.questionId === item._id,
                                            )?.optionId,
                                        )
                                      }
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setAnswersValue(
                                          item?._id,
                                          item?.questionType,
                                          opt?._id,
                                        );
                                      }}
                                    />
                                    {opt?.name?.en}
                                  </>
                                ))}
                              </div>
                            </Col>
                          )} */}
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
                              lg={12}
                              md={12}
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
                                      value={opt?.name?.en}
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
                                          opt?.name?.en,
                                        );
                                      }}
                                    />
                                    {opt?.name?.en}
                                    {opt?._id}
                                  </>
                                ))}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  console.log(answersT3);
                                }}>
                                Show
                              </button>
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
                                            )?.optionId,
                                        )?._id === opt?._id
                                      }
                                      onClick={(e) => {
                                        setAnswersValue(
                                          item?._id,
                                          item?.questionType,
                                          opt?._id,
                                          opt?.name?.en,
                                        );
                                      }}
                                      value={opt?.name?.en}
                                    />
                                    {opt?.name?.en}
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
                <button className="form-cancel-button">Cancel</button>
                <button className="table-header-button">Add</button>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default DashboardForm;
