import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import DeathStar from '../../../assets/favicon.png';

const amounts = {
  hd: 7,
  fhd: 10,
  custom: 30,
};

const VideoOptions = ({ updatePaymentAmount }) => {
  const [selectedOption, setSelectedOption] = useState('fhd');

  const selectOption = useCallback((option) => {
    setSelectedOption(option);
    updatePaymentAmount(amounts[option]);
  });

  return (
    <div className="video-options">
      <button
        type="button"
        className={classnames('option',
          { '-selected': 'hd' === selectedOption })}
        onClick={() => selectOption('hd')}
      >
        <span className="title">HD video</span>
        <span className="title">MP4 File</span>
        <span className="description">Donate at least $7</span>
      </button>
      <button
        type="button"
        className={classnames('option',
          { '-selected': 'fhd' === selectedOption })}
        onClick={() => selectOption('fhd')}
      >
        <span className="title">Full HD video</span>
        <span className="title">MP4 File</span>
        <span className="description">Donate at least $10</span>
      </button>
      <button
        type="button"
        className={classnames('option',
          { '-selected': 'custom' === selectedOption })}
        onClick={() => selectOption('custom')}
      >
        <img className="deathstar-icon" src={DeathStar} alt="Death Star" />
        <span className="title">Full HD<br />+ Custom Image</span>
        <span className="description">Donate at least $30</span>
      </button>
    </div>
  );
};

VideoOptions.propTypes = {
  updatePaymentAmount: PropTypes.func,
};

export default VideoOptions;
