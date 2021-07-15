import postData from './/postData'
import CooldownQueue from './cooldownQueue'

class Selector {
    constructor() { 
        this.data = postData
        this.categoryRandom = new CooldownQueue(this.data.categories.length, 0)
        this.postsRandom = this.#getPostsRandomObjects()
        this.travelRandom = new CooldownQueue(this.data.posts[postData.categories.indexOf("travel")].length, 80)
    }
        
    #getPostsRandomObjects() {
        let postsObj = {}
        for(let i = 0; i < this.data.categories.length; i++) {
            let currentCategory = this.data.categories[i]
            postsObj[currentCategory] = new CooldownQueue(this.data.posts[postData.categories.indexOf(currentCategory)].length, 80)
        }
        return postsObj
    }

    getPostRandom() {
        let category = this.categoryRandom.getElement()
        let categoryStr = this.data.categories[category]
        let post = this.postsRandom[categoryStr].getElement()
        return this.data.posts[category][post]
    }

    getPostsRandom(n) {
        let postsToReturn = []
        for(let i = 0; i < n; i++) {
            postsToReturn.push(this.getPostRandom())
        }
        return postsToReturn
    }
}

export default Selector