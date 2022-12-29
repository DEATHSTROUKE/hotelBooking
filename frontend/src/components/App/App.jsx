import React from 'react'
import './style.css';
import {Routes, Route, useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Choose from "../Main/Choose";
import BookRoom from "../Main/BookRoom";

const App = () => {
    const navigate = useNavigate()
    const onBackClick = () => {
        navigate(-1)
        window.scrollTo(0, 0)
    }
    return (
        <Routes>
            <Route path="/choose" element={
                <div className="wrapper">
                    <Header page="choose"
                            isBurger={false}
                            children={[<a className="nav__item" onClick={onBackClick} key={1}>Назад</a>]}/>
                    <Choose/>
                    <Footer/>
                </div>
            }/>
            <Route path="/booking" element={
                <div className="wrapper">
                    <Header page="booking"
                            isBurger={false}
                            children={[<a className="nav__item" onClick={onBackClick} key={1}>Назад</a>]}/>
                    <BookRoom/>
                    <Footer/>
                </div>
            }/>
            <Route path="/" element={
                <div className="wrapper">
                    <Header page="main" isBurger={true} children={[
                        <a className="nav__item" href="#booking" key={1}>Бронирование</a>,
                        <a className="nav__item" href="#about" key={2}>Об отеле</a>,
                        <a className="nav__item" href="#rooms" key={3}>Номера</a>,
                        <a className="nav__item" href="#gallery" key={4}>Фотогалерея</a>,
                        <a className="nav__item" href="#contacts" key={5}>Контакты</a>]}/>
                    <Main page="main"/>
                    <Footer/>
                </div>
            }/>
        </Routes>
    );
}

export default App;
