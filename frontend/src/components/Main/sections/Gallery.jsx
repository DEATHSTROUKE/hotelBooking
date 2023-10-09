import React from "react";
import CustomCarousel from "../../CustomCarousel/Carousel";

const Gallery = ({ imgs }) => {
  return (
    <section className="section" id="gallery">
      <div className="container">
        <div className="section__wrapper">
          <div className="section__title">
            <h2>Фотогалерея</h2>
          </div>
          <div className="section__main">
            <div className="gallery">
              <CustomCarousel imgs={imgs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
