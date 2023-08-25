import { Container, Content } from './styled'
import 'cropperjs/dist/cropper.css'
import Message from './Message'
import IF from 'components/If'
import Receiver from './Receiver'
import uuid from 'helpers/uuid'
import { useChatStore } from './store'
import ChatContent from './ChatContent'
import { useEffect } from 'react'
import UIkit from 'uikit'
import How from './How'

export const ChatGenerator = () => {
  const {
    layout,
    type,
    sender,
    senderImg,
    headerReceiver,
    headerTag,
    messages,
    receivers,
    setData,
    setMessages,
    setReceivers,
  } = useChatStore()

  const addReceiver = () => {
    const newReceivers = [
      ...receivers,
      {
        id: uuid(),
        name: '',
        image: 'https://placekitten.com/80/80',
        tagline: '',
      },
    ]
    setData({ receivers: newReceivers })
  }

  const addMessage = () => {
    const newMessages = [
      ...messages,
      {
        id: 4,
        sender,
        type: 'text',
        message: '',
      },
    ]
    setData({ messages: newMessages })
  }

  const deleteMessage = (id) => {
    const newMessages = messages.filter((m) => m.id !== id)
    setData({ messages: newMessages })
  }

  const deleteReceiver = (id) => {
    const newReceivers = receivers.filter((m) => m.id !== id)
    setData({ receivers: newReceivers })
  }

  useEffect(() => {
    if (type === 'personal') {
      setData({
        headerReceiver: receivers[0].name,
        headerTag: receivers[0].tagline,
      })
    } else {
      setData({
        headerReceiver: 'Group Name',
        headerTag: 'Group Tagline',
      })
    }
  }, [type, receivers])

  useEffect(() => {
    UIkit.modal(document.getElementById('ao3-how'))
  }, [])

  return (
    <>
      <div id="ao3-how">
        <div className="uk-modal-dialog uk-modal-body">
          <How />
        </div>
      </div>
      <Container>
        <Content className="uk-background-muted uk-padding uk-overflow-auto uk-text-small">
          <div className="uk-text-bold">Layout:</div>
          <div className="uk-margin">
            <label>
              <input
                className="uk-radio"
                type="radio"
                name="layout"
                checked={layout === 'not-ao3'}
                onChange={() => setData({ layout: 'not-ao3' })}
                style={{ marginRight: 5 }}
              />{' '}
              Star Rail (for non-AO3 sites) -{' '}
              <a href="https://codepen.io/flavea/pen/wvxwqjZ" target="_blank">
                CSS Code
              </a>
            </label>
          </div>
          <div className="uk-margin">
            <label>
              <input
                className="uk-radio"
                type="radio"
                name="layout"
                checked={layout === 'ao3'}
                onChange={() => setData({ layout: 'ao3' })}
                style={{ marginRight: 5 }}
              />
              Star Rail (for AO3)-{' '}
              <a href="https://codepen.io/flavea/pen/rNoOVaY" target="_blank">
                CSS Code
              </a>{' '}
              ||{' '}
              <button
                onClick={() =>
                  UIkit.modal(document.getElementById('ao3-how')).show()
                }
                className="uk-link"
              >
                How to Use
              </button>
            </label>
          </div>
          <div className="uk-text-bold">Chat Type:</div>
          <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <label>
              <input
                className="uk-radio"
                type="radio"
                name="chatType"
                checked={type === 'personal'}
                onChange={() => setData({ type: 'personal' })}
                style={{ marginRight: 5 }}
              />{' '}
              Personal
            </label>
            <label>
              <input
                className="uk-radio"
                type="radio"
                name="chatType"
                checked={layout === 'group'}
                onChange={() => setData({ type: 'group' })}
                style={{ marginRight: 5 }}
              />
              Group
            </label>
          </div>
          <div className="uk-margin uk-flex uk-flex-middle">
            <div className="uk-margin-small uk-text-bold uk-width-1-3">
              Sender Name
            </div>
            <input
              className="uk-input uk-margin-left"
              type="text"
              placeholder="Sender Name"
              value={sender}
              onChange={(e) => setData({ sender: e.target.value })}
            />
          </div>
          <div className="uk-margin uk-flex uk-flex-middle">
            <div className="uk-margin-small uk-text-bold uk-width-1-3">
              Sender Icon Link
            </div>
            <input
              className="uk-input uk-margin-left"
              type="text"
              placeholder="Sender Name"
              value={senderImg}
              onChange={(e) => setData({ senderImg: e.target.value })}
            />
          </div>

          <IF condition={type === 'group'}>
            <div className="uk-margin uk-flex uk-flex-middle">
              <div className="uk-margin-small uk-text-bold uk-width-1-3">
                Group Name
              </div>
              <input
                className="uk-input uk-margin-left"
                type="text"
                placeholder="Receiver name"
                aria-label="Input"
                value={headerReceiver}
                onChange={(e) => setData({ headerReceiver: e.target.value })}
              />
            </div>
            <div className="uk-margin uk-flex uk-flex-middle">
              <div className="uk-margin-small uk-text-bold uk-width-1-3">
                Group Tagline
              </div>
              <input
                className="uk-input uk-margin-left"
                type="text"
                placeholder="Receiver Header Message"
                aria-label="Input"
                value={headerTag}
                onChange={(e) => setData({ headerTag: e.target.value })}
              />
            </div>
          </IF>
          <h4 className="uk-text-bold">Message Receivers:</h4>
          {receivers.map((m, i) => (
            <Receiver
              key={m.id}
              receiver={m}
              idx={i}
              onChange={setReceivers}
              onDelete={deleteReceiver}
            />
          ))}
          <IF condition={type === 'group'}>
            <button
              className="uk-button uk-button-primary"
              onClick={addReceiver}
            >
              Add More
            </button>
          </IF>
          <h4 className="uk-text-bold">Messages:</h4>
          {messages.map((m, i) => (
            <Message
              key={m.id}
              message={m}
              idx={i}
              onChange={setMessages}
              onDelete={deleteMessage}
            />
          ))}
          <button className="uk-button uk-button-primary" onClick={addMessage}>
            Add More
          </button>
        </Content>
        <Content className="uk-overflow-auto">
          <ChatContent />
        </Content>
      </Container>
    </>
  )
}

export default ChatGenerator
