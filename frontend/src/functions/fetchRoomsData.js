import store from "../store/store";
import axios from "axios";
import DateToCorrectFormat from "./DateToCorrectFormat";

export const fetchRoomsData = async () => {
    if (store.firstDate && store.lastDate && store.guestsCount) {
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/booking/get_free_rooms`, {
            params: {
                first_date: DateToCorrectFormat(store.firstDate),
                last_date: DateToCorrectFormat(store.lastDate),
                amount: store.guestsCount.value
            }
        })
        store.setFreeRooms(data)
    }
}