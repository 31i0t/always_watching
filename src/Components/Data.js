import React, { useRef, useState, useEffect } from 'react'
import DataPoint from './DataPoint'
import './Data.css'

function Data(dataManager) {
  var dataUpdateSet = useRef(false).current

  const [data, setData] = useState(dataManager.getEngagingContentData())

  useEffect(() => {
      setInterval(function() {
        var engagingContentArray = dataManager.getEngagingContentData()
        setData([...engagingContentArray])
      }, 1000)
  }, [])
  
  return (
    <div id="data">
        <h1>Engaging Media</h1>
        {data.map((dataPoint) => {
          const props = {dataPoint}
          return (
            <DataPoint {...props}/>
          )
        })}
    </div>
  );
}

export default Data;
