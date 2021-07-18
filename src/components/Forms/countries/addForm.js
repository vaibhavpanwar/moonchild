import React, {useState} from 'react';

import Header from '../../Headers/Header.js';
import {
  Col,
  Row,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  Spinner,
} from 'reactstrap';

import {useDispatch, useSelector} from 'react-redux';
import uploadIcon from '../../../assets/images/icons/form/upload-icon.png';
import {addCountry} from '../../../redux/actions/countries.actions';
import cogoToast from 'cogo-toast';
import {countriesConstants} from '../../../redux/constants/countries.constants.js';
import {imageUploader} from '../../../utils/imageUpload.js';

const DashboardForm = ({history}) => {
  //redux
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.countriesReducer);
  const [icon, setIcon] = useState(null);
  const [name, setName] = useState({
    en: '',
    hi: '',
    ar: '',
    ph: '',
  });

  const {en, hi, ar, ph} = name;

  const inputFileHandler = (e) => setIcon(e.target?.files?.[0]);
  const onChangeHandler = (e) =>
    setName({...name, [e.target.name]: e.target.value});

  const validateForm = () => !!name;

  const submitHandler = async () => {
    dispatch({type: countriesConstants.COUNTRY_LOADING});
    const formData = new FormData();
    formData.append('image', icon);

    const imageUrl = await imageUploader(formData);
    if (imageUrl) {
      dispatch(
        addCountry(
          {
            name,
            icon: imageUrl,
          },
          history,
        ),
      );
    } else {
      cogoToast.error('Something went wrong', {
        hideAfter: 3,
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <Header cardsVisible={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <div className="dashboard-form-container">
              <h2 className="dashboard-form-header">Add Country</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name (English)</Label>
                        <Input
                          type="text"
                          placeholder="Enter name"
                          value={en}
                          name={'en'}
                          onChange={onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name (Arabic)</Label>
                        <Input
                          type="text"
                          placeholder="Enter name"
                          value={ar}
                          name={'ar'}
                          onChange={onChangeHandler}
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
                          value={hi}
                          name={'hi'}
                          onChange={onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name (Philipins)</Label>
                        <Input
                          type="text"
                          placeholder="Enter name"
                          value={ph}
                          name={'ph'}
                          onChange={onChangeHandler}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">Upload Icon </Label>
                        <InputGroup>
                          <label className="form-control chooseFile">
                            {' '}
                            <Input
                              type="file"
                              name="icon-upload"
                              placeholder="Ppload file"
                              onChange={inputFileHandler}>
                              {' '}
                            </Input>
                            {icon && (
                              <p className="file-input-name">{icon?.name}</p>
                            )}
                          </label>

                          <div className="upload-icon">
                            <img
                              alt={'upload'}
                              style={{maxWidth: '15px'}}
                              src={uploadIcon}
                            />
                          </div>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className="dashboard-form-footer">
                <button
                  className="form-cancel-button"
                  onClick={() => history.push('/admin/countries')}>
                  Cancel
                </button>
                <button
                  onClick={submitHandler}
                  className="table-header-button"
                  disabled={!validateForm() || loading}>
                  {loading ? <Spinner color={'info'} /> : 'Add'}
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
