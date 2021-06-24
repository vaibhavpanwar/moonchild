import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import Footer from '../footer';
import {isAuthenticated} from '../../services/auth';
import {Container, Row, Col, Card, Spinner} from 'react-bootstrap';
function AppLoading() {
  const [isLoading, setLoading] = useState(true);
  const [isAuthToken, setAuthToken] = useState(false);
  useEffect(() => {
    // (async () => {

    // })();
    let isAuthenticatedUser = isAuthenticated();
    if (isAuthenticatedUser) {
      setLoading(false);
      setAuthToken(true);
    } else {
      setLoading(false);
      setAuthToken(false);
    }
  }, []);

  console.log(isAuthToken, '====isAuthToken=====');

  if (!isLoading && isAuthToken) {
    return <Redirect to="/admin/dashboard" />;
  } else if (!isLoading && !isAuthToken) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="wrapper">
      <div className="page-header login-background">
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto mt-5 mb-auto" lg="4" md="6" sm="6">
              <Card className="card text-center =">
                <Card.Body>
                  <img
                    alt=""
                    src={require('../../assets/images/isave_background.png')}
                    width={150}
                  />
                  <Card.Title tag="h3">
                    <Spinner />
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Footer />
        </Container>
      </div>
    </div>
  );
}
export default AppLoading;
