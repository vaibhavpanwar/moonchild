import React from 'react';

import {Card, CardBody, CardTitle, Container, Row, Col} from 'reactstrap';
import userIcon from '../../assets/images/icons/card-user-icon.svg';
import bellIcon from '../../assets/images/icons/card-bell-icon.svg';
import chatIcon from '../../assets/images/icons/card-chat-icon.svg';
import incomeIcon from '../../assets/images/icons/card-income-icon.svg';
import {useTranslation} from 'react-i18next';
const Header = ({cardsVisible = true, data}) => {
  const {t} = useTranslation();
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
                            {t('totalRegisteredUser')}
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
                        <span
                          className={`mr-2 ${
                            data?.users?.margin > 0
                              ? 'text-success'
                              : data?.users?.margin === 0
                              ? 'text-warning'
                              : 'text-danger'
                          }`}>
                          <i className="fa fa-arrow-up" /> {data?.users?.margin}{' '}
                          %
                        </span>{' '}
                        <span className="card-footer-text-custom">
                          {data?.enum === 1
                            ? 'Since Last Month'
                            : data?.enum === 2
                            ? 'Since Last Week'
                            : 'Since Yesterday'}
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
                            {t('numberOfAds')}
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
                        <span
                          className={`mr-2 ${
                            data?.ads?.margin > 0
                              ? 'text-success'
                              : data?.ads?.margin === 0
                              ? 'text-warning'
                              : 'text-danger'
                          }`}>
                          <i className="fas fa-arrow-down" />{' '}
                          {data?.ads?.margin} %
                        </span>{' '}
                        <span className="card-footer-text-custom">
                          {data?.enum === 1
                            ? 'Since Last Month'
                            : data?.enum === 2
                            ? 'Since Last Week'
                            : 'Since Yesterday'}
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
                            {t('numberOfChats')}
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
                        <span
                          className={`mr-2 ${
                            data?.chats?.margin > 0
                              ? 'text-success'
                              : data?.chats?.margin === 0
                              ? 'text-warning'
                              : 'text-danger'
                          }`}>
                          <i className="fas fa-arrow-down" />{' '}
                          {data?.chats?.margin} %
                        </span>{' '}
                        <span className="card-footer-text-custom">
                          {data?.enum === 1
                            ? 'Since Last Month'
                            : data?.enum === 2
                            ? 'Since Last Week'
                            : 'Since Yesterday'}
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
                            {t('totalIncome')}
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
                        <span
                          className={`mr-2 ${
                            data?.income?.margin > 0
                              ? 'text-success'
                              : data?.income?.margin === 0
                              ? 'text-warning'
                              : 'text-danger'
                          }`}>
                          <i className="fas fa-arrow-up" />{' '}
                          {data?.income?.margin} %
                        </span>{' '}
                        <span className="card-footer-text-custom">
                          {data?.enum === 1
                            ? 'Since Last Month'
                            : data?.enum === 2
                            ? 'Since Last Week'
                            : 'Since Yesterday'}
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
