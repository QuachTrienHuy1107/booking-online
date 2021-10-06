import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./features/auth.slice";
import movieSlice from "./features/movie.slice";
import reviewSlice from "./features/review.slice";

const authPersistConfig = {
    key: "auth",
    storage: storage,
    whitelist: ["credential"],
};

const rootReducer = combineReducers({
    movieSlice,
    authSlice: persistReducer(authPersistConfig, authSlice),
    reviewSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
