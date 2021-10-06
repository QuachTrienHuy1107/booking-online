import { Button, Collapse, message, Pagination, Space } from "antd";
import { Loading } from "components/common/loading";
import { LoadingPage } from "components/loading-page";
import { MovieCard } from "components/movie-card";
import Title from "components/shared/title";
import { useGetGenres } from "hooks/useGetGenres";
import { useGetLanguages } from "hooks/useGetLanguages";
import usePagination from "hooks/usePagination";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getFilterMovie, getPaginateMoviesAction } from "store/features/movie.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import { MovieResponse } from "types/movie.type";
import "../styles/pages/_movie-list.scss";

const { Panel } = Collapse;

interface IMovies {}

const MovieList: React.FC<IMovies> = () => {
    const dispatch = useAppDispatch();
    const { moviePagination, isLoading, error } = useAppSelector((state) => state.movieSlice);
    const { languages } = useGetLanguages();
    const { genres, loading } = useGetGenres();
    const { resPagination, handlePageChange } = usePagination(1, 12);
    const [listFilter, setListFilter] = React.useState<string[]>([]);

    React.useEffect(() => {
        const data = {
            ...resPagination,
        };
        dispatch(getPaginateMoviesAction(data));
    }, [dispatch, resPagination]);

    React.useEffect(() => {
        const data = [...listFilter].toString().replaceAll(",", "|");

        listFilter.length !== 0 && dispatch(getFilterMovie({ filter: data }));
    }, [dispatch, listFilter]);

    const handleChange = (page: number) => {
        handlePageChange(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleReset = () => {
        if (listFilter.length === 0) return;
        setListFilter([]);
        dispatch(getPaginateMoviesAction(resPagination));
    };

    const handleFilterMovie = (_filter: string) => {
        // if (listFilter.length === 3) return;
        const index = listFilter.findIndex((item: string) => item === _filter);
        if (index === -1 && listFilter.length < 4) {
            setListFilter((prev: string[]) => Array.from(new Set([...prev, _filter])));
        } else {
            if (listFilter.length === 4) {
                message.warn("The categories must be less than 4");
            }
            let newListFilter = [...listFilter];
            newListFilter = newListFilter.filter((item: string) => item !== _filter);

            if (newListFilter.length === 0) {
                handleReset();
                return;
            }
            setListFilter(newListFilter);
        }
    };

    return (
        <div className="movielist">
            <Container>
                {loading && <LoadingPage />}
                <Title title="Filter" />
                <Row>
                    <Col xl={3} lg={12}>
                        <div className="filter filter__genres">
                            <Collapse bordered={false} defaultActiveKey={["1"]} ghost>
                                <Panel
                                    header={<span className="filter__text filter__text--title">Genres</span>}
                                    key="1"
                                >
                                    <Space size={[8, 16]} wrap>
                                        {genres?.slice(0, 10).map((genre: string, index: number) => {
                                            const pickIndex = listFilter.findIndex((item: string) => item === genre);
                                            const picked = pickIndex !== -1 ? "picked" : "";
                                            return (
                                                <Button
                                                    key={index}
                                                    className={`filter__btn filter__btn--genres filter__btn--${picked}`}
                                                    onClick={() => handleFilterMovie(genre)}
                                                >
                                                    <span className="filter__text filter__text--genre">{genre}</span>
                                                </Button>
                                            );
                                        })}
                                    </Space>
                                </Panel>
                            </Collapse>
                        </div>
                        {/* <div className="filter filter__languages">
                            <Collapse bordered={false} defaultActiveKey={["1"]} ghost>
                                <Panel
                                    header={<span className="filter__text filter__text--title">Languages</span>}
                                    key="1"
                                >
                                    <Space size={[8, 16]} wrap>
                                        {languages?.map((language: string, index: number) => {
                                            const pickIndex = listFilter.findIndex((item: string) => item === language);
                                            const picked = pickIndex !== -1 ? "picked" : "";
                                            return (
                                                <Button
                                                    key={index}
                                                    className={`filter__btn filter__btn--language filter__btn--${picked}`}
                                                    // onClick={() => handleFilterMovie(language)}
                                                >
                                                    <span className="filter__text filter__text--genre">{language}</span>
                                                </Button>
                                            );
                                        })}
                                    </Space>
                                </Panel>
                            </Collapse>
                        </div> */}

                        <div>
                            <Button className="filter__btn filter__btn--clear" onClick={() => handleReset()}>
                                Clear
                            </Button>
                        </div>
                    </Col>
                    <Col xl={9} lg={12}>
                        {/* {!!isLoading && <Loading />} */}
                        <Row>
                            {moviePagination.movies?.map((movie: MovieResponse) => (
                                <Col md={3} key={movie._id}>
                                    <MovieCard movie={movie} />
                                </Col>
                            ))}
                        </Row>
                        <Row>
                            {listFilter.length === 0 && (
                                <Pagination
                                    defaultCurrent={1}
                                    total={moviePagination.total}
                                    className="pagination"
                                    onChange={handleChange}
                                />
                            )}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MovieList;
