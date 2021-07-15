import React, {useRef, useEffect, useState} from 'react'
import './Post.css'

function Post(props) {
  const postRef = useRef(null)
  const {feedHelper, index} = props
  
  const comments = useRef(feedHelper.getRandomNumber(feedHelper.currentPosts[index].allComments)).current

  const [likes, setLikes] = useState(feedHelper.getRandomNumber(feedHelper.currentPosts[index].likedBy))
  const [liked, setLiked] = useState(false)

  const [bookmarked, setBookmarked] = useState(false)

  const updateLiked = () => {
    if(liked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setLiked(!liked)
  }

  useEffect(() => {
    feedHelper.postRefs.push(postRef)
  }, [])
  
  return (
    <div ref = {postRef} className="post">
      <div className = 'title'> 
          <div className = 'postInfo'>
            <img className = 'profile' src = {feedHelper.currentPosts[index].profile}></img>
            <h1 className = 'username'>{feedHelper.currentPosts[index].username}</h1>
            <div className = 'circle'></div>
            <h1 className = 'follow'>Follow</h1>
          </div>
          <h1 className = 'timer'>0.00</h1>
      </div>
      <div className = 'content'>
          <div className = 'thumbnail'>
            <div className = 'whitespace'></div>
            <svg className = "thumbnailSpinner" viewBox="0 0 100 100">
              <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50">
              </path>
            </svg>
          </div>
          <img className = 'postImg' onLoad = {((e) =>  feedHelper.loadImage(e, index))} onError = {((e) =>  feedHelper.handleError(e, index))} src={feedHelper.currentPosts[index].post}></img>
      </div>
      <div className = 'action-bar'>
          <button onClick={updateLiked}>
            <img src = {liked ? './icons/liked.svg' : './icons/like.svg'}></img>
          </button>
          <img src = './icons/comment.svg' className = "comment"></img>
          <img src = './icons/share.svg' className = "share"></img>
          <button onClick = {() => setBookmarked(!bookmarked)} className = 'bookmark'>
            <img src = {bookmarked ? './icons/bookmarked.svg' : './icons/bookmark.svg'}></img>
          </button>
      </div>
      <div className = 'comment-section'>
          <p>Liked by <span className = 'bold'>{feedHelper.currentPosts[index].likedByName}</span> and <span className = 'bold'>{likes} others</span></p>
          <p><span className = 'bold'>{feedHelper.currentPosts[index].username}</span>&nbsp;{feedHelper.currentPosts[index].caption}</p>
          <p><span className = 'comments'>View all {comments} comments</span></p>
          {feedHelper.currentPosts[index].comments.map((comment) => {
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
