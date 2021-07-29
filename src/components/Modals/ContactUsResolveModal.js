import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
// reactstrap components
import {Button, Modal, Spinner} from 'reactstrap';
import {errorParser} from '../../redux/actions/errorParser';
import {contactUsConstants} from '../../redux/constants';
import {API} from '../../services/auth';
import {errorAlert, successAlert} from '../../utils/alerts';

const ResolveModal = ({open, setModalOpen, activeRequest}) => {
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState('');
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    setLoading(true);
    try {
      const {data} = await API.put('admin/v1/resolveContactUs', {
        contactId: activeRequest?._id,
        resolveNote: inputData,
      });
      if (data) {
        dispatch({
          type: contactUsConstants?.CONTACT_US_EDIT_SUCCESS,
          payload: data.data,
        });
        console.log(data, 'res');
        successAlert('Request Resolved');
        setModalOpen();
        setInputData('');
        setLoading(false);
      }
    } catch (error) {
      const parsedError = await errorParser(error);
      errorAlert(parsedError);
      setLoading(false);
    }
  };

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={open}
      toggle={() => setModalOpen()}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Resolve note for {activeRequest?.name}
        </h5>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={() => setModalOpen()}></button>
      </div>
      <div className="modal-body">
        <textarea
          style={{
            display: 'block',
            width: '100%',
            height: '150px',
          }}
          type="text"
          name={'en'}
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
      </div>
      <div className="modal-footer">
        <Button
          color="secondary"
          data-dismiss="modal"
          type="button"
          onClick={() => setModalOpen()}>
          Close
        </Button>
        <Button
          style={{background: '#007bff'}}
          disabled={!activeRequest?._id || loading}
          onClick={onSubmit}
          color="primary"
          type="button">
          {loading ? <Spinner color={'info'} /> : 'Resolve'}
        </Button>
      </div>
    </Modal>
  );
};

export default ResolveModal;
