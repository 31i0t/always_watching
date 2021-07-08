import postData from './/postData'
import CooldownQueue from './cooldownQueue'

class Selector {
    constructor() { 
        this.data = postData
        this.cateogryRandom = new CooldownQueue(this.data.categories.length)
        this.travelRandom = new CooldownQueue(postData.posts[postData.categories.indexOf("travel")].length, 80)
    }
        

    getPostRandom() {
        var category = 0
        var post = this.travelRandom.getElement()
        return this.data.posts[category][post]
    }

    getPostsRandom(n) {
        var postsToReturn = []
        for(var i = 0; i < n; i++) {
            postsToReturn.push(this.getPostRandom())
        }
        return postsToReturn
    }
}

export default Selector