import React from 'react';

import ContactButton from './ContactButton';
import DownloadVideoButton from './DownloadVideoButton';
import Atat from './Atat';

const RenderedPage = ({ status }) => (
  <div>
    <Atat />
    <p>
      Your video is ready to download! Click on the button below to download it!
    </p>
    <DownloadVideoButton url={status.downloadUrl} />
    <ContactButton customText="If you have any problem while trying to download the video, please contact us:" />
  </div>
);

export default RenderedPage;
