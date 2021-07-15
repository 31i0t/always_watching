import React, { useRef, useState, useEffect } from 'react'
import Landing from './Components/Landing'
import Feed from './Components/Feed'
import Data from './Components/Data'
import DataManager from './Objects/dataManager'
import './App.css'

function App() {
  var dataManager = useRef(new DataManager()).current

  const [landing, setLanding] = useState(true);

  useEffect(() => {
    window.onpopstate = () => {
      setLanding(true)
    };
  }, [])

  const changeLanding = (newState) => {
    setLanding(newState)
  }

  return (
    <div id="App">
      {landing
        ? <Landing key={0} onChange={changeLanding} />
        : 
        [ 
          <Data key={0} {...dataManager}/>,
          <Feed key={1} {...dataManager}/> 
        ]
      }
    </div>
  );
}

export default App;
