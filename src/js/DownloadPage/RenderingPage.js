import React from 'react';
import PropTypes from 'prop-types';
import ContactButton from './ContactButton';
import EmailRequestField from './EmailRequestField';
import SocialButtons from './SocialButtons';
import Atat from './Atat';

import { RENDERING } from './constants';

const RenderingPage = ({ statusType, openingKey, finishRequestHandle }) => {
  const text = RENDERING === statusType
    ? 'Your video is being rendered right now! You will receive your video by email in about 10 minutes.'
    : 'Your donation has been verified, your video will be rendered soon. Paid videos are delivered by email in about 10 minutes. ';
  return (
    <div>
      <Atat />
      <p>
        {text}
        This page will be updated when the video is ready.
      </p>
      <ContactButton />
      <p>
        If you want, you can add more emails to receive the video in the form below.
      </p>
      <EmailRequestField
        buttonlabel="ADD EMAIL"
        openingKey={openingKey}
        finishRequestHandle={finishRequestHandle}
      />
      <SocialButtons
        text="In the meantime, follow us on our social media to get our latest updates!"
      />
    </div>
  );
};

RenderingPage.propTypes = {
  statusType: PropTypes.string,
  openingKey: PropTypes.string,
  finishRequestHandle: PropTypes.func,
};

export default RenderingPage;
