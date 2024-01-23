import getCORSImage from './getCORSImage'

export default async function getResizedImages (imageSrc, { maxWidth, maxHeight, backgroundColor }) {
  let image
  try {
    image = await getCORSImage(imageSrc)
  } catch (error) {
    console.error(error)
    return null
  }

  const canvas = document.createElement('canvas')
  let { width, height } = image

  // First, try to fit the image by width
  if (width !== maxWidth) {
    height *= maxWidth / width
    width = maxWidth
  }

  // If it does not work, try fitting it by height
  const isImageFitInsideModel = height <= maxHeight && width <= maxWidth
  if (!isImageFitInsideModel) {
    width *= maxHeight / height
    height = maxHeight
  }

  canvas.width = width
  canvas.height = height
  console.log({width, height})
  const context = canvas.getContext('2d')

  // Optionally apply a background color the the resized image
  if (backgroundColor) {
    context.fillStyle = backgroundColor
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  context.drawImage(
    image,
    0,
    0,
    width,
    height
  )

  return new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/png')
  })
}
