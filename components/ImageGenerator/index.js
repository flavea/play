import { Container, Content } from './styled'
import 'cropperjs/dist/cropper.css'
import { filtersData } from './constants'
// eslint-disable-next-line import/no-unresolved
import OrientationWarning from 'components/OrientationWarning'
import BlendList from './BlendList'
import useImageGenerator from './useImageGenerator'
import ImageContainer from './ImageContainer'
import Border from './Border'
import Overlay from './Overlay'
import Dropshadow from './Dropshadow'

export const ImageGenerator = () => {
  const {
    width,
    height,
    imageUrl,
    style,
    filters,
    code,
    copied,
    background,
    borderSize,
    borderStyle,
    borderColor,
    borderRadius,
    dropShadow,
    overlay,
    overlayBlend,
    overlayColor,
    overlayOpacity,
    resultUrl,
    updateFilter,
    updateBlend,
    process,
    setImageUrl,
    setWidth,
    setHeight,
    setBackground,
    setBorderSize,
    setBorderStyle,
    setBorderColor,
    setBorderRadius,
    setOverlay,
    setOverlayOpacity,
    setOverlayColor,
    setDropShadow,
    setCopied,
    sameRadius,
    setSameRadius,
    offsetX,
    setOffsetX,
    offsetY,
    setOffsetY,
    dropShadowBlur,
    setDropShadowBlur,
    ext,
    sameBorder,
    setSameBorder,
    reset,
    setMirror,
    mirror,
  } = useImageGenerator()

  const borderProps = {
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
  }

  const containerProps = {
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
  }

  const overlayProps = {
    overlay,
    overlayBlend,
    overlayColor,
    overlayOpacity,
    updateBlend,
    setOverlay,
    setOverlayOpacity,
    setOverlayColor,
  }

  const dropshadowProps = {
    width,
    height,
    dropShadow,
    setDropShadow,
    offsetX,
    setOffsetX,
    offsetY,
    setOffsetY,
    dropShadowBlur,
    setDropShadowBlur,
  }

  return (
    <>
      <OrientationWarning mobileOnly={true} />
      <Container>
        <Content className="uk-background-muted uk-padding uk-overflow-auto uk-text-small">
          <form>
            <button
              className="uk-button uk-button-secondary"
              onClick={() => setMirror(!mirror)}
            >
              {mirror ? 'Reset Mirror' : 'Mirror Image'}
            </button>
            <button className="uk-button uk-button-danger" onClick={reset}>
              Reset Styling
            </button>
            <div className="uk-margin-small">
              <b className="uk-form-span">Image</b>
              <div className="uk-margin-small uk-flex uk-flex-middle">
                <input
                  className="uk-input uk-width-3-5"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Image URL"
                />
                <div className="uk-margin-small-left uk-margin-small-right">
                  Or
                </div>
                <div className="upload-form uk-width-2-5">
                  <input
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={process}
                  />
                </div>
              </div>
            </div>
            <div className="uk-margin-small uk-flex uk-flex-middle">
              <div className="uk-flex-1">
                <div className="uk-form-span uk-text-bold">Width (px)</div>
                <input
                  className="uk-input"
                  type="number"
                  value={width}
                  min="0"
                  step="10"
                  onChange={(e) => setWidth(Number(e.target.value))}
                />
              </div>
              <div className="uk-flex-1">
                <div className="uk-form-span uk-text-bold">Height (px)</div>
                <input
                  className="uk-input"
                  type="number"
                  value={height}
                  min="0"
                  step="10"
                  onChange={(e) => setHeight(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="uk-margin-small uk-flex uk-flex-middle">
              <div className="uk-form-span uk-text-bold uk-width-1-2">
                Background Color
              </div>
              <input
                value={background || '#ffffff'}
                type="color"
                className="uk-input"
                onChange={(e) => setBackground(e.target.value)}
              />
            </div>
            <BlendList
              label="Blending Mode"
              onChange={(e) => updateBlend('image', e.target.value)}
              value={style?.mixBlendMode}
            />
            <Overlay {...overlayProps} />
            <h4 className="uk-heading-line uk-margin-top uk-margin-small-bottom">
              Filters
            </h4>
            {filtersData.map((f) => {
              const props = {
                value: filters[f.type],
                min: f.min,
                max: f.max,
                step: f.step,
                onChange: (e) => updateFilter(f.type, e.target.value),
              }
              return (
                <div
                  className="border uk-flex-middle uk-margin-small"
                  key={f.type}
                >
                  <b className="uk-form-span uk-margin-small-right uk-text-capitalize">
                    {f.type}
                  </b>
                  <div className="uk-flex uk-flex-middle uk-flex-1">
                    <input
                      className="uk-range uk-margin-small-right"
                      type="range"
                      {...props}
                    />
                    <input
                      className="uk-input small-input"
                      type="number"
                      {...props}
                    />
                  </div>
                </div>
              )
            })}
            <Border {...borderProps} />
            <Dropshadow {...dropshadowProps} />
          </form>
        </Content>
        <ImageContainer {...containerProps} />
      </Container>
    </>
  )
}

export default ImageGenerator
