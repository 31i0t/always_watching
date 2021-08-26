function FeedHelper() {
  this.postRefs = []
  this.currentlyViewing = undefined
  this.currentPosts = []

  this.predictionsInitiated = false
  this.apiCooldown = false

  const tags = ["animals", "architecture", "art", "decor", 
    "food", "men", "nature", "sports", "travel", "women"]
  const loadedPosts = new Set()
  const loadingPlaceholders = new Set()
  let isTracking = false
  let postsLoaded = false

//methods for image loading
  this.updateLoadingPlaceholders = (nNewPosts) => {
    postsLoaded = false
    const currentPostsLength = this.currentPosts.length
    for(let i = currentPostsLength; i < currentPostsLength + nNewPosts; i++) {
      loadingPlaceholders.add(i)
    }
  }

  this.handlePlaceholderLoaded = (index) => {
    loadingPlaceholders.delete(index)
    updateDisplayProperties()
  }

  this.handlePostLoaded = (index, dataManager, eventTarget) => {
    loadedPosts.add(index)

    const placeholderContainer = 
      this.postRefs[index].current.getElementsByClassName(
        "postImgPlaceholder")[0]
    placeholderContainer.classList.add("fadeOutPlaceholder")
    placeholderContainer.style.position = "absolute"

    eventTarget.style.display = "block"

    this.handlePlaceholderLoaded(index)
    updateActivePost()
    trackCurrentPost(dataManager)
  }

  const updateDisplayProperties = () => {
    let i = this.currentPosts.length - 1

    //get first inivisible post
    while(i >= 0) {
      if(checkPostIsInvisible(i)) {
        i -= 1
      }
      else {
        break
      }
    }

    i += 1

    //display posts in order if their placeholders have loaded
    while(i < this.currentPosts.length) {
      if(!loadingPlaceholders.has(i)) {
        this.postRefs[i].current.style.display = "block"

        if(i === this.currentPosts.length - 1) {
          postsLoaded = true
        }

        i += 1
      }
      else {return}
    }
  }

  const checkPostIsInvisible = (index) => {
    const postToCheck = this.postRefs[index].current
    const style = getComputedStyle(postToCheck)
    return style.display === "none"
  }

  this.generateImageSources = (nNewPosts) => {
    const widths = ["320", "480", "640", "768",
      "1024", "1366", "1600", "1920"]

    const startIdx = this.currentPosts.length - nNewPosts
    for(let i = startIdx; i < this.currentPosts.length; i++) {
      const id = this.currentPosts[i].id
      this.currentPosts[i].img = "https://cdn.alwayswatching.io/posts/640w/"
        + id + ".jpeg"
      this.currentPosts[i].placeholder = 
        "https://cdn.alwayswatching.io/posts/placeholders/" + id + ".jpeg"

      let srcset = []
      for(let j = 0; j < widths.length; j++) {
        srcset.push("https://cdn.alwayswatching.io/posts/" 
        + widths[j] + "w/" + id + ".jpeg " + widths[j] + "w")
      }
      this.currentPosts[i].srcset = srcset.join()
    }
  }

//methods specifically for backend api
  this.getEndPoints = (dataManager) => {
    if(this.checkEnoughData(dataManager)) {
      return ["POST", "prediction"]
    }

    if(this.currentPosts.length === 0) {
      return ["GET", "posts"]
    }
    else if(this.currentPosts.length) {
      return ["POST", "posts"]
    }
  }

  this.checkEnoughData = (dataManager) => {
    let totalTimeSpent = 0

    for(let i = 0; i < this.currentPosts.length; i++) {
      totalTimeSpent += this.currentPosts[i].timeSpent
    }

    if(totalTimeSpent < 10) {
      return false
    }

    for(let category in dataManager.data) {
      if(dataManager.data[category] === 0) {
        return false
      }
    }

    return true
  }

  this.updateOverlappedPredictions = (predictions) => {
    let i = this.postRefs.length - 1
    while(predictions.length) {
      const predictionToAdd = predictions.pop()
      const postPredictionElement = 
        this.postRefs[i].current.getElementsByClassName("prediction")[0]
      postPredictionElement.innerText = predictionToAdd

      i -= 1
    }
  }

  this.cleanUpCurrentlyViewing = (data) => {
    let i = data.length - 1
    while(i >= 0) {
      if(data[i].timeSpent === 0) {
        i -= 1
      }
      else if(data[i].timeSpent >= 1) {
        break
      }
      else {
        data[i].timeSpent = 0
        break
      }
    }
  }

//methods for tracking functionality
  this.handleScroll = (dataManager) => {
    if(this.currentPosts.length === 0) {return}

    updateActivePost()
    trackCurrentPost(dataManager)
  }

  const trackCurrentPost = (dataManager) => {
    if(this.currentlyViewing === undefined) {return}
    if(!loadedPosts.has(this.currentlyViewing)) {return}
    if(isTracking) {return}

    isTracking = true

    const currentPostRef = this.postRefs[this.currentlyViewing]
    const currentPostObj = this.currentPosts[this.currentlyViewing]
    const timerElement = 
      currentPostRef.current.getElementsByClassName("timer")[0]
    let timerStartValue = parseFloat(timerElement.innerText)

    const timer = setInterval(() => {
      if(currentPostRef !== this.postRefs[this.currentlyViewing]) {
        isTracking = false
        clearInterval(timer)
        return
      }

      timerElement.innerText = timerStartValue.toFixed(1)
      timerStartValue += 0.1
      currentPostObj.timeSpent += 0.1
      updateDataManager(dataManager, currentPostObj.tags)
    }, 100)
  }

  const updateDataManager = (dataManager, postTags) => {
    for(let i = 0; i < postTags.length; i++) {
      dataManager.data[tags[i]] += postTags[i]
    }

    const engagingContent = dataManager.getEngagingContentData()
    if(!engagingContent.length) {return}
    
    let i = 0
    while(i < engagingContent.length) {
      const idxOfCategory = tags.indexOf(engagingContent[i][0])
      if(postTags[idxOfCategory] > 0  
        || dataManager.data[engagingContent[i][0]] <= 0) {
          break
      }
      dataManager.data[engagingContent[i][0]] -= engagingContent[i][1] / 10
      i += 1
    }


  }

  const updateActivePost = () => {
    const result = binarySearchPosts(getUserViewingPoint(window))
    this.currentlyViewing = result

    if(result !== undefined && loadedPosts.has(result)) {
      const prediction = 
        this.postRefs[result].current.getElementsByClassName("prediction")[0]
      const timer = 
        this.postRefs[result].current.getElementsByClassName("timer")[0]
      if(prediction.style.opacity === "1") {return}
      
      prediction.style.opacity = "1"
      timer.style.opacity = "1"
    }
  }

  const getUserViewingPoint = () => {
    const topOfScreen = window.pageYOffset
    const screenHeight = window.innerHeight
    
    return Math.round(topOfScreen) + Math.floor(screenHeight/2)
  }

  const binarySearchPosts = (currentPosition) => {
    let left = 0
    let right = getLastVisisblePost()
    let mid = left + Math.floor((right - left) / 2)

    while (left <= right) {
      mid = Math.floor((left + right) / 2)
      let result = checkOnPost(currentPosition, this.postRefs[mid])
      if(result === true) {
        return mid
      }
      else if(result < currentPosition) {
        left = mid + 1
      }
      else if(result > currentPosition) {
        right = mid - 1
      }
    }
  }

  const getLastVisisblePost = () => {
    let i = this.postRefs.length - 1
    while(i >= 0 && checkPostIsInvisible(i)) {
      i -= 1
    }
    return i + 1

  }

  const checkOnPost = (currentPosition, post) => {
    const postDimensions = post.current.getBoundingClientRect()

    const commentSection = 
      post.current.getElementsByClassName("comment-section")[0]
    const commentSectionHeight = commentSection.getBoundingClientRect().height

    const top = window.pageYOffset + postDimensions.y
    const bottom = top + (postDimensions.height - commentSectionHeight)
    
    const onPost = currentPosition >= top && currentPosition <= bottom

    if(onPost) {
      return true
    }
    else {
      return (top + bottom) / 2
    }
  }

  this.checkLastPost = () => {
    if(!postsLoaded) {return false}

    const bottomOfView = window.pageYOffset + window.innerHeight

    const lastPostDimensions = 
      this.postRefs[this.postRefs.length - 6].current.getBoundingClientRect()
    const bottomOfFeed = 
      window.pageYOffset + lastPostDimensions.y + lastPostDimensions.height

    if(bottomOfView >= bottomOfFeed) {
      return true
    }

    return false
  }
}

export default FeedHelper