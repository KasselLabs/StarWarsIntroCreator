import React from 'react';

const DownloadVideoButton = ({ url }) => (
  <div className="center">
    <a id="downloadVideoButton" href={url} download>DOWNLOAD</a>
  </div>
);

export default DownloadVideoButton;
