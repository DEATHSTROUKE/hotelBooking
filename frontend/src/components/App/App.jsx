import React, {useEffect} from 'react'
import './style.css';
import {Routes, Link, Route} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import axios from "axios";
import store from "../../store/store";
import Choose from "../Main/Choose";
import BookRoom from "../Main/BookRoom";

const App = () => {
    return (
        <div className="wrapper">
            <Routes>
                <Route path="/choose" element={
                    <>
                        <Header page="choose"/>
                        <Choose />
                        <Footer/>
                    </>
                }/>
                <Route path="/booking" element={
                    <>
                        <Header page="booking"/>
                        <BookRoom />
                        <Footer/>
                    </>
                }/>
                <Route path="/" element={
                    <>
                        <Header page="main"/>
                        <Main page="main"/>
                        <Footer/>
                    </>
                }/>
            </Routes>
        </div>
    );
}

export default App;
