import { makeAutoObservable } from "mobx";

class Store {
  isMenuOpen = false;
  firstDate = null;
  lastDate = null;
  guestsCount = null;
  guests = [];
  options = [
    {
      id: 1,
      value: { count: 1, is_family: false, people_count: 1, cost: 3000 },
      label: "Гостей: 1",
    },
    {
      id: 2,
      value: { count: 2, is_family: false, people_count: 2, cost: 4000 },
      label: "Гостей: 2",
    },
    {
      id: 3,
      value: { count: 1, is_family: true, people_count: 2, cost: 4000 },
      label: "Семейная пара",
    },
  ];
  freeRooms = [];
  chosenRoomId = null;
  chosenRoomNumber = null;
  email = "";
  phone = "";
  isBooked = false;
  isLoading = false;
  isShowMaps = false;
  bookError = "";

  constructor() {
    makeAutoObservable(this);
  }

  setMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setFirstDate(date) {
    this.firstDate = date;
  }

  setLastDate(date) {
    this.lastDate = date;
  }

  setGuestsCount(count) {
    this.guestsCount = count;
    this.guests = [];
    for (let i = 0; i < count.value.people_count; i++) {
      this.guests.push({ id: i, name: "", surname: "", middlename: "" });
    }
  }

  setFreeRooms(rooms) {
    this.freeRooms = rooms;
    for (let i = 0; i < rooms.length; i++) {
      this.freeRooms[i].imgs = [];
      for (let j = 1; j <= this.freeRooms[i].count_photos; j++) {
        this.freeRooms[i].imgs.push({
          id: `${this.freeRooms[i].id}_${j}`,
          img: `${process.env.REACT_APP_SERVER_URL}/img_rooms/room_${this.freeRooms[i].number}_${j}.jpg`,
        });
      }
    }
  }

  setChosenRoomId(id, num) {
    this.chosenRoomId = id;
    this.chosenRoomNumber = num;
  }

  setName(ind, name) {
    this.guests[ind].name = name;
  }

  setSurname(ind, surname) {
    this.guests[ind].surname = surname;
  }

  setMiddlename(ind, name) {
    this.guests[ind].middlename = name;
  }

  setEmail(email) {
    this.email = email;
  }

  setPhone(phone) {
    this.phone = phone;
  }

  setIsBooked(state) {
    this.isBooked = state;
  }

  setIsLoading(state) {
    this.isLoading = state;
  }

  setIsShowMaps(value) {
    this.isShowMaps = value;
  }

  setBookError(message) {
    this.bookError = message;
  }
}

export default new Store();
