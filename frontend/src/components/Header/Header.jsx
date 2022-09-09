import React from 'react'
import Logo from "../../img/logo.svg"

const Header = (props) => {
    return (
        <header className="header">
            <div className="container">
                <div className="menu__wrapper">
                    <div className="menu__logo">
                        <img src={Logo} alt="logo" className="logo__img"/>
                        <div className="logo__text">Grand Уют</div>
                    </div>
                    <button className="menu__burger">
                        <span/>
                    </button>
                    <nav className="menu__nav">
                        <a className="nav__item" href="#about">Об отеле</a>
                        <a className="nav__item" href="#booking">Бронирование</a>
                        <a className="nav__item" href="#rooms">Номера</a>
                        <a className="nav__item" href="#gallery">Фотогалерея</a>
                        <a className="nav__item" href="#contacts">Контакты</a>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
