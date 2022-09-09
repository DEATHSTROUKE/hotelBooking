import React, {useEffect} from 'react'
import './style.css';
import {Routes, Link, Route} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import axios from "axios";
import store from "../../store/store";

const App = () => {
    return (
        <div className="wrapper">
            <Routes>
                <Route path="/choose" element={
                    <>
                        <Header page="choose"/>
                        <Main page="choose"/>
                        <Footer/>
                    </>
                }/>
                <Route path="/booking" element={
                    <>
                        <Header page="booking"/>
                        <Main page="booking"/>
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
