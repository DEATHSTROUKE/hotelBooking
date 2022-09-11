import React from 'react';
import Carousel from 'better-react-carousel'
import Photo from "../../img/room1.jpg";

const CustomCarousel = (props) => {
    return (
        <Carousel cols={1} rows={1} showDots={true} dotColorActive={'#EAA649'} mobileBreakpoint={635}>
            {props.imgs && props.imgs.map((item) => <Carousel.Item>
                    <img width="80%" src={item}/>
                </Carousel.Item>
            )}
        </Carousel>
    );
};

export default CustomCarousel;
