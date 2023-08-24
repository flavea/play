import { create } from 'zustand'
import { produce } from 'immer'
import { persist } from 'zustand/middleware'

export const useChatStore = create(
  persist(
    (set, get) => ({
      layout: 'not-ao3',
      type: 'personal',
      sender: 'Jing Yuan',
      senderImg: 'https://images2.imgbox.com/06/bb/exSB6mxM_o.png',
      headerReceiver: 'Group Name',
      headerTag: 'Group Tagline',
      messages: [
        {
          id: 1,
          sender: 1,
          type: 'text',
          message:
            'There is so much i want to say, but you probably already know, When we meet again some time in the future, please do not let go again.',
        },
        {
          id: 2,
          sender: 0,
          type: 'text',
          message:
            'Please tell me, my precious love, that you will come to me soon.',
        },
        {
          id: 3,
          sender: 1,
          type: 'notif',
          message: 'sends a location map.',
        },
        {
          id: 4,
          sender: 1,
          type: 'image',
          message: 'https://placekitten.com/200/100',
        },
      ],
      receivers: [
        {
          id: 1,
          name: 'Dan Heng',
          image: 'https://images2.imgbox.com/e5/16/7svVtmKC_o.png',
          tagline: 'For anything related to the data bank, come find me.',
        },
      ],
      setData: (data) => {
        set((state) =>
          produce(state, (draft) => {
            Object.assign(draft, {
              ...data,
            })
          }),
        )
      },
      setMessages: (id, message) => {
        const oldMessages = get().messages
        const newMessages = Object.assign([], oldMessages, { [id]: message })
        set((state) =>
          produce(state, (draft) => {
            Object.assign(draft, {
              messages: newMessages,
            })
          }),
        )
      },
      setReceivers: (id, receiver) => {
        const oldMessages = get().receivers
        const newMessages = Object.assign([], oldMessages, { [id]: receiver })
        set((state) =>
          produce(state, (draft) => {
            Object.assign(draft, {
              receivers: newMessages,
            })
          }),
        )
      },
    }),
    {
      name: 'chat-storage',
    },
  ),
)
