import React from "react";
import { TicketType } from "types/movie.type";

export const useHandlePickSeat = () => {
    const [arraySeatSelected, setArraySeatSelected] = React.useState<TicketType[]>([]);

    const handlePickSeat = ({ _id, price, seat_number }: TicketType) => {
        const index = arraySeatSelected.findIndex((item: TicketType) => item._id === _id);
        if (index === -1) {
            setArraySeatSelected((prev: any[]) => [...prev, { _id, price, seat_number }]);
        } else {
            let newArr = [...arraySeatSelected];
            newArr = newArr.filter((item: TicketType) => item._id !== newArr[index]._id);
            setArraySeatSelected(newArr);
        }
    };
    return { arraySeatSelected, handlePickSeat };
};
