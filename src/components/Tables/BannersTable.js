import React, {useEffect} from 'react';

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
import editIcon from '../../assets/images/icons/table/table-edit-icon.svg';
import deleteIcon from '../../assets/images/icons/table/table-delete-icon.svg';
import SwitchSlider from '../Switch/SwitchSlider.js';
import image1 from '../../assets/images/icons/table/table-banner-image1.png';
import image2 from '../../assets/images/icons/table/table-banner-image2.png';
import {useDispatch} from 'react-redux';
import {listBanners} from '../../redux/actions/banners.actions.js';

const Tables = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listBanners());
  }, [dispatch]);

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

                  <button className="mb-0 table-header-button">{'Add'}</button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light thead-custom">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Url</th>
                    <th scope="col">Status</th>

                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        alt={'Gulf workers'}
                        className="table-banner-image"
                        src={image1}
                      />
                    </td>
                    <td>
                      <a
                        className="table-banner-link"
                        href={'https://google.com'}
                        target="_blank"
                        rel={'noreferrer'}>
                        https://google.com
                      </a>
                    </td>

                    <td>
                      <SwitchSlider />{' '}
                    </td>

                    <td>
                      <img
                        alt={'Gulf workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf workers'}
                        className="td-action-img"
                        src={deleteIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        alt={'Gulf workers'}
                        className="table-banner-image"
                        src={image2}
                      />
                    </td>
                    <td>
                      <a
                        className="table-banner-link"
                        href={'https://google.com'}
                        target="_blank"
                        rel={'noreferrer'}>
                        https://google.com
                      </a>
                    </td>

                    <td>
                      <SwitchSlider />{' '}
                    </td>

                    <td>
                      <img
                        alt={'Gulf workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf workers'}
                        className="td-action-img"
                        src={deleteIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        alt={'Gulf workers'}
                        className="table-banner-image"
                        src={image1}
                      />
                    </td>
                    <td>
                      <a
                        className="table-banner-link"
                        href={'https://google.com'}
                        target="_blank"
                        rel={'noreferrer'}>
                        https://google.com
                      </a>
                    </td>

                    <td>
                      <SwitchSlider />{' '}
                    </td>

                    <td>
                      <img
                        alt={'Gulf workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf workers'}
                        className="td-action-img"
                        src={deleteIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        alt={'Gulf workers'}
                        className="table-banner-image"
                        src={image2}
                      />
                    </td>
                    <td>
                      <a
                        className="table-banner-link"
                        href={'https://google.com'}
                        target="_blank"
                        rel={'noreferrer'}>
                        https://google.com
                      </a>
                    </td>

                    <td>
                      <SwitchSlider />{' '}
                    </td>

                    <td>
                      <img
                        alt={'Gulf workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf workers'}
                        className="td-action-img"
                        src={deleteIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        alt={'Gulf workers'}
                        className="table-banner-image"
                        src={image1}
                      />
                    </td>
                    <td>
                      <a
                        className="table-banner-link"
                        href={'https://google.com'}
                        target="_blank"
                        rel={'noreferrer'}>
                        https://google.com
                      </a>
                    </td>

                    <td>
                      <SwitchSlider />{' '}
                    </td>

                    <td>
                      <img
                        alt={'Gulf workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf workers'}
                        className="td-action-img"
                        src={deleteIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        alt={'Gulf workers'}
                        className="table-banner-image"
                        src={image1}
                      />
                    </td>
                    <td>
                      <a
                        className="table-banner-link"
                        href={'https://google.com'}
                        target="_blank"
                        rel={'noreferrer'}>
                        https://google.com
                      </a>
                    </td>

                    <td>
                      <SwitchSlider />{' '}
                    </td>

                    <td>
                      <img
                        alt={'Gulf workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf workers'}
                        className="td-action-img"
                        src={deleteIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        alt={'Gulf workers'}
                        className="table-banner-image"
                        src={image1}
                      />
                    </td>
                    <td>
                      <a
                        className="table-banner-link"
                        href={'https://google.com'}
                        target="_blank"
                        rel={'noreferrer'}>
                        https://google.com
                      </a>
                    </td>

                    <td>
                      <SwitchSlider />{' '}
                    </td>

                    <td>
                      <img
                        alt={'Gulf workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf workers'}
                        className="td-action-img"
                        src={deleteIcon}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        alt={'Gulf workers'}
                        className="table-banner-image"
                        src={image1}
                      />
                    </td>
                    <td>
                      <a
                        className="table-banner-link"
                        href={'https://google.com'}
                        target="_blank"
                        rel={'noreferrer'}>
                        https://google.com
                      </a>
                    </td>

                    <td>
                      <SwitchSlider />{' '}
                    </td>

                    <td>
                      <img
                        alt={'Gulf workers'}
                        className="td-action-img"
                        src={editIcon}
                      />
                      <img
                        alt={'Gulf workers'}
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
