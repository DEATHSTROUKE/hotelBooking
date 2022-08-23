import React, {useEffect} from 'react'
import './App.css';
import {Routes, Link, Route} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import axios from "axios";
import store from "../../store/store";
let tg = window.Telegram.WebApp

const App = () => {
    useEffect(() => {
        (async () => {
            let data = await axios.get("https://checkdebut.herokuapp.com/get_all_category");
            if (data.status === 200) {
                store.setListCategory(data.data.data)
            }
            data = await axios.get("https://checkdebut.herokuapp.com/get_all_info");
            if (data.status === 200) {
                store.setListProducts(data.data.tasks)
                store.setUrlServer(data.data.url)
            }
            try {
                tg.expand()
            } catch {
                console.log("not tg")
            }
        })()
    }, [])

    return (
        <div className="wrapper">
            <Routes>
                <Route path="/cart" element={
                    <>
                        <Header page="cart"/>
                        <Main page="cart"/>
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
