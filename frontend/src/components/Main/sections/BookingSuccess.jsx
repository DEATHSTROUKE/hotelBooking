import React from 'react';
import {Link} from "react-router-dom";

const BookingSuccess = () => {
    return (
        <section className="section" id="booking-success">
            <div className="container">
                <div className="section__wrapper">
                    <div className="section__title">
                        <h2>Номер успешно забронирован</h2>
                    </div>
                    <div className="section__main">
                        <div style={{textAlign: "center"}}>
                            <div>
                                Вся информация направлена на почту. Отменить бронирование можно по ссылке из
                                почты.
                            </div>
                            <Link to={'/'}>Вернуться на главную</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingSuccess;
