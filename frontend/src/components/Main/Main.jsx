import React from 'react'
import {observer} from "mobx-react-lite";
import FirstScreen from "./sections/FirstScreen";
import Booking from "./sections/Booking";
import About from "./sections/About";
import Room from "./sections/Room";
import Gallery from "./sections/Gallery";
import Contacts from "./sections/Contacts";
import {ReactComponent as Phone} from "../../img/phone.svg";
import {Description} from "./sections/Description";
import Photo from "../../img/room1.jpg";
import store from "../../store/store";
import {useNavigate} from "react-router-dom";

const Main = (props) => {
    React.useEffect(() => {
        store.setIsBooked(false)
    })
    const items = [{id: 1, text: 'Односпальная кровать'}, {id: 2, text: 'Плазменный телевизор'}, {
        id: 3,
        text: 'Wi-fi и кабельное TV'
    }, {id: 4, text: 'Мини-холодильник'}, {id: 5, text: 'Электрический чайник'}, {
        id: 6,
        text: 'Туалетные принадлежности'
    }]
    let imgs = [{id: 1, img: Photo}, {id: 2, img: Photo}, {id: 3, img: Photo}, {id: 4, img: Photo}]
    const onBookingClick = (amount) => {
        store.setGuestsCount(store.options.find((item) => item.value === amount))
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
                  description={<Description items={items}/>}
                  imgs={imgs}
                  roomCost={2500}
                  btnText="Выбрать"
                  onBtnClick={() => onBookingClick(1)}
            />
            <Room title="Двухместные номера"
                  description={<Description items={items.slice(1, 4)}/>}
                  imgs={imgs}
                  roomCost={2000}
                  btnText="Выбрать"
                  onBtnClick={() => onBookingClick(2)}
            />
            <Gallery imgs={imgs}/>
            <Contacts/>
            <div className="phone-widget">
                <a href="tel:88005553535"><Phone/></a>
            </div>
        </main>
    );
}

export default observer(Main);
