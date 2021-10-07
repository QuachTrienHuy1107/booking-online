import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    AuthState,
    LoginPayload,
    RegisterPayload,
    LoginResponse,
    ICredential,
    ResetPasswordPayload,
} from "../../types/auth.type";
// import { persistor } from "store/store";

const initialState: AuthState = {
    credential: {},
    isLoading: false,
    error: null,
    isAuth: false,
};

const authSlice = createSlice({
    name: "authslice",
    initialState,
    reducers: {
        getMe: (state) => {
            state.isLoading = true;
            state.error = null;
            state.isAuth = false;
        },
        getMeSuccess: (state, action: PayloadAction<ICredential>) => {
            state.credential = action.payload;
            state.isLoading = false;
            state.isAuth = true;
        },
        getMeFailure: (state: any, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
            state.isAuth = false;
        },

        loginAction(state, action: PayloadAction<LoginPayload>) {
            state.isLoading = true;
            state.error = null;
            state.isAuth = false;
        },
        loginActionSuccess(state, action: PayloadAction<ICredential>) {
            state.credential = action.payload;
            state.isLoading = false;
            state.isAuth = true;
        },
        loginActionFailure(state: any, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isLoading = false;
            state.isAuth = false;
        },
        logoutAction(state: any) {
            return initialState;
        },

        registerAction(state: any, action: PayloadAction<RegisterPayload>) {
            state.isLoading = true;
            state.error = null;
            state.isAuth = false;
        },
        registerActionSuccess(state: AuthState, action: PayloadAction<ICredential>) {
            state.credential = action.payload;
            state.isLoading = false;
            state.error = null;
            state.isAuth = false;
        },
        registerActionFailure(state: any, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isLoading = false;
            state.isAuth = false;
        },

        updateProfile: (state, action: PayloadAction<any>) => {
            state.error = null;
            state.isLoading = true;
            state.isSuccess = false;
        },
        updateProfileSuccess: (state, action: PayloadAction<{ user: ICredential; isSuccess: boolean }>) => {
            state.isLoading = false;
            state.error = null;
            state.credential = action.payload.user;
            state.isSuccess = action.payload.isSuccess;
        },
        updateProfileFailure: (state: any, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
            state.isSuccess = false;
        },
        resetPassword: (state: any, action: PayloadAction<ResetPasswordPayload>) => {},
        resetPasswordSuccess: () => {},
        resetPasswordFailure: () => {},
    },
});

const { actions, reducer } = authSlice;

export const {
    getMe,
    getMeSuccess,
    getMeFailure,
    loginAction,
    loginActionFailure,
    loginActionSuccess,
    logoutAction,
    registerAction,
    registerActionSuccess,
    registerActionFailure,
    updateProfile,
    updateProfileSuccess,
    updateProfileFailure,
    resetPassword,
    resetPasswordSuccess,
    resetPasswordFailure,
} = actions;

export default reducer;
