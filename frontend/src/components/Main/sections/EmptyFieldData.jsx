import React from 'react';

const EmptyFieldData = ({title, data}) => {
    return (
        <section className="section">
            <div className="container">
                <div className="section__wrapper">
                    <div className="section__title">
                        <h2>{title}</h2>
                    </div>
                    <div className="section__main">
                        {data}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmptyFieldData;
