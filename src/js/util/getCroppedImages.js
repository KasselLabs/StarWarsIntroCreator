import getCORSImage from './getCORSImage'
import getCORSURL from './getCORSURL'

function getRadianAngle (degreeValue) {
  return (degreeValue * Math.PI) / 180
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url or array of images
 * @param {Object} cropArea - cropArea Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export default async function getCroppedImages (imageSrc, cropArea, rotation = 0) {
  let image
  try {
    image = await getCORSImage(imageSrc)
  } catch (error) {
    console.error(error)
    return null
  }

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea
  canvas.height = safeArea

  // translate canvas context to a central location on image to allow rotating around the center.
  context.translate(safeArea / 2, safeArea / 2)
  context.rotate(getRadianAngle(rotation))
  context.translate(-safeArea / 2, -safeArea / 2)

  // draw rotated image and store data.
  context.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  )
  const data = context.getImageData(0, 0, safeArea, safeArea)

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = cropArea.width
  canvas.height = cropArea.height

  // paste generated rotate image with correct offsets for x,y crop values.
  context.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - cropArea.x,
    0 - safeArea / 2 + image.height * 0.5 - cropArea.y
  )

  return canvas.toDataURL('image/png')
}
