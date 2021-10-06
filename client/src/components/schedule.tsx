/* eslint-disable jsx-a11y/anchor-is-valid */
import { Modal, Space, Tabs, Button } from "antd";
import { useBookingTicketWithDate } from "hooks/useGetRangeDate";
import moment from "moment";
import React from "react";
import { CinemaResponse } from "types/cinema.type";
import { ShowtimeResponse } from "types/movie.type";
import "../styles/components/_schedule.scss";
import { Row, Col } from "react-bootstrap";
import { ROUTES } from "utils/constant";
import { useHistory } from "react-router";
import { useGetDate } from "hooks/useGetDate";
import ModalCustom from "./shared/modal";

const { TabPane } = Tabs;

const tabExtra = (
    <div className="schedule__info">
        {/* <span className="schedule__attr">
            <span className="schedule__icon schedule__icon--available"></span>
            <span className="schedule__text schedule__text--attr">AVAILABLE</span>
        </span>
        <span className="schedule__attr">
            <span className="schedule__icon schedule__icon--filling"></span>
            <span className="schedule__text schedule__text--attr">AVAILABLE</span>
        </span> */}
    </div>
);

interface ISchedule {
    cinema: CinemaResponse[] | [];
}

const Schedule: React.FC<ISchedule> = ({ cinema }): any => {
    const history = useHistory();
    const { today, dateTomorrow } = useGetDate();
    const { arrayDate } = useBookingTicketWithDate(today, dateTomorrow);

    return (
        <div className="schedule">
            <Tabs tabBarExtraContent={tabExtra}>
                {arrayDate.map((date: any, index: number) => {
                    const getDate = moment(date).format("DD-MM");
                    const getWeek = moment(date).format("dddd");
                    return (
                        <TabPane
                            tab={
                                <>
                                    <h3
                                        style={{
                                            marginBottom: 0,
                                        }}
                                    >
                                        {getWeek}
                                    </h3>
                                    <span>{getDate}</span>
                                </>
                            }
                            key={index}
                        >
                            <ul className="schedule__detail">
                                {cinema?.map((item: CinemaResponse, index: number) => {
                                    const formatDate = moment(date).format("DD-MM-YYYY");
                                    const reFormatDate = formatDate.split("-");
                                    const filterDateTime = `${reFormatDate[2]}-${reFormatDate[1]}-${reFormatDate[0]}`;
                                    const listCinemaAvailable = item.showtimes.filter((timePlay: ShowtimeResponse) =>
                                        timePlay.time?.includes(filterDateTime)
                                    );
                                    return (
                                        listCinemaAvailable.length !== 0 && (
                                            <li key={item._id}>
                                                <Row>
                                                    <Col md={2}>
                                                        <h1 className="schedule__text schedule__text--title">
                                                            {item.cinema_name}
                                                        </h1>
                                                        <span className="schedule__text schedule__text--address">
                                                            {item.address}
                                                        </span>
                                                    </Col>
                                                    <Col md={1} className="map">
                                                        <ModalCustom />
                                                    </Col>
                                                    <Col md={8}>
                                                        <Space size={[8, 16]} wrap>
                                                            {listCinemaAvailable.map((showtime: ShowtimeResponse) => {
                                                                return (
                                                                    <Button
                                                                        key={showtime._id}
                                                                        className="schedule__detail__time"
                                                                        onClick={() =>
                                                                            history.push(
                                                                                `${ROUTES.CHECKOUT}/${showtime._id}`
                                                                            )
                                                                        }
                                                                    >
                                                                        {moment(showtime.time).format("hh:MM A")}
                                                                    </Button>
                                                                );
                                                            })}
                                                        </Space>
                                                    </Col>
                                                </Row>
                                            </li>
                                        )
                                    );
                                })}
                            </ul>
                        </TabPane>
                    );
                })}
            </Tabs>
        </div>
    );
};
export default Schedule;
