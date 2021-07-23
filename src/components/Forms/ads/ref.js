/**
 * Created by rf1804
 *
 * @format
 */

import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Navigation} from 'react-native-navigation';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import FastImage from 'react-native-fast-image';
import {Dropdown} from 'react-native-material-dropdown';
import {ScaledSheet, s, vs, ms, mvs} from 'react-native-size-matters';

import {Colors, Styles, Config, string} from '@global';
import Validation from '../Validation';

import * as userActions from '../actions/userActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');

const JobOwnerCreateAd = (props) => {
  const {
    visible,
    lang,
    netStatus,
    textAlign,
    fontFamilyNormal,
    fontFamilyMedium,
    fontFamilyBold,
    isLoggedIn,
    categoriesWithSubCategoriesList,
  } = props.user;
  const [refresh, setRefresh] = useState(false);
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    if (categoriesWithSubCategoriesList.length) {
      setCategory(categoriesWithSubCategoriesList[0]._id);
    }
  }, [categoriesWithSubCategoriesList]);
  const back = () => {
    Navigation.pop(props.componentId);
  };
  const stepImage = (itemNumber) => {
    if (step > itemNumber) {
      return require('@images/ic_step_completed.png');
    } else if (step == itemNumber) {
      return require('@images/ic_step_filled.png');
    } else {
      return require('@images/ic_step.png');
    }
  };
  const callToSetCategory = (categoryId) => {
    setCategory(categoryId);
    setSubCategory('');
  };
  const renderHeaderFooter = () => {
    return <View style={Styles.heightSeperator16} />;
  };
  const renderCategorySeperator = () => {
    return <View style={Styles.widthSeperator16} />;
  };
  const renderCategory = (data) => {
    return (
      <TouchableOpacity
        hitSlope={{top: 10, bottom: 10, left: 10, right: 10}}
        style={[
          LocalStyles.categoryContainer,
          {
            borderColor:
              category === data.item._id ? Colors.primary : Colors.white,
          },
        ]}
        onPress={() => callToSetCategory(data.item._id)}>
        <View style={LocalStyles.catImageView}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={[
              LocalStyles.catImage,
              lang === 'ar' ? {transform: [{scaleX: -1}]} : null,
            ]}
            source={{
              uri: `${Config.apiUrl}${Config.apiCommonTag}resizer/${
                data.item.icon
              }/${vs(48 * 2).toFixed(0)}/${vs(48 * 2).toFixed(0)}`,
            }}
          />
        </View>
        <View style={LocalStyles.catTextView}>
          <Text
            numberOfLines={2}
            style={[
              LocalStyles.catText,
              {
                fontFamily: fontFamilyMedium,
              },
            ]}>
            {data.item.name[lang]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderCategoryEmpty = () => {
    return (
      <View style={Styles.container}>
        <View style={LocalStyles.emptyTextContainer}>
          {categoriesWithSubCategoriesList.length ? null : (
            <Text style={[LocalStyles.emptyText, {fontFamily: fontFamilyBold}]}>
              {string('noCategories')}
            </Text>
          )}
        </View>
      </View>
    );
  };
  const renderSubCategorySeperator = () => {
    return <View style={LocalStyles.seperatorLine} />;
  };
  const renderSubCategory = (data) => {
    return (
      <TouchableOpacity
        hitSlope={{top: 10, bottom: 10, left: 10, right: 10}}
        style={LocalStyles.subCategoryView}
        onPress={() =>
          setSubCategory(subCategory === data.item._id ? '' : data.item._id)
        }>
        <Text
          style={[
            LocalStyles.subCategoryText,
            {
              color:
                subCategory === data.item._id
                  ? Colors.primary
                  : Colors.textColor,
              fontFamily: fontFamilyMedium,
            },
          ]}>
          {data.item.name[lang]}
        </Text>
        <Image
          style={[
            LocalStyles.arrowImage,
            lang === 'ar' ? {transform: [{scaleX: -1}]} : null,
          ]}
          source={require('@images/ic_next.png')}
        />
      </TouchableOpacity>
    );
  };
  const renderSubCategoryEmpty = () => {
    return (
      <View style={Styles.container}>
        <View style={LocalStyles.emptyTextContainer}>
          {categoriesWithSubCategoriesList.length ? null : (
            <Text style={[LocalStyles.emptyText, {fontFamily: fontFamilyBold}]}>
              {string('noSubCategories')}
            </Text>
          )}
        </View>
      </View>
    );
  };
  const renderQuestionSeperator = () => {
    return <View style={LocalStyles.heightSeperator20} />;
  };
  const renderQuestionHeaderFooter = () => {
    return <View style={Styles.heightSeperator16} />;
  };
  const renderQuestion = (data) => {
    if (data.item.questionType === 1) {
      return (
        <View style={Styles.textInputContainer}>
          <Text style={[Styles.textInputLabel, {fontFamily: fontFamilyBold}]}>
            {data.item.question[lang]}
          </Text>
          <View style={Styles.textInputSeperator} />
          <TextInput
            style={[
              Styles.textInput,
              {
                fontFamily: fontFamilyNormal,
                textAlign: textAlign,
                backgroundColor: Colors.white,
              },
            ]}
            placeholder={string('genericTextInputPlaceholder', {
              textInputPlaceholder: data.item.question[lang],
            })}
            placeholderTextColor={Colors.textInputPlaceholderColor}
            keyboardType="default"
            returnKeyLabel={string('keyLabelNext')}
            returnKeyType="next"
            underlineColorAndroid={Colors.transparent}
            autoCorrect={false}
            autoCapitalize="none"
            value={answers.find((e) => e.questionId === data.item._id)?.text}
            onChangeText={(text) =>
              setAnswersValue(data.item._id, data.item.questionType, text)
            }
          />
        </View>
      );
    } else if (data.item.questionType === 2) {
      return (
        <View style={Styles.textInputContainer}>
          <Text style={[Styles.textInputLabel, {fontFamily: fontFamilyBold}]}>
            {data.item.question[lang]}
          </Text>
          <View style={Styles.textInputSeperator} />
          <Dropdown
            itemPadding={vs(10)}
            data={data.item.options}
            baseColor={Colors.transparent}
            renderBase={() => {
              return (
                <View style={[LocalStyles.dropdownContainer]}>
                  {answers.find((e) => e.questionId === data.item._id) ? (
                    <Text
                      style={[
                        Styles.dropSelected,
                        {fontFamily: fontFamilyNormal},
                      ]}>
                      {
                        data.item.options.find(
                          (val) =>
                            val._id ===
                            answers.find((e) => e.questionId === data.item._id)
                              ?.optionId[0],
                        )?.name[lang]
                      }
                    </Text>
                  ) : (
                    <Text
                      style={[
                        Styles.dropPlaceholder,
                        {fontFamily: fontFamilyNormal},
                      ]}>
                      {string('genericDropdownPlaceholder', {
                        dropdownPlaceholder: data.item.question[lang],
                      })}
                    </Text>
                  )}
                  <Image
                    style={Styles.dropdownImageBig}
                    source={require('@images/ic_dropdown.png')}
                  />
                </View>
              );
            }}
            valueExtractor={(item, index) => {
              return (
                <Text
                  style={[Styles.dropItemText, {fontFamily: fontFamilyNormal}]}>
                  {item.name[lang]}
                </Text>
              );
            }}
            onChangeText={(value, i, valData) => {
              setAnswersValue(
                data.item._id,
                data.item.questionType,
                valData[i]._id,
              );
            }}
          />
        </View>
      );
    } else if (data.item.questionType === 3) {
      return (
        <View style={Styles.textInputContainer}>
          <Text style={[Styles.textInputLabel, {fontFamily: fontFamilyBold}]}>
            {data.item.question[lang]}
          </Text>
          <View style={Styles.textInputSeperator} />
          <Dropdown
            itemPadding={vs(10)}
            data={data.item.options}
            baseColor={Colors.transparent}
            renderBase={() => {
              return (
                <View style={[LocalStyles.dropdownContainer]}>
                  {answers.find((e) => e.questionId === data.item._id) ? (
                    <Text
                      style={[
                        Styles.dropSelected,
                        {fontFamily: fontFamilyNormal},
                      ]}>
                      {answers
                        .find((e) => e.questionId === data.item._id)
                        .optionId.map((option, i) =>
                          i === 0
                            ? data.item.options.find(
                                (val) => val._id === option,
                              ).name[lang]
                            : ', ' +
                              data.item.options.find(
                                (val) => val._id === option,
                              ).name[lang],
                        )}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        Styles.dropPlaceholder,
                        {fontFamily: fontFamilyNormal},
                      ]}>
                      {string('genericDropdownPlaceholder', {
                        dropdownPlaceholder: data.item.question[lang],
                      })}
                    </Text>
                  )}
                  <Image
                    style={Styles.dropdownImageBig}
                    source={require('@images/ic_up_down_arrow.png')}
                  />
                </View>
              );
            }}
            valueExtractor={(item, index) => {
              return (
                <View style={LocalStyles.multiValueContainer}>
                  <Text
                    style={[
                      Styles.dropItemText,
                      {
                        maxWidth: width - s(74),
                        fontFamily: fontFamilyNormal,
                      },
                    ]}>
                    {item.name[lang]}
                  </Text>
                  {answers
                    .find((e) => e.questionId === data.item._id)
                    ?.optionId?.some((val) => val === item._id) ? (
                    <Image
                      style={{height: 20, width: 20}}
                      source={require('@images/ic_selected.png')}
                    />
                  ) : null}
                </View>
              );
            }}
            onChangeText={(value, i, valData) => {
              setAnswersValue(
                data.item._id,
                data.item.questionType,
                valData[i]._id,
              );
            }}
          />
        </View>
      );
    } else if (data.item.questionType === 4) {
      return (
        <View style={Styles.textInputContainer}>
          <Text style={[Styles.textInputLabel, {fontFamily: fontFamilyBold}]}>
            {data.item.question[lang]}
          </Text>
          <View style={Styles.heightSeperator16} />
          <View style={LocalStyles.rowContainer}>
            <View style={LocalStyles.rowContainer}>
              <TouchableOpacity
                hitSlope={{top: 10, bottom: 10, left: 10, right: 10}}
                onPress={() =>
                  setAnswersValue(
                    data.item._id,
                    data.item.questionType,
                    data.item.options[0]._id,
                  )
                }>
                <Image
                  style={LocalStyles.booleanImage}
                  source={booleanImageSelector(
                    data.item._id,
                    data.item.options[0]._id,
                  )}
                />
              </TouchableOpacity>
              <View style={Styles.widthSeperator16} />
              <Text
                style={[
                  LocalStyles.booleanText,
                  {fontFamily: fontFamilyMedium},
                ]}>
                {data.item.options[0].name[lang]}
              </Text>
            </View>
            <View style={LocalStyles.widthSeperator64} />
            <View style={LocalStyles.rowContainer}>
              <TouchableOpacity
                hitSlope={{top: 10, bottom: 10, left: 10, right: 10}}
                onPress={() =>
                  setAnswersValue(
                    data.item._id,
                    data.item.questionType,
                    data.item.options[1]._id,
                  )
                }>
                <Image
                  style={LocalStyles.booleanImage}
                  source={booleanImageSelector(
                    data.item._id,
                    data.item.options[1]._id,
                  )}
                />
              </TouchableOpacity>
              <View style={Styles.widthSeperator16} />
              <Text
                style={[
                  LocalStyles.booleanText,
                  {fontFamily: fontFamilyMedium},
                ]}>
                {data.item.options[1].name[lang]}
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };
  const renderQuestionEmpty = () => {
    return (
      <View style={Styles.container}>
        <View style={LocalStyles.emptyTextContainer}>
          {questions.length ? null : (
            <Text style={[LocalStyles.emptyText, {fontFamily: fontFamilyBold}]}>
              {string('noQuestions')}
            </Text>
          )}
        </View>
      </View>
    );
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
  const booleanImageSelector = (questionId, selectedOption) => {
    if (
      selectedOption ===
      answers.find((e) => e.questionId === questionId)?.optionId[0]
    ) {
      return require('@images/ic_boolean_selected.png');
    } else {
      return require('@images/ic_boolean_unselected.png');
    }
  };
  const onRefresh = useCallback(() => {
    setRefresh(true);
    if (step === 1) {
      fetchCategoriesWithSubCategories();
    } else {
      getQuestions();
    }
  }, []);
  const fetchCategoriesWithSubCategories = () => {
    if (!netStatus) {
      setRefresh(false);
      return props.actions.showOptionsAlert(string('NetAlert'));
    } else {
      axios
        .get(`${Config.apiUrl}${Config.apiUserTag}listCategoryWithSubCategory`)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.data.listing.length) {
              props.actions.setCategoriesWithSubCategories(
                response.data.data.listing,
              );
            }
          } else {
            return response.data.message
              ? props.actions.showOptionsAlert(response.data.message)
              : props.actions.withoutAlertEnable();
          }
          setRefresh(false);
          props.actions.setVisible(false);
        })
        .catch((error) => {
          console.log(error, error.response);
          setRefresh(false);
          if (!error.response) {
            return props.actions.showOptionsAlert(string('NetAlert'));
          } else if (error.response.status == 401) {
            if (isLoggedIn) {
              props.actions.sessionExpire();
            }
          } else {
            return error.response.data.message
              ? props.actions.showOptionsAlert(error.response.data.message)
              : props.actions.withoutAlertEnable();
          }
        });
    }
  };
  const ValidationRulesStep1 = () => {
    return [
      {
        field: category,
        name: string('category'),
        rules: 'required',
        lang: lang,
      },
      {
        field: subCategory,
        name: string('subCategory'),
        rules: 'required',
        lang: lang,
      },
    ];
  };
  const nextStep = (itemNumber) => {
    let validation = Validation.validate(ValidationRulesStep1());
    if (validation.length != 0) {
      return props.actions.showOptionsAlert(validation[0]);
    } else {
      getQuestions();
    }
  };
  const getQuestions = () => {
    if (!netStatus) {
      setRefresh(false);
      return props.actions.showOptionsAlert(string('NetAlert'));
    } else {
      props.actions.setVisible(true);
      axios
        .get(
          `${Config.apiUrl}${Config.apiUserTag}listQuestions?userType=1&categoryId=${category}&subCategoryId=${subCategory}`,
        )
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            // if (response.data.data.listing.length) {
            setQuestions(response.data.data.listing);
            setStep(2);
            // }
          } else {
            return response.data.message
              ? props.actions.showOptionsAlert(response.data.message)
              : props.actions.withoutAlertEnable();
          }
          setRefresh(false);
          props.actions.setVisible(false);
        })
        .catch((error) => {
          console.log(error, error.response);
          setRefresh(false);
          if (!error.response) {
            return props.actions.showOptionsAlert(string('NetAlert'));
          } else if (error.response.status == 401) {
            if (isLoggedIn) {
              props.actions.sessionExpire();
            }
          } else {
            return error.response.data.message
              ? props.actions.showOptionsAlert(error.response.data.message)
              : props.actions.withoutAlertEnable();
          }
        });
    }
  };
  const createAd = async () => {
    if (questions.length !== answers.length || answers.length <= 0) {
      return props.actions.showOptionsAlert(string('allFieldsRequired'));
    } else {
      if (!netStatus) {
        return props.actions.showOptionsAlert(string('NetAlert'));
      } else {
        props.actions.setVisible(true);
        let dataToSend = {
          userType: 1,
          categoryId: category,
          subCategoryId: subCategory,
          additionalQuestion: answers,
        };
        axios
          .post(
            `${Config.apiUrl}${Config.apiUserTag}addAdvertisement`,
            dataToSend,
          )
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              props.actions.showOptionsAlert(string('adCreateSuccess'));
              back();
            } else {
              return response.data.message
                ? props.actions.showOptionsAlert(response.data.message)
                : props.actions.withoutAlertEnable();
            }
          })
          .catch((error) => {
            console.log(error.response);
            if (!error.response) {
              return props.actions.showOptionsAlert(string('NetAlert'));
            } else if (error.response.status == 401) {
              if (props.user.isLoggedIn) {
                props.actions.sessionExpire();
              }
            } else {
              return error.response.data.message
                ? props.actions.showOptionsAlert(error.response.data.message)
                : props.actions.withoutAlertEnable();
            }
          });
      }
    }
  };
  return (
    <>
      <View style={Styles.containerWhiteBg}>
        <Spinner
          visible={visible}
          color={Colors.primary}
          overlayColor={Colors.spinnerOverlayColor}
          animation={Styles.spinnerAnimationType}
          cancelable={false}
        />
        <SafeAreaView style={Styles.container}>
          <View style={LocalStyles.headerContainer}>
            <View style={Styles.headerContentContaier}>
              <TouchableOpacity
                hitSlope={{top: 10, bottom: 10, left: 10, right: 10}}
                style={Styles.headerSubView1}
                onPress={back}>
                <Image
                  style={[
                    Styles.backImage,
                    lang === 'ar' ? {transform: [{scaleX: -1}]} : null,
                  ]}
                  source={require('@images/ic_back.png')}
                />
              </TouchableOpacity>
              <View style={Styles.headerSubView2}>
                <Text
                  style={[
                    Styles.headerTitleBlack,
                    {fontFamily: fontFamilyBold},
                  ]}>
                  {string('createAdvertisement')}
                </Text>
              </View>
              <View style={Styles.headerSubView3} />
            </View>
            <View style={LocalStyles.stepsContainer}>
              <TouchableOpacity
                hitSlope={{top: 10, bottom: 10, left: 10, right: 10}}
                disabled={step === 1}
                style={LocalStyles.stepsView}
                onPress={() => setStep(1)}>
                <Image
                  style={[
                    Styles.backImage,
                    lang === 'ar' ? {transform: [{scaleX: -1}]} : null,
                  ]}
                  source={stepImage(1)}
                />
                <View style={Styles.heightSeperator8} />
                <Text
                  style={[
                    LocalStyles.stepsText,
                    {
                      fontFamily: step > 1 ? fontFamilyMedium : fontFamilyBold,
                      opacity: step < 1 ? 0.4 : 1,
                    },
                  ]}>
                  {string('selectCategory')}
                </Text>
              </TouchableOpacity>
              <View style={LocalStyles.stepsView}>
                <Image
                  style={[
                    Styles.backImage,
                    lang === 'ar' ? {transform: [{scaleX: -1}]} : null,
                  ]}
                  source={stepImage(2)}
                />
                <View style={Styles.heightSeperator8} />
                <Text
                  style={[
                    LocalStyles.stepsText,
                    {
                      fontFamily: step > 2 ? fontFamilyMedium : fontFamilyBold,
                      opacity: step < 2 ? 0.4 : 1,
                    },
                  ]}>
                  {string('addDetails')}
                </Text>
              </View>
            </View>
          </View>
          <ScrollView
            style={LocalStyles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            }>
            {step === 1 ? (
              <View style={Styles.container}>
                <Text
                  style={[
                    LocalStyles.stepHeadingLabel,
                    {fontFamily: fontFamilyBold},
                  ]}>
                  {string('selectYourCategory')}
                </Text>
                <View style={Styles.heightSeperator16} />
                <FlatList
                  key={'category'}
                  style={[Styles.container, {marginHorizontal: s(16)}]}
                  horizontal={true}
                  keyboardShouldPersistTaps="handled"
                  directionalLockEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  data={categoriesWithSubCategoriesList}
                  ItemSeparatorComponent={renderCategorySeperator}
                  initialNumToRender={6}
                  renderItem={renderCategory}
                  ListEmptyComponent={renderCategoryEmpty}
                />
                <View style={Styles.heightSeperator16} />
                <Text
                  style={[
                    LocalStyles.stepHeadingLabel,
                    {fontFamily: fontFamilyBold},
                  ]}>
                  {string('selectSubCategory')}
                </Text>
                <FlatList
                  key={'subCategory'}
                  style={LocalStyles.subCategoryConatiner}
                  keyboardShouldPersistTaps="handled"
                  directionalLockEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  data={
                    category
                      ? categoriesWithSubCategoriesList.find(
                          (e) => e._id === category,
                        ).subCategories
                      : []
                  }
                  ItemSeparatorComponent={renderSubCategorySeperator}
                  ListHeaderComponent={renderHeaderFooter}
                  ListFooterComponent={renderHeaderFooter}
                  initialNumToRender={6}
                  renderItem={renderSubCategory}
                  ListEmptyComponent={renderSubCategoryEmpty}
                />
                {category && subCategory ? (
                  <TouchableOpacity
                    hitSlope={{top: 10, bottom: 10, left: 10, right: 10}}
                    style={[Styles.fullButton, {marginTop: vs(32)}]}
                    onPress={() => nextStep(2)}>
                    <Text style={Styles.fullButtonText}>
                      {string('keyLabelNext')}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : (
              <View style={Styles.container}>
                <Text
                  style={[
                    LocalStyles.stepHeadingLabel,
                    {fontFamily: fontFamilyBold},
                  ]}>
                  {string('enterDetailsAboutYou')}
                </Text>
                <View style={Styles.heightSeperator16} />
                <FlatList
                  key={'question'}
                  style={Styles.container}
                  keyboardShouldPersistTaps="handled"
                  directionalLockEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  data={questions}
                  ItemSeparatorComponent={renderQuestionSeperator}
                  ListHeaderComponent={renderQuestionHeaderFooter}
                  ListFooterComponent={renderQuestionHeaderFooter}
                  initialNumToRender={6}
                  renderItem={renderQuestion}
                  ListEmptyComponent={renderQuestionEmpty}
                />
                {questions.length === answers.length && answers.length > 0 ? (
                  <TouchableOpacity
                    hitSlope={{top: 10, bottom: 10, left: 10, right: 10}}
                    style={[Styles.fullButton, {marginTop: vs(32)}]}
                    onPress={createAd}>
                    <Text style={Styles.fullButtonText}>
                      {string('create')}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            )}
            <View style={Styles.bottomSeperator} />
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};

const LocalStyles = ScaledSheet.create({
  headerContainer: {
    justifyContent: 'flex-end',
    marginBottom: '20@vs',
  },
  stepsContainer: {
    marginTop: '28@vs',
    marginHorizontal: '16@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepsView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heightSeperator4: {
    height: '4@vs',
  },
  stepsText: {
    fontSize: '12@ms',
    textAlign: 'center',
    color: Colors.textColor,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.textInputBackgroundColor,
  },
  stepHeadingLabel: {
    marginTop: '20@vs',
    marginHorizontal: '16@s',
    fontSize: '16@ms',
    textAlign: 'left',
    color: Colors.textColor,
  },
  categoryContainer: {
    height: '112@vs',
    width: '88@s',
    borderRadius: '8@s',
    backgroundColor: Colors.white,
    borderWidth: '1@s',
    justifyContent: 'center',
    alignItems: 'center',
  },
  catImageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  catImage: {
    height: '48@vs',
    width: '48@vs',
  },
  catTextView: {
    marginTop: '16@vs',
    justifyContent: 'center',
    alignItems: 'center',
  },
  catText: {
    fontSize: '13@ms',
    textAlign: 'center',
    color: Colors.textColor,
  },
  subCategoryConatiner: {
    marginTop: '12@vs',
    marginHorizontal: '16@s',
    backgroundColor: Colors.white,
    borderRadius: '6@s',
    borderWidth: '1@s',
    borderColor: '#EDEDED',
  },
  subCategoryView: {
    height: '45@vs',
    flexDirection: 'row',
    marginHorizontal: '16@s',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subCategoryText: {
    fontSize: '14@ms',
    textAlign: 'left',
  },
  arrowImage: {
    height: '24@vs',
    width: '24@vs',
  },
  seperatorLine: {
    height: 1,
    marginStart: '16@s',
    backgroundColor: Colors.textInputBorderColor,
  },
  emptyTextContainer: {
    marginTop: '24@vs',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: '18@ms',
    textAlign: 'center',
    color: Colors.primary,
  },
  heightSeperator20: {
    height: '20@vs',
  },
  dropdownContainer: {
    height: '48@vs',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: '1@s',
    borderColor: Colors.textInputBorderColor,
    borderRadius: '8@s',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  widthSeperator64: {
    width: '64@s',
  },
  booleanImage: {
    height: '18@vs',
    width: '18@vs',
  },
  booleanText: {
    fontSize: '14@ms',
    textAlign: 'left',
    color: Colors.textColor,
  },
  multiValueContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(JobOwnerCreateAd);
