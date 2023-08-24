import IF from 'components/If'
import { useState, useEffect } from 'react'
import { useChatStore } from './store'

export const Message = ({ message, idx, onChange, onDelete }) => {
  const [type, setType] = useState(message.type)
  const [senderType, setSender] = useState(message.sender)
  const [text, setText] = useState(message.message)
  const sender = useChatStore((s) => s.sender)
  const receivers = useChatStore((s) => s.receivers)

  useEffect(() => {
    onChange(idx, { id: message.id, sender: senderType, type, message: text })
  }, [type, senderType, text])

  return (
    <div className="uk-background-default uk-padding-small uk-box-shadow-small uk-margin-small">
      <div className="uk-margin uk-flex uk-flex-middle">
        <div className="uk-margin-small uk-text-bold uk-width-1-3">
          Message Sender
        </div>
        <div className="uk-child-width-auto uk-grid">
          <label>
            <input
              className="uk-radio"
              type="radio"
              style={{ marginRight: 5 }}
              checked={senderType === 0}
              onChange={() => setSender(0)}
            />
            {sender || 'Sender'}
          </label>

          {receivers.map((r) => (
            <label key={r.name}>
              <input
                className="uk-radio"
                type="radio"
                style={{ marginRight: 5 }}
                checked={senderType === r.id}
                onChange={() => setSender(r.id)}
              />
              {r.name}
            </label>
          ))}
        </div>
      </div>
      <div className="uk-margin uk-flex uk-flex-middle">
        <div className="uk-margin-small uk-text-bold uk-width-1-3">
          Message Type
        </div>
        <div className="uk-child-width-auto uk-grid">
          <label>
            <input
              className="uk-radio"
              type="radio"
              style={{ marginRight: 5 }}
              checked={type === 'text'}
              onChange={() => setType('text')}
            />
            Text
          </label>
          <label>
            <input
              className="uk-radio"
              type="radio"
              style={{ marginRight: 5 }}
              checked={type === 'image'}
              onChange={() => setType('image')}
            />
            Image
          </label>
          <label>
            <input
              className="uk-radio"
              type="radio"
              style={{ marginRight: 5 }}
              checked={type === 'notif'}
              onChange={() => setType('notif')}
            />
            Description
          </label>
        </div>
      </div>
      <div className="uk-margin uk-flex uk-flex-middle">
        <div className="uk-margin-small uk-text-bold uk-width-1-3">Message</div>
        <input
          className="uk-input uk-margin-left"
          type="text"
          placeholder="Message content"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <IF condition={idx !== 0}>
        <button
          className="uk-button uk-button-danger"
          onClick={() => onDelete(message.id)}
        >
          Delete
        </button>
      </IF>
    </div>
  )
}

export default Message
