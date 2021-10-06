import { Skeleton } from "antd";
import HeartIcon from "components/common/heart";
import Schedule from "components/schedule";
import moment from "moment";
import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import { getMovieDetailAction } from "store/features/movie.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import { GetDetailPayload } from "types/shared/get-detail.type";
import "../styles/pages/_booking.scss";

const Booking: React.FC = () => {
    const dispatch = useAppDispatch();
    const { _id } = useParams() as GetDetailPayload;
    const { movieDetail, isLoading } = useAppSelector((state) => state.movieSlice);

    React.useEffect(() => {
        Object.keys(movieDetail).length === 0 && dispatch(getMovieDetailAction({ _id }));
    }, [_id, dispatch, movieDetail]);

    return (
        <div className="booking">
            <div className="top-title">
                <Container>
                    {!!isLoading ? (
                        <Skeleton active />
                    ) : (
                        <>
                            <h1 className="title">{movieDetail.title}</h1>
                            <ul className="detail">
                                <li className="detail__item detail__item--rating">
                                    <HeartIcon size={16} />
                                    <span>{movieDetail.rating} %</span>
                                    <br />
                                </li>
                                <li className="detail__item detail__item--genres">
                                    {movieDetail.genres?.map((item: string) => (
                                        <span>{item}</span>
                                    ))}
                                </li>
                                <li className="detail__item detail__item--release">
                                    <span>{moment(movieDetail.released).format("DD-MM-YYYY")}</span>
                                </li>
                                <li className="detail__item detail__item--time">
                                    <i className="fa fa-clock"></i>
                                    <span>{movieDetail.runtime} mins</span>
                                </li>
                            </ul>
                            <span className="booking__text booking__text--voter">{movieDetail.imdb?.votes} VOTES</span>
                        </>
                    )}
                </Container>
            </div>
            <div className="main">
                <Container>
                    <Schedule cinema={!!movieDetail.cinema ? movieDetail.cinema : []} />
                </Container>
            </div>
        </div>
    );
};
export default Booking;
