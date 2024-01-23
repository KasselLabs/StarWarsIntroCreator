import React, { useRef, useState } from 'react';
import axios from 'axios'
import getURLFromFile from '../util/getURLFromFile'
import ImageAdjustmentModal from '../ImageAdjustmentModal/ImageAdjustmentModal';

const ImageUploadButton = ({ onChange }) => {
  const fileInputRef = useRef();
  const [imageToCrop, setImageToCrop] = useState(null);

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
        onChange={async (event) => {
          const file = event.target.files[0]
          if (!file) {
            event.target.value = null;
            return
          }

          // setLoading(true)
          const newImage = await getURLFromFile(file)
          console.log({newImage})
          setImageToCrop(newImage)
          fileInputRef.current.value = null
          // setLoading(false)
        }}
      />
      <ImageAdjustmentModal
        image={imageToCrop}
        open={Boolean(imageToCrop)}
        onClose={() => setImageToCrop(null)}
        onChange={async (adjustedImage) => {
          const response = await axios.get('https://chatwoot-bot.vercel.app/api/get-presigned-url');
          const { uploadURL } = response.data;
          adjustedImage.name = 'image.png'
          await axios.put(uploadURL, adjustedImage, {
            headers: {
              'Content-Type': 'image/png',
              'x-amz-acl': 'public-read',
            },
          });
          const imageURL = uploadURL.replace(/\?.*/g, '')
          console.log({uploadURL, imageURL});

          onChange(imageURL);
        }}
      />
    </>
  );
};

ImageUploadButton.propTypes = {};

export default ImageUploadButton;
