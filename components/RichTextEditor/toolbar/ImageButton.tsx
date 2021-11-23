import React, { useEffect, useState } from 'react'
import { useSlateStatic } from 'slate-react'
import { insertImage, isImageUrl } from '../functions/images'
import { RiImageFill } from 'react-icons/ri'
import { CustomModal } from './ImageInputStyled'
import { filtersData } from 'components/ImageGenerator/constants'
import useImageGenerator from 'components/ImageGenerator/useImageGenerator'
import IF from 'components/If'

const ImageButton = () => {
  const [alt, setAlt] = useState('')
  const [show, setShow] = useState(false)
  const [classN, setClassN] = useState('')

  const editor = useSlateStatic()
  const { imageUrl, style, filters, updateFilter, setImageUrl, reset } =
    useImageGenerator()

  delete style?.width
  delete style?.height

  useEffect(() => {
    if (document?.body && document.body.clientWidth > 750) {
      setClassN('uk-column-1-2 uk-column-divider')
    }
  }, [])

  return (
    <>
      <button
        className="uk-button uk-button-default"
        type="button"
        data-uk-tooltip="Insert an image"
        title="Insert an image"
        onMouseDown={(event) => {
          event.preventDefault()
          setShow(true)
        }}
      >
        <RiImageFill />
      </button>
      <IF condition={show}>
        <CustomModal className="uk-display-fixed uk-flex uk-flex-middle uk-flex-center">
          <div id="modal" className="uk-padding uk-position-relative">
            <h3>Insert Image</h3>
            <label htmlFor="url">Image Link</label>
            <IF condition={imageUrl && !isImageUrl(imageUrl)}>
              <small className="uk-text-danger uk-display-block">
                Link is not an image
              </small>
            </IF>
            <input
              id="url"
              className="uk-input uk-margin-bottom"
              type="url"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value)
              }}
            />
            <label htmlFor="alt">Alt Text</label>
            <input
              id="alt"
              className="uk-input uk-margin-bottom"
              type="url"
              value={alt}
              onChange={(e) => {
                setAlt(e.target.value)
              }}
            />

            <div className="uk-flex uk-flex-right uk-margin-bottom">
              <button
                className="uk-button uk-button-default"
                onClick={(event) => {
                  event.preventDefault()
                  setShow(false)
                  reset()
                }}
              >
                Cancel
              </button>
              <button
                className="uk-button uk-button-primary"
                onClick={(event) => {
                  event.preventDefault()
                  if (imageUrl && !isImageUrl(imageUrl)) {
                    alert('URL is not an image')
                  } else if (imageUrl) {
                    insertImage(editor, imageUrl, alt, style)
                    setShow(false)
                    reset()
                  }
                }}
              >
                Insert
              </button>
            </div>

            <div className={classN}>
              <div>
                <img src={imageUrl} alt={alt} id="image" style={style} />
              </div>
              <div className="uk-height-1-1 uk-overflow-auto">
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
              </div>
            </div>
          </div>
        </CustomModal>
      </IF>
    </>
  )
}

export default ImageButton
