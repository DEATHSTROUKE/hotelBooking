import React from 'react';
import Carousel from 'better-react-carousel'

const CustomCarousel = (props) => {
    return (
        <div className="carousel_container">
            <Carousel cols={1} rows={1} showDots={true} dotColorActive={'#EAA649'} dynamicHeight={false}
                      mobileBreakpoint={635} containerStyle={{maxHeight: '90vh', borderRadius: 15}}>
                {props.imgs && props.imgs.map((item) => <Carousel.Item key={item.id}>
                        <img src={item.img} alt="room"/>
                    </Carousel.Item>
                )}
            </Carousel>
        </div>
    );
};

export default CustomCarousel;
