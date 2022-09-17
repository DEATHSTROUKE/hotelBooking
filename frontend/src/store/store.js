import {makeAutoObservable} from "mobx";

class Store {
    isMenuOpen = false
    firstDate = null
    lastDate = null
    guestsCount = 0
    guests = []
    options = [
        {value: 1, label: 'Гостей: 1'},
        {value: 2, label: 'Гостей: 2'}
    ];
    freeRooms = []
    chosenRoomId = null
    email = ''
    phone = ''
    isBooked = false

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
        this.guests = []
        for (let i = 0; i < count.value; i++) {
            this.guests.push({id: i, name: '', surname: '', middlename: ''})
        }
    }

    setFreeRooms(rooms) {
        this.freeRooms = rooms
    }


    setChosenRoomId(id) {
        this.chosenRoomId = id
    }

    setName(ind, name) {
        this.guests[ind].name = name
    }

    setSurname(ind, surname) {
        this.guests[ind].surname = surname
    }

    setMiddlename(ind, name) {
        this.guests[ind].middlename = name
    }

    setEmail(email) {
        this.email = email
    }

    setPhone(phone) {
        this.phone = phone
    }
    setIsBooked(state) {
        this.isBooked = state
    }

}

export default new Store()