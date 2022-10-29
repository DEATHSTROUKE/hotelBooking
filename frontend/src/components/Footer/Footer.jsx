import React from 'react'
import {ReactComponent as Phone} from '../../img/phone.svg'
import Logo from "../../img/logo.svg"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__wrapper">
                    <img src={Logo} alt="logo" className="footer__logo"/>
                    <nav className="footer-nav">
                        <div className="footer-nav__item">
                            <div className="item__title">
                                <h3>Grand Уют</h3>
                            </div>
                            <div className="item__link">
                                <a href="tel:89994422022">
                                    <Phone/>
                                    89994422022</a>
                            </div>
                            <div className="item__link">
                                <a href="mailto:Grand.uyt@mail.ru" target="_blank">Grand.uyt@mail.ru</a>
                            </div>
                            <div className="item__link">
                                Официальный сайт <br/>© 2022
                            </div>
                        </div>
                        <div className="footer-nav__item">
                            <div className="item__title">
                                <h3>Навигация</h3>
                            </div>
                            <div className="item__link">
                                <a href="#booking">Бронирование</a>
                            </div>
                            <div className="item__link">
                                <a href="#rooms">Номера</a>
                            </div>
                            <div className="item__link">
                                <a href="#gallery">Фотогалерея</a>
                            </div>
                            <div className="item__link">
                                <a href="#contacts">Контакты</a>
                            </div>
                        </div>
                        <div className="footer-nav__item">
                            <div className="item__title">
                                <h3>Навигация</h3>
                            </div>
                            <div className="item__link">
                                <a href={process.env.REACT_APP_SERVER_URL + "/documents/Правила%20проживания.docx"}
                                   download="">Правила проживания</a>
                            </div>
                            <div className="item__link">
                                <a href={process.env.REACT_APP_SERVER_URL + "/documents/Политика%20конфиденциальности.docx"}
                                   download="">Политика
                                    конфиденциальности</a>
                            </div>
                            <div className="item__link">
                                <a href={process.env.REACT_APP_SERVER_URL + "/documents/Противопожарная%20безопасность.docx"}
                                   download="">Противопожарная
                                    безопасность</a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
