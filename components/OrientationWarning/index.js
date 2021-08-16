import { useEffect, useState } from 'react'

export const OrientationWarning = ({ mobileOnly }) => {
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    const checkOrientation = () => {
      var orientation =
        (screen.orientation || {}).type ||
        screen.mozOrientation ||
        screen.msOrientation

      if (
        (orientation === 'portrait-secondary' ||
          orientation === 'portrait-primary') &&
        ((mobileOnly && window.innerWidth < 500) || !mobileOnly)
      ) {
        setShowWarning(true)
      } else {
        setShowWarning(false)
      }
    }

    checkOrientation()
    window.addEventListener('resize', checkOrientation)
  }, [])

  if (!showWarning) return null

  return (
    <div className="uk-section uk-section-primary uk-light uk-position-fixed uk-width-1-1 uk-height-1-1 uk-flex uk-flex-middle uk-flex-center uk-position-top uk-align-center">
      <div className="uk-container">
        <h3>
          Page is currently not supported in portrait mode. Please rotate your
          device/screen into landscape.
        </h3>
      </div>
    </div>
  )
}

export default OrientationWarning
