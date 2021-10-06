import moment from "moment";
import React, { memo } from "react";
import reviewApi from "service/review.service";
import { MovieResponse } from "types/movie.type";
import { Table } from "antd";

const ReviewHistory: React.FC = memo(() => {
    const [reviews, setReview] = React.useState<any[]>([]);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const { response, error }: any = await reviewApi.getReviewByUser();
                if (!!error) throw new Error("INTERNAL SERVER");
                console.log("response", response);
                setReview((_prev: string[]) => [..._prev, ...response.data]);
            } catch (error: any) {
                console.log("Error", error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const columns = [
        {
            title: "Id",
            key: "index",
            render: (_: any, __: any, index: any) => index + 1,
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "date",
            width: "15%",
            render: (date: string) => moment(date).format("DD-MM-YYYY"),
        },
        {
            title: "Movie",
            dataIndex: "movie",
            key: "movie",
            width: "20%",
            render: (_movie: MovieResponse) => _movie?.title,
        },
        {
            title: "Rating",
            dataIndex: "rating",
            key: "rating",
            width: "15%",
            render: (time: string) => moment(time).format("DD-MM-YYYY"),
        },
        {
            title: "Content",
            dataIndex: "content",
            key: "content",
            width: "40%",
            render: (text: string) => <span style={{ wordBreak: "break-all" }}>{text}</span>,
        },
    ];

    console.log("reviews", reviews);

    return (
        <div>
            <Table dataSource={reviews} columns={columns} pagination={false} loading={loading} />
        </div>
    );
});
export default ReviewHistory;
