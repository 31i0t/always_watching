import React, { useRef, useState, useEffect } from "react"
import DataManager from "./Objects/dataManager"
import { v4 as uuid_v4 } from "uuid"
import Landing from "./Components/Landing"
import Feed from "./Components/Feed"
import Data from "./Components/Data"
import ErrorMessage from "./Components/ErrorMessage"
import "./App.css"


function App() {
  const dataManager = useRef(new DataManager()).current
  
  const [landing, setLanding] = useState(true)
  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(() => {
    window.onpopstate = () => {
      setLanding(true)
    }
  }, [])

  const changeLanding = (bool) => {
    setLanding(bool)
  }

  const updateErrorMessage = (bool) => {
    setErrorMessage(bool)
    setLanding(bool)
  }

  const props = {dataManager, updateErrorMessage}

  return (
    <div id="App">
      {landing
        ? <Landing key={uuid_v4()} onChange={changeLanding} />
        : 
        [ 
          <Data key={uuid_v4()} {...dataManager}/>,
          <Feed key={uuid_v4()} {...props}/> 
        ]
      }
      {errorMessage ? <ErrorMessage/> : null}
    </div>
  )
}

export default App
