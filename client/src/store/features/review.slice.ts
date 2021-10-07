import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    AdditionalReviewPayload,
    ReviewPaginationResponse,
    ReviewPayload,
    ReviewRepsonse,
    ReviewState,
} from "types/review.type";

const initialState: ReviewState = {
    reviews: { reviewList: [], total: 0 },
    isLoading: false,
    isLoadMore: true,
};

const reviewSlice = createSlice({
    name: "reviewslice",
    initialState,
    reducers: {
        getReviewByMovie: (state, action: PayloadAction<{ reviews: ReviewPayload; isLoadmore?: boolean }>) => {
            state.isLoading = true;
            state.error = null;
            if (!action.payload.isLoadmore) {
                state.reviews = { reviewList: [], total: 0 };
            }
        },
        getReviewByMovieSuccess: (state, action: PayloadAction<ReviewPaginationResponse>) => {
            let newReviews = JSON.parse(JSON.stringify(state.reviews));
            newReviews = {
                ...state.reviews,
                total: action.payload.total,
                reviewList: [...newReviews.reviewList, ...action.payload.reviewList],
            };

            state.isLoading = false;
            state.error = null;
            state.reviews = newReviews;
        },
        getReviewByMovieFailure: (state, action: PayloadAction<Error>) => {
            state.error = action.payload;
            state.isLoading = false;
            state.isLoadMore = false;
        },

        addNewReview: (state, action: PayloadAction<AdditionalReviewPayload>) => {
            state.isLoading = true;
            state.error = null;

        },
        addNewReviewSuccess: (state, action: PayloadAction<ReviewRepsonse>) => {
            state.reviews.reviewList.unshift(action.payload);
            state.error = null;
            state.isLoading = false;
        },
        addNewReviewFailure: (state, action: PayloadAction<Error>) => {
            state.error = action.payload;
            state.isLoading = false;
        },

        likeReview: (state, action: PayloadAction<string>) => {
            state.error = null;
            state.likeLoading = true;
        },
        likeReviewSuccess: (state, action: PayloadAction<ReviewRepsonse>) => {
            console.log(action.payload);
            let newReviews: ReviewPaginationResponse = JSON.parse(JSON.stringify(state.reviews));
            const index = newReviews.reviewList.findIndex((item: ReviewRepsonse) => item._id === action.payload._id);
            if (index !== -1) {
                newReviews.reviewList[index].likes = action.payload.likes;
            }
            state.reviews = newReviews;
            state.likeLoading = false;
        },
        likeReviewFailure: (state, action: PayloadAction<Error>) => {
            state.error = action.payload;
            state.isLoading = false;
            state.likeLoading = false;
        },

        resetReviews() {
            return initialState;
        },
    },
});

const { actions, reducer } = reviewSlice;

export const {
    getReviewByMovie,
    getReviewByMovieSuccess,
    getReviewByMovieFailure,
    addNewReview,
    addNewReviewSuccess,
    addNewReviewFailure,
    likeReview,
    likeReviewSuccess,
    likeReviewFailure,
    resetReviews,
} = actions;

export default reducer;
