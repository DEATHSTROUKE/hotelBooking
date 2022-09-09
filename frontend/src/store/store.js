import {makeAutoObservable} from "mobx";

class Store {
    isMenuOpen = false
    constructor() {
        makeAutoObservable(this)
    }

    setMenuToggle() {
        this.isMenuOpen = !this.isMenuOpen
    }
}

export default new Store()