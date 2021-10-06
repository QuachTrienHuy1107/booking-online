import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/root.saga";
import rootReducer, {RootState} from "./root.reducer";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["authSlice"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware],
    devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
