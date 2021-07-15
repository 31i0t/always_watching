import React, { useState, useEffect } from 'react'
import DataPoint from './DataPoint'
import './Data.css'

function Data(dataManager) {

  const [data, setData] = useState(dataManager.getEngagingContentData())

  useEffect(() => {
      let dataUpdate = setInterval(() => {
        let engagingContentArray = dataManager.getEngagingContentData()
        setData([...engagingContentArray])
      }, 100)
      
      return () => {
        clearInterval(dataUpdate)
      }

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
