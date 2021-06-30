import React, { useState, useEffect } from 'react';
import './App.css';
import Chat from './Chat';
import { isAuthenticated, removeLS } from './services/localstorage';
import { getNextMessage, predefinedMessages } from './states/messages';
import type { IMessage, IUser } from './types';

let originalName = ''
let originalMobileNumber = ''

function App() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [disabledInput, setDisabledInput] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<IUser>({ name: originalName, mobileNumber: '', language: '' });
  const [err] = useState<string>('');

  function setMessage(message: string[], isBots: boolean[] = [false]) {
    const timestamp = new Date().toLocaleString()
    const ms = message.map((m, i) => ({ isBot: isBots[i], message: m, timestamp }))
    setMessages([...messages, ...ms])
  }

  async function updateMessages(message: string) {
    setDisabledInput(true);
    if (message.length > 0) {
      if (message.toLowerCase() == 'logout') {
        setDisabledInput(true);
        return new Promise((res) => res(1)).then(_ => {
          removeLS('user')
          removeLS('token')
          setMessage(['Logged out, ' + originalName, predefinedMessages[1]()], [true, true])
          originalName = ''
          originalMobileNumber = ''
          setIndex(1);
          setCurrentUser({ name: '', mobileNumber: '', language: '' })
          setDisabledInput(false)
        });
      } else {
        setMessage([message], [false])
        const { i, reply } = await getNextMessage({
          reply: message,
          prevIndex: index,
          name: originalName,
          mobileNumber: originalMobileNumber
        });

        if (index == 1) {
          originalMobileNumber = message
          setCurrentUser({ ...currentUser, mobileNumber: message })
        } else if (index == 2 || index == 4) {
          originalName = message
        } else if (index == 3) {
          setCurrentUser({ ...currentUser, name: originalName })
        } else if (index == 5) {
          setCurrentUser({ ...currentUser, language: 'En' })
        }
        setMessage([message, reply], [false, true])
        setIndex(i);
        setDisabledInput(false);
      }
    } else {
      setDisabledInput(false);
    }
  }

  useEffect(() => {
    isAuthenticated().then(val => {
      if (val) {
        originalName = val.name
        originalMobileNumber = val.mobileNumber
        setCurrentUser(val)
        setMessage([
          predefinedMessages[0](val.name),
          predefinedMessages[5]()
        ],
          [true, true]
        )
        setIndex(5);
        setDisabledInput(false)
      } else {
        setMessage([predefinedMessages[1](currentUser.name)], [true])
        setIndex(1);
        setDisabledInput(false)
      }
    })

  }, []);

  return (
    <div className="home">
      <div className="home__body">
        <Chat
          disabledInput={disabledInput}
          updateMessages={updateMessages}
          messages={messages ?? []}
          currentUser={currentUser}
        />
      </div>
      {err.length > 0 ? <div className="home__error">{err}</div> : null}
    </div>
  );
}

export default App;
