import React from 'react';

import {Card, CardBody, CardTitle, Container, Row, Col} from 'reactstrap';
import userIcon from '../../assets/images/icons/card-user-icon.svg';
import bellIcon from '../../assets/images/icons/card-bell-icon.svg';
import chatIcon from '../../assets/images/icons/card-chat-icon.svg';
import incomeIcon from '../../assets/images/icons/card-income-icon.svg';
const Header = ({cardsVisible = true, data}) => {
  return (
    <>
      {/* custom style here */}
      <div
        className="header  pb-8 pt-5 pt-md-8"
        style={{backgroundColor: '#3096F7'}}>
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            {cardsVisible && (
              <Row>
                <Col lg="6" xl="3">
                  <Card
                    style={{borderRadius: '10px'}}
                    className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="card-stats-heading-custom">
                            TOTAL REGISTERED USERS
                          </CardTitle>
                          <span className="card-stats-custom">
                            {data?.users?.total}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <img
                            alt={'Gulf workers'}
                            className="card-icon"
                            src={userIcon}
                          />
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> {data?.users?.margin}{' '}
                          %
                        </span>{' '}
                        <span className="card-footer-text-custom">
                          Since last month
                        </span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card
                    style={{borderRadius: '10px'}}
                    className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="card-stats-heading-custom">
                            NUMBER OF ADS
                          </CardTitle>
                          <span className="card-stats-custom">
                            {data?.ads?.total}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <img
                            alt={'Gulf workers'}
                            className="card-icon"
                            src={bellIcon}
                          />
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" />{' '}
                          {data?.ads?.margin} %
                        </span>{' '}
                        <span className="card-footer-text-custom">
                          Since last week
                        </span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card
                    style={{borderRadius: '10px'}}
                    className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="card-stats-heading-custom">
                            NUMBER OF CHATS
                          </CardTitle>
                          <span className="card-stats-custom">
                            {data?.chats?.total}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <img
                            alt={'Gulf workers'}
                            className="card-icon"
                            src={chatIcon}
                          />
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" />{' '}
                          {data?.chats?.margin} %
                        </span>{' '}
                        <span className="card-footer-text-custom">
                          Since yesterday
                        </span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col style={{borderRadius: '10px'}} lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="card-stats-heading-custom">
                            TOTAL INCOME
                          </CardTitle>
                          <span className="card-stats-custom">
                            {data?.income?.total}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <img
                            alt={'Gulf workers'}
                            className="card-icon"
                            src={incomeIcon}
                          />
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" />{' '}
                          {data?.income?.margin} %
                        </span>{' '}
                        <span className="card-footer-text-custom">
                          Since last month
                        </span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
