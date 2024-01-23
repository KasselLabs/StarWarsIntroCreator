import getCORSURL from './getCORSURL'

export default function getCORSImage (url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = true
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.src = getCORSURL(url)
  })
}
