import React, {useState, useEffect} from 'react';

// reactstrap components

// core components
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
import uploadIcon from '../../../assets/images/icons/form/upload-icon.png';
import {imageUploader} from '../../../utils/imageUpload.js';
import {useDispatch, useSelector} from 'react-redux';
import {categoriesConstants} from '../../../redux/constants';

import {useParams} from 'react-router-dom';
import {
  editCategory,
  getSingleCategory,
} from '../../../redux/actions/categories.actions.js';

const DashboardForm = ({history}) => {
  //redux
  const dispatch = useDispatch();

  //import loading and error as well
  const {category, loading} = useSelector((state) => state.categoriesReducer);

  const [icon, setIcon] = useState(null);
  const [name, setName] = useState('');

  const {id} = useParams();

  useEffect(() => {
    dispatch(getSingleCategory(id));
    if (!category) {
      dispatch(getSingleCategory(id));
    } else {
      setName(category?.name?.en);
    }

    // eslint-disable-next-line
  }, [dispatch, id, category?.name?.en]);

  const inputFileHandler = (e) => setIcon(e.target?.files?.[0]);

  const validateForm = () => !!name;

  const editWithIcon = async () => {
    dispatch({type: categoriesConstants.CATEGORY_LOADING});
    const formData = new FormData();
    formData.append('image', icon);

    const imageUrl = await imageUploader(formData);
    if (imageUrl) {
      dispatch(
        editCategory(
          {
            name: {en: name, ar: 'string', hi: 'string', ph: 'string'},
            icon: imageUrl,
            categoryId: id,
          },
          history,
        ),
      );
    } else {
      //pop an error alert
      dispatch({type: categoriesConstants.CATEGORY_ERROR});
    }
  };
  const editWithoutIcon = async () =>
    dispatch(
      editCategory(
        {
          name: {en: name, ar: 'string', hi: 'string', ph: 'string'},
          icon: category?.icon,
          categoryId: id,
        },
        history,
      ),
    );

  const submitHandler = () => (icon ? editWithIcon() : editWithoutIcon());

  return (
    <>
      <Header cardsVisible={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <div className="dashboard-form-container">
              <h2 className="dashboard-form-header">Edit Category</h2>
              <div className="dashboard-form-body">
                <Form>
                  <Row form>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="exampleEmail">Name</Label>
                        <Input
                          type="text"
                          value={name}
                          name="name"
                          placeholder="Enter url"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                      <FormGroup>
                        <Label for="examplePassword">Icon </Label>
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
                      <br />

                      <img
                        alt={'Gulf wrokers'}
                        src={`https://api.gccworkers.app/common/v1/resizer/${category?.icon}/80/80`}
                      />
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className="dashboard-form-footer">
                <button
                  className="form-cancel-button"
                  onClick={() => history.push('/admin/categories')}>
                  Cancel
                </button>
                <button
                  onClick={submitHandler}
                  className="table-header-button"
                  disabled={!validateForm() || loading}>
                  {loading ? <Spinner color={'info'} /> : 'Update'}
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
