import React, {useState} from 'react';
import {
  Button,
  Form,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {useAuth} from '../../../redux/actions/auth';
import CoverImage from '../../../assets/images/home-background.png';
import Logo from '../../../assets/images/logo_primary.png';
// import Logo from '../../../assets/images/logo.png';
import {ReactComponent as EyeOpenIcon} from '../../../assets/images/ic_eyeopen.svg';
import {ReactComponent as EyeCloseIcon} from '../../../assets/images/ic_eyeclose.svg';
function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  // eslint-disable-next-line
  const {logingInUser, loading} = useAuth();
  const {t, i18n} = useTranslation();

  const lang = i18n.language;

  // eslint-disable-next-line
  const auth = useSelector((state) => state.auth);
  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    logingInUser({email, password});
  };

  return (
    <Container fluid>
      <Row>
        <Col
          style={{
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#fff',
          }}
          md={7}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="welcomeback">
              <Form.Text style={{fontSize: 30, fontWeight: 'bold'}}>
                <Image src={Logo} style={{height: 82, witdh: 247}} />
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="welcomeback">
              <Form.Text
                className="welcome-back-header"
                style={{
                  fontSize: '3.2rem',
                  fontWeight: '600',
                  marginTop: 30,
                  marginBottom: 30,
                }}>
                {t('welcome')}
              </Form.Text>
              &nbsp; &nbsp;
              <Form.Text
                className="welcome-back-header back"
                style={{
                  fontSize: '3.2rem',
                  fontWeight: '600',
                  marginTop: 30,
                  marginBottom: 30,
                }}>
                {t('back')}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="welcomeback">
              <InputGroup>
                <FormControl
                  style={{
                    width: '30vw',
                    height: 60,
                    background: '#DDDDDD',
                    opacity: '55%',
                    border: 'none',
                    outline: 'none',
                    color: 'rgb(0,0,0)',
                  }}
                  autoFocus
                  type="email"
                  id="email"
                  value={email}
                  placeholder={t('emailAddress')}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="basic-addon3"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <InputGroup>
                <FormControl
                  FormControl
                  style={{
                    width: '30vw',
                    height: 60,
                    background: '#DDDDDD',
                    opacity: '55%',
                    border: 'none',
                    outline: 'none',
                    color: 'rgb(0,0,0)',
                  }}
                  id="password"
                  placeholder={t('password')}
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby="basic-addon3"
                />
                <InputGroup.Append
                  style={{
                    backgroundColor: '#ddd',
                    opacity: '55%',
                    border: 'none',
                    cursor: 'pointer',
                    borderLeft: 0,
                  }}>
                  <InputGroup.Text
                    style={{backgroundColor: 'transparent'}}
                    id="basic-addon3"
                    onClick={() => setShow(!show)}>
                    {show ? (
                      <EyeOpenIcon style={{height: 24, width: 24}} />
                    ) : (
                      <EyeCloseIcon style={{height: 24, width: 24}} />
                    )}
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
            <Form.Group
              style={{display: 'flex', justifyContent: 'space-between'}}>
              <Form.Text className="text-muted">{t('forgot')}</Form.Text>
            </Form.Group>
            <Form.Group>
              <Button
                block
                size="lg"
                style={{height: 50}}
                type="submit"
                disabled={!validateForm()}>
                {t('login')}
              </Button>
              <br />
              <button
                className="lang-switch-button"
                onClick={() => {
                  if (lang === 'en') {
                    i18n.changeLanguage('ar');
                  } else {
                    i18n.changeLanguage('en');
                  }
                }}>
                {' '}
                {lang === 'ar' ? 'English' : 'العربية'}
              </button>
            </Form.Group>
          </Form>
        </Col>
        <Col style={{padding: 0}} md={5}>
          <Image
            src={CoverImage}
            style={{width: '100%', objectFit: 'cover', height: '100vh'}}
          />
        </Col>
      </Row>
    </Container>
  );
}
export default LoginPage;
