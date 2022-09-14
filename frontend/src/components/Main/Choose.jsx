import React, {useEffect} from 'react';
import axios from "axios";
import store from "../../store/store";
import DateToCorrectFormat from "../../functions/DateToCorrectFormat";
import fetchDataRooms from "../../functions/fetchDataRooms";
import Booking from "./sections/Booking";
import {observer} from "mobx-react-lite";
import Room from "./sections/Room";
import Photo from "../../img/room1.jpg";
import {useNavigate} from "react-router-dom";
import {ChooseRoomDescription} from "./sections/Description";

const Choose = () => {
    let imgs = [{id: 1, img: Photo}, {id: 2, img: Photo}, {id: 3, img: Photo}, {id: 4, img: Photo}]
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            let data = await fetchDataRooms
            data = await data.clone().json()
            store.setFreeRooms(data)
        }
        fetchData()
    }, []);

    const onNextClick = (id) => {
        store.setChosenRoomId(id)
        navigate('/booking')
    }

    const roomsRefresh = async () => {
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

    return (
        <main className="main">
            <Booking title="Выберите комнату" btnText="Найти" onBtnClick={roomsRefresh} isCancelBtn={false}/>
            {store.freeRooms.map((item) => <Room key={item.id}
                                                 title={`Комната №${item.number}`}
                                                 description={<ChooseRoomDescription
                                                     amount={item.amount}
                                                     girl_only={item.girl_only}
                                                 />}
                                                 imgs={imgs}
                                                 btnText="Выбрать"
                                                 roomCost={item.cost}
                                                 onBtnClick={() => onNextClick(item.id)}/>
            )}
        </main>
    );
};

export default observer(Choose);
