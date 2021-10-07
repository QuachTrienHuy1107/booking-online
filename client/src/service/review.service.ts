import { AdditionalReviewPayload, ReviewPayload } from "types/review.type";
import { API } from "../utils/constant";
import axiosClient from "./axiosClient";

const reviewApi = {
    getReviewByMovieId: (reviewPayload: ReviewPayload) => {
        const { page, size, _id } = reviewPayload;
        const url = `${API.GET_REVIEW_BY_MOVIE}/${_id}`;
        return axiosClient
            .get(url, { params: { page, size } })
            .then((response) => ({ response }))
            .catch((error) => ({ error }));
    },

    getReviewByUser: () => {
        const url = `${API.GET_REVIEW_BY_USER}`;
        return axiosClient
            .get(url)
            .then((response) => ({ response }))
            .catch((error) => ({ error }));
    },

    addNewReview: (payload: AdditionalReviewPayload) => {
        const url = `${API.ADD_NEW_REVIEW_BY_MOVIE}`;
        return axiosClient
            .post(url, payload)
            .then((response) => ({ response }))
            .catch((error) => ({ error }));
    },

    likeReview: (_id: string) => {
        const url = `${API.LIKE_REVIEW}/${_id}`;
        return axiosClient
            .post(url)
            .then((response) => ({ response }))
            .catch((error) => ({ error }));
    },
};

export default reviewApi;
