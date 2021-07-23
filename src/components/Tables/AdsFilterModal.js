import React, {useState} from 'react';
import {Modal} from 'reactstrap';
const AdsFilterModal = ({open, setModalOpen}) => {
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={open}
      toggle={() => setModalOpen()}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Modal title
        </h5>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={() => setModalOpen()}>
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">...</div>
      <div className="modal-footer">
        <Button
          color="secondary"
          data-dismiss="modal"
          type="button"
          onClick={() => setModalOpen()}>
          Close
        </Button>
        <Button color="primary" type="button">
          Save changes
        </Button>
      </div>
    </Modal>
  );
};

export default AdsFilterModal;
