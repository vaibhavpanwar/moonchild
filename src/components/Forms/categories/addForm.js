import React, {useState} from 'react';

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
} from 'reactstrap';
import uploadIcon from '../../../assets/images/icons/form/upload-icon.png';

const DashboardForm = () => {
  const [icon, setIcon] = useState(null);
  const [name, setName] = useState('');

  const inputFileHandler = (e) => setIcon(e.target?.files?.[0]);

  return (
    <>
      <Header cardsVisible={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <div className="dashboard-form-container">
              <h2 className="dashboard-form-header">Add Category</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name</Label>
                        <Input
                          type="text"
                          name="email"
                          id="exampleEmail"
                          placeholder="Enter name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">Upload Icon </Label>
                        <InputGroup>
                          <label className="form-control chooseFile">
                            {' '}
                            <Input
                              type="file"
                              name="icon-upload"
                              placeholder="Ppload file"
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
