import React, {useRef, useEffect} from 'react'
import './Post.css'


function Post(props) {
  const postRef = useRef(null)
  const {helper, index} = props

  useEffect(() => {
    helper.postRefs.push(postRef)
  }, [])
  
  return (
    <div ref={postRef} className="post">
      <h1>{helper.currentPosts[index].title}</h1>
      <h3 className="timer">0.00</h3>
    </div>
  );
}

export default Post;