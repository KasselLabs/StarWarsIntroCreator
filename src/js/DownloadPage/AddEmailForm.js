import { h } from 'preact';
import EmailRequestField from './EmailRequestField';


const AddEmailForm = ({ openingKey, finishRequestHandle }) => (
  <div>
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
