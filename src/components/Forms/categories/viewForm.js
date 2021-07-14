import React, {useEffect} from 'react';

// reactstrap components

// core components
import Header from '../../Headers/Header.js';
import {Col, Row, Container, Form, FormGroup, Label, Input} from 'reactstrap';

import {useDispatch, useSelector} from 'react-redux';

import {useParams} from 'react-router-dom';
import {getSingleCategory} from '../../../redux/actions/categories.actions.js';

const DashboardForm = ({history}) => {
  //import loading and error as well
  const {category, loading} = useSelector((state) => state.categoriesReducer);
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getSingleCategory(id));

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
              <h2 className="dashboard-form-header">Category</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name (English)</Label>
                        <Input
                          type="text"
                          value={category?.name?.en}
                          readOnly
                          name={'en'}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name (Arabic)</Label>
                        <Input
                          type="text"
                          value={category?.name?.ar}
                          readOnly
                          name={'ar'}
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
                          value={category?.name?.hi}
                          readOnly
                          name={'hi'}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name (Philipins)</Label>
                        <Input
                          type="text"
                          value={category?.name?.ph}
                          readOnly
                          name={'ph'}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className="dashboard-form-footer">
                <button
                  className="form-cancel-button"
                  onClick={() => history.push('/admin/categories')}>
                  {loading ? 'Loading..' : 'Cancel'}
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
