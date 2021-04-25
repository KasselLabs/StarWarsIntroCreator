import React from 'react';
import PropTypes from 'prop-types';

const HelpButton = ({ children }) => (
  <div className="help-button">
    <div className="popover">
      {children}
    </div>
    <div className="icon">?</div>
  </div>
);

HelpButton.propTypes = {
  children: PropTypes.string,
};

export default HelpButton;
