import React from 'react';

function Footer(props) {
  return (
    <div>
      <h6>
        © {new Date().getFullYear()}, Powered{' '}
        <i className="fa fa-check heart" /> by iSave
      </h6>
    </div>
  );
}

export default Footer;
