import { Tabs } from "antd";
import usePagination from "hooks/usePagination";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Slider from "react-slick";
import { getPaginateMoviesAction } from "store/features/movie.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import { MovieResponse } from "types/movie.type";
import { ROUTES } from "utils/constant";
import "../styles/components/_movies.scss";
import { Loading } from "./common/loading";
import TitleNavigation from "./common/title-navigation";
import { LoadingPage } from "./loading-page";
import { MovieCard } from "./movie-card";

const { TabPane } = Tabs;

const settings = {
    arrows: false,
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    speed: 400,
    rows: 2,
    slidesPerRow: 5,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                slidesPerRow: 3,
                initialSlide: 3,
            },
        },
        {
            breakpoint: 756,
            settings: {
                slidesToShow: 1,
                slidesPerRow: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 2,
                slidesPerRow: 1,
                slidesToScroll: 1,
                rows: 2,
            },
        },
    ],
};

export const Movies: React.FC = () => {
    const dispatch = useAppDispatch();
    const { moviePagination, isLoading } = useAppSelector((state) => state.movieSlice);
    const { resPagination } = usePagination(1, 20);

    React.useEffect(() => {
        const data = {
            ...resPagination,
        };
        dispatch(getPaginateMoviesAction(data));
    }, [dispatch, resPagination]);

    return (
        <div className="movies">
            <Row>
                {!!isLoading && moviePagination.movies.length === 0 && <Loading />}
                <Col>
                    <div style={{ paddingRight: 25 }}>
                        <TitleNavigation title="Now Showing" linkTo={ROUTES.MOVIELIST} subTitle="See all" />
                    </div>

                    <Slider {...settings}>
                        {moviePagination.movies?.map((movie: MovieResponse) => (
                            <div key={movie._id} className="movies__item">
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </Slider>
                </Col>
            </Row>
        </div>
    );
};
