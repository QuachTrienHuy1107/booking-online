import { CinemaResponse } from "./cinema.type";

interface IMDB {
    rating: number;
    votes: number;
    id: number;
}

export interface MovieResponse {
    readonly _id?: string;
    title?: string;
    trailer?: string;
    poster?: string;
    plot?: string;
    fullplot?: string;
    genres?: Array<string>;
    cast?: Array<string>;
    released?: string;
    rating?: number;
    directors?: Array<string>;
    imdb?: IMDB;
    countries?: Array<string>;
    runtime?: number;
    cinema?: CinemaResponse[];
    movieRecommend?: MovieResponse[];
}

export interface MoviePaginationResponse {
    movies: MovieResponse[];
    total: number;
}

export interface MovieFilterPayload {
    filter: string;
}

export interface PaginationRequestType {
    page: number;
    size: number;
}

//BOOKING
export interface ShowtimeResponse {
    _id?: string;
    time?: string;
    movie?: MovieResponse;
    cinema?: CinemaResponse;
    tickets?: TicketType[];
}

export interface TicketType {
    readonly _id: string;
    seat_number: string;
    type?: string;
    status?: boolean;
    price: number;
}

export interface TicketPayload {
    ticketId: string;
}

export interface BookingPayload {
    showtimeId: string;
    arrayTickets: TicketType[];
}

/* --- STATE --- */
export interface HomeState {
    movies?: MovieResponse[];
    moviePagination: MoviePaginationResponse;
    movieDetail: MovieResponse;
    showtime: ShowtimeResponse;
    isLoading: boolean;
    isSuccess?: boolean;
    error?: Error | null;
}
