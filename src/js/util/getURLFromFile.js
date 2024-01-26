export default function getURLFromFile (file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = function () {
      resolve(reader.result)
    }
    reader.readAsDataURL(file)
  })
}