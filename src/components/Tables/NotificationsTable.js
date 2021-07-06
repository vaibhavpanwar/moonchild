import React from 'react';

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from 'reactstrap';
// core components
import Header from '../Headers/Header.js';
import roundIcon from '../../assets/images/icons/table/table-notifications-action-icon.svg';

const Tables = () => {
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
                    placeholder={'Search...'}
                    className="table-header-input"
                    type={'text'}
                  />

                  <button className="mb-0 table-header-button">
                    {'Send Notifications'}
                  </button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col">User Name</th>
                    <th scope="col">Message</th>
                    <th scope="col">Sent to</th>
                    <th scope="col">Sent Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>Hey! What is the status of my paymentt</td>
                    <td>Vladimir Putin</td>
                    <td>17/12/2015</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={roundIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>Hey! What is the status of my paymentt</td>
                    <td>Vladimir Putin</td>
                    <td>17/12/2015</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={roundIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>Hey! What is the status of my paymentt</td>
                    <td>Vladimir Putin</td>
                    <td>17/12/2015</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={roundIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>Hey! What is the status of my paymentt</td>
                    <td>Vladimir Putin</td>
                    <td>17/12/2015</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={roundIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>Hey! What is the status of my paymentt</td>
                    <td>Vladimir Putin</td>
                    <td>17/12/2015</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={roundIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>Hey! What is the status of my paymentt</td>
                    <td>Vladimir Putin</td>
                    <td>17/12/2015</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={roundIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>Hey! What is the status of my paymentt</td>
                    <td>Vladimir Putin</td>
                    <td>17/12/2015</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={roundIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>Hey! What is the status of my paymentt</td>
                    <td>Vladimir Putin</td>
                    <td>17/12/2015</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={roundIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>Hey! What is the status of my paymentt</td>
                    <td>Vladimir Putin</td>
                    <td>17/12/2015</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={roundIcon}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0">
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1">
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}>
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}>
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}>
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
