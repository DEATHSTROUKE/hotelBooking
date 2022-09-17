import store from "../store/store";
import axios from "axios";
import DateToCorrectFormat from "./DateToCorrectFormat";

export const fetchRoomsData = async () => {
    if (store.firstDate && store.lastDate && store.guestsCount) {
        store.setIsLoading(true)
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/booking/get_free_rooms`, {
            params: {
                first_date: DateToCorrectFormat(store.firstDate),
                last_date: DateToCorrectFormat(store.lastDate),
                amount: store.guestsCount.value
            }
        })
        store.setIsLoading(false)
        store.setFreeRooms(data)
    }
}

export const fetchPostBooking = async () => {
    if (store.firstDate && store.lastDate && store.guestsCount && store.phone && store.email && store.chosenRoomId) {
        store.setIsLoading(true)
        for (let i of store.guests) {
            const {data, status} = await axios.post(`${process.env.REACT_APP_API_URL}/booking/`, {
                name: i.name,
                surname: i.surname,
                middlename: i.middlename,
                email: store.email,
                phone: store.phone,
                roomId: store.chosenRoomId,
                first_date: DateToCorrectFormat(store.firstDate),
                last_date: DateToCorrectFormat(store.lastDate)
            })
            if (status === 200) {
                console.log(data)
            }
        }
        store.setIsLoading(false)
        store.setIsBooked(true)
    }
}