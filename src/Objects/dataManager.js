class DataManager {
    constructor() {
      this.data = {"animals": 0, "architecture": 0, "art": 0, "decor": 0, 
        "food": 0, "men": 0, "nature": 0, "sports": 0, "travel": 0, 
        "women": 0}
      this.dataRef = []
    }

    getEngagingContentData = () => {        
      const engagingContentArray = []

      let engagementSum = 0

      for(let category in this.data) {
        engagementSum += this.data[category]
      }

      for(let category in this.data) {
        let percentage = Math.round(((this.data[category]) / engagementSum) * 100)
        if(percentage >= 10) {
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