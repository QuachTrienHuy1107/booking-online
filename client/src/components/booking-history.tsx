import { Table } from "antd";
import moment from "moment";
import React, { memo } from "react";
import { CinemaResponse } from "types/cinema.type";
import { MovieResponse, ShowtimeResponse, TicketType } from "types/movie.type";

interface IBookingHistory {
    bookingHistory: ShowtimeResponse[] | undefined;
}

const BookingHistory: React.FC<IBookingHistory> = memo(({ bookingHistory }) => {
    const columns = [
        {
            title: "Id",
            key: "index",
            render: (_: any, __: any, index: any) => index + 1,
        },
        {
            title: "Cinema",
            dataIndex: "cinema",
            key: "cinema",
            width: "15%",
            render: (_cinema: CinemaResponse) => _cinema?.cinema_name,
        },
        {
            title: "Movie",
            dataIndex: "movie",
            key: "movie",
            width: "20%",
            render: (_movie: MovieResponse) => _movie?.title,
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
            width: "15%",
            render: (time: string) => moment(time).format("DD-MM-YYYY"),
        },
        {
            title: "Tickets",
            dataIndex: "tickets",
            key: "address",
            width: "40%",
            render: (tickets: TicketType[]) =>
                tickets
                    .filter((item: TicketType) => {
                        return !!item.status;
                    })
                    .map((ticket: TicketType) => {
                        return ticket.seat_number;
                    })
                    .join(" , "),
        },
    ];
    return (
        <div className="BookingHistory">
            <Table dataSource={bookingHistory} columns={columns} pagination={false} />
        </div>
    );
});
export default BookingHistory;
