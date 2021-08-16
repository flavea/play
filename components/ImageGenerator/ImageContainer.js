import { Content } from './styled'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { useRef, useState } from 'react'

export const ImageComponent = (props) => {
  const [cropData, setCropData] = useState(null)
  const [cropImage, setCropImage] = useState(null)
  const [cropping, setCropping] = useState(false)
  const cropperRef = useRef(null)

  const {
    width,
    height,
    imageUrl,
    style,
    code,
    copied,
    background,
    borderSize,
    overlay,
    overlayBlend,
    overlayColor,
    overlayOpacity,
    resultUrl,
    setCopied,
    setImageUrl,
    ext,
  } = props

  const onCrop = () => {
    const imageElement = cropperRef?.current
    const cropper = imageElement?.cropper
    const data = cropper.getCropBoxData()
    setCropData(data)
    setCropImage(cropper.getCroppedCanvas().toDataURL())
  }

  const uuidv4 = () => {
    return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(8)
    })
  }

  const containerStyle = {
    width: width + Number(borderSize.left) + Number(borderSize.right),
    height: height + Number(borderSize.top) + Number(borderSize.bottom),
    background,
    position: 'relative',
  }

  let overlayStyle = {
    top: Number(borderSize.top) || 0,
    left: Number(borderSize.left) || 0,
    bottom: Number(borderSize.bottom) || 0,
    right: Number(borderSize.right) || 0,
    opacity: overlayOpacity,
    background: overlayColor,
    mixBlendMode: overlayBlend,
    width: width,
    height: height,
    position: 'absolute',
  }

  if (style.borderRadius) {
    overlayStyle = { ...overlayStyle, borderRadius: style.borderRadius }
  }

  return (
    <Content className="uk-overflow-auto">
      <div className="code uk-background-muted uk-padding-small">
        <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
          <button className="uk-button uk-button-primary uk-button-small uk-margin-small-right">
            Copy Code
          </button>
        </CopyToClipboard>
        {resultUrl && (
          <>
            or
            <a
              className="uk-button uk-button-primary uk-button-small uk-margin-small-left uk-margin-small-right"
              href={resultUrl}
              download={`${uuidv4()}.${ext}`}
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
      <div
        id="image-container"
        className="uk-flex uk-padding uk-flex-column uk-flex-center"
      >
        <div className="uk-margin-small">
          <div className="uk-label uk-margin-small">Before</div>
          <img
            src={imageUrl}
            style={{
              width,
              height,
              objectFit: 'cover',
            }}
            alt="Before"
          />
        </div>
        <div className="uk-margin-small-bottom">
          <div className="uk-label uk-margin-small">After</div>
          <div id="image">
            {overlay || background ? (
              <div style={containerStyle}>
                <img src={imageUrl} style={style} alt="Cat" />
                {overlay ? <div style={overlayStyle} /> : null}
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
                onClick={() => {
                  setImageUrl(cropImage)
                  setCropping(false)
                }}
                className="uk-button uk-button-primary"
              >
                Use Cropped Image
              </button>
            ) : null}
          </div>
        </center>
      </div>
    </Content>
  )
}

export default ImageComponent
