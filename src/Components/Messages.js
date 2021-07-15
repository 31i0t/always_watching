import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import './Messages.css'
import MessagesHelper from '../Objects/messagesHelper'


function Messages() {
  const messagesHelper = useRef(new MessagesHelper()).current;

  const [displayMessage, setMessageDisplay] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [currentMessage, updateCurrentMessage] = useState(messagesHelper.currentMessage)

  const currentMessageRef = useRef(null)

  useEffect(() => {
    let setCompletedTimeout;
    let messageEndTimeout;
    let endMessageDisplayTimeout;

    const messageTimer = setInterval(() => {
        if(messagesHelper.moreMessages()) {
            messagesHelper.addMessage();
            updateCurrentMessage(messagesHelper.currentMessage)
            setMessageDisplay(true)
            setCompletedTimeout = setTimeout(() => {setCompleted(true)}, messagesHelper.untilCompleted)
            messageEndTimeout = setTimeout(() => {currentMessageRef.current.classList.add("messageEnd")}, messagesHelper.messageDisplayLength - 250)
            endMessageDisplayTimeout = setTimeout(() => {
                setMessageDisplay(false)
                setCompleted(false)
            }, messagesHelper.messageDisplayLength)
        }
        else {
            clearInterval(messageTimer)
        }
    }, messagesHelper.messageInterval);

    setTimeout(messageTimer, messagesHelper.messageInterval);

    return () => {
        clearInterval(messageTimer)
        clearTimeout(setCompletedTimeout)
        clearTimeout(messageEndTimeout)
        clearTimeout(endMessageDisplayTimeout)
    }
  }, [])

  useEffect(() => {
    if(currentMessageRef.current === null) {return}
    setTimeout(() => {currentMessageRef.current.classList.add("messageMiddle")}, 50)
  }, [displayMessage])
    

  if(displayMessage) {
      return (
        <div ref={currentMessageRef} className="message">
            <h1>{currentMessage}</h1>
            {completed
            ?
            <svg className = "doneImporting" viewBox="0 0 110 110">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-340.000000, -324.000000)">
                        <g id="Check" transform="translate(340.000000, 324.000000)">
                            <circle id="green_circle" fill="#3CB701" cx="55" cy="55" r="55"></circle>
                            <line x1="79.0952381" y1="38.2380952" x2="49.7619048" y2="72.8095238" id="line2" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" transform="translate(64.428571, 55.523810) scale(-1, -1) translate(-64.428571, -55.523810) "></line>
                            <line x1="31.952381" y1="56.047619" x2="49.7619048" y2="72.8095238" id="line1" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" transform="translate(40.857143, 64.428571) scale(-1, -1) translate(-40.857143, -64.428571) "></line>
                        </g>
                    </g>
                </g>
            </svg>
            : 
            <svg className = "importing" viewBox="0 0 110 110">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-223.000000, -324.000000)" stroke="#979797" strokeWidth="10">
                        <path d="M278,429 C305.614237,429 328,406.614237 328,379 C328,351.385763 305.614237,329 278,329 C250.385763,329 228,351.385763 228,379" id="Loading"></path>
                    </g>
                </g>
            </svg>
            }
        </div>
      )
  }
  else {return (null) }


    // return (
    //   <div className="message">
    //     <h1>This is message 1 dude!</h1>
    //     <svg className = "doneImporting" viewBox="0 0 110 110">
    //         <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
    //             <g id="Artboard" transform="translate(-340.000000, -324.000000)">
    //                 <g id="Check" transform="translate(340.000000, 324.000000)">
    //                     <circle id="green_circle" fill="#3CB701" cx="55" cy="55" r="55"></circle>
    //                     <line x1="79.0952381" y1="38.2380952" x2="49.7619048" y2="72.8095238" id="line2" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" transform="translate(64.428571, 55.523810) scale(-1, -1) translate(-64.428571, -55.523810) "></line>
    //                     <line x1="31.952381" y1="56.047619" x2="49.7619048" y2="72.8095238" id="line1" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" transform="translate(40.857143, 64.428571) scale(-1, -1) translate(-40.857143, -64.428571) "></line>
    //                 </g>
    //             </g>
    //         </g>
    //     </svg>
    //   </div>
    // )



}

export default Messages;
