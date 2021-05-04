import React from 'react';
import PropTypes from 'prop-types';

import ContactButton from './ContactButton';
import DownloadVideoButton from './DownloadVideoButton';
import Atat from './Atat';
import SocialButtons from './SocialButtons';

const RenderedPage = ({ status }) => (
  <div>
    <Atat />
    <p>
      Your video is ready to download! Click on the button below to download it!
    </p>
    <DownloadVideoButton url={status.downloadUrl} />
    <ContactButton customText="If you have any problem while trying to download the video, please contact us:" />
    <SocialButtons
      text="Don't forget to follow us on social media below to get our latest updates.
      If you like the video, please write us a review on our Facebook page.
      It would help us a lot!"
    />
  </div>
);

RenderedPage.propTypes = {
  status: PropTypes.object,
};

export default RenderedPage;
