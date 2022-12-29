import React from 'react';
import {
    descriptionArrayForOne,
    descriptionArrayForTwo,
    descriptionArrayForFamily
} from "../../../functions/staticRoomsData";

export const Description = ({items}) => {
    return (
        <ul>
            {items.map((item) => <li key={item.id}>{item.text}</li>)}
        </ul>
    );
};

export const ChooseRoomDescription = ({girl_only, amount, is_family}) => {
    return (
        <ul>
            {is_family ? <li>Семейный номер на {amount} {amount === 1 ? 'гостя' : 'гостей'}</li> :
                <li>Номер на {amount} {amount === 1 ? 'гостя' : 'гостей'}</li>
            }
            {girl_only ? <li style={{color: 'red'}}>Комната только для девочек</li> : ''}
            {
                is_family ? descriptionArrayForFamily.map((item, ind) => <li key={ind}>{item}</li>) :
                    amount === 2 ? descriptionArrayForTwo.map((item, ind) => <li key={ind}>{item}</li>) :
                        amount === 1 ? descriptionArrayForOne.map((item, ind) => <li key={ind}>{item}</li>) : ''
            }
        </ul>
    );
}
