import React from 'react';

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
// core components
import Header from '../Headers/Header.js';
import eyeIcon from '../../assets/images/icons/table/table-eye-icon.svg';
import editIcon from '../../assets/images/icons/table/table-edit-icon.svg';
import deleteIcon from '../../assets/images/icons/table/table-delete-icon.svg';

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
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col">Transaction Id</th>
                    <th scope="col">Payment Date</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TGYP223HID</td>
                    <td>15/02/2019</td>
                    <td>John Doe</td>
                    <td>$2,500 USD</td>
                  </tr>
                  <tr>
                    <td>TGYP223HID</td>
                    <td>15/02/2019</td>
                    <td>John Doe</td>
                    <td>$2,500 USD</td>
                  </tr>
                  <tr>
                    <td>TGYP223HID</td>
                    <td>15/02/2019</td>
                    <td>John Doe</td>
                    <td>$2,500 USD</td>
                  </tr>
                  <tr>
                    <td>TGYP223HID</td>
                    <td>15/02/2019</td>
                    <td>John Doe</td>
                    <td>$2,500 USD</td>
                  </tr>
                  <tr>
                    <td>TGYP223HID</td>
                    <td>15/02/2019</td>
                    <td>John Doe</td>
                    <td>$2,500 USD</td>
                  </tr>
                  <tr>
                    <td>TGYP223HID</td>
                    <td>15/02/2019</td>
                    <td>John Doe</td>
                    <td>$2,500 USD</td>
                  </tr>
                  <tr>
                    <td>TGYP223HID</td>
                    <td>15/02/2019</td>
                    <td>John Doe</td>
                    <td>$2,500 USD</td>
                  </tr>
                  <tr>
                    <td>TGYP223HID</td>
                    <td>15/02/2019</td>
                    <td>John Doe</td>
                    <td>$2,500 USD</td>
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
