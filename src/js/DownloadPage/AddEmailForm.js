import React from 'react';
import EmailRequestField from './EmailRequestField';
import Atat from './Atat';


const AddEmailForm = ({ openingKey, finishRequestHandle }) => (
  <div>
    <Atat />
    <p>
      You can add more emails to receive the video in the form below.
    </p>
    <EmailRequestField
      buttonlabel="ADD EMAIL"
      openingKey={openingKey}
      finishRequestHandle={finishRequestHandle}
    />
  </div>
);

export default AddEmailForm;
