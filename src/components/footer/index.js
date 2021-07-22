import React from 'react';

function Footer(props) {
  return (
    <div>
      <h6>
        © {new Date().getFullYear()}, Powered{' '}
        <i className="fa fa-check heart" /> by Gulf Workers
      </h6>
    </div>
  );
}

export default Footer;
