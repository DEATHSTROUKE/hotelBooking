import {makeAutoObservable} from "mobx";

class Store {
    isMenuOpen = false
    firstDate = null
    lastDate = null
    guestsCount = 0
    showChooseDatePanel = true
    options = [
        {value: 1, label: 'Гостей: 1'},
        {value: 2, label: 'Гостей: 2'}
    ];
    freeRooms = []
    chosenRoomId = null
    name = []
    surname = []
    middlename = []
    email = null
    phone = null

    constructor() {
        makeAutoObservable(this)
    }

    setMenuToggle() {
        this.isMenuOpen = !this.isMenuOpen
    }

    setFirstDate(date) {
        this.firstDate = date
    }

    setLastDate(date) {
        this.lastDate = date
    }

    setGuestsCount(count) {
        this.guestsCount = count
    }

    setFreeRooms(rooms) {
        this.freeRooms = rooms
    }


    setChosenRoomId(id) {
        this.chosenRoomId = id
    }

    setName(ind, name) {
        this.name[ind] = name
    }

    setSurname(ind, surname) {
        this.surname[ind] = surname
    }

    setMiddlename(ind, name) {
        this.middlename[ind] = name
    }

    setEmail(email) {
        this.email = email
    }

    setPhone(phone) {
        this.phone = phone
    }

}

export default new Store()