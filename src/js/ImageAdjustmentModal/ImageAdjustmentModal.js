import React from 'react'
import {
  Box,
  Button,
  Slider,
  CircularProgress,
  Typography,
  Tooltip,
} from '@material-ui/core'
import CropIcon from '@material-ui/icons/Crop'
import VerticalAlignCenterIcon from '@material-ui/icons/VerticalAlignCenter'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'
import Cropper from 'react-easy-crop'

import Dialog from './Dialog'
import getCroppedImages from '../util/getCroppedImages'
import getResizedImages from '../util/getResizedImages'

const DEFAULT_CROP = {
  x: 0,
  y: 0
}

const IMAGE_SIZE = {
  width: 1920,
  height: 1080,
};

const CropDialog = ({ image, onChange, open, onClose }) => {
  const [mediaSize, setMediaSize] = React.useState(null)
  const [cropArea, setCropArea] = React.useState(null)
  const [crop, setCrop] = React.useState(DEFAULT_CROP)
  const [zoom, setZoom] = React.useState(0.25)
  const [rotation, setRotation] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [cropSize, setCropSize] = React.useState({ width: 0, height: 0 });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      title={<span style={{ color: '#ffd54e' }}>Position Image</span>}
      actions={(
        <>
          <Button
            color='primary'
            variant="text"
            onClick={onClose}
          >
            {'Close'}
          </Button>
          <Button
            color="primary"
            variant="outlined"
            startIcon={<CropIcon />}
            style={{
              pointerEvents: loading ? 'none' : 'initial',
            }}
            onClick={async () => {
              setLoading(true)
              const croppedImages = await getCroppedImages(image, cropArea, rotation)
              const resizedImages = await getResizedImages(
                croppedImages,
                { maxWidth: IMAGE_SIZE.width, maxHeight: IMAGE_SIZE.height, backgroundColor: 'rgba(0, 0, 0, 0)' }
              )
              await onChange(resizedImages)
              onClose()
              setLoading(false)
            }}
          >
            {
              loading
                ? (
                  <Box display="inline-flex">
                    {'Loading'}
                    <Box display="flex" justifyContent="center" alignItems="center" ml={1}>
                      <CircularProgress size={16}/>
                    </Box>
                  </Box>
                )
                : 'Confirm'
            }
          </Button>
        </>
      )}
    >
      <Box
        className="cropper-container"
        display="flex"
        position="relative"
        borderRadius="5px"
        overflow="hidden"
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          aspect={16 / 9}
          restrictPosition={false}
          onCropAreaChange={(_, newCropArea) => setCropArea(newCropArea)}
          onCropSizeChange={(newCropSize) => {
            setCropSize(newCropSize)
          }}
          onMediaLoaded={(loadedMediaSize) => {
            setMediaSize(loadedMediaSize)
          }}
        />
        <img
          src="https://storage.kassellabs.io/star-wars/bg-stars.png"
          alt="background"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9,
            width: `${cropSize.width}px`,
            height: `${cropSize.height}px`,
          }}
        />
        {mediaSize && (
          <Box
            className="crop-dialog-easy-actions"
            display="flex"
            position="absolute"
            left="8px"
            bottom="8px"
            flexDirection="column"
            sx={{ gap: '8px', zIndex: 12 }}
          >
            <Box style={{ transform: 'rotate(90deg)' }}>
              <Tooltip title={'Center the image horizontally'} placement="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setCrop({ ...crop, x: 0 })
                  }}
                >
                  <VerticalAlignCenterIcon/>
                </Button>
              </Tooltip>
            </Box>
            <Tooltip title={'Center the image vertically'} placement="right">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setCrop({ ...crop, y: 0 })
                }}
              >
                <VerticalAlignCenterIcon/>
              </Button>
            </Tooltip>
            <Tooltip title={'Fits the image inside the crop area'} placement="right">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  // Adjust the size
                  const widthResize = cropSize.width / mediaSize.width
                  const heightResize = cropSize.height / mediaSize.height
                  const newZoom = Math.min(widthResize, heightResize)
                  setZoom(newZoom)
                  setRotation(0)

                  // Adjust the alignment
                  setCrop({ x: 0, y: 0 })
                }}
              >
                <FullscreenExitIcon/>
              </Button>
            </Tooltip>
            <Tooltip title={'Fill the crop area with the image'} placement="right">
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  // Adjust the size
                  const widthResize = cropSize.width / mediaSize.width
                  const heightResize = cropSize.height / mediaSize.height
                  const newZoom = Math.max(widthResize, heightResize)
                  setZoom(newZoom)
                  setRotation(0)

                  // Adjust the alignment
                  setCrop({ x: 0, y: 0 })
                }}
              >
                <FullscreenIcon/>
              </Button>
            </Tooltip>
          </Box>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Box width="50%" pr={1}>
          <Typography gutterBottom color='primary' >{'Zoom'}</Typography>
          <Slider
            value={zoom}
            onChange={(event, newZoom) => setZoom(newZoom)}
            valueLabelDisplay="auto"
            valueLabelFormat={value => value.toFixed(2)}
            min={0.05}
            step={0.01}
            max={3}
          />
        </Box>
        <Box width="50%" pl={1}>
          <Typography gutterBottom color='primary'>{'Rotation'}</Typography>
          <Slider
            value={rotation}
            onChange={(event, newRotation) => setRotation(newRotation)}
            valueLabelDisplay="auto"
            valueLabelFormat={value => value.toFixed(1)}
            min={-180}
            step={0.1}
            max={180}
          />
        </Box>
      </Box>
    </Dialog>
  )
}

export default CropDialog
