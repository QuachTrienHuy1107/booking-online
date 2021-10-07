export enum StatusCode {
    Success = 200 || 201 || 202,
    Error = 404,
    Server = 500,
}

export enum API {
    /**
     * Movie
     */
    SEARCH_MOVIE = "/movie",
    GET_ALL_PAGINATION = "/movie/paginate/",
    GET_MOVIE_DETAIL = "/movie",
    GET_FILTER_MOVIE = "/movie/filter",
    GET_ALL_LANGUAGES = "/movie/category/languages",
    GET_ALL_GENRES = "/movie/category/genres",
    GET_SHOWTIME = "/showtime",
    BOOKING_MOVIE = "/movie/booking",

    /**
     * Review
     */
    GET_REVIEW_BY_MOVIE = "/review",
    GET_REVIEW_BY_USER = "/review",
    ADD_NEW_REVIEW_BY_MOVIE = "/review",
    LIKE_REVIEW = "/review/like",

    /**
     * User
     */
    REGISTER = "/auth/signup",
    LOGIN = "/auth/login",
    ME = "/auth/me",
    LINK_RESET_PASSWORD = "/auth/forgot-password",
    RESET_PASSWORD = "/auth/reset-password",
}

export enum ROUTES {
    /**
     * Client
     */
    HOME = "/",
    ABOUT = "/about",
    MOVIEDETAIL = "/movie",
    BOOKING = "/booking",
    CHECKOUT = "/checkout",
    MOVIELIST = "/movielist",
    REVIEW_PAGE = "/review",
    PROFILE = "/profile",

    /**
     * Form
     */
    LOGIN = "/login",
    REGISTER = "/register",
    RESET_PASSWORD = "/reset-password",
    /**
     * Admin
     */
    DASHBOARD = "/admin/dashboard",
    USERMANAGEMENT = "/admin/usermanagement",
    USERDETAIL = "/admin/user/:taiKhoan",
    PROFILEADMIN = "/admin/profileadmin",
    MOVIEMANAGEMENT = "/admin/moviemanagement",
    FORMADMIN = "/admin/formadmin",
    SHOWTIME = "/admin/showtime",

    NOTFOUND = "/notfound",
    LOGIN_SUCCESS = "/login/success",
}

export enum ActionType {
    update,
    creation,
    delete,
    view,
}

export enum ANCHOR {
    MOVIELISTFROM = "#movielist",
    MOVIELISTTO = "#movielist",
    HOMEFROM = "#home",
    HOMETO = "#home",
    APPLiCATIONSFROM = "#app",
    APPLiCATIONSTO = "#app",
    CINEMAFROM = "#cinema",
    CINEMATO = "#cinema",
    NEWSFORM = "#news",
    NEWSTO = "#news",
    SCHEDULEFORM = "schedule",
    SCHEDULETO = "schedule",
}

export const fakeApi =
    process.env.NODE_ENV === "production" ? process.env.REACT_APP_SERVER_URL : "http://localhost:8000";
