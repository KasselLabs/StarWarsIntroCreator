import React from 'react';
import EmailRequestField from '../EmailRequestField';
import TermsOfServiceAcceptance from '../TermsOfServiceAcceptance';
import ContactButton from '../ContactButton';

const NotQueuedPage = ({ openingKey, finishRequestHandle }) => (
  <div>
    <p>
      You can now request a download a video of your creation.
    </p>
    <p>
      The video will rendered in our servers and take some time to be delivered.
      After the video is ready, it will be sent to your email address.
    </p>
    <p>
      Your email address will be used only to send the video, but
      you can choose to receive news from Kassel Labs about new releases.
    </p>
    {/* <p>
      Before sending the download request make sure there are no typos in your text
      to grant that your video will be with the correct text.
    </p> */}

    <ContactButton
      customText="Do you have questions? Please check our"
      endText="page."
    />
    <TermsOfServiceAcceptance />

    <p style={{ fontWeight: 'bold', marginTop: '30px', marginBottom: 0 }}>
      Type your email below to receive your video download link:
    </p>

    <EmailRequestField
      buttonlabel="REQUEST VIDEO DOWNLOAD"
      openingKey={openingKey}
      finishRequestHandle={finishRequestHandle}
    />
  </div>
);

export default NotQueuedPage;
