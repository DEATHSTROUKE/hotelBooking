import React from 'react'
import {observer} from "mobx-react-lite";
import FirstScreen from "./sections/FirstScreen";
import Booking from "./sections/Booking";
import Room from "./sections/Room";
import Gallery from "./sections/Gallery";
import Contacts from "./sections/Contacts";
import {ReactComponent as Phone} from "../../img/phone.svg";
import {Description} from "./sections/Description";
import Photo1 from "../../img/rooms/room_1_1.jpg";
import Photo2 from "../../img/rooms/room_1_2.jpg";
import Photo3 from "../../img/rooms/room_2_1.jpg";
import Photo4 from "../../img/rooms/room_2_2.jpg";
import Photo5 from "../../img/rooms/room_3_1.jpg";
import Photo6 from "../../img/rooms/room_3_2.jpg";
import store from "../../store/store";
import {useNavigate} from "react-router-dom";

const Main = (props) => {
    React.useEffect(() => {
        store.setIsBooked(false)
    })
    const items = [{id: 1, text: 'Обогреватель'}, {id: 2, text: 'Туалетные принадлежности'}, {
        id: 3, text: 'Бесплатный завтрак'}]
    let imgs = [{id: 1, img: Photo1}, {id: 2, img: Photo2}, {id: 3, img: Photo3}, {id: 4, img: Photo5}]
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
                <a href="tel:89994422022"><Phone/></a>
            </div>
        </main>
    );
}

export default observer(Main);
