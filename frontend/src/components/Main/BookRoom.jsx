import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import store from "../../store/store";
import GuestData from "./sections/GuestData";

const BookRoom = () => {
    useEffect(() => {
        store.setGuestsCount({value: 2})
    }, [])
    const onClickBooking = () => {
        store.guests.map((item) => {
            console.log(item.id, item.name, item.surname, item.middlename)
        })
    }

    const onChangeItem = (id, type, value) => {
        if (type === 'name'){store.setName(id, value)}
        if (type === 'surname'){store.setSurname(id, value)}
        if (type === 'middlename'){store.setMiddlename(id, value)}
        console.log(id, type)
    }

    return (
        <main className="main">
            <div><input type="text" placeholder="Введите телефон" value={store.phone}
                        onChange={(e) => store.setPhone(e.target.value)}/></div>
            <div><input type="text" placeholder="Введите Email" value={store.email}
                        onChange={(e) => store.setPhone(e.target.value)}/></div>
            {store.guests.map((item) => <GuestData id={item.id}
                                                   key={item.id}
                                                   name={item.name}
                                                   surname={item.surname}
                                                   middlename={item.middlename}
                                                   onChangeItem={onChangeItem}
            />)}
            <button onClick={onClickBooking}>Забронировать</button>
        </main>
    );
};

export default observer(BookRoom);
