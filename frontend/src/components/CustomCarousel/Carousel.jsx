import React from 'react';
import Carousel from 'better-react-carousel'
import Photo from '../../img/room1.jpg'
import store from "../../store/store";

const CustomCarousel = (props) => {
    return (
        <Carousel cols={1} rows={1} showDots={true} dotColorActive={'#EAA649'} mobileBreakpoint={635}>
            <Carousel.Item>
                <img width="80%" src={Photo}/>
            </Carousel.Item>
            <Carousel.Item>
                <img width="80%" src={Photo}/>
            </Carousel.Item>
            <Carousel.Item>
                <img width="80%" src={Photo}/>
            </Carousel.Item>
            <Carousel.Item>
                <img width="80%" src={Photo}/>
            </Carousel.Item>
        </Carousel>
    );
};

export default CustomCarousel;
