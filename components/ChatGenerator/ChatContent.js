import IF from 'components/If'
import { useChatStore } from './store'
import { Content, StarRailAO3, StarRailNormal } from './styled'
import 'cropperjs/dist/cropper.css'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { html_beautify } from 'js-beautify'
import { CopyBlock, dracula } from 'react-code-blocks'

const Chat = () => {
  const { sender, senderImg, headerReceiver, headerTag, messages, receivers } =
    useChatStore()

  const findSender = (id) => {
    if (id === 0) {
      return { name: sender, image: senderImg }
    } else {
      return receivers.find((r) => r.id === id)
    }
  }

  return (
    <div className="starrail-chat">
      <div className="starrail-chat-header">
        <div className="starrail-receiver-name starrail-chat-bold">
          {headerReceiver}
        </div>
        <div className="starrail-chat-gray">
          {headerTag}{' '}
          <a href="https://codepen.io/flavea" className="starrail-chat-gray">
            ©
          </a>
        </div>
      </div>

      <div className="starrail-chat-body">
        <div className="starrail-chat-content">
          {messages.map((m) => {
            const { message, type, sender } = m
            const senderFind = findSender(sender)
            if (!senderFind) return null
            if (type === 'notif') {
              return (
                <div
                  className="starrail-chat-notif starrail-chat-gray"
                  key={m.id}
                >
                  <img
                    src="https://images2.imgbox.com/95/0b/nx2x9IzV_o.png"
                    alt=""
                  />
                  {senderFind.name} {m.message}
                </div>
              )
            }

            return (
              <div
                className={clsx('starrail-chat-line', {
                  'starrail-chat-sender': m.sender === 0,
                })}
                key={m.id}
              >
                <img
                  src={senderFind.image}
                  className="starrail-chat-icon"
                  alt={senderFind.name}
                />
                <div className="starrail-chat-line-content">
                  <div className="starrail-chat-gray starrail-chat-bold">
                    {senderFind.name}
                  </div>
                  <IF condition={type === 'text'}>
                    <div
                      className={clsx({
                        'starrail-sender-msg': m.sender === 0,
                        'starrail-receiver-msg': m.sender !== 0,
                      })}
                    >
                      {message}
                    </div>
                  </IF>
                  <IF condition={type === 'image'}>
                    <img
                      className="starrail-chat-img"
                      src={message}
                      alt="Message"
                    />
                  </IF>
                </div>
              </div>
            )
          })}

          <hr />
        </div>
      </div>
    </div>
  )
}

export const ChatContent = () => {
  const store = useChatStore()
  const layout = store.layout
  const [code, setCode] = useState(null)

  const convert = () => {
    const img = document.getElementById('image')
    if (img) {
      setCode(html_beautify(img.innerHTML))
    }
  }

  useEffect(() => {
    convert()
  }, [store])

  return (
    <Content className="uk-overflow-auto">
      <IF condition={layout === 'ao3'}>
        <StarRailAO3>
          <div id="image">
            <Chat />
          </div>
        </StarRailAO3>
      </IF>
      <IF condition={layout === 'not-ao3'}>
        <StarRailNormal>
          <div id="image">
            <Chat />
          </div>
        </StarRailNormal>
      </IF>

      <div className="uk-padding">
        <div className="uk-margin">
          <CopyToClipboard text={code} onCopy={() => alert('Code is copied')}>
            <button className="uk-button uk-button-primary uk-button-small uk-margin-small-right">
              Copy Code
            </button>
          </CopyToClipboard>
        </div>
        <CopyBlock
          text={code || ''}
          language={'html'}
          theme={dracula}
          codeBlock
        />
        ;
      </div>
    </Content>
  )
}

export default ChatContent
