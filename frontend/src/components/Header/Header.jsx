import React, {useEffect} from 'react'
import Logo from "../../img/logo.svg"
import store from '../../store/store'
import {observer} from "mobx-react-lite";
import cn from 'classnames'

const Header = (props) => {
    const onMenuOpen = () => {
        store.setMenuToggle()
        document.body.style.overflowY = store.isMenuOpen ? 'hidden' : 'scroll'
    }

    return (
        <header className={cn("header", {"menu-open": store.isMenuOpen})}>
            <div className="container">
                <div className="menu__wrapper">
                    <div className="menu__logo">
                        <img src={Logo} alt="logo" className="logo__img"/>
                        <div className="logo__text">Grand Уют</div>
                    </div>
                    <button className={cn("menu__burger", {"menu-open": store.isMenuOpen})} onClick={onMenuOpen}>
                        <span/>
                    </button>
                    {
                        window.innerWidth < 635 ? <nav className={cn("menu__nav", {"menu-open": store.isMenuOpen})} onClick={onMenuOpen}>
                            <a className="nav__item" href="#about">Об отеле</a>
                            <a className="nav__item" href="#booking">Бронирование</a>
                            <a className="nav__item" href="#rooms">Номера</a>
                            <a className="nav__item" href="#gallery">Фотогалерея</a>
                            <a className="nav__item" href="#contacts">Контакты</a>
                        </nav> : <nav className={"menu__nav"}>
                            <a className="nav__item" href="#about">Об отеле</a>
                            <a className="nav__item" href="#booking">Бронирование</a>
                            <a className="nav__item" href="#rooms">Номера</a>
                            <a className="nav__item" href="#gallery">Фотогалерея</a>
                            <a className="nav__item" href="#contacts">Контакты</a>
                        </nav>
                    }

                </div>
            </div>
        </header>
    );
}

export default observer(Header);
