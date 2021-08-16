/* eslint-disable jsx-a11y/no-onchange */
export const Border = (props) => {
  const {
    width,
    height,
    borderSize,
    borderStyle,
    borderColor,
    borderRadius,
    setBorderSize,
    setBorderStyle,
    setBorderColor,
    setBorderRadius,
    sameRadius,
    setSameRadius,
    sameBorder,
    setSameBorder,
  } = props

  const updateBorderRadius = (position, value) => {
    if (sameRadius) {
      setBorderRadius({
        tl: value,
        tr: value,
        bl: value,
        br: value,
      })
    } else {
      setBorderRadius({
        ...borderRadius,
        [position]: value,
      })
    }
  }

  const updateBorder = (type, position, value) => {
    if (type === 'size') {
      if (sameBorder) {
        setBorderSize({
          left: value,
          bottom: value,
          top: value,
          right: value,
        })
      } else {
        setBorderSize({
          ...borderSize,
          [position]: value,
        })
      }
    } else if (type === 'color') {
      if (sameBorder) {
        setBorderColor({
          left: value,
          bottom: value,
          top: value,
          right: value,
        })
      } else {
        setBorderColor({
          ...borderColor,
          [position]: value,
        })
      }
    } else if (type === 'type') {
      if (sameBorder) {
        setBorderStyle({
          left: value,
          bottom: value,
          top: value,
          right: value,
        })
      } else {
        setBorderStyle({
          ...borderStyle,
          [position]: value,
        })
      }
    }
    if (sameRadius) {
      setBorderRadius({
        tl: value,
        tr: value,
        bl: value,
        br: value,
      })
    } else {
      setBorderRadius({
        ...borderRadius,
        [position]: value,
      })
    }
  }

  const borders = ['top', 'left', 'right', 'bottom']
  const radiuses = [
    {
      label: 'Top Left',
      prop: 'tl',
    },
    {
      label: 'Top Right',
      prop: 'tr',
    },
    {
      label: 'Bottom Left',
      prop: 'bl',
    },
    {
      label: 'Bottom Right',
      prop: 'br',
    },
  ]

  return (
    <>
      <h4 className="uk-heading-line uk-margin-small">Border</h4>
      <label>
        <input
          className="uk-checkbox uk-margin-small-right"
          type="checkbox"
          checked={sameBorder}
          onChange={(e) => setSameBorder(e.target.checked)}
        />{' '}
        Same Border for All Sides
      </label>
      <div className="uk-margin-small">
        {borders.map((b, i) =>
          sameBorder && i > 0 ? null : (
            <div key={b} className="border uk-flex-center uk-flex-between">
              <div className="uk-flex-1">
                <div className="uk-form-span uk-text-bold uk-text-capitalize">
                  {!sameBorder ? <>{b} size</> : 'Size'}
                </div>
                <div className="uk-margin-small">
                  <input
                    className="uk-input"
                    type="number"
                    value={borderSize[b]}
                    min="0"
                    step="1"
                    onChange={(e) => updateBorder('size', b, e.target.value)}
                  />
                </div>
              </div>
              <div className="uk-flex-1">
                <div className="uk-form-span uk-text-bold uk-text-capitalize">
                  {!sameBorder ? <>{b} type</> : 'type'}
                </div>
                <div className="uk-margin-small">
                  <select
                    className="uk-select"
                    onChange={(e) => updateBorder('type', b, e.target.value)}
                    defaultValue="solid"
                    value={borderStyle[b]}
                  >
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                    <option value="dotted">Dotted</option>
                  </select>
                </div>
              </div>
              <div className="uk-flex-1">
                <div className="uk-form-span uk-text-bold uk-text-capitalize">
                  {!sameBorder ? <>{b} color</> : 'Color'}
                </div>
                <div className="uk-margin-small">
                  <input
                    value={borderColor[b] || '#ffffff'}
                    type="color"
                    className="uk-input"
                    onChange={(e) => updateBorder('color', b, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ),
        )}
      </div>
      <h4 className="uk-heading-line uk-margin-small">Rounded Corner</h4>
      <label>
        <input
          className="uk-checkbox uk-margin-small-right"
          type="checkbox"
          checked={sameRadius}
          onChange={(e) => setSameRadius(e.target.checked)}
        />{' '}
        Same Radius for All Corner
      </label>
      <div className="uk-margin-small">
        {radiuses.map((b, i) =>
          sameRadius && i > 0 ? null : (
            <div className="border uk-flex-middle uk-margin-small">
              {!sameRadius ? (
                <b className="uk-form-span uk-margin-small-right">{b.label}</b>
              ) : null}
              <div className="uk-flex uk-flex-middle uk-flex-1">
                <input
                  className="uk-range uk-margin-small-right"
                  type="range"
                  min={0}
                  max={width <= height ? width / 2 : height / 2}
                  step={1}
                  value={borderRadius[b.prop]}
                  onChange={(e) =>
                    updateBorderRadius(b.prop, Number(e.target.value))
                  }
                />
                <input
                  className="uk-input small-input"
                  type="number"
                  min={0}
                  max={width <= height ? width / 2 : height / 2}
                  step={1}
                  value={borderRadius[b.prop]}
                  onChange={(e) =>
                    updateBorderRadius(b.prop, Number(e.target.value))
                  }
                />
              </div>
            </div>
          ),
        )}
      </div>
    </>
  )
}

export default Border
