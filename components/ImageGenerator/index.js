/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable sonarjs/no-identical-functions */
import { Container, Content } from './styled'
import { useEffect, useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toJpeg } from 'html-to-image'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { filtersData, initialFilters, symbols } from './constants'

export const ImageGenerator = () => {
  const [width, setWidth] = useState(500)
  const [height, setHeight] = useState(300)
  const [imageUrl, setImageUrl] = useState('https://placekitten.com/500/300')
  const [style, setStyle] = useState({
    width,
    height,
    objectFit: 'cover',
  })

  const [filters, setFilters] = useState(initialFilters)
  const [code, setCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [background, setBackground] = useState('')
  const [borderSize, setBorderSize] = useState(0)
  const [borderStyle, setBorderStyle] = useState('solid')
  const [borderColor, setBorderColor] = useState('#000000')
  const [borderRadius, setBorderRadius] = useState('0px 0px 0px 0px')
  const [dropShadow, setDropShadow] = useState('#000000')
  const [overlay, setOverlay] = useState(false)
  const [overlayBlend, setOverlayBlend] = useState(false)
  const [overlayColor, setOverlayColor] = useState('#000000')
  const [overlayOpacity, setOverlayOpacity] = useState(0.6)
  const [cropData, setCropData] = useState(null)
  const [cropImage, setCropImage] = useState(null)
  const [resultUrl, setResultUrl] = useState(null)

  const [cropping, setCropping] = useState(false)
  const cropperRef = useRef(null)

  const onCrop = () => {
    const imageElement = cropperRef?.current
    const cropper = imageElement?.cropper
    const data = cropper.getCropBoxData()
    setCropData(data)
    setCropImage(cropper.getCroppedCanvas().toDataURL())
  }

  const filterStringGen = () => {
    const keys = Object.keys(filters)
    const strings = keys
      .map((key) => {
        if (
          key === 'drop-shadow' &&
          !filters[key].includes(initialFilters[key])
        ) {
          return `${key}(${filters[key]}${symbols[key] || ''} ${dropShadow})`
        } else if (filters[key] !== initialFilters[key]) {
          return `${key}(${filters[key]}${symbols[key] || ''})`
        } else return null
      })
      .filter((f) => f)
    const str = strings.join(' ')
    if (str.trim()) setStyle({ ...style, filter: str })
    else if (style?.filter) {
      const styleBaru = {
        ...style,
      }
      delete styleBaru.filter
      setStyle(styleBaru)
    }
  }

  const updateFilter = (label, value) => {
    setFilters({
      ...filters,
      [label]: value,
    })
    setCopied(false)
  }

  const updateBlend = (target, value) => {
    if (target === 'image') {
      setStyle({ ...style, mixBlendMode: value })
    } else {
      setOverlayBlend(value)
    }
  }

  const process = (e) => {
    const input = e.target
    const curFiles = input.files
    if (curFiles.length > 0) {
      var _URL = window.URL || window.webkitURL
      for (const file of curFiles) {
        var objectUrl = _URL.createObjectURL(file)
        setImageUrl(objectUrl)
      }
    }
  }

  const save = () => {
    setTimeout(() => {
      toJpeg(document.getElementById('image')).then(function (dataUrl) {
        setResultUrl(dataUrl)
      })
    }, 1000)
  }

  const saveCrop = () => {
    setImageUrl(cropImage)
    setCropping(false)
  }

  const uuidv4 = () => {
    return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(8)
    })
  }

  useEffect(filterStringGen, [filters, dropShadow])

  useEffect(() => {
    save()
    setCode(document.getElementById('image').innerHTML)
  }, [style])

  useEffect(() => {
    setStyle({ ...style, width, height })
  }, [width, height])

  useEffect(() => {
    if (borderSize > 0) {
      setStyle({
        ...style,
        border: `${borderSize}px ${borderStyle} ${borderColor}`,
      })
    } else if (style?.border) {
      const styleBaru = {
        ...style,
      }
      delete styleBaru.border
      setStyle(styleBaru)
    }
  }, [borderSize, borderColor, borderStyle])

  useEffect(() => {
    if (
      borderRadius != '0' &&
      borderRadius != '0px 0px 0px 0px' &&
      borderRadius != '0px'
    ) {
      setStyle({
        ...style,
        borderRadius: borderRadius,
      })
    } else if (style?.borderRadius) {
      const styleBaru = {
        ...style,
      }
      delete styleBaru.borderRadius
      setStyle(styleBaru)
    }
  }, [borderRadius])

  useEffect(() => {
    let img = new Image()
    img.onload = function () {
      if (this.width) setWidth(this.width)
      if (this.height) setHeight(this.height)
    }
    img.src = imageUrl
  }, [imageUrl])

  const BlendList = ({ target }) => (
    <div className="uk-margin">
      <div className="uk-form-span">
        {target === 'image' ? 'Blend Mode' : 'Overlay Blend Mode'}
      </div>
      <select
        className="uk-select"
        onChange={(e) => updateBlend(target, e.target.value)}
        value={target === 'image' ? style?.mixBlendMode : overlayBlend}
        defaultValue="normal"
      >
        <option>normal</option>
        <option>multiply</option>
        <option>screen</option>
        <option>overlay</option>
        <option>darken</option>
        <option>lighten</option>
        <option>color-dodge</option>
        <option>color-burn</option>
        <option>hard-light</option>
        <option>soft-light</option>
        <option>difference</option>
        <option>exclusion</option>
        <option>hue</option>
        <option>saturation</option>
        <option>color</option>
        <option>luminosity</option>
      </select>
    </div>
  )

  return (
    <Container>
      <Content className="uk-background-muted uk-padding uk-overflow-auto">
        <form>
          <div className="uk-margin">
            <b className="uk-form-span">Image</b>
            <div className="uk-margin">
              <span className="uk-text-middle">
                <input
                  className="uk-input"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </span>
              <center>Or</center>
              <div className="upload-form">
                <input
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onChange={process}
                />
              </div>
            </div>
          </div>
          <div className="uk-margin uk-flex uk-flex-middle">
            <div>
              <div className="uk-form-span">width (px)</div>
              <input
                className="uk-input"
                type="number"
                value={width}
                min="1"
                step="10"
                onChange={(e) => setWidth(Number(e.target.value))}
              />
            </div>
            <div>
              <div className="uk-form-span">Height (px)</div>
              <input
                className="uk-input"
                type="number"
                value={height}
                min="1"
                step="10"
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="uk-margin">
            <span className="uk-form-span">Background Color</span>
            <input
              value={background || '#ffffff'}
              type="color"
              className="uk-input"
              onChange={(e) => setBackground(e.target.value)}
            />
          </div>
          <BlendList target="image"></BlendList>
          <div className="uk-margin uk-flex uk-flex-center uk-flex-between">
            <div>
              <div className="uk-form-span">Border Size</div>
              <div className="uk-margin-small">
                <input
                  className="uk-input"
                  type="number"
                  value={borderSize}
                  min="0"
                  step="1"
                  onChange={(e) => setBorderSize(Number(e.target.value))}
                  style={{ width: 90 }}
                />
              </div>
            </div>
            <div>
              <div className="uk-form-span">Border Type</div>
              <div className="uk-margin-small">
                <select
                  className="uk-select"
                  onBlur={(e) => setBorderStyle(e.target.value)}
                  defaultValue="solid"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                </select>
              </div>
            </div>
            <div>
              <div className="uk-form-span">Border Color</div>
              <div className="uk-margin-small">
                <input
                  value={borderColor || '#ffffff'}
                  type="color"
                  className="uk-input"
                  onChange={(e) => setBorderColor(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="uk-margin">
            <b className="uk-form-span uk-margin-small-right">
              Rounded Corner{' '}
              <small>(top-left, top-right, bottom-right, bottom -left)</small>
            </b>
            <input
              className="uk-input"
              type="text"
              value={borderRadius}
              onChange={(e) => setBorderRadius(e.target.value)}
            />
          </div>
          {filtersData.map((f) => {
            const props = {
              value: filters[f.type],
              min: f.min,
              max: f.max,
              step: f.step,
              onChange: (e) => updateFilter(f.type, e.target.value),
            }
            return (
              <div className="uk-flex uk-flex-middle uk-margin" key={f.type}>
                <b className="uk-form-span uk-margin-small-right">{f.type}</b>
                <input
                  className="uk-range uk-margin-small-right"
                  type="range"
                  {...props}
                />
                <input
                  className="uk-input"
                  type="number"
                  {...props}
                  style={{
                    width: 90,
                  }}
                />
              </div>
            )
          })}
          <div className="uk-margin">
            <b className="uk-form-span uk-margin-small-right">Drop Shadow</b>
            <input
              className="uk-input"
              type="text"
              value={filters['drop-shadow']}
              onChange={(e) => updateFilter('drop-shadow', e.target.value)}
            />
          </div>
          <div className="uk-margin">
            <b className="uk-form-span uk-margin-small-right">
              Drop Shadow Color
              <small>(offset-x, offset-y, blur size)</small>
            </b>
            <input
              className="uk-input"
              type="color"
              value={dropShadow}
              onChange={(e) => {
                setDropShadow(e.target.value)
              }}
            />
          </div>

          <div className="uk-margin">
            <label>
              <input
                className="uk-checkbox"
                type="checkbox"
                checked={overlay}
                onChange={(e) => setOverlay(e.target.checked)}
              />{' '}
              Add Overlay
            </label>
          </div>
          {overlay ? (
            <>
              <BlendList />
              <div className="uk-flex uk-flex-middle uk-margin">
                <b className="uk-form-span uk-margin-small-right">
                  Overlay Opacity
                </b>
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
                  className="uk-input"
                  type="number"
                  min={0}
                  max={1}
                  step={0.1}
                  value={overlayOpacity}
                  onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                  style={{
                    width: 90,
                  }}
                />
              </div>
              <div className="uk-margin">
                <span className="uk-form-span">Overlay Color</span>
                <input
                  value={overlayColor}
                  type="color"
                  className="uk-input"
                  onChange={(e) => setOverlayColor(e.target.value)}
                />
              </div>
            </>
          ) : null}
        </form>
      </Content>
      <Content className="uk-overflow-auto">
        <div className="code uk-background-muted uk-padding-small">
          <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
            <button className="uk-button uk-button-primary uk-button-small uk-margin-small-right">
              Copy Code
            </button>
          </CopyToClipboard>
          or{' '}
          {resultUrl && (
            <>
              <a
                className="uk-button uk-button-primary uk-button-small uk-margin-small-left uk-margin-small-right"
                href={resultUrl}
                download={`${uuidv4()}.jpg`}
              >
                Download as Image
              </a>
              (if not working, click right and open in new tab)
            </>
          )}
          <pre>
            <code>{code}</code>
          </pre>
          {copied ? (
            <div className="uk-alert-success" uk-alert>
              <p>Code copied to clipboard</p>
            </div>
          ) : null}
        </div>
        <div className="uk-flex uk-padding uk-flex-column uk-flex-center uk-flex-middle ">
          <div>
            Before:
            <br />
            <img
              src={imageUrl}
              style={{
                width: width + 2 * Number(borderSize),
                height: height + 2 * Number(borderSize),
                objectFit: 'cover',
              }}
              alt="Before"
            />
          </div>
          <div>
            After:
            <div
              id="image"
              style={{
                width: width + 2 * Number(borderSize),
                height: height + 2 * Number(borderSize),
              }}
            >
              {overlay ? (
                <div
                  style={{
                    width,
                    height,
                    background,
                    position: 'relative',
                  }}
                >
                  <img src={imageUrl} style={style} alt="Cat" />
                  <div
                    style={{
                      opacity: overlayOpacity,
                      background: overlayColor,
                      mixBlendMode: overlayBlend,
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  />
                </div>
              ) : cropping ? (
                <Cropper
                  src={imageUrl}
                  // Cropper.js options
                  initialAspectRatio={16 / 9}
                  guides={false}
                  crop={onCrop}
                  ref={cropperRef}
                />
              ) : (
                <img src={imageUrl} style={style} alt="" />
              )}
            </div>
          </div>
          <div>
            <center>
              {cropping && cropData?.width && cropData?.height ? (
                <div className="uk-margin-top">
                  Width: {cropData.width} || Height: {cropData.height}
                </div>
              ) : null}
              <div className="uk-margin-top">
                <button
                  onClick={() => setCropping(!cropping)}
                  className="uk-button uk-button-primary"
                >
                  {cropping ? 'Cancel Crop' : 'Crop Image'}
                </button>
                {cropping ? (
                  <button
                    onClick={saveCrop}
                    className="uk-button uk-button-primary"
                  >
                    Use Cropped Image
                  </button>
                ) : null}
              </div>
            </center>
          </div>
        </div>
      </Content>
    </Container>
  )
}

export default ImageGenerator
