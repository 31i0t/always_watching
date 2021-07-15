import React, {useEffect, useState} from 'react'
import './Landing.css'


function Landing(props) {

    const [clicked, setClicked] = useState(false)
  

  const changeLanding = (btn) => {
      btn.target.classList.add("loading")
      setTimeout(() => { 
        props.onChange(false)
        window.history.pushState("", "", "");
      }, 800);
      setClicked(true)
  }

  return (
      <div id = 'landing'>
          <svg id = "eye" viewBox="0 0 999 278" preserveAspectRatio="none">
            <g transform="translate(0.000000, -236.000000)" >
                <path d="M499.5,514 C683.410822,514 849.910822,467.666667 999,375 C849.910822,282.333333 683.410822,236 499.5,236 C315.589178,236 149.089178,282.333333 0,375 C149.089178,467.666667 315.589178,514 499.5,514 Z"></path>
            </g>
          </svg>
          <div id = 'content'>
            <button id ='login' onClick={(e) => {changeLanding(e)}}>
                {clicked
                ? <svg className = "loginSpinner" viewBox="0 0 100 100">
                    <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50">
                    </path>
                  </svg>
                : "Log In"
                }   
              </button>
            <p id = 'disclaimer'>*disclaimer: any data collected is not 
                leveraged in any way. posts are not made
                by real people.
            </p>
            <div id = "links">
                <a>Research</a>
                <div className = 'circle'></div>
                <a>About</a>
                <div className = 'circle'></div>
                <a>Portfolio</a>
            </div>
          </div>
          
      </div>
  );
}

export default Landing;
