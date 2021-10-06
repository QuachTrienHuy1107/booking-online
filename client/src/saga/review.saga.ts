import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import reviewApi from "service/review.service";
import {
    addNewReview,
    addNewReviewFailure,
    addNewReviewSuccess,
    getReviewByMovie,
    getReviewByMovieFailure,
    getReviewByMovieSuccess
} from "store/features/review.slice";
import { AdditionalReviewPayload, ReviewPayload } from "types/review.type";

function* onGetReviewByMovie({ payload }: PayloadAction<ReviewPayload>) {
    try {
        const { response, error } = yield call(reviewApi.getReviewByMovieId, payload);
        yield delay(500);
        if (error) throw new Error(error.message);

        yield put(getReviewByMovieSuccess(response.data));
    } catch (error: any) {
        console.log("error", error.message);
        yield put(getReviewByMovieFailure(error.message));
    }
}

function* onAddReview({ payload }: PayloadAction<AdditionalReviewPayload>) {
    try {
        const { response, error } = yield call(reviewApi.addNewReview, payload);
        if (error) throw new Error(error.message);

        yield put(addNewReviewSuccess(response.data));
    } catch (error: any) {
        console.log("error", error.message);
        yield put(addNewReviewFailure(error.message));
    }
}

function* watchOnLyrics() {
    yield takeLatest(getReviewByMovie.type, onGetReviewByMovie);
    yield takeLatest(addNewReview.type, onAddReview);
}

function* ReviewSaga() {
    yield all([fork(watchOnLyrics)]);
}

export default ReviewSaga;
