import postData from './postData'

class DataManager {
    constructor() {
        this.data = this.#getInitialDataObject(postData.categories)
        this.engagingContent = this.#getInitialEngagingContent(postData.categories)
    }

    #getInitialDataObject(array) {
        var data = {}
        for(var i = 0; i < array.length; i++) {
            data[array[i]] = 0
        }
        return data
    }

    #getInitialEngagingContent(array) {
        var engagingContent = {}
        for(var i = 0; i < array.length; i++) {
            engagingContent[array[i]] = 0
        }
        return engagingContent
    }

    getEngagingContentData = function() {
        var engagingContentArray = []

        var totalTimeSpent = 0

        for(var category in this.data) {
            totalTimeSpent += this.data[category]
        }

        for(var category in this.engagingContent) {
            var percentage = Math.round((this.data[category] / totalTimeSpent) * 100)

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