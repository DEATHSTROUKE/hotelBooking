import React from 'react';

const Room = () => {
    return (
        <section className="section" id="rooms">
            <div className="container">
                <div className="section__wrapper">
                    <div className="section__title"><h2>Одноместные номера</h2></div>
                    <div className="section__main">
                        <div className="room__wrapper">
                            <div className="room__gallery">
                                <img src={require('../../../img/room1.jpg')} alt="room gallery"/>
                            </div>
                            <div className="room__info">
                                <div className="room__text">
                                    <div className="text__title"><h3>Описание</h3></div>
                                    <div className="text__description">
                                        <ul>
                                            <li>Односпальная кровать</li>
                                            <li>Плазменный телевизор</li>
                                            <li>Wi-fi и кабельное TV</li>
                                            <li>Мини-холодильник</li>
                                            <li>Электрический чайник</li>
                                            <li>Туалетные принадлежности</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="room__cost">
                                    <div className="cost__title"><h3>Стоимость: 1500 руб/сутки</h3></div>
                                    <button className="cost__btn">Забронировать</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Room;
