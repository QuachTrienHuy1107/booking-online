import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "utils/constant";

export default function useLoadmoreReview(_id: string, pageNumber: number) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    React.useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel = null as any;
        axios({
            method: "GET",
            url: `http://localhost:8000/api${API.GET_REVIEW_BY_MOVIE}/${_id}?page=${pageNumber}&size=2`,
        })
            .then((res) => {
                setReviews((prev: any): any => {
                    return [...prev, ...res.data];
                });
                setHasMore(res.data.length > 0);
                setLoading(false);
            })
            .catch((e) => {
                if (axios.isCancel(e)) return;
                setError(true);
            });
        return () => cancel();
    }, [_id, pageNumber]);

    return { loading, error, reviews, hasMore };
}
