import CooldownQueue from './cooldownQueue'
import Selector from './selector'

function FeedHelper() {
    this.postRefs = []
    this.currentlyViewing = undefined
    this.queue = new CooldownQueue()
    this.selector = new Selector()
    this.currentPosts = this.selector.getPostsRandom(10)

    var self = this
    var isTracking = false

    this.addNewPosts = function() {
        self.currentPosts.push(this.selector.getPostRandom())
        return self.currentPosts
    }

    this.handleScroll = function(dataManager) {
         updateActivePost()
        trackCurrentPost(dataManager)
    }

    this.checkLastPost = function() {
        var bottomOfView = window.pageYOffset + window.innerHeight

        var lastPostDimensions = self.postRefs[self.postRefs.length - 2].current.getBoundingClientRect()
        var bottomOfFeed = window.pageYOffset + lastPostDimensions.y + lastPostDimensions.height

        if(bottomOfView >= bottomOfFeed) {
            return true
        }

        return false
    }

    function trackCurrentPost(dataManager) {
        if(self.currentlyViewing == undefined) {return}

        var currentPost = self.postRefs[self.currentlyViewing]
        var timerElement = currentPost.current.getElementsByClassName("timer")[0]
        var timerStartValue = parseFloat(timerElement.innerText)
        
        if(isTracking) {return}

        var timer = setInterval(function() {
            if(currentPost != self.postRefs[self.currentlyViewing]) {
                isTracking = false
                clearInterval(timer)
                return
            }

            isTracking = true

            timerElement.innerText = (Math.round(100*timerStartValue)/100).toFixed(2)
            timerStartValue += 0.01
            dataManager.data[self.currentPosts[self.currentlyViewing].category] += 0.01
        }, 10)

    }

    function updateActivePost() {
        var result = binarySearchPosts(getUserViewingPoint(window))
        self.currentlyViewing = result
    }


    function getUserViewingPoint(windowObj) {
        var topOfScreen = windowObj.pageYOffset
        var screenHeight = windowObj.innerHeight
        
        return Math.round(topOfScreen) + Math.floor(screenHeight/2)
    }

    function binarySearchPosts(currentPosition) {
        var left = 0
        var right = self.postRefs.length - 1

        var mid = Math.floor((left + right) / 2)
        while (left <= right) {
            var mid = Math.floor((left + right) / 2)
            var result = checkOnPost(currentPosition, self.postRefs[mid])
            if(result == true) {
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

    function checkOnPost(currentPosition, post) {
        var postDimensions = post.current.getBoundingClientRect()

        var top = window.pageYOffset + postDimensions.y
        var bottom = top + postDimensions.height
        
        var onPost = currentPosition >= top && currentPosition <= bottom

        if(onPost) {
            return true
        }
        else {
            return (top + bottom) / 2
        }
    }

    this.getRandomNumber = function(array) {
        var min = array[0]
        var max = array[1]
        return Math.floor(Math.random() * (max - min + 1)) + min
    }



}

export default FeedHelper