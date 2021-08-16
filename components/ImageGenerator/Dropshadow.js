export const Dropshadow = (props) => {
  const {
    width,
    height,
    dropShadow,
    offsetX,
    offsetY,
    dropShadowBlur,
    setDropShadow,
    setOffsetX,
    setOffsetY,
    setDropShadowBlur,
  } = props

  return (
    <>
      <h4 className="uk-heading-line">Drop Shadow</h4>
      <div className="border uk-flex-middle uk-margin-small">
        <b className="uk-form-span uk-margin-small-right">Offset X</b>
        <div className="uk-flex uk-flex-middle uk-flex-1">
          <input
            className="uk-range uk-margin-small-right"
            type="range"
            min={0}
            max={width}
            step={1}
            value={offsetX}
            onChange={(e) => setOffsetX(Number(e.target.value))}
          />
          <input
            className="uk-input small-input"
            type="number"
            min={0}
            max={width}
            step={1}
            value={offsetX}
            onChange={(e) => setOffsetX(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="border uk-flex-middle uk-margin-small">
        <b className="uk-form-span uk-margin-small-right">Offset Y</b>
        <div className="uk-flex uk-flex-middle uk-flex-1">
          <input
            className="uk-range uk-margin-small-right"
            type="range"
            min={0}
            max={height}
            step={1}
            value={offsetY}
            onChange={(e) => setOffsetY(Number(e.target.value))}
          />
          <input
            className="uk-input  small-input"
            type="number"
            min={0}
            max={height}
            step={1}
            value={offsetY}
            onChange={(e) => setOffsetY(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="border uk-flex-middle uk-margin-small">
        <b className="uk-form-span uk-margin-small-right">Blur</b>
        <div className="uk-flex uk-flex-middle uk-flex-1">
          <input
            className="uk-range uk-margin-small-right"
            type="range"
            min={0}
            max={50}
            step={1}
            value={dropShadowBlur}
            onChange={(e) => setDropShadowBlur(Number(e.target.value))}
          />
          <input
            className="uk-input small-input"
            type="number"
            min={0}
            max={50}
            step={1}
            value={dropShadowBlur}
            onChange={(e) => setDropShadowBlur(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="uk-margin-small uk-flex uk-flex-middle">
        <b className="uk-form-span uk-margin-small-right">Color</b>
        <input
          className="uk-input"
          type="color"
          value={dropShadow}
          onChange={(e) => {
            setDropShadow(e.target.value)
          }}
        />
      </div>
    </>
  )
}

export default Dropshadow
