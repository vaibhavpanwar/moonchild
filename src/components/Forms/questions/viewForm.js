import React, {useEffect} from 'react';

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
  Spinner,
} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import {listCategories} from '../../../redux/actions/categories.actions.js';

import {quesTypes, userTypes} from './data.js';

import {getSingleQuestion} from '../../../redux/actions/questions.actions.js';
import {listSubCategories} from '../../../redux/actions/sub-categories.actions.js';
import {finder} from '../../../utils/dataHelpers.js';
import {useParams} from 'react-router-dom';

const DashboardForm = ({history}) => {
  const {id} = useParams();
  //redux
  const dispatch = useDispatch();
  const {categories} = useSelector((state) => state.categoriesReducer);
  const {subCategories} = useSelector((state) => state.subCategoriesReducer);
  const {loading, question} = useSelector((state) => state.questionsReducer);

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listSubCategories());
    dispatch(getSingleQuestion(id));
  }, [dispatch, id]);

  return (
    <>
      <Header cardsVisible={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <div className="dashboard-form-container">
              <h2 className="dashboard-form-header">View Question</h2>

              {loading && (
                <p style={{textAlign: 'center'}}>
                  <Spinner color={'info'} />
                </p>
              )}

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
                            value={`${
                              finder(quesTypes, question?.questionType)?.name
                            } ${
                              finder(quesTypes, question?.questionType)?.enum
                            } `}
                          />
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
                            value={`${
                              finder(userTypes, question?.userType)?.name
                            } ${finder(userTypes, question?.userType)?.enum} `}
                          />
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
                            value={
                              finder(categories, question?.categoryId)?.name?.en
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">Sub Category </Label>
                        <InputGroup>
                          <Input
                            style={{background: '#fff'}}
                            readOnly
                            value={
                              finder(subCategories, question?.subCategoryId)
                                ?.name?.en
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                  <hr />
                  <br />
                  <Row form>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Question (English)</Label>
                        <Input
                          type="text"
                          placeholder="Enter question"
                          readOnly
                          value={question?.question?.en}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Question (Arabic)</Label>
                        <Input
                          type="text"
                          placeholder="Enter question"
                          readOnly
                          value={question?.question?.ar}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Question (Hindi)</Label>
                        <Input
                          type="text"
                          placeholder="Enter question"
                          readOnly
                          value={question?.question?.hi}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Question (Philipins)</Label>
                        <Input
                          type="text"
                          placeholder="Enter question"
                          readOnly
                          value={question?.question?.ph}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                  <hr />
                  <br />
                  {question?.options?.map((item, i) => {
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
                                readOnly
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
                                readOnly
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
                                readOnly
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
                                readOnly
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    );
                  })}
                </Form>
              </div>
              <div className="dashboard-form-footer">
                <button
                  className="form-cancel-button"
                  onClick={() => history.push('/admin/questions')}>
                  {loading ? <Spinner color={'info'} /> : 'Cancel'}
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
