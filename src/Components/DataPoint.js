import React from "react"
import "../Styling/DataPoint.css"


function DataPoint(props) {
  const category = props.dataPoint[0]
  const percentage = props.dataPoint[1]
  
  return (
    <li className="category">
      <h2>{category}</h2>
      <h3>{percentage + "%"}</h3>
    </li>
  )
}

export default DataPoint
