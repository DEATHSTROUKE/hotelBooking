import React, {forwardRef} from 'react';
import {ReactComponent as Calendar} from "../../../img/calendar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {registerLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';
import store from "../../../store/store";
import {observer} from "mobx-react-lite";
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

const Booking = ({title, onBtnClick, btnText, isCancelBtn}) => {
    registerLocale('ru', ru)

    return (
        <section className="section" id="booking">
            <div className="container">
                <div className="section__wrapper">
                    <div className="section__title">
                        <h2>{title}</h2>
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
                                endDate={store.lastDate}
                                minDate={new Date()}
                                dateFormat="dd.MM.yyyy"
                            />
                        </div>
                        <div className="date_wrapped">
                            <DatePicker
                                selected={store.lastDate}
                                onChange={(date) => store.setLastDate(date)}
                                customInput={<CustomInputSecond/>}
                                locale="ru"
                                selectsEnd
                                startDate={store.firstDate}
                                endDate={store.lastDate}
                                minDate={Math.max(new Date(), store.firstDate)}
                                dateFormat="dd.MM.yyyy"
                            />
                        </div>
                        <div className="booking__select">
                            <Select
                                value={store.guestsCount}
                                onChange={(val) => store.setGuestsCount(val)}
                                options={store.options}
                            />
                        </div>
                        <button className="booking__btn btn_center" onClick={onBtnClick}>
                            {btnText}
                        </button>
                        {/*<button className="booking__btn">*/}
                        {/*    <div className="btn__left">Гостей: 2</div>*/}
                        {/*    <div className="btn__right">*/}
                        {/*        <Down/>*/}
                        {/*    </div>*/}
                        {/*</button>*/}
                    </div>
                    {isCancelBtn ? <div className="booking__cancel">
                        <a>Отменить бронирование</a>
                    </div> : ''}
                </div>
            </div>
        </section>
    );
};

export default observer(Booking);
