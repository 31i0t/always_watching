function MessagesHelper() {

    this.messageInterval = 6000;
    this.messageDisplayLength = 5000;
    this.untilCompleted = 3000;
    
    this.messages = [
        
        " a message is super large",
        "This is a really long message just to test exactly how the flexbox will look when a message is super large",
        "This is a really long message just to test exactly how the flexbox will look when a message is super large",
        "This is a really long message just to test exactly how the flexbox will look when a message is super large",
        "This is a really long message just to test exactly how the flexbox will look when a message is super large",
        "This is a really long message just to test exactly how the flexbox will look when a message is super large",
        "This is a really long message just to test exactly how the flexbox will look when a message is super large",
        "This is a really long message just to test exactly how the flexbox will look when a message is super large"
    ];

    this.currentMessage = null

    this.addMessage = () => {
        var idxToSwap = Math.round(Math.random() * (this.messages.length - 1))
        swap(this.messages, idxToSwap, this.messages.length - 1)
        this.currentMessage = this.messages.pop()
    }

    this.moreMessages = () => {
        return this.messages.length !== 0
    }

    const swap = (array, i, j) => {
        var x = array[i]
        array[i] = array[j]
        array[j] = x
        return array
    }

} 

export default MessagesHelper