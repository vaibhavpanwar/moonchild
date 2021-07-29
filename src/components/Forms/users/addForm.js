import React, {useState} from 'react';

import Header from '../../Headers/Header.js';
import {
  Col,
  Row,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from 'reactstrap';

import {useDispatch, useSelector} from 'react-redux';

import {addUser} from '../../../redux/actions/users.actions.js';
import {useHistory} from 'react-router';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const DashboardForm = () => {
  const history = useHistory();
  //redux
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.usersReducer);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [countryCode, setCountryCode] = useState('');
  const [phone, setPhone] = useState('');

  const validateForm = () => !!name && phone && countryCode;

  const submitHandler = async () => {
    dispatch(
      addUser(
        {
          name,
          ...(email && {email}),
          callingCode: countryCode,
          phoneNumber: phone,
        },
        history,
      ),
    );
  };

  const phoneInputHanlder = (number, data) => {
    setCountryCode('+' + data?.dialCode);
    setPhone(number.slice(data.dialCode.length));
  };

  return (
    <>
      <Header cardsVisible={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <div className="dashboard-form-container">
              <h2 className="dashboard-form-header">Add User</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">
                          Name<sup>*</sup>{' '}
                        </Label>
                        <Input
                          style={{borderRadius: '0'}}
                          type="text"
                          placeholder="Enter name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">
                          Phone<sup>*</sup>{' '}
                        </Label>
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
                            phoneInputHanlder(phone, countryData)
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input
                          style={{borderRadius: '0'}}
                          type="text"
                          placeholder="Enter email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                  Cancel
                </button>
                <button
                  onClick={submitHandler}
                  className="table-header-button"
                  disabled={!validateForm() || loading}>
                  {loading ? <Spinner color={'info'} /> : 'Add'}
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
