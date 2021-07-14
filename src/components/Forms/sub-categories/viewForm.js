import React, {useEffect} from 'react';

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
  Spinner,
} from 'reactstrap';

import {useDispatch, useSelector} from 'react-redux';

import {getImageUrl} from '../../../utils/renderImage';
import {useParams} from 'react-router-dom';
import {getSingleSubCategory} from '../../../redux/actions/sub-categories.actions.js';
import {listCategories} from '../../../redux/actions/categories.actions.js';

const DashboardForm = ({history}) => {
  //redux
  const dispatch = useDispatch();
  const {subCategory, loading} = useSelector(
    (state) => state.subCategoriesReducer,
  );
  const {categories} = useSelector((state) => state.categoriesReducer);

  const {id} = useParams();

  const getCategory = (id) => categories?.find((item) => item?._id === id);

  useEffect(() => {
    dispatch(listCategories());
    dispatch(getSingleSubCategory(id));

    // eslint-disable-next-line
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
              <h2 className="dashboard-form-header">Edit Sub-Category</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name (English)</Label>
                        <Input
                          type="text"
                          value={subCategory?.name?.en}
                          name={'en'}
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name (Arabic)</Label>
                        <Input
                          type="text"
                          value={subCategory?.name?.ar}
                          name={'ar'}
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name (Hindi)</Label>
                        <Input
                          type="text"
                          value={subCategory?.name?.hi}
                          name={'hi'}
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name (Philipins)</Label>
                        <Input
                          type="text"
                          value={subCategory?.name?.ph}
                          name={'ph'}
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">Icon </Label>
                      </FormGroup>
                      <br />

                      <img
                        alt={'Gulf wrokers'}
                        src={getImageUrl(subCategory?.icon, 50, 50)}
                      />
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">
                          Category Name(English){' '}
                        </Label>
                        <InputGroup>
                          <Input
                            style={{background: '#fff'}}
                            readOnly
                            placeholder={'select category'}
                            value={
                              getCategory(subCategory?.categoryId)?.name?.en
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">
                          Category Name (Arabic){' '}
                        </Label>
                        <InputGroup>
                          <Input
                            style={{background: '#fff'}}
                            readOnly
                            placeholder={'select category'}
                            value={
                              getCategory(subCategory?.categoryId)?.name?.ar
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">
                          Category Name(Philipins){' '}
                        </Label>
                        <InputGroup>
                          <Input
                            style={{background: '#fff'}}
                            readOnly
                            placeholder={'select category'}
                            value={
                              getCategory(subCategory?.categoryId)?.name?.pi
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">
                          Category Name(Hindi){' '}
                        </Label>
                        <InputGroup>
                          <Input
                            style={{background: '#fff'}}
                            readOnly
                            placeholder={'select category'}
                            value={
                              getCategory(subCategory?.categoryId)?.name?.hi
                            }
                          />
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
