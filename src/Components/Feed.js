import React, { useState, useEffect, useRef} from "react"
import FeedHelper from "../Objects/feedHelper"
import Post from "./Post"
import Messages from "./Messages"
import { ReactComponent as Spinner } from "../icons/spinner.svg"
import "../Styling/Feed.css"


function Feed(props) {
  const {dataManager, updateErrorMessage} = props

  const feedHelper = useRef(new FeedHelper()).current

  const [posts, setPosts] = useState(null)
  const [requestStatus, _setRequestStatus] = useState(true)
  const requestStatusRef = useRef(requestStatus)

  //allows state to be read from within event listener by using a react ref
  const setRequestStatus = (bool) => {
    requestStatusRef.current = bool
    _setRequestStatus(bool)
  }


  useEffect(() => {
    let checkApiCooldownOver
    let resetApiCooldown
    
    const scrollHandle = () => {
      feedHelper.handleScroll(dataManager)
  
      const canBeginPredicting = !feedHelper.predictionsInitiated && 
        feedHelper.checkEnoughData(dataManager)
      if(canBeginPredicting) {
        feedHelper.predictionsInitiated = true
        setRequestStatus(true)
        return
      }
  
      if(feedHelper.checkLastPost() && !requestStatusRef.current) {
        requestStatusRef.current = true

        const handleApiCooldown = () => {
          if(feedHelper.apiCooldown) {
            checkApiCooldownOver = setTimeout(handleApiCooldown, 50)
            return
          }
          setRequestStatus(true)
          feedHelper.apiCooldown = true
          resetApiCooldown = 
            setTimeout(() => {feedHelper.apiCooldown = false}, 3000)
        }
        handleApiCooldown()
      }
    }

    window.addEventListener("scroll", scrollHandle)

    return () => {
      window.removeEventListener("scroll", scrollHandle)
      clearTimeout(checkApiCooldownOver)
      clearTimeout(resetApiCooldown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //makes api call on requestStatus state change
  useEffect(() => {
    if(!requestStatusRef.current) {return}

    const request = new XMLHttpRequest()
    const [method, endpoint] = feedHelper.getEndPoints(dataManager)

    request.open(method, "http://localhost:8000/" + endpoint + "/")

    let data = [...feedHelper.currentPosts]
    if(method === "POST" && endpoint === "prediction") {
      feedHelper.cleanUpCurrentlyViewing(data)
    }
    
    data = JSON.stringify({"posts": data})

    const handleApiResponse = () => {
      const response = request.response
      const responseObj = JSON.parse(response)

      if("overlappedPredictions" in responseObj) {
        feedHelper.updateOverlappedPredictions(
          responseObj.overlappedPredictions)
      }

      feedHelper.updateLoadingPlaceholders(responseObj.posts.length)
      feedHelper.currentPosts.push(...responseObj.posts)
      feedHelper.generateImageSources(responseObj.posts.length)

      setPosts([...feedHelper.currentPosts])
    }

    request.addEventListener("load", handleApiResponse)
    request.addEventListener("error", () => updateErrorMessage(true))
    request.send(data)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestStatus])

  //enables new requests once posts have been received
  useEffect(() => {
    setRequestStatus(false)
  }, [posts])

  return posts
    ?
      <section id="feed">
        <Messages/>
        {posts.map((post, index) => {
          const props = {feedHelper, index, dataManager, updateErrorMessage}
          return ( 
            <Post key={index} {...props}/>
          )
        })
        }
        <div className="feedSpinner">
          <Spinner/>
        </div>
      </section>
    : 
      <div className="feedLoadingSpinner">
        <Spinner/>
      </div>
      
}

export default Feed
