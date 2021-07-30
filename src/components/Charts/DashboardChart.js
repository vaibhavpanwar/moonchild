import React, {useEffect, useState} from 'react';
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
import {getDashboardData} from '../../redux/actions/dashboard.actions';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const Index = (props) => {
  const dispatch = useDispatch();
  const {dashboardData} = useSelector((state) => state.dashboardReducer);
  const [activeNav, setActiveNav] = useState(1);

  const {t} = useTranslation();
  // const [chartExample1Data, setChartExample1Data] = useState('data1');

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    // setChartExample1Data('data' + index);
  };

  useEffect(() => {
    dispatch(getDashboardData(activeNav));
  }, [dispatch, activeNav]);
  return (
    <>
      <Header
        data={{
          users: dashboardData?.users,
          ads: dashboardData?.adds,
          chats: dashboardData?.chats,
          income: dashboardData?.income,
          enum: activeNav,
        }}
      />

      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card style={{backgroundColor: '#fff'}} className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      {t('overview')}
                    </h6>
                    <h2 className="text-black mb-0">{t('activeAds')}</h2>
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
                          <span className="d-none d-md-block">
                            {t('monthly')}
                          </span>
                          <span className="d-md-none">{t('m')}</span>
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
                          <span className="d-none d-md-block">
                            {t('weekly')}
                          </span>
                          <span className="d-md-none">{t('w')}</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames('chart-buttons py-2 px-3', {
                            activeCustom: activeNav === 3,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 3)}>
                          <span className="d-none d-md-block">
                            {t('daily')}
                          </span>
                          <span className="d-md-none">{t('d')}</span>
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
                    data={{
                      labels: dashboardData?.activeAdds?.map((e) => e.month),
                      datasets: [
                        {
                          label: 'Performance',
                          data: dashboardData?.activeAdds?.map((e) => e.total),
                        },
                      ],
                    }}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                  <p className="vertical-tag">
                    {activeNav === 1
                      ? 'Months'
                      : activeNav === 2
                      ? 'Weeks'
                      : 'Hours'}
                  </p>
                  <p className="horizontal-tag">{t('numberOfAds')}</p>
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
                      {t('performance')}
                    </h6>
                    <h2 className="mb-0">{t('adsByCategory')}</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart doughnut-chart">
                  <Doughnut
                    data={{
                      labels: dashboardData?.addsPercategory?.map(
                        (el) => el?.name?.en,
                      ),
                      datasets: [
                        {
                          label: 'Number Of Ads',
                          data: dashboardData?.addsPercategory?.map(
                            (el) => el?.numberOfAdds,
                          ),

                          backgroundColor: dashboardData?.addsPercategory?.map(
                            (el) => el?.color,
                          ),
                        },
                      ],
                    }}
                    options={chartExample2.options}
                  />
                </div>
                <div className="doughnut-chart-footer">
                  {dashboardData?.addsPercategory?.map((item) => (
                    <div key={item._id} className="doughnut-chart-footer-info">
                      <div className="doughnut-chart-footer-left">
                        <div
                          className="doughnut-red-circle"
                          style={{border: `3px solid ${item?.color}`}}
                        />{' '}
                        <p>{item?.name?.en}</p>
                      </div>

                      <p>{item?.numberOfAdds}</p>
                    </div>
                  ))}
                  {/* <div className="doughnut-chart-footer-info">
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
                      <div
                        className="doughnut-blue-circle"
                        style={{border: '3px solid violet'}}
                      />{' '}
                      <p>Education</p>
                    </div>

                    <p>7666</p>
                  </div>
                  <div className="doughnut-chart-footer-info">
                    <div className="doughnut-chart-footer-left">
                      <div className="doughnut-green-2-circle" />{' '}
                      <p>Spa- Salon</p>
                    </div>

                    <p>7666</p>
                  </div> */}
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
