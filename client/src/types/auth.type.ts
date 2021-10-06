/* --- STATE --- */

import { ShowtimeResponse } from "./movie.type";

export interface ICredential {
    readonly _id?: string;
    email?: string;
    username?: string;
    avatar?: string;
    role?: string;
    phone?: string;
    password?: string;
    googleId?: string;
    showtimes?: ShowtimeResponse[];
}

export interface LoginResponse {
    user: ICredential;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface ResetPasswordPayload {
    newPassword: string;
    confirmPassword: string;
}

export interface RegisterPayload {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthState {
    credential: ICredential;
    isLoading: boolean;
    error?: Error | null | string;
    isAuth?: boolean;
    isSuccess?: boolean;
}
