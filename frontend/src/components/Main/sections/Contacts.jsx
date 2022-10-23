import React, {useEffect} from 'react';
import {ReactComponent as Phone} from "../../../img/phone.svg";

const Contacts = () => {
    useEffect(() => {
        try {
            const script = document.createElement("script");

            const height = (window.innerWidth < 635) ? window.innerWidth : 550
            script.src = `https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A2b0cae79498f0a0f0d5a06c25045945f6fd0229c6f75a72101585b588be11c7f&amp;width=100%25&amp;height=${height}&amp;lang=ru_RU&amp;scroll=false`;
            script.async = true;

            document.getElementById('map').appendChild(script);
            script.addEventListener('load', () => {
                document.querySelector('iframe').height = `${height}px`
            })
            return () => {
                let el = document.getElementById('map')
                if (el) {
                    el.removeChild(el.lastChild)
                }
            }
        } catch (e) {
        }
    }, [])

    return (
        <section className="section" id="contacts">
            <div className="section__wrapper">
                <div id="map"/>
                <div className="contacts">
                    <div className="contacts__title"><h2>Контакты</h2></div>
                    <div className="contacts__items">
                        <div className="contacts__item">
                            <div className="item__title"><h3>Адрес</h3></div>
                            <div className="item__info">663400, Красноярский край, Мотыгинский район, пгт. Мотыгино, ул. Первомайская, дом 1</div>
                        </div>
                        <div className="contacts__item">
                            <div className="item__title"><h3>Телефон</h3></div>
                            <div className="item__info">
                                <Phone/>
                                89994422022
                            </div>
                        </div>
                        <div className="contacts__item">
                            <div className="item__title"><h3>Email</h3></div>
                            <div className="item__info">Grand.uyt@mail.ru</div>
                        </div>
                        <div className="contacts__item">
                            <div className="item__title"><h3>Часы работы</h3></div>
                            <div className="item__info">Круглосуточно</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contacts;
