import {makeAutoObservable} from "mobx";

class Store {
    isMenuOpen = false
    firstDate = null
    secondDate = null
    guestsCount = 0
    constructor() {
        makeAutoObservable(this)
    }

    setMenuToggle() {
        this.isMenuOpen = !this.isMenuOpen
    }

    setFirstDate(date) {
        this.firstDate = date
    }

    setSecondDate(date) {
        this.secondDate = date
    }

    setGuestsCount(count) {
        this.guestsCount = count
    }
}

export default new Store()