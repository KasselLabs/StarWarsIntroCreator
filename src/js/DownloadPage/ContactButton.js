import React from 'react';

const ContactButton = ({ customText = 'If you have any questions, please check our FAQ or contact us through the link:' }) => {
  const link = (
    <a
      className="contactButton"
      href="https://help.kassellabs.io/starwars/"
      rel="noopener noreferrer"
      target="_blank"
    >
      FAQ and Contact
    </a>);

  if (customText) {
    return (
      <p>
        {customText}&nbsp;
        {link}
      </p>
    );
  }

  return link;
};

export default ContactButton;
