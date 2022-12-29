import React from 'react'
import {observer} from "mobx-react-lite";
import FirstScreen from "./sections/FirstScreen";
import Booking from "./sections/Booking";
import Room from "./sections/Room";
import Gallery from "./sections/Gallery";
import Contacts from "./sections/Contacts";
import {ReactComponent as Phone} from "../../img/phone.svg";
import {Description} from "./sections/Description";
import store from "../../store/store";
import {useNavigate} from "react-router-dom";
import About from "./sections/About";
import {imgs} from "../../functions/staticRoomsData";
import {
    descriptionArrayForOne,
    descriptionArrayForTwo,
    descriptionArrayForFamily
} from "../../functions/staticRoomsData";

let options_map = {
    once: true,
    passive: true,
    capture: true
};

const Main = () => {
    const ref = React.useRef(null)
    React.useEffect(() => {
        store.setIsBooked(false)
        try {
            ref.current.addEventListener('click', () => store.setIsShowMaps(true), options_map);
            ref.current.addEventListener('mouseover', () => store.setIsShowMaps(true), options_map);
            ref.current.addEventListener('touchstart', () => store.setIsShowMaps(true), options_map);
            ref.current.addEventListener('touchmove', () => store.setIsShowMaps(true), options_map);
        } catch (e) {
        }
    }, [])

    const onBookingClick = (num) => {
        store.setGuestsCount(store.options.find((item) => item.id === num))
        navigate('/choose')
    }

    const navigate = useNavigate()
    const chooseRoom = () => {
        if (store.guestsCount !== 0 && store.firstDate !== null && store.lastDate !== null) {
            navigate('/choose')
        }
    }

    return (
        <main className="main">
            <FirstScreen/>
            <Booking title="Забронировать онлайн"
                     btnText="Показать наличие"
                     onBtnClick={chooseRoom}
                     isCancelBtn={false}
            />
            <About/>
            <Room title="Одноместные номера"
                  description={<Description items={descriptionArrayForOne}/>}
                  imgs={imgs}
                  roomCost={2500}
                  btnText="Выбрать"
                  onBtnClick={() => onBookingClick(1)}
            />
            <Room title="Семейный номер"
                  description={<Description items={descriptionArrayForFamily}/>}
                  imgs={imgs}
                  roomCost={3000}
                  btnText="Выбрать"
                  onBtnClick={() => onBookingClick(3)}
            />
            <Room title="Двухместные номера"
                  description={<Description items={descriptionArrayForTwo}/>}
                  imgs={imgs}
                  roomCost={3000}
                  btnText="Выбрать"
                  onBtnClick={() => onBookingClick(2)}
            />
            <Gallery imgs={imgs}/>
            {store.isShowMaps ? <Contacts/> : <div className="fake-map" id="contacts" ref={ref}/>}
            <div className="phone-widget">
                <a href="tel:89994422022"><Phone/></a>
            </div>
        </main>
    );
}

export default observer(Main);
