import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
// reactstrap components
import {Button, Modal, Spinner} from 'reactstrap';
import {errorParser} from '../../redux/actions/errorParser';
import {contactUsConstants} from '../../redux/constants';
import {API} from '../../services/auth';
import {errorAlert, successAlert} from '../../utils/alerts';

const ResolveModal = ({open, setModalOpen, activeRequest}) => {
  const {t} = useTranslation();
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
      toggle={() => {
        setModalOpen();
        setInputData('');
      }}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          {activeRequest?.status === 1
            ? `${t('resolveNoteFor')}  ${activeRequest?.name}`
            : t('resolved')}
        </h5>

        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={() => {
            setModalOpen();
            setInputData('');
          }}></button>
      </div>
      <div className="modal-body">
        <textarea
          style={{
            display: 'block',
            width: '100%',
            height: '150px',
          }}
          readOnly={!!activeRequest?.resolveNote || activeRequest?.status === 2}
          type="text"
          name={'en'}
          value={
            activeRequest?.status === 2
              ? !!activeRequest?.resolveNote
                ? activeRequest?.resolveNote
                : t('noResolveNote')
              : inputData
          }
          onChange={(e) =>
            !!activeRequest?.status === 2 ? false : setInputData(e.target.value)
          }
        />
      </div>
      <div className="modal-footer">
        <Button
          color="secondary"
          data-dismiss="modal"
          type="button"
          onClick={() => {
            setModalOpen();
            setInputData('');
          }}>
          {t('close')}
        </Button>

        {activeRequest?.status === 1 && (
          <Button
            style={{background: '#007bff'}}
            disabled={!activeRequest?._id || loading}
            onClick={onSubmit}
            color="primary"
            type="button">
            {loading ? <Spinner color={'info'} /> : t('resolve')}
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default ResolveModal;
