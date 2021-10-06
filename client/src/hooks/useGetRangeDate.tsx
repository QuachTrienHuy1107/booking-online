import { useGetDate } from "hooks/useGetDate";
import moment from "moment";
import React from "react";

export const useBookingTicketWithDate = (dateStart: any, dateEnd: any) => {
    const { getRangeDate } = useGetDate();
    const [arrayDate, setArrayDate] = React.useState<Date[]>([]);

    React.useEffect(() => {
        const getTicketWithDate = () => {
            const dateEndFormat = dateEnd.split("-");
            const dateStartFormat = dateStart.split("-");
            const reFormatDateStart = `${dateStartFormat[2]}-${dateStartFormat[1]}-${dateStartFormat[0]}`;
            const reFormatDateEnd = `${dateEndFormat[2]}-${dateEndFormat[1]}-${dateEndFormat[0]}`;

            const rangeDate = getRangeDate(reFormatDateStart, reFormatDateEnd);

            setArrayDate(rangeDate);
        };

        getTicketWithDate();
    }, [dateEnd, dateStart, getRangeDate]);

    return { arrayDate };
};
