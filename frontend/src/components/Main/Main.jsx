import React from 'react'
import {observer} from "mobx-react-lite";
import FirstScreen from "./sections/FirstScreen";
import Booking from "./sections/Booking";
import About from "./sections/About";
import Room from "./sections/Room";
import Gallery from "./sections/Gallery";
import Contacts from "./sections/Contacts";
import {ReactComponent as Phone} from "../../img/phone.svg";


const Main = (props) => {
    return (
        <main className="main">
            <FirstScreen/>
            <Booking/>
            <About/>
            <Room/>
            <Room/>
            <Gallery/>
            <Contacts/>
            <div className="phone-widget">
                <a href="tel:88005553535"><Phone/></a>
            </div>
        </main>
    );
}

export default observer(Main);
