import React from 'react';
import {useTranslation} from 'react-i18next';
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
import eyeIcon from '../../assets/images/icons/table/table-eye-icon.svg';
import editIcon from '../../assets/images/icons/table/table-edit-icon.svg';
import deleteIcon from '../../assets/images/icons/table/table-delete-icon.svg';

const Tables = () => {
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

                  <button className="mb-0 table-header-button">
                    {t('add')}
                  </button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col">{t('name')}</th>
                    <th scope="col">{t('registrationDate')}</th>
                    <th scope="col">{t('phoneNumber')}</th>
                    <th scope="col">{t('lastDateActive')}</th>
                    <th scope="col">{t('numberOfAds')}</th>
                    <th scope="col">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={eyeIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={deleteIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={eyeIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={deleteIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={eyeIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={deleteIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={eyeIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={deleteIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={eyeIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={deleteIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={eyeIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={deleteIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={eyeIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={deleteIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={eyeIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={deleteIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={eyeIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={deleteIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>
                    <td>$2,500 USD</td>

                    <td>
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={eyeIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf Workers'}
                        className="td-action-img"
                        src={deleteIcon}
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
