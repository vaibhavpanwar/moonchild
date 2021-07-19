import React, {useEffect} from 'react';

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Spinner,
} from 'reactstrap';
// core components
import Header from '../Headers/Header.js';
import nonReplyIcon from '../../assets/images/icons/table/table-non-reply.svg';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {listContactUs} from '../../redux/actions/contactUs.actions';
import moment from 'moment';
const Tables = () => {
  const dispatch = useDispatch();
  const {contacts, loading} = useSelector((state) => state.contactUsReducer);

  useEffect(() => {
    dispatch(listContactUs());
  }, [dispatch]);

  const {t} = useTranslation();
  return (
    <>
      <Header cardsVisible={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="table-shadow">
              <CardHeader className="border-0 table-custom-header">
                <div className="table-header-actions">
                  <input
                    placeholder={t('search')}
                    className="table-header-input"
                    type={'text'}
                  />
                </div>
                {loading && (
                  <div className="table-loader">
                    <Spinner color={'info'} />
                  </div>
                )}
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col">{t('userName')}</th>
                    <th scope="col">{t('emailAddress')}</th>
                    <th scope="col">{t('phoneNumber')}</th>

                    <th scope="col">{t('contactDate')}</th>
                    <th scope="col">{t('status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && contacts?.length === 0 ? (
                    <tr>
                      <td rowSpan={6} colSpan={6}>
                        {' '}
                        No data found
                      </td>
                    </tr>
                  ) : (
                    <>
                      {contacts?.map((item) => (
                        <tr>
                          <td>{item?.name}</td>
                          <td>{item?.email}</td>
                          <td>{item?.phoneNumber}</td>
                          <td>
                            {moment(item?.createdAt).format('DD/MM/YYYY')}
                          </td>
                          <td>
                            {item?.status === 2 ? (
                              <p className="replied">Replied</p>
                            ) : (
                              <img
                                alt="Gulf workers"
                                className="table-non-reply"
                                src={nonReplyIcon}
                              />
                            )}
                          </td>
                          <td></td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </Table>
              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
