import React from "react";
import store from "../../../store/store";
import GuestPersonalData from "./GuestPersonalData";
import { observer } from "mobx-react-lite";
import { IMaskInput } from "react-imask";
import { fetchPostBooking } from "../../../functions/fetchRequests";

const PhoneMask = "+{7} (000) 000-00-00";

const GuestDataInputs = () => {
  const onClickBooking = () => {
    if (store.email === "") {
      store.setBookError("Введите email");
    } else if (store.phone === "") {
      store.setBookError("Введите номер телефона");
    } else {
      let fl = true;
      for (let i of store.guests) {
        if (
          i.name.trim() === "" ||
          i.surname.trim() === "" ||
          i.middlename.trim() === ""
        ) {
          fl = false;
          break;
        }
      }
      if (!fl) {
        store.setBookError("Заполните пожалуйста все поля");
      } else {
        store.setBookError("");
        fetchPostBooking();
      }
    }
  };

  const onChangeItem = (id, type, value) => {
    if (type === "name") {
      store.setName(id, value);
    }
    if (type === "surname") {
      store.setSurname(id, value);
    }
    if (type === "middlename") {
      store.setMiddlename(id, value);
    }
  };

  return (
    <section className="section" id="guest-data-inp">
      <div className="container">
        <div className="section__wrapper">
          <div className="section__title">
            <h2>Введите данные</h2>
          </div>
          <div className="section__main">
            <div className="input">
              <label>Введите телефон</label>
              <IMaskInput
                mask={PhoneMask}
                value={store.phone}
                onAccept={(value) => {
                  store.setPhone(value);
                }}
              />
            </div>
            <div className="input">
              <label>Введите email</label>
              <input
                type="text"
                value={store.email}
                onChange={(e) => store.setEmail(e.target.value)}
              />
            </div>
            {store.guests.map((item) => (
              <GuestPersonalData
                id={item.id}
                key={item.id}
                name={item.name}
                surname={item.surname}
                middlename={item.middlename}
                onChangeItem={onChangeItem}
              />
            ))}
            {store.bookError && <div className="error">{store.bookError}</div>}
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
