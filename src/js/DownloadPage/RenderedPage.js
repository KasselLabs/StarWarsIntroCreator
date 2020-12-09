import React from 'react';
import bowser from 'bowser';

import ContactButton from './ContactButton';
import DownloadVideoButton from './DownloadVideoButton';
import Atat from './Atat';

let iOSDevice = 'iOS device';
iOSDevice = bowser.iphone ? 'iPhone' : iOSDevice;
iOSDevice = bowser.ipad ? 'iPad' : iOSDevice;

const RenderedPage = ({ status }) => (
  <div>
    <Atat />
    <p>
      Your video is ready to download! Click on the button below to download it!
    </p>
    {bowser.ios &&
      <p>
        To download your video on your {iOSDevice} open this page using the app&nbsp;
        <a href="https://itunes.apple.com/us/app/documents-by-readdle/id364901807?mt=8">Documents by Readdle</a>.
        And follow this <a href="https://youtu.be/XZshsVMjsp8">video tutorial</a> on how to download.
      </p>
    }
    <DownloadVideoButton url={status.downloadUrl} />
    <ContactButton customText="If you have any problem while trying to download the video, please contact us:" />
  </div>
);

export default RenderedPage;
