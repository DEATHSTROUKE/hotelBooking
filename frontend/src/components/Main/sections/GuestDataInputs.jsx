import React from 'react';
import store from "../../../store/store";
import GuestPersonalData from "./GuestPersonalData";
import {observer} from "mobx-react-lite";

const GuestDataInputs = () => {
    const onClickBooking = () => {
        store.guests.map((item) => {
            console.log(item.id, item.name, item.surname, item.middlename)
        })
        store.setIsBooked(true)
    }

    const onChangeItem = (id, type, value) => {
        if (type === 'name') {
            store.setName(id, value)
        }
        if (type === 'surname') {
            store.setSurname(id, value)
        }
        if (type === 'middlename') {
            store.setMiddlename(id, value)
        }
        console.log(id, type)
    }

    return (
        <section className="section" id="guest-data-inp">
            <div className="container">
                <div className="section__wrapper">
                    <div className="section__title">
                        <h2>Введите данные</h2>
                    </div>
                    <div className="section__main">
                        <div className="input">
                            <input type="text" placeholder="Введите телефон" value={store.phone}
                                                      onChange={(e) => store.setPhone(e.target.value)}/>
                        </div>
                        <div className="input">
                            <input type="text" placeholder="Введите Email" value={store.email}
                                                      onChange={(e) => store.setEmail(e.target.value)}/>
                        </div>
                        {store.guests.map((item) => <GuestPersonalData id={item.id}
                                                                       key={item.id}
                                                                       name={item.name}
                                                                       surname={item.surname}
                                                                       middlename={item.middlename}
                                                                       onChangeItem={onChangeItem}
                        />)}
                        <button className="book__btn btn_center" onClick={onClickBooking}>
                            Забронировать номер
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default observer(GuestDataInputs);
