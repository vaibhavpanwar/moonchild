import React, {useState, useEffect} from 'react';

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

import {editUser, getSingleUser} from '../../../redux/actions/users.actions.js';
import {useHistory} from 'react-router';
import {useParams} from 'react-router-dom';
const DashboardForm = () => {
  const history = useHistory();
  //redux
  const dispatch = useDispatch();
  const {loading, user} = useSelector((state) => state.usersReducer);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const {id} = useParams();

  useEffect(() => {
    dispatch(getSingleUser(id));

    // eslint-disable-next-line
  }, [dispatch, id]);

  useEffect(() => {
    if (!!user?.name) {
      setName(user?.name);
      setEmail(user?.email);
      setPhone(user?.fullNumber);
    }

    // eslint-disable-next-line
  }, [user?.name]);

  const validateForm = () => !!name && email && phone;

  const submitHandler = async () => {
    dispatch(
      editUser(
        {
          name,
          email,
          fullNumber: phone,
          userId: id,
        },
        history,
      ),
    );
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
              <h2 className="dashboard-form-header">Edit User</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name </Label>
                        <Input
                          type="text"
                          placeholder="Enter name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input
                          type="text"
                          placeholder="Enter email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Phone</Label>
                        <Input
                          type="tel"
                          placeholder="Enter full phone numbe"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
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
