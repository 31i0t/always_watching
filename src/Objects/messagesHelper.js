function MessagesHelper() {
    this.messageInterval = 20000;
    this.messageDisplayLength = 5000;
    this.untilCompleted = 3000;
    
    this.messages = [
      "Importing location history from the last decade",
      "Importing web search history from the last decade",
      "Importing web behavior from the last decade",
      "Analyzing emails from the last the decade",
    ];

    this.currentMessage = null

    this.addMessage = () => {
      const idxToSwap = Math.round(Math.random() * (this.messages.length - 1))
      swap(this.messages, idxToSwap, this.messages.length - 1)
      this.currentMessage = this.messages.pop()
    }

    this.moreMessages = () => {
      return this.messages.length !== 0
    }

    const swap = (array, i, j) => {
      const x = array[i]
      array[i] = array[j]
      array[j] = x
      return array
    }

} 

export default MessagesHelper