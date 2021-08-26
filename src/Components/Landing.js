import React, { useState} from "react"
import { ReactComponent as Spinner } from "../icons/spinner.svg"
import { ReactComponent as Eye } from "../icons/eye.svg"
import { ReactComponent as Circle } from "../icons/circle.svg"
import "../Styling/Landing.css"


function Landing(props) {
  const [clicked, setClicked] = useState(false)

  //handes callback to App.js to change parent"s state
  const changeLanding = (btn) => {
    btn.target.classList.add("loading")
    setTimeout(() => { 
      props.onChange(false)
      window.history.pushState("", "", "")
    }, 800)
    setClicked(true)
  }

  return (
    <div id="landing">
      <Eye id="eye"/>
      <main id="content">
        <button id="login" onClick={(e) => {changeLanding(e)}}>
          {clicked
          ? <Spinner className="loginSpinner"/>
          : "Log In"
          }   
        </button>
        <p id="disclaimer">
          *disclaimer: Your data is not saved between sessions. 
          Slide in messages are demonstrative only. Content not
          created by real users.
        </p>
        <footer id="links">
          <a href="https://makoski.net">About</a>
          <Circle className="circle"/>
          <a href="https://makoski.net">Portfolio</a>
        </footer>
      </main>
    </div>
  )
}

export default Landing
