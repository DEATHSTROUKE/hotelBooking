import React from 'react';

export const Description = ({items}) => {
    return (
        <ul>
            {items.map((item) => <li key={item.id}>{item.text}</li>)}
        </ul>
    );
};

export const ChooseRoomDescription = ({girl_only, amount}) => {
    return (
        <ul>
            <li>Комната на {amount} {amount === 1 ? 'гостя' : 'гостей'}</li>
            {girl_only ? <li style={{color: 'red'}}>Комната только для девочек</li> : ''}
        </ul>
    );
}
