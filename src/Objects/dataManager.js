import postData from './postData'

class DataManager {
    constructor() {
        this.data = this.#getInitialDataObject(postData.categories)
        this.engagingContent = this.#getInitialEngagingContent(postData.categories)
    }

    #getInitialDataObject(array) {
        let data = {}
        for(let i = 0; i < array.length; i++) {
            data[array[i]] = 0
        }
        return data
    }

    #getInitialEngagingContent(array) {
        let engagingContent = {}
        for(let i = 0; i < array.length; i++) {
            engagingContent[array[i]] = 0
        }
        return engagingContent
    }

    getEngagingContentData = () => {        
        let engagingContentArray = []

        let totalTimeSpent = 0

        for(let category in this.data) {
            totalTimeSpent += this.data[category] ** 2
        }

        for(let category in this.engagingContent) {
            let percentage = Math.round(((this.data[category] ** 2) / totalTimeSpent) * 100)

            this.engagingContent[category] = percentage

            if(percentage >= 20) {
                engagingContentArray.push([category, percentage])
            }
        }

        engagingContentArray.sort((a,b) => {
            if(a[1] > b[1]) {
                return -1
            }
            else if(a[1] < b[1]) {
                return 1
            }
            else {
                return 0
            }
        })

        return engagingContentArray
    }
}


export default DataManager