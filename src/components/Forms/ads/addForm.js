import React, {useEffect, useState, useMemo} from 'react';
import DatePicker from 'react-date-picker';
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

import {
  userTypes,
  maritalStatus,
  workerEducation,
  workerExperience,
  speakingLanguage,
  gender,
  religion,
} from '../../../utils/data';
import {getSubCategByCateg} from '../../../utils/subCategory.js';

import {useDispatch, useSelector} from 'react-redux';
import {listCategories} from '../../../redux/actions/categories.actions.js';
import {listCountries} from '../../../redux/actions/countries.actions';
import {getAdQuestions} from '../../../utils/questions.js';
import {adsConstants} from '../../../redux/constants/ads.constants.js';
import {imageUploader, renderImage} from '../../../utils/imageUpload.js';
import {addAd} from '../../../redux/actions/ads.actions.js';
import {useHistory} from 'react-router-dom';
import {listUsers} from '../../../redux/actions/users.actions.js';
import {useTranslation} from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import countryList from 'react-select-country-list';

import Select from 'react-select';
import cogoToast from 'cogo-toast';

const DashboardForm = () => {
  const history = useHistory();

  //redux
  const dispatch = useDispatch();
  const {categories} = useSelector((state) => state.categoriesReducer);
  const {loading} = useSelector((state) => state.adsReducer);
  const {countries} = useSelector((state) => state.countriesReducer);
  const {users} = useSelector((state) => state.usersReducer);

  //local for dropdowns
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [nationality, setNationality] = useState('');
  const [userType, setUserType] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedUserAccount, setSelectedUserAccount] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const [quesList, setQuesList] = useState([]);
  const [quesLoading, setQuesLoading] = useState(false);
  const [subCategLoading, setSubCategLoading] = useState(false);
  const [icon, setIcon] = useState(null);
  const [title, setTitle] = useState('');
  const [skype, setSkype] = useState('');
  const [selectedReligion, setSelectedReligion] = useState(null);
  const [selectedExp, setSelectedExp] = useState(null);
  const [selectedEdu, setSelectedEdu] = useState(null);
  const [selectedMarital, setSelectedMarital] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedLang, setSelectedLang] = useState([]);
  const [selectedPref, setSelectedPref] = useState([]);
  const [religionDropdownOpen, setReligionDropdownOpen] = useState(false);
  const [maritalDropdownOpen, setMaritalDropdownOpen] = useState(false);
  const [eduDropdownOpen, setEduDropdownOpen] = useState(false);
  const [expDropdownOpen, setExpDropdownOpen] = useState(false);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [worked, setWorked] = useState(false);
  const [prefOpen, setPrefOpen] = useState(false);
  const [countryDropdownOpen, setCountrydropdownOpen] = useState(false);
  const [userAccountDropdownOpen, setUserAccountDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [subCategoryDropdownOpen, setSubCategoryDropdownOpen] = useState(false);
  // local for dropdown ends

  const [waCountryCode, setWaCountryCode] = useState('');
  const [waPhone, setWaPhone] = useState('');
  const [callingCountryCode, setCallingCountryCode] = useState('');
  const [callingPhone, setCallingPhone] = useState('');
  const [dob, setDob] = useState(new Date());
  const [answers, setAnswers] = useState([]);
  const [aspectRatio, setAspactRatio] = useState();
  //dropdown for job worker

  const workedHandler = () => {
    setWorked(!worked);
  };

  //countries list
  const options = useMemo(() => countryList().getData(), []);

  const nationalityChangeHandler = (value) => {
    setNationality(value);
  };

  const expChangeHandler = (i) => {
    setSelectedExp(i);
    setExpDropdownOpen(!expDropdownOpen);
  };

  const eduChangeHandler = (i) => {
    setSelectedEdu(i);
    setEduDropdownOpen(!eduDropdownOpen);
  };

  const genderChangeHandler = (i) => {
    setSelectedGender(i);
    setGenderDropdownOpen(!genderDropdownOpen);
  };

  const maritalChangeHandler = (i) => {
    setSelectedMarital(i);
    setMaritalDropdownOpen(!maritalDropdownOpen);
  };

  const langChangeHandler = (i) => {
    const alreadyThere = selectedLang.find((item) => i._id === item._id);
    if (!!alreadyThere) {
      setSelectedLang(selectedLang.filter((item) => item._id !== i._id));
    } else {
      setSelectedLang([...selectedLang, i]);
    }

    setLangOpen(!langOpen);
  };

  const prefChangeHandler = (i) => {
    const alreadyThere = selectedPref.find((item) => i._id === item._id);
    if (!!alreadyThere) {
      setSelectedPref(selectedPref.filter((item) => item._id !== i._id));
    } else {
      setSelectedPref([...selectedPref, i]);
    }

    setPrefOpen(!prefOpen);
  };

  const religionChangeHandler = (i) => {
    setSelectedReligion(i);
    setReligionDropdownOpen(!religionDropdownOpen);
  };

  const whatsappNumberHandler = (number, data) => {
    setWaCountryCode('+' + data?.dialCode);
    setWaPhone(number.slice(data.dialCode.length));
  };
  const callingNumberHandler = (number, data) => {
    setCallingCountryCode('+' + data?.dialCode);
    setCallingPhone(number.slice(data.dialCode.length));
  };

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

  const showMultipleSelections = (array, obj) => {
    if (obj) {
      return array.map((item) => item.name[lang]).toString();
    } else {
      return array.map((item) => item.name).toString();
    }
  };

  const setAnswersValue = (questionId, questionType, givenAnswer) => {
    let newArray = answers;
    let answerObject = {
      questionId: questionId,
    };
    let currentAnswerIndex = newArray.findIndex(
      (answer) => answer.questionId === questionId,
    );
    if (currentAnswerIndex < 0) {
      if (questionType === 1) {
        answerObject.text = givenAnswer;
      } else {
        answerObject.optionId = [givenAnswer];
      }
      setAnswers([
        ...newArray.slice(0),
        answerObject,
        ...newArray.slice(newArray.length + 1),
      ]);
    } else {
      if (questionType === 1 && givenAnswer.length === 0) {
        setAnswers([
          ...newArray.slice(0, currentAnswerIndex),
          ...newArray.slice(currentAnswerIndex + 1),
        ]);
      } else {
        if (questionType === 1) {
          answerObject.text = givenAnswer;
        } else if (questionType === 3) {
          let currentOptionIndex = newArray[
            currentAnswerIndex
          ].optionId.findIndex((option) => option === givenAnswer);
          let newOptionsArray = newArray[currentAnswerIndex].optionId;
          if (currentOptionIndex < 0) {
            newOptionsArray.push(givenAnswer);
            answerObject.optionId = newOptionsArray;
          } else {
            let updatedOptionsArray = [
              ...newOptionsArray.slice(0, currentOptionIndex),
              ...newOptionsArray.slice(currentOptionIndex + 1),
            ];
            if (updatedOptionsArray.length) {
              answerObject.optionId = updatedOptionsArray;
            } else {
              return setAnswers([
                ...newArray.slice(0, currentAnswerIndex),
                ...newArray.slice(currentAnswerIndex + 1),
              ]);
            }
          }
        } else {
          answerObject.optionId = [givenAnswer];
        }
        setAnswers([
          ...newArray.slice(0, currentAnswerIndex),
          answerObject,
          ...newArray.slice(currentAnswerIndex + 1),
        ]);
      }
    }
  };

  const validateForm = () =>
    title &&
    userType &&
    countryValidate() &&
    validateQuestions() &&
    selectedUserAccount &&
    icon;

  const validateQuestions = () => {
    if (!quesLoading && quesList?.length > 0) {
      return answers?.length === quesList?.length;
    } else if (!quesLoading && quesList?.length === 0) {
      return true;
    }
  };

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
            additionalQuestion: answers,
            ...(![3, 4].includes(userType?.enum) && {
              categoryId: selectedCategory?._id,
            }),
            ...(![3, 4].includes(userType?.enum) && {
              subCategoryId: selectedSubCategory?._id,
            }),
            ...(userType?.enum !== 1 && {countryId: selectedCountry?._id}),
            ...(userType?.enum === 2 && {
              religion: selectedReligion.enum,
              gender: selectedGender.enum,
              experience: selectedExp.enum,
              education: selectedEdu.enum,
              dob: Date.parse(dob),
              speakingLanguages: selectedLang.map((el) => el.enum),
              nationality: nationality.label,
              gccBefore: worked,
              countryPreferences: selectedPref.map((el) => el._id),
              martialStatus: selectedMarital.enum,
            }),
            userId: selectedUserAccount?._id,
            contactCallingCode: callingCountryCode,
            contactNumber: callingPhone,
            whatsappCallingCode: waCountryCode,
            whatsappPhoneNumber: waPhone,
            title,
            skype,
          },
          history,
        ),
      );
    } else {
      // pop and error
    }
  };

  // const addWithoutIcon = async () => {
  //   dispatch(
  //     addAd(
  //       {
  //         userType: userType?.enum,

  //         additionalQuestion: answers,
  //         ...(![3, 4].includes(userType?.enum) && {
  //           categoryId: selectedCategory?._id,
  //         }),
  //         ...(![3, 4].includes(userType?.enum) && {
  //           subCategoryId: selectedSubCategory?._id,
  //         }),

  //         ...(userType?.enum !== 1 && {countryId: selectedCountry?._id}),
  //         ...(userType?.enum === 2 && {
  //           religion: selectedReligion.enum,
  //           gender: selectedGender.enum,
  //           experience: selectedExp.enum,
  //           education: selectedEdu.enum,
  //           dob: Date.parse(dob),
  //           speakingLanguages: selectedLang.map((el) => el.enum),
  //           nationality: nationality.label,
  //           gccBefore: worked,
  //           countryPreferences: selectedPref.map((el) => el._id),
  //         }),
  //         userId: selectedUserAccount?._id,
  //         contactCallingCode: callingCountryCode,

  //         contactNumber: callingPhone,
  //         whatsappCallingCode: waCountryCode,
  //         whatsappPhoneNumber: waPhone,
  //         title,
  //         skype,
  //       },
  //       history,
  //     ),
  //   );
  // };

  const submitHandler = async () => {
    if (icon && aspectRatio !== 1) {
      cogoToast.error('Please chose image with same width and height');
    } else {
      addWithIcon();
    }
  };
  // userType?.enum === 3 && icon ? addWithIcon() : addWithoutIcon();
  const onLoad = ({target: {offsetHeight, offsetWidth}}) => {
    setAspactRatio(offsetHeight / offsetWidth);
  };
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
                        <InputGroup
                          onClick={() =>
                            setUserDropdownOpen(!userDropdownOpen)
                          }>
                          <Input
                            style={{background: '#fff'}}
                            readOnly
                            placeholder={`${t('select')} ${t('userType')}`}
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
                            <InputGroup
                              onClick={() =>
                                setCategoryDropdownOpen(!categoryDropdownOpen)
                              }>
                              <Input
                                style={{background: '#fff'}}
                                readOnly
                                placeholder={`${t('select')} ${t('category')}`}
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
                                <InputGroup
                                  onClick={() =>
                                    setSubCategoryDropdownOpen(
                                      !subCategoryDropdownOpen,
                                    )
                                  }>
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
                  </Row>

                  <Row form>
                    {![1].includes(userType?.enum) && userType && (
                      <Col lg={4} md={6} sm={12}>
                        <FormGroup>
                          <Label for="examplePassword"> {t('country')} </Label>
                          <InputGroup>
                            <Input
                              style={{background: '#fff'}}
                              readOnly
                              placeholder={t('select') + t('category')}
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
                        <InputGroup
                          onClick={() =>
                            setUserAccountDropdownOpen(!userAccountDropdownOpen)
                          }>
                          <Input
                            style={{background: '#fff'}}
                            readOnly
                            placeholder={t('select') + t('user')}
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
                  <Row>
                    <Col lg={4} md={6} sm={12}>
                      {' '}
                      <FormGroup>
                        <Label for="exampleEmail">
                          {t('title')}
                          <sup>*</sup>{' '}
                        </Label>
                        <Input
                          style={{borderRadius: '0'}}
                          type="text"
                          placeholder={`${t('select')} ${t('title')}`}
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      {' '}
                      <FormGroup>
                        <Label for="exampleEmail">{t('skype')}</Label>
                        <Input
                          style={{borderRadius: '0'}}
                          type="text"
                          placeholder={`${t('select')} ${t('skype')}`}
                          value={skype}
                          onChange={(e) => setSkype(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('whatsappPhone')}</Label>
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
                            whatsappNumberHandler(phone, countryData)
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('callingPhone')}</Label>
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
                            callingNumberHandler(phone, countryData)
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <br />
                  {userType?.enum === 2 && (
                    <>
                      <Row>
                        <Col lg={4} md={6} sm={12}>
                          <FormGroup>
                            <Label for="examplePassword">{t('religion')}</Label>
                            <InputGroup
                              onClick={() =>
                                setReligionDropdownOpen(!religionDropdownOpen)
                              }>
                              <Input
                                style={{background: '#fff'}}
                                readOnly
                                placeholder={`${t('select')} ${t('religion')}`}
                                value={selectedReligion?.name}
                              />
                              <InputGroupButtonDropdown
                                addonType="append"
                                isOpen={religionDropdownOpen}
                                toggle={() =>
                                  setReligionDropdownOpen(!religionDropdownOpen)
                                }>
                                <DropdownToggle>
                                  <p>{'>'}</p>
                                </DropdownToggle>
                                <DropdownMenu>
                                  {religion?.map((item) => (
                                    <DropdownItem
                                      onClick={() =>
                                        religionChangeHandler(item)
                                      }>
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
                            <Label for="examplePassword">{t('gender')}</Label>
                            <InputGroup
                              onClick={() =>
                                setGenderDropdownOpen(!genderDropdownOpen)
                              }>
                              <Input
                                style={{background: '#fff'}}
                                readOnly
                                placeholder={`${t('select')} ${t('gender')}`}
                                value={selectedGender?.name}
                              />
                              <InputGroupButtonDropdown
                                addonType="append"
                                isOpen={genderDropdownOpen}
                                toggle={() =>
                                  setGenderDropdownOpen(!genderDropdownOpen)
                                }>
                                <DropdownToggle>
                                  <p>{'>'}</p>
                                </DropdownToggle>
                                <DropdownMenu>
                                  {gender?.map((item) => (
                                    <DropdownItem
                                      onClick={() => genderChangeHandler(item)}>
                                      {item?.name}
                                    </DropdownItem>
                                  ))}
                                </DropdownMenu>
                              </InputGroupButtonDropdown>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} md={6} sm={12}>
                          <FormGroup>
                            <Label for="examplePassword">
                              {t('experience')}
                            </Label>
                            <InputGroup
                              onClick={() =>
                                setExpDropdownOpen(!expDropdownOpen)
                              }>
                              <Input
                                style={{background: '#fff'}}
                                readOnly
                                placeholder={`${t('select')} ${t(
                                  'experience',
                                )}`}
                                value={selectedExp?.name}
                              />
                              <InputGroupButtonDropdown
                                addonType="append"
                                isOpen={expDropdownOpen}
                                toggle={() =>
                                  setExpDropdownOpen(!expDropdownOpen)
                                }>
                                <DropdownToggle>
                                  <p>{'>'}</p>
                                </DropdownToggle>
                                <DropdownMenu>
                                  {workerExperience?.map((item) => (
                                    <DropdownItem
                                      onClick={() => expChangeHandler(item)}>
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
                            <Label for="examplePassword">
                              {t('education')}
                            </Label>
                            <InputGroup
                              onClick={() =>
                                setEduDropdownOpen(!eduDropdownOpen)
                              }>
                              <Input
                                style={{background: '#fff'}}
                                readOnly
                                placeholder={`${t('select')} ${t('education')}`}
                                value={selectedEdu?.name}
                              />
                              <InputGroupButtonDropdown
                                addonType="append"
                                isOpen={eduDropdownOpen}
                                toggle={() =>
                                  setEduDropdownOpen(!eduDropdownOpen)
                                }>
                                <DropdownToggle>
                                  <p>{'>'}</p>
                                </DropdownToggle>
                                <DropdownMenu>
                                  {workerEducation?.map((item) => (
                                    <DropdownItem
                                      onClick={() => eduChangeHandler(item)}>
                                      {item?.name}
                                    </DropdownItem>
                                  ))}
                                </DropdownMenu>
                              </InputGroupButtonDropdown>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} md={6} sm={12}>
                          <FormGroup>
                            <Label for="examplePassword">
                              {t('maritalStatus')}
                            </Label>
                            <InputGroup
                              onClick={() =>
                                setMaritalDropdownOpen(!maritalDropdownOpen)
                              }>
                              <Input
                                style={{background: '#fff'}}
                                readOnly
                                placeholder={`${t('select')} ${t(
                                  'maritalStatus',
                                )}`}
                                value={selectedMarital?.name}
                              />
                              <InputGroupButtonDropdown
                                addonType="append"
                                isOpen={maritalDropdownOpen}
                                toggle={() =>
                                  setMaritalDropdownOpen(!maritalDropdownOpen)
                                }>
                                <DropdownToggle>
                                  <p>{'>'}</p>
                                </DropdownToggle>
                                <DropdownMenu>
                                  {maritalStatus?.map((item) => (
                                    <DropdownItem
                                      onClick={() =>
                                        maritalChangeHandler(item)
                                      }>
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
                            <Label for="examplePassword">
                              {t('speakingLanguages')}
                            </Label>
                            <InputGroup onClick={() => setLangOpen(!langOpen)}>
                              <Input
                                style={{background: '#fff'}}
                                readOnly
                                placeholder={`${t('select')} ${t(
                                  'speakingLanguages',
                                )}`}
                                value={showMultipleSelections(selectedLang)}
                              />
                              <InputGroupButtonDropdown
                                addonType="append"
                                isOpen={langOpen}
                                toggle={() => setLangOpen(!langOpen)}>
                                <DropdownToggle>
                                  <p>{'>'}</p>
                                </DropdownToggle>
                                <DropdownMenu>
                                  {speakingLanguage?.map((item) => (
                                    <DropdownItem
                                      style={{
                                        color: `${
                                          selectedLang.find(
                                            (el) => el._id === item._id,
                                          ) && 'green'
                                        }`,
                                      }}
                                      onClick={() => langChangeHandler(item)}>
                                      {item?.name}
                                    </DropdownItem>
                                  ))}
                                </DropdownMenu>
                              </InputGroupButtonDropdown>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} md={6} sm={12}>
                          <FormGroup>
                            <Label for="examplePassword">
                              {t('nationality')}
                            </Label>
                            <Select
                              styles={{marginLeft: '40px', width: '200px'}}
                              options={options}
                              value={nationality}
                              onChange={nationalityChangeHandler}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                          <FormGroup>
                            <Label for="examplePassword">{t('dob')}</Label>
                            <br />
                            <DatePicker onChange={setDob} value={dob} />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} md={6} sm={12}>
                          <Label for="examplePassword">{t('worked')}</Label>
                          <br />
                          <input
                            type={'radio'}
                            checked={worked}
                            onChange={workedHandler}
                            value={'Yes'}
                          />{' '}
                          Yes &nbsp; &nbsp; &nbsp;
                          <input
                            type={'radio'}
                            checked={!worked}
                            onChange={workedHandler}
                            value={'No'}
                          />{' '}
                          No
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                          <FormGroup>
                            <Label for="examplePassword">
                              {t('prefCountry')}
                            </Label>
                            <InputGroup onClick={() => setPrefOpen(!prefOpen)}>
                              <Input
                                style={{background: '#fff'}}
                                readOnly
                                placeholder={`${t('select')} ${t(
                                  'countryPreference',
                                )}`}
                                value={showMultipleSelections(
                                  selectedPref,
                                  true,
                                )}
                              />
                              <InputGroupButtonDropdown
                                addonType="append"
                                isOpen={prefOpen}
                                toggle={() => setPrefOpen(!prefOpen)}>
                                <DropdownToggle>
                                  <p>{'>'}</p>
                                </DropdownToggle>
                                <DropdownMenu>
                                  {countries?.map((item) => (
                                    <DropdownItem
                                      style={{
                                        color: `${
                                          selectedPref.find(
                                            (el) => el._id === item._id,
                                          ) && 'green'
                                        }`,
                                      }}
                                      onClick={() => prefChangeHandler(item)}>
                                      {item?.name[lang]}
                                    </DropdownItem>
                                  ))}
                                </DropdownMenu>
                              </InputGroupButtonDropdown>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                    </>
                  )}

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
                                    placeholder={t('answerPlaceholder')}
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
                                      checked={answers
                                        .find(
                                          (val) => val.questionId === item?._id,
                                        )
                                        ?.optionId?.includes(opt?._id)}
                                      onClick={(e) => {
                                        setAnswersValue(
                                          item?._id,
                                          item?.questionType,
                                          opt?._id,
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
                  {loading ? <Spinner /> : t('add')}
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
