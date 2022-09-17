import React, {useEffect} from 'react';
import axios from "axios";
import store from "../../store/store";
import DateToCorrectFormat from "../../functions/DateToCorrectFormat";
import {fetchRoomsData} from "../../functions/fetchRequests";
import Booking from "./sections/Booking";
import {observer} from "mobx-react-lite";
import Room from "./sections/Room";
import Photo from "../../img/room1.jpg";
import {useNavigate} from "react-router-dom";
import {ChooseRoomDescription} from "./sections/Description";
import EmptyFieldData from "./sections/EmptyFieldData";

const Choose = () => {
    let imgs = [{id: 1, img: Photo}, {id: 2, img: Photo}, {id: 3, img: Photo}, {id: 4, img: Photo}]
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchRoomsData()
    }, [store.firstDate, store.lastDate, store.guestsCount]);

    const onNextClick = (id) => {
        store.setChosenRoomId(id)
        store.setGuestsCount(store.guestsCount)
        navigate('/booking')
    }

    const roomsRefresh = async () => {
        fetchRoomsData()
    }

    return (
        <main className="main">
            <Booking title="Выберите комнату" btnText="Найти" onBtnClick={roomsRefresh} isCancelBtn={false}/>
            <div className="rooms-container">
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
                {!(store.firstDate && store.lastDate && store.guestsCount) ?
                    <EmptyFieldData title="Для выбора комнаты заполните следующие поля"
                                    data={<ul style={{textAlign: 'center'}}>
                                        {!store.firstDate ? <li>Дату заезда</li> : ''}
                                        {!store.lastDate ? <li>Дату выезда</li> : ''}
                                        {!store.guestsCount ? <li>Количество гостей</li> : ''}
                                    </ul>}/> : ''}
                {(store.firstDate && store.lastDate && store.guestsCount && store.freeRooms.length === 0 && !store.isLoading) ?
                    <EmptyFieldData title="Подходящей комнаты не найдено"/> : ''}
                {store.isLoading ? <EmptyFieldData title="Загрузка доступных комнат..."/> : ''}
            </div>
        </main>
    );
};

export default observer(Choose);
