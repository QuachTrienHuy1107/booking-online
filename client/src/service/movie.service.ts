import { GetDetailPayload } from "types/shared/get-detail.type";
import { BookingPayload, MovieFilterPayload } from "../types/movie.type";
import { API } from "../utils/constant";
import axiosClient from "./axiosClient";

const movieApi = {
    searchMovie: (params: any) => {
        const url = `${API.SEARCH_MOVIE}`;
        return axiosClient
            .get(url, { params })
            .then((response) => ({ response }))
            .catch((error) => ({ error }));
    },

    getMoviePagination: (params: any) => {
        const url = `${API.GET_ALL_PAGINATION}`;
        return axiosClient
            .get(url, { params })
            .then((response) => ({ response }))
            .catch((error) => ({ error }));
    },

    getMovieDetail: ({ _id }: GetDetailPayload) => {
        const url = `${API.GET_MOVIE_DETAIL}/${_id}`;
        return axiosClient
            .get(url)
            .then((response) => ({ response }))
            .catch((error) => ({ error }));
    },
    getFilterMovie: (params: MovieFilterPayload) => {
        const url = `${API.GET_FILTER_MOVIE}`;
        return axiosClient
            .get(url, { params })
            .then((response) => ({ response }))
            .catch((error) => ({ error }));
    },
    // getMovieDetail: ({ _id }: MovieDetailPayload) => {
    //     const url = `${API.GET_MOVIE_DETAIL}/${_id}`;
    //     return axiosClient
    //         .get(url)
    //         .then((response) => ({ response }))
    //         .catch((error) => ({ error }));
    // },

    getAllLanguages: () => {
        const url = `${API.GET_ALL_LANGUAGES}`;
        return axiosClient
            .get(url)
            .then((response) => ({ response }))
            .catch((error) => ({ error }));
    },

    getAllGenres: () => {
        const url = `${API.GET_ALL_GENRES}`;
        return axiosClient
            .get(url)
            .then((response) => ({ response }))
            .catch((error) => ({ error }));
    },

    getShowtime: ({ _id }: GetDetailPayload) => {
        const url = `${API.GET_SHOWTIME}/${_id}`;
        return axiosClient
            .get(url)
            .then((response) => ({ response }))
            .catch((error) => ({ error }));
    },

    booking: (payload: BookingPayload) => {
        const url = `${API.BOOKING_MOVIE}`;
        return axiosClient
            .post(url, payload)
            .then((response) => ({ response }))
            .catch((error) => ({ error }));
    },
};

export default movieApi;
