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
import {useTranslation} from 'react-i18next';
const DashboardForm = () => {
  const history = useHistory();

  const {t} = useTranslation();
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
              <h2 className="dashboard-form-header">{t('editUser')}</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('name')} </Label>
                        <Input
                          type="text"
                          placeholder={t('namePlaceholder')}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('emailAddress')}</Label>
                        <Input
                          type="text"
                          placeholder={t('emailPlaceholder')}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('phoneNumber')}</Label>
                        <Input
                          type="tel"
                          placeholder={t('phonePlaceholder')}
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
                  {t('cancel')}
                </button>
                <button
                  onClick={submitHandler}
                  className="table-header-button"
                  disabled={!validateForm() || loading}>
                  {loading ? <Spinner color={'info'} /> : t('update')}
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
