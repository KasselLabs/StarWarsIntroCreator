import React, { Fragment, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import DeathStar from '../../../assets/favicon.png';
import HelpButton from './HelpButton';

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
    <>
      <p>Choose your video option:</p>
      <div className="video-options">
        <button
          type="button"
          className={classnames('option',
            { '-selected': selectedOption === 'hd' })}
          onClick={() => selectOption('hd')}
        >
          <span className="title">HD video</span>
          <span className="description">1280 x 720</span>
          <span className="description">MP4 File</span>
          <span className="description">
            Donate at least
            <b>$7</b>
          </span>
        </button>
        <button
          type="button"
          className={classnames('option',
            { '-selected': selectedOption === 'fhd' })}
          onClick={() => selectOption('fhd')}
        >
          <span className="title">Full HD video</span>
          <span className="description">1920 x 1080</span>
          <span className="description">MP4 File</span>
          <span className="description">
            Donate at least
            <b>$10</b>
          </span>
        </button>
        <button
          type="button"
          className={classnames('option',
            { '-selected': selectedOption === 'custom' })}
          onClick={() => selectOption('custom')}
        >
          <HelpButton>
            A more customizable video with the Death Star image replacement.
            Contact us via email to submit your image.
            This take usually less than one business day to be delivered.
          </HelpButton>
          <img className="deathstar-icon" src={DeathStar} alt="Death Star" />
          <span className="title">
            Full HD
            <br />
            + Custom Image
          </span>
          <span className="description">
            Donate at least
            <b>$30</b>
          </span>
        </button>
      </div>
    </>
  );
};

VideoOptions.propTypes = {
  updatePaymentAmount: PropTypes.func,
};

export default VideoOptions;
