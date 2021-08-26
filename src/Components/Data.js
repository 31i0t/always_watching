import React, { useState, useEffect, useRef } from "react"
import { v4 as uuid_v4 } from "uuid"
import DataPoint from "./DataPoint"
import "../Styling/Data.css"


function Data(dataManager) {
  const dataRef = useRef(null)
  const [data, setData] = useState(dataManager.getEngagingContentData())

  useEffect(() => {
    const fadeInData = setTimeout(() => 
      dataRef.current.classList.add("fadeInData"), 3000)
    const dataUpdate = setInterval(() => {
      const engagingContentArray = dataManager.getEngagingContentData()
      setData([...engagingContentArray])
    }, 100)
    
    return () => {
      clearInterval(dataUpdate)
      clearTimeout(fadeInData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <section ref={dataRef} id="data">
      <h1>Engaging Media</h1>
      <ul>
        {data.map((dataPoint) => {
          const props = {dataPoint}
          return (
          <DataPoint key={uuid_v4()} {...props}/>
          )})
        }
      </ul>
    </section>
  )
}

export default Data
