import React from 'react';
import {ReactComponent as Calendar} from "../../../img/calendar.svg";
import {ReactComponent as Down} from "../../../img/down.svg";

const Booking = () => {
    return (
        <section className="section" id="booking">
            <div className="container">
                <div className="section__wrapper">
                    <div className="section__title">
                        <h2>Забронировать онлайн</h2>
                    </div>
                    <div className="section__main">
                        <button className="booking__btn">
                            <div className="btn__left">Заезд</div>
                            <div className="btn__right">
                                <Calendar />
                            </div>
                        </button>
                        <button className="booking__btn">
                            <div className="btn__left">Выезд</div>
                            <div className="btn__right">
                                <Calendar />
                            </div>
                        </button>
                        <button className="booking__btn">
                            <div className="btn__left">Гостей: 2</div>
                            <div className="btn__right">
                                <Down />
                            </div>
                        </button>
                        <button className="booking__btn btn_center">
                            Показать наличие
                        </button>
                    </div>
                    <div className="booking__cancel">
                        <a href="#">Отменить бронирование</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Booking;
