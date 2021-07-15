import React, { useState, useEffect, useRef} from 'react'
import Post from './Post'
import Messages from './Messages'
import './Feed.css'
import FeedHelper from '../Objects/feedHelper'

function Feed(dataManager) {
  let feedHelper = useRef(new FeedHelper()).current
  const [posts, setPosts] = useState(feedHelper.currentPosts)

  useEffect(() => {  
    const scrollHandle = () => {
      feedHelper.handleScroll(dataManager)
      if(feedHelper.checkLastPost()) {
        setPosts([...feedHelper.addNewPosts()])
      }
    }

    window.addEventListener('scroll', scrollHandle)

    return () => {
      window.removeEventListener('scroll', scrollHandle)
    }
  }, [])


  return (
    <div id="feed">
      <Messages/>
      {posts.map((post, index) => {
        const props = {feedHelper, index}
        return (
          <Post key={index} {...props}/>
        )
      })
      }
      <div id = "feedSpinner">
        <svg viewBox="0 0 100 100">
          <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50">
          </path>
        </svg>
      </div>
    </div>
  );
}

export default Feed;
