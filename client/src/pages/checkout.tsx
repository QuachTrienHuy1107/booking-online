import { Button, Collapse, Divider, message, PageHeader, Space } from "antd";
import Countdown from "antd/lib/statistic/Countdown";
import { useHandlePickSeat } from "hooks/useHandlePickSeat";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { booking, getShowtime } from "store/features/movie.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import { BookingPayload, TicketType } from "types/movie.type";
import { GetDetailPayload } from "types/shared/get-detail.type";
import screenThumb from "../assets/images/screen-thumb.png";
import "../styles/pages/_checkout.scss";
import Swal from "sweetalert2";
import { ROUTES } from "utils/constant";
import moment from "moment";
import { Loading } from "components/common/loading";

const { Panel } = Collapse;

const deadline = Date.now() + 10000 * 60; // Moment is also OK
const Checkout: React.FC = () => {
    const dispatch = useAppDispatch();
    const { showtime, isSuccess, isLoading } = useAppSelector((state) => state.movieSlice);
    const { _id } = useParams() as GetDetailPayload;
    const { handlePickSeat, arraySeatSelected } = useHandlePickSeat();
    const { credential } = useAppSelector((state) => state.authSlice);
    const isFirst = React.useRef(true);
    const history = useHistory();

    React.useEffect(() => {
        dispatch(getShowtime({ _id }));
    }, [_id, dispatch]);

    React.useEffect(() => {
        if (!!isSuccess && !isFirst.current) {
            Swal.fire("Booking successfully!!", "You can check this in your profile", "success").then(() => {
                history.replace(ROUTES.HOME);
            });
        }
    }, [history, isSuccess]);

    const handleBooking = () => {
        const data: BookingPayload = {
            showtimeId: _id,
            arrayTickets: arraySeatSelected,
        };
        dispatch(booking(data));
    };

    const subTotal = arraySeatSelected.reduce((total: number, seat: TicketType, index: number) => {
        return (total += seat.price);
    }, 0);

    return (
        <div className="checkout">
            <PageHeader
                className="page-header"
                onBack={() => history.goBack()}
                title={showtime.movie?.title}
                extra={<Countdown value={deadline} />}
            />
            <Container>
                {!!isLoading ? (
                    <Loading />
                ) : (
                    <Row>
                        <Col lg={8} md={6}>
                            <Container>
                                <img src={screenThumb} alt="" width="100%" />
                                <div className="checkout__leftPanel">
                                    <div>
                                        {showtime.tickets?.map((seat: TicketType, index: number) => {
                                            const seatSelected = arraySeatSelected?.findIndex(
                                                (item) => item._id === seat._id
                                            );
                                            const selected = seatSelected !== -1 ? true : false;
                                            return (
                                                <>
                                                    <Button
                                                        onClick={() => {
                                                            handlePickSeat({
                                                                _id: seat._id,
                                                                price: seat.price,
                                                                seat_number: seat.seat_number,
                                                            });
                                                        }}
                                                        key={seat._id}
                                                        disabled={!!seat.status}
                                                        className={`seat__btn ${
                                                            (!!selected && "seat__btn--selected") ||
                                                            (seat.type === "Vip" && !seat.status && "seat__btn--vip") ||
                                                            (!!seat.status && "seat__btn--sold")
                                                        }`}
                                                    >
                                                        {seat.seat_number}
                                                    </Button>
                                                    {(index + 1) % 16 === 0 ? <br /> : ""}
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>
                                <Row>
                                    <Col md={3} style={{ textAlign: "center" }}>
                                        <Space align="center">
                                            <div className="seat__model seat__model--sold"></div>
                                            <span>Sold</span>
                                        </Space>
                                    </Col>
                                    <Col md={3} style={{ textAlign: "center" }}>
                                        <Space align="center">
                                            <div className="seat__model seat__model--vip"></div>
                                            <span>Vip</span>
                                        </Space>
                                    </Col>
                                    <Col md={3} style={{ textAlign: "center" }}>
                                        <Space align="center">
                                            <div className="seat__model seat__model--available"></div>
                                            <span>Sold</span>
                                        </Space>
                                    </Col>
                                    <Col md={3} style={{ textAlign: "center" }}>
                                        <Space align="center">
                                            <div className="seat__model seat__model--selected"></div>
                                            <span>Sold</span>
                                        </Space>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col lg={4} md={6}>
                            <div className="payment">
                                <h1 className="payment__title">BOOKING SUMMARY</h1>
                                {/* <Divider /> */}

                                <div className="payment__info">
                                    <h1>{showtime.movie?.title}</h1>
                                    <p>{showtime.cinema?.cinema_name} </p>
                                    <p>{showtime.cinema?.address}</p>
                                    <p className="payment__info--datetime">
                                        {moment(showtime.time).format("DD-MM-YYYY")} -{" "}
                                        {moment(showtime.time).format("hh:MM A")}{" "}
                                    </p>
                                </div>
                                <Divider />

                                <div className="payment__item payment__item--userinfo">
                                    <span>
                                        <p>Email</p>
                                        <p className="payment__text payment__text--email">{credential?.email}</p>
                                    </span>
                                </div>
                                <Divider />

                                <div className="payment__item payment__item--seats">
                                    <Space>
                                        <span style={{ width: 50 }}>Seats</span>
                                        {arraySeatSelected.map((item: TicketType) => {
                                            return <span>{item.seat_number}</span>;
                                        })}
                                    </Space>
                                    <span className="payment__item__price">{subTotal.toLocaleString()}</span>
                                </div>
                                <Divider />

                                <div className="payment__item payment__item--subtotal">
                                    <span>Subtotal</span>
                                    <span className="payment__item__price">{subTotal.toLocaleString()}</span>
                                </div>

                                {/* <div className="payment__item--food">
                                <Collapse bordered={false} defaultActiveKey={["1"]} ghost>
                                    <Panel
                                        showArrow={false}
                                        header={
                                            <div className="payment__item payment__item--food">
                                                <span>Food and Beverage</span>
                                                <span>rpieres</span>
                                            </div>
                                        }
                                        key="1"
                                    >
                                        123
                                    </Panel>
                                </Collapse>
                            </div> */}

                                <span className="circle-left"></span>
                                <span className="circle-right"></span>
                            </div>
                            {/* <Button className="checkout__btn" onClick={() => handleBooking()}>
                            <div>
                                Total: <span>{subTotal}</span>
                            </div>
                            <div>
                                <span>Process</span>
                            </div>
                        </Button> */}
                            <Button
                                className="checkout__btn"
                                onClick={() => {
                                    if (arraySeatSelected.length !== 0) {
                                        Swal.fire({
                                            title: "Booking now?",
                                            text: "The tickets cannot refund!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonText: "Cancel",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "OK!",
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                handleBooking();
                                                isFirst.current = false;
                                            }
                                        });
                                    } else {
                                        message.warning("Please pick your seat before payment!");
                                    }
                                }}
                            >
                                <div>
                                    Total: <span>{subTotal.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span>Process</span>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default Checkout;
