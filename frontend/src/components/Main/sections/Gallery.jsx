import React from 'react';

const Gallery = () => {
    return (
        <section className="section" id="gallery">
            <div className="container">
                <div className="section__wrapper">
                    <div className="section__title"><h2>Фотогалерея</h2></div>
                    <div className="section__main">
                        <div className="gallery">
                            <img src={require("../../../img/XXXL.webp")} alt="gallery"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
