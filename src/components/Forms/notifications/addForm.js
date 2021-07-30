import React, {useState, useEffect} from 'react';

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
  InputGroupButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Spinner,
} from 'reactstrap';
import {
  addNotification,
  getSingleNotification,
} from '../../../redux/actions/notifications.actions.js';
import {useHistory, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const DashboardForm = () => {
  const {id} = useParams();

  const dispatch = useDispatch();
  const {loading, notification} = useSelector(
    (state) => state.notificationsReducer,
  );
  const [dropdownOpen, setdropDowOpen] = useState(false);
  const [title, setTitle] = useState({
    en: '',
    hi: '',
    ar: '',
    ph: '',
  });
  const [message, setMessage] = useState({
    en: '',
    hi: '',
    ar: '',
    ph: '',
  });
  const [topic, setTopic] = useState('');

  const onMessageChangeHandler = (e) =>
    setMessage({...message, [e.target.name]: e.target.value});

  const onTitleChangeHandler = (e) =>
    setTitle({...title, [e.target.name]: e.target.value});

  const history = useHistory();

  const validateForm = () =>
    title?.en &&
    title?.ar &&
    title?.ph &&
    title?.hi &&
    message?.en &&
    message?.hi &&
    message?.ph &&
    message?.ar &&
    topic;

  const submitHandler = async () => {
    dispatch(
      addNotification(
        {
          title,
          message,
          topic,
        },
        history,
      ),
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(getSingleNotification(id));
    }

    // eslint-disable-next-line
  }, [dispatch, id]);

  useEffect(() => {
    if (id && !!notification) {
      setTopic(notification?.topic);
      setMessage(notification?.message);
      setTitle(notification?.title);
    }
  }, [notification, id]);

  const {t} = useTranslation();
  return (
    <>
      <Header cardsVisible={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <div className="dashboard-form-container">
              <h2 className="dashboard-form-header">{t('addNotification')}</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('title')} (English)</Label>
                        <Input
                          type="text"
                          placeholder={t('enter') + ' ' + t('title')}
                          value={title?.en}
                          name={'en'}
                          onChange={onTitleChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('title')} (Arabic)</Label>
                        <Input
                          type="text"
                          placeholder={t('enter') + ' ' + t('title')}
                          value={title?.ar}
                          name={'ar'}
                          onChange={onTitleChangeHandler}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('title')} (Hindi)</Label>
                        <Input
                          type="text"
                          placeholder={t('enter') + ' ' + t('title')}
                          value={title?.hi}
                          name={'hi'}
                          onChange={onTitleChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">
                          {t('title')} (Philipins)
                        </Label>
                        <Input
                          type="text"
                          placeholder={t('enter') + ' ' + t('title')}
                          value={title?.ph}
                          name={'ph'}
                          onChange={onTitleChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                  <hr />
                  <br />
                  <Row form>
                    <Col lg={6} md={12} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">
                          {t('message')} (English)
                        </Label>
                        <textarea
                          style={{
                            display: 'block',
                            width: '100%',
                            height: '150px',
                          }}
                          type="text"
                          placeholder={t('enter') + ' ' + t('message')}
                          value={message?.en}
                          name={'en'}
                          onChange={onMessageChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">
                          {t('message')} (Arabic)
                        </Label>
                        <textarea
                          style={{
                            display: 'block',
                            width: '100%',
                            height: '150px',
                          }}
                          type="text"
                          placeholder={t('enter') + ' ' + t('message')}
                          value={message?.ar}
                          name={'ar'}
                          onChange={onMessageChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col lg={6} md={12} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">{t('message')} (Hindi)</Label>
                        <textarea
                          style={{
                            display: 'block',
                            width: '100%',
                            height: '150px',
                          }}
                          type="text"
                          placeholder={t('enter') + ' ' + t('message')}
                          value={message?.hi}
                          name={'hi'}
                          onChange={onMessageChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">
                          {t('message')} (Philipins)
                        </Label>
                        <textarea
                          style={{
                            display: 'block',
                            width: '100%',
                            height: '150px',
                          }}
                          type="text"
                          placeholder={t('enter') + ' ' + t('message')}
                          value={message?.ph}
                          name={'ph'}
                          onChange={onMessageChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">{t('sendTo')} </Label>
                        <InputGroup>
                          <Input
                            style={{background: '#fff'}}
                            readOnly
                            placeholder={t('select') + t('category')}
                            value={topic}
                          />
                          <InputGroupButtonDropdown
                            addonType="append"
                            isOpen={dropdownOpen}
                            toggle={() => setdropDowOpen(!dropdownOpen)}>
                            <DropdownToggle>
                              <p>{'>'}</p>
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem onClick={() => setTopic('all')}>
                                {t('all')}
                              </DropdownItem>
                              <DropdownItem onClick={() => setTopic('free')}>
                                {t('free')}
                              </DropdownItem>
                              <DropdownItem onClick={() => setTopic('paid')}>
                                {t('paid')}
                              </DropdownItem>
                            </DropdownMenu>
                          </InputGroupButtonDropdown>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className="dashboard-form-footer">
                <button
                  className="form-cancel-button"
                  onClick={() => history.push('/admin/notifications')}>
                  {t('cancel')}
                </button>
                <button
                  className="table-header-button"
                  onClick={submitHandler}
                  disabled={!validateForm() || loading}>
                  {loading ? <Spinner color={'info'} /> : t('add')}
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
