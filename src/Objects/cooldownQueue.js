class Node {
    constructor(value) {
        this.value = value
        this.next = null                
    }
}

class LinkedList {
    constructor(head = null) {
        this.head = head
        this.tail = this.head
    }

    enqueue(value) {
        if(this.head === null) {
            this.tail = new Node(value)
            this.head = this.tail
            return
        }
        this.tail.next = new Node(value)
        this.tail = this.tail.next
    }

    dequeue() {
        if(this.head === null) {
            return console.error("You can't delete the Linked List")
        }

        let valToReturn = this.head.value
        this.head = this.head.next
        return valToReturn
    }
}

class CooldownQueue {
    constructor(n, cooldown) {
        this.elements = this.#populateElements(n)
        this.queue = new LinkedList()
        this.cooldownInt = Math.round((n * (1 - cooldown/100)))
    }
    
    #populateElements(n) {
        let elements = []
        for(let i = 0; i < n; i++) {
            elements.push(i)
        }
        return elements
    }

    getElement = () => {
        let valToReturn = this.#popRandomElement()
        this.queue.enqueue(valToReturn)
        if(this.elements.length < this.cooldownInt) {
            this.elements.push(this.queue.dequeue())
        }
        return valToReturn
    }

    #popRandomElement() {
        let idxToSwap = Math.round(Math.random() * (this.elements.length - 1))
        this.#swap(this.elements, idxToSwap, this.elements.length - 1)
        return this.elements.pop()
    }

    #swap(array, i, j) {
        let x = array[i]
        array[i] = array[j]
        array[j] = x
        return array
    }

    getElements = (n) => {
        let elementsToReturn = []
        for(let i = 0; i < n; i++) {
            elementsToReturn.push(this.getElement())
        }
        return elementsToReturn
    }
}

export default CooldownQueue