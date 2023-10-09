import React from "react";
import {
  descriptionArrayForOne,
  descriptionArrayForTwo,
  descriptionArrayForFamily,
} from "../../../functions/staticRoomsData";

export const Description = ({ items }) => {
  return (
    <ul>
      {items.map((item, ind) => (
        <li key={ind}>{item}</li>
      ))}
    </ul>
  );
};

export const ChooseRoomDescription = ({ girl_only, amount, is_family }) => {
  return (
    <ul>
      {girl_only ? (
        <li style={{ color: "red" }}>Комната только для девочек</li>
      ) : (
        ""
      )}
      {is_family
        ? descriptionArrayForFamily.map((item, ind) => (
            <li key={ind}>{item}</li>
          ))
        : amount === 2
        ? descriptionArrayForTwo.map((item, ind) => <li key={ind}>{item}</li>)
        : amount === 1
        ? descriptionArrayForOne.map((item, ind) => <li key={ind}>{item}</li>)
        : ""}
    </ul>
  );
};
