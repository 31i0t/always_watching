import CooldownQueue from './cooldownQueue'
import Selector from './selector'

function FeedHelper() {
    this.postRefs = []
    this.currentlyViewing = undefined
    this.queue = new CooldownQueue()
    this.selector = new Selector()
    this.currentPosts = this.selector.getPostsRandom(10)
    this.loadedImages = new Set()

    let isTracking = false

    this.componentUnmounting = () => {
        return this.postRefs[0].current === null
    }

    this.handleError = (event, index) => {
        let contentNode = event.target.parentElement
        let thumbnail = contentNode.getElementsByClassName('thumbnail')[0]
        let postImg = contentNode.getElementsByClassName('postImg')[0]
        let errorMessage = document.createElement("P")

        let countdown = 5

        errorMessage.classList.add("errorMessage")
        thumbnail.appendChild(errorMessage)

        let reload = setInterval(() => {
            errorMessage.innerText = "Connection failed. Retrying in " + countdown + "..."
            countdown -= 1

            if(countdown === -1) {
                    errorMessage.remove()
                    postImg.src = this.currentPosts[index].post
                return
            }
        }, 1000)

    }

    this.loadImage = (event, index) => {
        this.loadedImages.add(index)
        this.removeThumbnail(event.target.parentElement)
    }

    this.removeThumbnail = (contentNode) => {
        let thumbnail = contentNode.getElementsByClassName('thumbnail')[0]
        let postImg = contentNode.getElementsByClassName('postImg')[0]

        thumbnail.remove()
        postImg.style.display = 'inline'

    }

    this.addNewPosts = () => {
        this.currentPosts.push(this.selector.getPostRandom())
        return this.currentPosts
    }

    this.handleScroll = (dataManager) => {
        updateActivePost()
        trackCurrentPost(dataManager)
    }

    this.checkLastPost = () => {
        let bottomOfView = window.pageYOffset + window.innerHeight

        let lastPostDimensions = this.postRefs[this.postRefs.length - 10].current.getBoundingClientRect()
        let bottomOfFeed = window.pageYOffset + lastPostDimensions.y + lastPostDimensions.height

        if(bottomOfView >= bottomOfFeed && this.loadedImages.size == this.postRefs.length) {
            return true
        }

        return false
    }

    let trackCurrentPost = (dataManager) => {

        if(this.currentlyViewing === undefined) {return}
        if(this.loadedImages.has(this.currentlyViewing) === false) {return}

        let currentPost = this.postRefs[this.currentlyViewing]
        let timerElement = currentPost.current.getElementsByClassName("timer")[0]
        let timerStartValue = parseFloat(timerElement.innerText)
        
        if(isTracking) {return}

        let timer = setInterval(() => {
            if(currentPost !== this.postRefs[this.currentlyViewing]) {
                isTracking = false
                clearInterval(timer)
                return
            }

            isTracking = true

            timerElement.innerText = (Math.round(100*timerStartValue)/100).toFixed(2)
            timerStartValue += 0.01
            dataManager.data[this.currentPosts[this.currentlyViewing].category] += 0.01
        }, 10)

    }

    let updateActivePost = () => {
        let result = binarySearchPosts(getUserViewingPoint(window))
        this.currentlyViewing = result
    }


    let getUserViewingPoint = (windowObj) => {
        let topOfScreen = windowObj.pageYOffset
        let screenHeight = windowObj.innerHeight
        
        return Math.round(topOfScreen) + Math.floor(screenHeight/2)
    }

    let binarySearchPosts = (currentPosition) => {
        let left = 0
        let right = this.postRefs.length - 1

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

    let checkOnPost = (currentPosition, post) => {
        let postDimensions = post.current.getBoundingClientRect()

        let top = window.pageYOffset + postDimensions.y
        let bottom = top + postDimensions.height
        
        let onPost = currentPosition >= top && currentPosition <= bottom

        if(onPost) {
            return true
        }
        else {
            return (top + bottom) / 2
        }
    }

    this.getRandomNumber = (array) => {
        let min = array[0]
        let max = array[1]
        return Math.floor(Math.random() * (max - min + 1)) + min
    }



}

export default FeedHelper