import React, {useRef, useEffect, useState} from "react"
import { v4 as uuid_v4 } from "uuid"
import { ReactComponent as Liked } from "../icons/liked.svg"
import { ReactComponent as Like } from "../icons/like.svg"
import { ReactComponent as Comment } from "../icons/comment.svg"
import { ReactComponent as Share } from "../icons/share.svg"
import { ReactComponent as Bookmarked } from "../icons/bookmarked.svg"
import { ReactComponent as Bookmark } from "../icons/bookmark.svg"
import { ReactComponent as Circle } from "../icons/circle.svg"
import "../Styling/Post.css"


function Post(props) {
  const {feedHelper, index, dataManager, updateErrorMessage} = props
  const postRef = useRef(null)
  const currentPost = useRef(feedHelper.currentPosts[index]).current

  const [likes, setLikes] = useState(currentPost.likes)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const updateLiked = (likeBtn) => {
    likeBtn = likeBtn.closest("button")
    likeBtn.classList.remove("liked")
    //workaround to 'restart' css animation
    setTimeout(() => likeBtn.classList.add("liked"), 0)
    if(liked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setLiked(!liked)
  }

  //crucial step to enable FeedHelper to interact with DOM
  useEffect(() => {
    feedHelper.postRefs.push(postRef)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <article ref={postRef} className="post">
      <header className="title"> 
        <div className="postInfo">
          <img className="profile" 
            src={currentPost.profile} alt="Profile">
          </img>
          <h1 className="username">{currentPost.username}</h1>
          <Circle className="circle"/>
          <h1 className="follow">Follow</h1>
        </div>
        <h1 className="prediction">{currentPost.prediction}</h1>
        <h1 className="timer">0.0</h1>
      </header>
      <div className="content">
        <div className="postImgPlaceholder">
          <img className="postImgPlaceholderImg" 
            onLoad={() => feedHelper.handlePlaceholderLoaded(index)} 
            src={currentPost.placeholder} 
            loading="eager" alt="Post Placeholder">
          </img>
        </div>
        <img className="postImg" 
          onLoad={(e) => 
            feedHelper.handlePostLoaded(index, dataManager, e.target)}
          srcSet={currentPost.srcset} 
          sizes="(max-width: 30rem) 100vw, 30rem" loading="eager" 
          alt={"Post Item:" + currentPost.caption}
          onError={() => updateErrorMessage(true)}>
        </img>
      </div>
      <section className="action-bar">
        <button onClick={(e) => {updateLiked(e.target)}}>
          {liked ? <Liked/> : <Like/>}
        </button>
        <Comment className="comment"/>
        <Share className="share"/>
        <button className="bookmark"
          onClick={() => setBookmarked(!bookmarked)}>
          {bookmarked ? <Bookmarked/> : <Bookmark/>}
        </button>
      </section>
      <section className="comment-section">
        <p>Liked by 
          <span className="bold">{" " + currentPost.likedByName + " "}</span> 
          and 
          <span className="bold">
            {" " + likes.toLocaleString("en-US")} others
          </span>
        </p>
        <p><span className="bold">{currentPost.username}</span>
          {" " + currentPost.caption}
          <span className="hashtags">{currentPost.hashtags}</span>
        </p>
        <p> 
          <span className="comments">
            View all {currentPost.comments} comments
          </span>
        </p>
        {currentPost.commentsData.map((comment) => {
          return (
            <p key={uuid_v4()}>
              <span className="bold">{comment.username}</span>
              {" " + comment.comment}
            </p>
          )
        })}
      </section>
    </article>
  )
}

export default Post
