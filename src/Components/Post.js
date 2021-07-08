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
      <div className = 'title'> 
          <img className = 'profile' src = {helper.currentPosts[index].profile}></img>
          <h1 className = 'username'>{helper.currentPosts[index].username}</h1>
          <div className = 'circle'></div>
          <h1 className = 'follow'>Follow</h1>
          <h1 className = 'timer'>0.00</h1>
      </div>
      <div className = 'content'>
          <img src={helper.currentPosts[index].post}></img>
      </div>
      <div className = 'action-bar'>
          <img src = './icons/like.png' className = 'like'></img>
          <img src = './icons/comment.png' className = 'comment'></img>
          <img src = './icons/share.png' className = 'share'></img>
      </div>
      <div className = 'comment-section'>
          <p>Liked by <span className = 'bold'>{helper.currentPosts[index].likedByName}</span> and <span className = 'bold'>{helper.getRandomNumber(helper.currentPosts[index].likedBy)} others</span></p>
          <p><span className = 'bold'>{helper.currentPosts[index].username}</span>{helper.currentPosts[index].caption}</p>
          <p><span className = 'comments'>View all {helper.getRandomNumber(helper.currentPosts[index].allComments)} comments</span></p>
          {helper.currentPosts[index].comments.map((comment) => {
            return (
              <p><span className = 'bold'>{comment.username}</span>{" " + comment.comment}</p>
            )
          })
          }
      </div>
    </div>
  );
}

export default Post;
