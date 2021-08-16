import BlendList from './BlendList'

export const Overlay = (props) => {
  const {
    overlay,
    overlayBlend,
    overlayColor,
    overlayOpacity,
    updateBlend,
    setOverlay,
    setOverlayOpacity,
    setOverlayColor,
  } = props

  return (
    <>
      <div className="uk-margin-small">
        <label className="uk-button uk-button-primary uk-light uk-display-block">
          <input
            className="uk-checkbox uk-margin-small-right"
            type="checkbox"
            checked={overlay}
            onChange={(e) => setOverlay(e.target.checked)}
          />{' '}
          Add Overlay
        </label>
      </div>
      {overlay ? (
        <>
          <BlendList
            label="Overlay Blending Mode"
            onChange={(e) => updateBlend(null, e.target.value)}
            value={overlayBlend}
          />
          <div className="border uk-flex-middle uk-margin-small">
            <b className="uk-form-span uk-margin-small-right">
              Overlay Opacity
            </b>
            <div className="uk-flex uk-flex-middle uk-flex-1">
              <input
                className="uk-range uk-margin-small-right"
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(Number(e.target.value))}
              />
              <input
                className="uk-input small-input"
                type="number"
                min={0}
                max={1}
                step={0.1}
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="uk-margin-small uk-flex uk-flex-middle">
            <div className="uk-form-span uk-text-bold">Overlay Color</div>
            <input
              value={overlayColor}
              type="color"
              className="uk-input"
              onChange={(e) => setOverlayColor(e.target.value)}
            />
          </div>
        </>
      ) : null}
    </>
  )
}

export default Overlay
