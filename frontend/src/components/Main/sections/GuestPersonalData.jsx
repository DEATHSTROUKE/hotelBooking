import React from 'react';

const GuestPersonalData = ({id, name, surname, middlename, onChangeItem}) => {
    return (
        <div className="guest-data__wrapper">
            <h3>Гость №{id + 1}</h3>
            <div className="input">
                <label>Введите фамилию</label>
                <input type="text"
                        value={surname}
                        onChange={(e) =>
                            onChangeItem(id, "surname", e.target.value)}/>
            </div>
            <div className="input">
                <label>Введите имя</label>
                <input type="text"
                        value={name}
                        onChange={(e) =>
                            onChangeItem(id, "name", e.target.value)}/>
            </div>
            <div className="input">
                <label>Введите отчество</label>
                <input type="text"
                        value={middlename}
                        onChange={(e) =>
                            onChangeItem(id, "middlename", e.target.value)}/>
            </div>
        </div>
    );
};

export default GuestPersonalData;
