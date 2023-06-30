import React, { useRef } from 'react';

const ImageUploadButton = () => {
  const fileInputRef = useRef();

  return (
    <>
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
      >
        Upload Image
      </button>
      <input
        ref={fileInputRef}
        hidden
        type="file"
        accept=".png,.jpg,.jpeg"
      />
    </>
  );
};

ImageUploadButton.propTypes = {};

export default ImageUploadButton;
