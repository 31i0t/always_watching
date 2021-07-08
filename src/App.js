import React, {useRef} from 'react'
import Feed from './Components/Feed'
import Data from './Components/Data'
import DataManager from './Objects/dataManager'

function App() {
  var dataManager = useRef(new DataManager).current

  return (
    <div id="App">
      <Data {...dataManager}/>
      <Feed {...dataManager}/> 
    </div>
  );
}

export default App;
