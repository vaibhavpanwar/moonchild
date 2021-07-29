import React from 'react';
// reactstrap components
import {Button, Modal} from 'reactstrap';

const ResolveModal = ({open, setModalOpen, activeRequest}) => {
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
        <Button style={{background: '#007bff'}} color="primary" type="button">
          Save changes
        </Button>
      </div>
    </Modal>
  );
};

export default ResolveModal;
