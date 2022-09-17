import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import store from "../../store/store";
import GuestDataInputs from "./sections/GuestDataInputs";
import BookingSuccess from "./sections/BookingSuccess";
import {useNavigate} from "react-router-dom";

const BookRoom = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!(store.firstDate && store.lastDate && store.guestsCount && store.chosenRoomId)) {
            navigate(-1)
        }
    }, [])

    return (
        <main className="main">
            {store.isBooked ? <BookingSuccess/> : <GuestDataInputs/>}
        </main>
    );
};

export default observer(BookRoom);
