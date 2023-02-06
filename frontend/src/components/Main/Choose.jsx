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

    const onNextClick = (id, num) => {
        store.setChosenRoomId(id, num)
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
                {store.freeRooms.map((item) =>
                    <Room key={item.id}
                          title={`Комната №${item.number}`}
                          description={<ChooseRoomDescription
                              amount={store.guestsCount.value.people_count}
                              is_family={item.is_family}
                              girl_only={item.girl_only}
                          />}
                          imgs={item.imgs}
                          btnText="Выбрать"
                          roomCost={store.guestsCount.value.cost}
                          onBtnClick={() => onNextClick(item.id, item.number)}/>
                )}
                {!(store.firstDate && store.lastDate && store.guestsCount) ?
                    <EmptyFieldData title="Для выбора комнаты заполните следующие поля"
                                    data={<ul style={{textAlign: 'center'}}>
                                        {!store.firstDate ? <div>Дата заезда</div> : ''}
                                        {!store.lastDate ? <div>Дата выезда</div> : ''}
                                        {!store.guestsCount ? <div>Количество гостей</div> : ''}
                                    </ul>}/> : ''}
                {(store.firstDate && store.lastDate && store.guestsCount && store.freeRooms.length === 0 && !store.isLoading) ?
                    <EmptyFieldData title="Подходящей комнаты не найдено"
                                    data={store.guestsCount.value.count === 1 ? "К сожалению, одноместные номера на выбранные вами даты забронированы. " +
                                        "Мы можем предложить вам одноместное размещение в двухместном номере, для этого позвоните по номеру 89994422022. Благодарим за понимание" :
                                        (store.guestsCount.value.count === 2 && store.guestsCount.value.is_family) ? "К сожалению, семейные номера на выбранные вами даты забронированы. " +
                                            "Мы можем предложить вам размещение в двухместном номере. Для этого выберите \"Гостей: 2\" в выпадающем списке выше" :
                                            "Для размещения в номере другого типа, а также уточнения информации вы можете позвонить по номеру 89994422022"}/> : ''}
                {store.isLoading ? <EmptyFieldData title="Загрузка доступных комнат..."/> : ''}
            </div>
        </main>
    );
};

export default observer(Choose);
