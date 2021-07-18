import React, {useEffect} from 'react';

import Header from '../../Headers/Header.js';
import {
  Col,
  Row,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from 'reactstrap';

import {useDispatch, useSelector} from 'react-redux';

import {getSingleCountry} from '../../../redux/actions/countries.actions';

import {useParams} from 'react-router-dom';
import {getImageUrl} from '../../../utils/renderImage.js';

const DashboardForm = ({history}) => {
  const {id} = useParams();
  //redux
  const dispatch = useDispatch();
  const {loading, country} = useSelector((state) => state.countriesReducer);
  useEffect(() => {
    dispatch(getSingleCountry(id));
  }, [dispatch, id]);

  return (
    <>
      <Header cardsVisible={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <div className="dashboard-form-container">
              <h2 className="dashboard-form-header">View Country</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name (English)</Label>
                        <Input
                          type="text"
                          placeholder="Enter name"
                          value={country?.name?.en}
                          readOnly
                          name={'en'}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name (Arabic)</Label>
                        <Input
                          type="text"
                          placeholder="Enter name"
                          value={country?.name?.ar}
                          readOnly
                          name={'ar'}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name (Hindi)</Label>
                        <Input
                          type="text"
                          placeholder="Enter name"
                          value={country?.name?.hi}
                          name={'hi'}
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name (Philipins)</Label>
                        <Input
                          type="text"
                          placeholder="Enter name"
                          value={country?.name?.ph}
                          name={'ph'}
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">Icon </Label>
                      </FormGroup>
                      <br />

                      <img
                        alt={'Gulf wrokers'}
                        src={getImageUrl(country?.icon, 50, 50)}
                      />
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className="dashboard-form-footer">
                <button
                  className="form-cancel-button"
                  onClick={() => history.push('/admin/countries')}>
                  {loading ? <Spinner color={'info'} /> : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default DashboardForm;
