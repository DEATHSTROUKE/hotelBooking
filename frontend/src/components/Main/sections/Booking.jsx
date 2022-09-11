import React, {forwardRef, useEffect, useState} from 'react';
import {ReactComponent as Calendar} from "../../../img/calendar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {registerLocale, setDefaultLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';
import store from "../../../store/store";
import {observer} from "mobx-react-lite";
import {Link, Navigate} from "react-router-dom";
import Select from "react-select";

const CustomInputFirst = forwardRef(({value, onClick}, ref) => (
    <button className="booking__btn" ref={ref} onClick={onClick}>
        <div className="btn__left">{value ? value : "Заезд"}</div>
        <div className="btn__right">
            <Calendar/>
        </div>
    </button>
));

const CustomInputSecond = forwardRef(({value, onClick}, ref) => (
    <button className="booking__btn" ref={ref} onClick={onClick}>
        <div className="btn__left">{value ? value : "Выезд"}</div>
        <div className="btn__right">
            <Calendar/>
        </div>
    </button>
));

const options = [
    {value: 1, label: 'Гостей: 1'},
    {value: 2, label: 'Гостей: 2'}
];


const Booking = () => {
    registerLocale('ru', ru)
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const chooseRoom = () => {
        if (store.guestsCount !== 0 && store.firstDate !== null && store.secondDate !== null) {
            setShouldRedirect(true)
        }
    }


    return (
        <section className="section" id="booking">
            <div className="container">
                <div className="section__wrapper">
                    <div className="section__title">
                        <h2>Забронировать онлайн</h2>
                    </div>
                    <div className="section__main">
                        <div className="date_wrapped">
                            <DatePicker
                                selected={store.firstDate}
                                onChange={(date) => store.setFirstDate(date)}
                                customInput={<CustomInputFirst/>}
                                locale="ru"
                                selectsStart
                                startDate={store.firstDate}
                                endDate={store.secondDate}
                                minDate={new Date()}
                                dateFormat="dd.MM.yyyy"
                            />
                        </div>
                        <div className="date_wrapped">
                            <DatePicker
                                selected={store.secondDate}
                                onChange={(date) => store.setSecondDate(date)}
                                customInput={<CustomInputSecond/>}
                                locale="ru"
                                selectsEnd
                                startDate={store.firstDate}
                                endDate={store.secondDate}
                                minDate={store.firstDate}
                                dateFormat="dd.MM.yyyy"
                            />
                        </div>
                        <div className="booking__select">
                            <Select
                                value={options[store.guestsCount - 1]}
                                onChange={(val) => store.setGuestsCount(val)}
                                options={options}
                            />
                        </div>
                        <button className="booking__btn btn_center" onClick={chooseRoom}>
                            Показать наличие
                            {shouldRedirect ? <Navigate to="/choose"/> : ''}
                        </button>
                        {/*<button className="booking__btn">*/}
                        {/*    <div className="btn__left">Гостей: 2</div>*/}
                        {/*    <div className="btn__right">*/}
                        {/*        <Down/>*/}
                        {/*    </div>*/}
                        {/*</button>*/}
                    </div>
                    <div className="booking__cancel">
                        <a href="#">Отменить бронирование</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default observer(Booking);
