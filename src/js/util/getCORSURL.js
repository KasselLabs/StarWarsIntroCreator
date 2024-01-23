export default function getCORSURL (url) {
  const shouldUseCors = url.match(/(https|http):\/\//)
  const corsUrl = shouldUseCors ? `https://cors.kassellabs.io/${url}` : url
  return corsUrl
}
