import { all, fork } from "redux-saga/effects";
import authSaga from "./auth.saga";
import movieSaga from "./movie.saga";
import ReviewSaga from "./review.saga";

export default function* rootSaga() {
    yield all([fork(movieSaga), fork(authSaga), fork(ReviewSaga)]);
}
