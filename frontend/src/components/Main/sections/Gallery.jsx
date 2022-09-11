import React, {useEffect} from 'react';
import CustomCarousel from "../../CustomCarousel/Carousel";
import store from "../../../store/store";
import Photo from '../../../img/room1.jpg'


const Gallery = () => {
    let imgs = [Photo, Photo, Photo, Photo]

    return (
        <section className="section" id="gallery">
            <div className="container">
                <div className="section__wrapper">
                    <div className="section__title"><h2>Фотогалерея</h2></div>
                    <div className="section__main">
                        <div className="gallery">
                            <CustomCarousel imgs={imgs}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
