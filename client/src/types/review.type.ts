import { MovieResponse, PaginationRequestType } from "types/movie.type";
export interface ReviewRepsonse {
    readonly _id?: string;
    createdAt?: Date;
    movie?: MovieResponse;
    user?: { username: string; email: string; avatar: string };
    content?: string;
    rating?: number;
    likes?: any[];
}

export interface ReviewPaginationResponse {
    reviewList: ReviewRepsonse[];
    total: number;
}

export interface ReviewPayload extends PaginationRequestType {
    _id: string;
}

export interface LikeReviewPayload {
    _id: string;
}

export interface AdditionalReviewPayload {
    content: string;
    movieId: string;
    userId: string;
    rating?: number;
}

export interface ReviewState {
    reviews: ReviewPaginationResponse;
    isLoading: boolean;
    likeLoading?: boolean;
    isLoadMore?: boolean;
    error?: Error | null;
}
