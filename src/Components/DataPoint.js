import React from 'react'
import './DataPoint.css'

function DataPoint(props) {

  var category = props.dataPoint[0]
  var percentage = props.dataPoint[1]
  
  return (
    <div className="category">
        <h2>{category}</h2>
        <h3>{percentage + "%"}</h3>
    </div>
  );
}

export default DataPoint;
