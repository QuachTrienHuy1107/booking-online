import { EyeOutlined } from "@ant-design/icons";
import { Progress, Space } from "antd";
import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { ROUTES } from "utils/constant";
import "../styles/components/_poster.scss";
import { MovieResponse } from "../types/movie.type";

interface IMovieDetail {
    movieDetail: MovieResponse;
}

const Poster: React.FC<IMovieDetail> = memo(({ movieDetail }) => {
    const history = useHistory();

    return (
        <>
            <div className="poster">
                <div className="poster__wrapper">
                    <Container>
                        <Row>
                            <Col md={4}>
                                <div className="poster__img">
                                    <img src={`${movieDetail.poster}`} alt="" />
                                </div>
                            </Col>
                            <Col md={8}>
                                <div className="poster__detail">
                                    <div className="poster__item">
                                        <h1 className="poster__text poster__text--title">{`${movieDetail.title}`}</h1>
                                        <div>
                                            <span className="poster__text poster__text--genres">
                                                {movieDetail.genres?.map((item: string) => item).join(",")}
                                            </span>
                                            <span className="poster__text poster__text--runtime">
                                                {movieDetail.runtime}m
                                            </span>
                                        </div>
                                    </div>

                                    <ul className="poster__item">
                                        <li className="poster__action poster__action--score">
                                            <Progress
                                                type="circle"
                                                percent={
                                                    !!movieDetail.imdb?.rating ? movieDetail.imdb?.rating * 10 : 80
                                                }
                                            />
                                        </li>
                                        <li className="poster__action">
                                            <button className="poster__action__btn poster__action--bookmark">
                                                <i className="fa fa-bookmark"></i>
                                            </button>
                                        </li>
                                        <li className="poster__action poster__action__list">
                                            <button className="poster__action__btn poster__action--heart">
                                                <i className="fa fa-heart" />
                                            </button>
                                        </li>
                                        <li className="poster__action">
                                            <button className="poster__action__btn poster__action--star">
                                                <i className="fa fa-star" />
                                            </button>
                                            {/* <Rate
                                                allowHalf
                                                style={{ display: "block" }}
                                                className="poster__action--rating-star"
                                            /> */}
                                        </li>
                                    </ul>

                                    <div className="poster__item poster__item--overview my-4">
                                        <h3 className="poster__text poster__text--heading">Overview</h3>
                                        <p className="poster__text poster__text--desc" title={movieDetail.fullplot}>
                                            {movieDetail.fullplot}
                                        </p>
                                    </div>

                                    <div className="poster__item poster__item--director">
                                        <h5 className="poster__text poster__text--heading">Director</h5>
                                        <p className="poster__text poster__text--desc">
                                            {movieDetail.directors?.join(" , ")}
                                        </p>
                                    </div>

                                    <div className="poster__item poster__item--view"></div>

                                    <div className="poster__item poster__item--booking">
                                        {movieDetail.cinema && movieDetail.cinema?.length > 0 ? (
                                            <button
                                                className="poster__item--booking-available"
                                                onClick={() => history.push(`${ROUTES.BOOKING}/${movieDetail._id}`)}
                                            >
                                                Booking tickets
                                            </button>
                                        ) : (
                                            <button className="poster__item--booking-commingsoon" disabled>
                                                Comming soon
                                            </button>
                                        )}

                                        <Space align="center">
                                            <EyeOutlined className="poster__item__icon" />
                                            <span className="poster__text poster__text--desc">
                                                {!!movieDetail.imdb && movieDetail.imdb?.votes + 400}
                                            </span>
                                        </Space>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
});

export default Poster;
