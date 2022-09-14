import React from 'react';
import {observer} from "mobx-react-lite";
import store from "../../store/store";

const BookRoom = () => {
    return (
        <main className="main">
            <div><input type="text" placeholder="Введите телефон" value={store.phone}/></div>
            <div><input type="text" placeholder="Введите Email" value={store.email}/></div>
            {}
            <h3>Гость №1</h3>
            <div><input type="text" placeholder="Введите фамилию" value={store.name}/></div>
            <div><input type="text" placeholder="Введите имя" value={store.surname}/></div>
            <div><input type="text" placeholder="Введите отчество" value={store.middlename}/></div>
            <h3>Гость №2</h3>
            <div><input type="text" placeholder="Введите фамилию" value={store.name}/></div>
            <div><input type="text" placeholder="Введите имя" value={store.surname}/></div>
            <div><input type="text" placeholder="Введите отчество" value={store.middlename}/></div>
            <button>Забронировать</button>
        </main>
    );
};

export default observer(BookRoom);
