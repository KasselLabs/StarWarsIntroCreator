import React from 'react'
import { throttle } from 'lodash'

// Taken from: https://usehooks.com/useWindowSize/
export default function useWindowSize () {
  function getSize () {
    const isClient = typeof window === 'object'

    if (!isClient) {
      return {
        width: 0,
        height: 0,
        isDesktop: true,
        documentWidth: 0
      }
    }

    return {
      width: window.innerWidth,
      height: window.innerHeight,
      isDesktop: window.innerWidth > 1024,
      documentWidth: document.querySelector('html').clientWidth
    }
  }

  const [windowSize, setWindowSize] = React.useState(getSize)

  React.useEffect(() => {
    const handleResize = throttle(() => {
      setWindowSize(getSize())
    }, 100)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}
