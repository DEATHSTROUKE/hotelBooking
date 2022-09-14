import React from 'react';
import CustomCarousel from "../../CustomCarousel/Carousel";

const Room = ({title, description, imgs, onBtnClick, btnText, roomCost}) => {
    return (
        <section className="section" id="rooms">
            <div className="container">
                <div className="section__wrapper">
                    <div className="section__title"><h2>{title}</h2></div>
                    <div className="section__main">
                        <div className="room__wrapper">
                            <div className="room__gallery">
                                <CustomCarousel imgs={imgs}/>
                            </div>
                            <div className="room__info">
                                <div className="room__text">
                                    <div className="text__title"><h3>Описание</h3></div>
                                    <div className="text__description">
                                        {description}
                                    </div>
                                </div>
                                <div className="room__cost">
                                    <div className="cost__title"><h3>Стоимость: {roomCost} руб/сутки</h3></div>
                                    <button className="cost__btn" onClick={onBtnClick}>{btnText}</button>
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
