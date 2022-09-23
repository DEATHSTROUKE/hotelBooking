import React from 'react';
import Carousel from 'better-react-carousel'
import Photo from "../../img/room1.jpg";

const CustomCarousel = (props) => {
    return (
        <Carousel cols={1} rows={1} showDots={true} dotColorActive={'#EAA649'} dynamicHeight={false}
                  mobileBreakpoint={635}  containerStyle={{maxHeight: '90vh'}}>
            {props.imgs && props.imgs.map((item) => <Carousel.Item key={item.id}>
                    <img src={item.img} alt="room image"/>
                </Carousel.Item>
            )}
        </Carousel>
    );
};

export default CustomCarousel;
