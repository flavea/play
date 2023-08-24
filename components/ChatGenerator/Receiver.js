import IF from 'components/If'
import { useState, useEffect } from 'react'
import { useChatStore } from './store'

export const Receiver = ({ receiver, idx, onChange, onDelete }) => {
  const [name, setName] = useState(receiver.name)
  const [image, setImage] = useState(receiver.image)
  const [tagline, setTagline] = useState(receiver.tagline)

  const type = useChatStore((s) => s.type)

  useEffect(() => {
    onChange(idx, { id: receiver.id, name, image, tagline })
  }, [name, image, tagline])

  return (
    <div className="uk-background-default uk-padding-small uk-box-shadow-small uk-margin-small">
      <div className="uk-margin uk-flex uk-flex-middle">
        <div className="uk-margin-small uk-text-bold uk-width-1-3">Name</div>
        <input
          className="uk-input uk-margin-left"
          type="text"
          placeholder="Receiver Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="uk-margin uk-flex uk-flex-middle">
        <div className="uk-margin-small uk-text-bold uk-width-1-3">
          Icon Link
        </div>
        <input
          className="uk-input uk-margin-left"
          type="text"
          placeholder="Receiver Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <IF condition={type === 'personal'}>
        <div className="uk-margin uk-flex uk-flex-middle">
          <div className="uk-margin-small uk-text-bold uk-width-1-3">
            Tagline
          </div>
          <input
            className="uk-input uk-margin-left"
            type="text"
            placeholder="Receiver Tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </div>
      </IF>
      <IF condition={idx !== 0}>
        <button
          className="uk-button uk-button-danger"
          onClick={() => onDelete(receiver.id)}
        >
          Delete
        </button>
      </IF>
    </div>
  )
}

export default Receiver
