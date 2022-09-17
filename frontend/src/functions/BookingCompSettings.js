import React, {forwardRef} from "react";
import {ReactComponent as Calendar} from "../img/calendar.svg";

export const CustomInputFirst = forwardRef(({value, onClick}, ref) => (
    <button className="booking__btn" ref={ref} onClick={onClick}>
        <div className="btn__left">{value ? value : "Заезд"}</div>
        <div className="btn__right">
            <Calendar/>
        </div>
    </button>
));

export const CustomInputSecond = forwardRef(({value, onClick}, ref) => (
    <button className="booking__btn" ref={ref} onClick={onClick}>
        <div className="btn__left">{value ? value : "Выезд"}</div>
        <div className="btn__right">
            <Calendar/>
        </div>
    </button>
));

export const customStyles = {
    control: styles => ({
        ...styles,
        color: 'white',
        borderRadius: '15px',
        height: "100%",
        border: 'none',
        outline: 'none',
        padding: '0 15px',
        background: 'linear-gradient(180deg, #F2CA7A 0%, #E5BB6D 18.75%, #DAAD61 34.9%, #CC9D53 49.48%, #C7964D 63.02%, #BE8C44 75.52%, #B5823C 88.02%, #AD7833 100%)'
    }),
    placeholder: styles => ({...styles, color: 'white'}),
    container: styles => ({...styles, height: '100%'}),
    singleValue: styles => ({...styles, color: 'white'}),
}