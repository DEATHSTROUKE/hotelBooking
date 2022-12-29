import React, {useEffect} from 'react';
import store from "../../store/store";
import {fetchRoomsData} from "../../functions/fetchRequests";
import Booking from "./sections/Booking";
import {observer} from "mobx-react-lite";
import Room from "./sections/Room";
import {useNavigate} from "react-router-dom";
import {ChooseRoomDescription} from "./sections/Description";
import EmptyFieldData from "./sections/EmptyFieldData";

const Choose = () => {
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
                                                         is_family={item.is_family}
                                                         girl_only={item.girl_only}
                                                     />}
                                                     imgs={item.imgs}
                                                     btnText="Выбрать"
                                                     roomCost={item.cost}
                                                     onBtnClick={() => onNextClick(item.id)}/>
                )}
                {!(store.firstDate && store.lastDate && store.guestsCount) ?
                    <EmptyFieldData title="Для выбора комнаты заполните следующие поля"
                                    data={<ul style={{textAlign: 'center'}}>
                                        {!store.firstDate ? <div>Дата заезда</div> : ''}
                                        {!store.lastDate ? <div>Дата выезда</div> : ''}
                                        {!store.guestsCount ? <div>Количество гостей</div> : ''}
                                    </ul>}/> : ''}
                {(store.firstDate && store.lastDate && store.guestsCount && store.freeRooms.length === 0 && !store.isLoading) ?
                    <EmptyFieldData title="Подходящей комнаты не найдено" data="Для размещения в номере другого типа, а также уточнения информации вы можете позвонить по номеру 89994422022"/> : ''}
                {store.isLoading ? <EmptyFieldData title="Загрузка доступных комнат..."/> : ''}
            </div>
        </main>
    );
};

export default observer(Choose);
