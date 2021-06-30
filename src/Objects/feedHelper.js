import CooldownQueue from './cooldownQueue'
import postData from '../Components/postData'

function FeedHelper() {
    this.postRefs = []
    this.currentlyViewing = undefined
    this.currentPosts = postData
    this.masterData = {}
    this.queue = new CooldownQueue()

    var self = this

    this.addNewPosts = function() {
        self.currentPosts.push({title: "I added this on my own!"})
        return self.currentPosts
    }

    this.handleScroll = function() {
        updateActivePost()
        trackCurrentPost()
    }

    this.checkLastPost = function() {
        var bottomOfView = window.pageYOffset + window.innerHeight

        var lastPostDimensions = self.postRefs[self.postRefs.length - 1].current.getBoundingClientRect()
        var bottomOfFeed = window.pageYOffset + lastPostDimensions.y + lastPostDimensions.height

        if(bottomOfView >= bottomOfFeed) {
            return true
        }

        return false
    }

    function trackCurrentPost() {
        if(self.currentlyViewing == undefined) {return}

        var currentPost = self.currentlyViewing
        var timerElement = self.currentlyViewing.current.getElementsByClassName("timer")[0]
        var timerStartValue = parseFloat(timerElement.innerText)

        setInterval(function() {
            if(currentPost != self.currentlyViewing) {return}
            timerElement.innerText = Math.round(100*timerStartValue)/100
            timerStartValue += 0.01
        }, 10)

    }

    function updateActivePost() {
        var result = binarySearchPosts(getUserViewingPoint(window))
        
        if(result != self.currentlyViewing) {
            if(self.currentlyViewing != undefined) {
                self.currentlyViewing.current.classList.remove("active")
            }
            if(result != undefined) {
                result.current.classList.add('active')
            }
        }

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
                return self.postRefs[mid]
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



}

export default FeedHelper