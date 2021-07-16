import React, {useEffect} from 'react';

import Header from '../../Headers/Header.js';
import {Col, Row, Container, Form, FormGroup, Label, Input} from 'reactstrap';

import {useDispatch, useSelector} from 'react-redux';

import {getSingleUser} from '../../../redux/actions/users.actions.js';
import {useHistory} from 'react-router';
import {useParams} from 'react-router-dom';
const DashboardForm = () => {
  const history = useHistory();
  //redux
  const dispatch = useDispatch();
  const {loading, user} = useSelector((state) => state.usersReducer);

  const {id} = useParams();

  useEffect(() => {
    dispatch(getSingleUser(id));

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
              <h2 className="dashboard-form-header">User</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name </Label>
                        <Input
                          type="text"
                          placeholder="Enter name"
                          value={user?.name}
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input
                          type="text"
                          placeholder="Enter email address"
                          value={user?.email}
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Phone</Label>
                        <Input
                          type="tel"
                          placeholder="Enter full phone numbe"
                          value={user?.fullName}
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className="dashboard-form-footer">
                <button
                  className="form-cancel-button"
                  onClick={() => history.push('/admin/users')}>
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
