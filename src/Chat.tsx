import React, { createRef, useEffect } from "react";
import { TransitionMotion, spring, presets } from 'react-motion'
import { Avatar, IconButton } from "@material-ui/core";
import {
  Search,
  MoreVert,
  AttachFile,
  InsertEmoticon,
  Send,
  MicRounded,
} from "@material-ui/icons";

import "./Chat.css";
import type { IMessage, IUser } from "./types";

interface IProps {
  messages: IMessage[];
  currentUser: IUser;
  updateMessages: (newMessage: string) => void;
  disabledInput: boolean;
}

function Chat({ messages, currentUser, updateMessages, disabledInput }: IProps) {
  let eleRef = createRef<HTMLInputElement>();
  let scrollRef = createRef<HTMLDivElement>()

  const sendMessage = (e: any) => {
    e.preventDefault();
    const message = eleRef?.current?.value;
    if (message != null && message?.length > 0) {
      if (currentUser != null) {
        updateMessages(message)
      }
    }

    if (eleRef?.current?.value != null) {
      eleRef.current.value = "";
    }
  };

  useEffect(() => {
    eleRef.current?.focus()
    const sc = scrollRef.current!
    sc.scrollTop = sc.scrollHeight
  });

  function onEnter(e: React.SyntheticEvent) {
    // @ts-ignore
    const val: number = e.charCode
    if (val == 13) sendMessage(e)
  }

  const willEnter = () => ({ height: 0, opacity: 1 })
  const willLeave = () => ({ height: 0, opacity: 1 })

  const getDefaultStyles = () => {
    return messages.map(message => ({ ...message, style: { height: 0, opacity: 1 } }));
  };
  const getStyles = () => {
    return messages.map((message) => {
      return {
        ...message,
        style: {
          height: spring(60, presets.gentle),
          opacity: spring(1, presets.gentle),
        }
      };
    });
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <div>{currentUser?.name}</div>
          <div style={{ fontWeight: 70 }}>{currentUser?.mobileNumber}</div>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body" ref={scrollRef}>
        {messages.map((message, key) => (
          <div key={key} className={`animate__animated ${message.isBot ? 'animate__fadeInLeft' : 'animate__fadeInRight'}`}>
            <p
              className={`chat__message ${!message.isBot && "chat__receiver"}`}
            >
              <span className="chat__name">{message.isBot ? 'LeBot' : currentUser.name}</span>
              <span>{message.message}</span>
              <span className="chat__timestamp">{message.timestamp}</span>
            </p>
          </div>
        ))}
        {disabledInput ?
          (<div className="animate__animated animate__fadeInLeft">
            <p className="chat__message">
              <span className="chat__name">LeBot</span>
              <span>Loading...</span>
            </p>
          </div>
          ) :
          null}
      </div>

      <div className="chat__footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <section>
          <input disabled={disabledInput} ref={eleRef} type="text" placeholder="Type a message..." onKeyPress={onEnter} />
          <IconButton onClick={sendMessage}>
            <Send />
          </IconButton>
          <IconButton>
            <MicRounded />
          </IconButton>
        </section>
      </div>
    </div>
  );
}

export default Chat;
