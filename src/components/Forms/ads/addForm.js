import React from 'react';

// reactstrap components

// core components
import Header from '../../Headers/Header.js';
import {Col, Row, Container, Form, FormGroup, Label, Input} from 'reactstrap';

const DashboardForm = () => {
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
                    <Col lg={3} md={12} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input
                          type="email"
                          name="email"
                          id="exampleEmail"
                          placeholder="with a placeholder"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={1} />
                    <Col lg={3} md={12} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                          type="password"
                          name="password"
                          id="examplePassword"
                          placeholder="password placeholder"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
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
