import React, {useState} from 'react';
// node.js library that concatenates classes (strings)
import classnames from 'classnames';
// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
import {Line, Doughnut} from 'react-chartjs-2';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from './chartVariables';

import Header from '../Headers/Header';

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState('data1');

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data('data' + index);
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card style={{backgroundColor: '#fff'}} className=" shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-black mb-0">Active Ads</h2>
                  </div>
                  <div className="col">
                    <Nav
                      className="justify-content-end"
                      style={{display: 'flex', gap: '5px'}}
                      pills>
                      <NavItem>
                        <NavLink
                          className={classnames('chart-buttons py-2 px-3', {
                            activeCustom: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}>
                          <span className="d-none d-md-block">Monthly</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames('chart-buttons py-2 px-3', {
                            activeCustom: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}>
                          <span className="d-none d-md-block">Weekly</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames('chart-buttons py-2 px-3', {
                            activeCustom: activeNav === 3,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 3)}>
                          <span className="d-none d-md-block">Daily</span>
                          <span className="d-md-none">D</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart chart-1">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                  <p className="vertical-tag">Months</p>
                  <p className="horizontal-tag">Number Of Ads</p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Ads per category</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart doughnut-chart">
                  <Doughnut
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
                <div className="doughnut-chart-footer">
                  <div className="doughnut-chart-footer-info">
                    <div className="doughnut-chart-footer-left">
                      <div className="doughnut-red-circle" /> <p>Technician</p>
                    </div>

                    <p>7666</p>
                  </div>
                  <div className="doughnut-chart-footer-info">
                    <div className="doughnut-chart-footer-left">
                      <div className="doughnut-green-circle" /> <p>Medical</p>
                    </div>

                    <p>7666</p>
                  </div>
                  <div className="doughnut-chart-footer-info">
                    <div className="doughnut-chart-footer-left">
                      <div className="doughnut-blue-circle" /> <p>Education</p>
                    </div>

                    <p>7666</p>
                  </div>
                  <div className="doughnut-chart-footer-info">
                    <div className="doughnut-chart-footer-left">
                      <div className="doughnut-green-2-circle" />{' '}
                      <p>Spa- Salon</p>
                    </div>

                    <p>7666</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;

// padding right and bottomm to bada chart
// div class chart height reduce