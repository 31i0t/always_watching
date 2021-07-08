import React, { useState, useEffect, useRef} from 'react'
import Post from './Post'
import './Feed.css'
import FeedHelper from '../Objects/feedHelper'

function Feed(dataManager) {
  var helper = useRef(new FeedHelper).current
  
  const [posts, setPosts] = useState(helper.currentPosts)

  useEffect(() => {  
    window.addEventListener('scroll', function () {
      helper.handleScroll(dataManager)
      if(helper.checkLastPost()) {
        setPosts([...helper.addNewPosts()])
      }
    })
  }, [])


  return (
    <div id="feed">
      {posts.map((post, index) => {
        const props = {helper, index}
        return (
          <Post {...props}/>
        )
      })
      }
    </div>
  );
}

export default Feed;
