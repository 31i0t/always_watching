import React, { useState, useEffect, useRef } from "react"
import MessagesHelper from "../Objects/messagesHelper"
import { ReactComponent as Importing } from "../icons/importing.svg"
import { ReactComponent as Tickmark } from "../icons/tickmark.svg"
import "../Styling/Messages.css"


function Messages() {
  const messagesHelper = useRef(new MessagesHelper()).current
  const currentMessageRef = useRef(null)

  const [displayMessage, setDisplayMessage] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [currentMessage, updateCurrentMessage] = 
    useState(messagesHelper.currentMessage)

  //handles interaction with messagesHelper and animates messages
  useEffect(() => {
    let setCompletedTimeout
    let endMessageDisplayTimeout

    const messageTimer = setInterval(() => {
      if(messagesHelper.moreMessages()) {
        messagesHelper.addMessage()
        updateCurrentMessage(messagesHelper.currentMessage)
        setDisplayMessage(true)
        currentMessageRef.current.classList.add("messageAnimation")

        setCompletedTimeout = setTimeout(() => {setCompleted(true)}, 
          messagesHelper.untilCompleted)
        endMessageDisplayTimeout = setTimeout(() => {
          setDisplayMessage(false)
          setCompleted(false)
        }, messagesHelper.messageDisplayLength)
      }
      else {
        clearInterval(messageTimer)
      }
    }, messagesHelper.messageInterval)

    return () => {
      clearInterval(messageTimer)
      clearTimeout(setCompletedTimeout)
      clearTimeout(endMessageDisplayTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(displayMessage) {
    return (
      <div ref={currentMessageRef} className="message">
        <h1>{currentMessage}</h1>
        {completed
        ? <Tickmark className="doneImporting"/>
        : <Importing className="importing"/>
        }
      </div>
    )
  }
  else { 
    return (null) 
  }
}

export default Messages
