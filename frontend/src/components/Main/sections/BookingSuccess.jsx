import React from "react";
import { Link } from "react-router-dom";
import store from "../../../store/store";
import DateToCorrectFormat from "../../../functions/DateToCorrectFormat";

const BookingSuccess = () => {
  return (
    <section className="section" id="booking-success">
      <div className="container">
        <div className="section__wrapper">
          <div className="section__title">
            <h2>Номер успешно забронирован</h2>
          </div>
          <div className="section__main">
            <div style={{ textAlign: "center" }}>
              <div>
                {`Комната №${
                  store.chosenRoomNumber
                } забронирована с ${DateToCorrectFormat(
                  store.firstDate
                )} по ${DateToCorrectFormat(store.lastDate)} на ${
                  store.guestsCount.value.count
                } ${
                  store.guestsCount.value.count === 1 ? " гостя" : " гостей"
                }. Вся информация направлена на почту ${store.email}.`}
                <br />
                {`Отменить бронирование можно по телефону на сайте отеля.`}
              </div>
              <Link to={"/"}>Вернуться на главную</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSuccess;
