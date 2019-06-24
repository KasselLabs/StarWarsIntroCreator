import React from 'react';

const Loader = ({
  text,
  style,
  size = 5,
}) => (
  <div className="loader__container">
    <div
      className="loader"
      style={{
        fontSize: `${size}px`,
        ...style,
      }}
      aria-label="Loading spinner animation"
    />
    <p>{text}</p>
  </div>
);

export default Loader;
