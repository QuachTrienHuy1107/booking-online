import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Alert, Button, Empty, Space, Spin } from "antd";
import usePagination from "hooks/usePagination";
import moment from "moment";
import React, { memo } from "react";
import { useInView } from "react-intersection-observer";
import reviewApi from "service/review.service";
import { ReviewRepsonse } from "types/review.type";
import "../styles/components/_review-list.scss";
import UserInfo from "./common/info";
import { Loading } from "./common/loading";
import Rater from "./common/rating";
import Timer from "./common/timer";

interface IReviewList {
    _id?: string;
    reviews: ReviewRepsonse[];
    handlePageChange: (page: number) => void;
    total: number;
    isLoading: boolean;
}

const options = {
    root: null,
    rootMargin: "0px 0px -100px 0px",
    threshold: 1.0,
};

const ReviewList: React.FC<IReviewList> = memo(({ handlePageChange, reviews, total, isLoading }) => {
    const observer = React.useRef(null) as any;
    const [currentPage, setCurrentPage] = React.useState(1);
    const isHasMore = reviews.length < total ? true : false;
    const isFirst = React.useRef(true);

    const lastReview = React.useCallback(
        (rv: any) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !!isHasMore) {
                    setCurrentPage((p) => p + 1);
                    isFirst.current = false;
                }
            }, options);
            if (rv) observer.current.observe(rv);
        },
        [isHasMore]
    );

    React.useEffect(() => {
        handlePageChange(currentPage);
    }, [currentPage]);

    return (
        <>
            <p>
                {reviews.length === 0 && !isLoading && (
                    <Empty description="No reviews" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
            </p>
            <div className={`review-list ${isLoading && "pending"}`}>
                {reviews?.map((review: ReviewRepsonse, index: number) => {
                    const isLast = reviews.length === index + 1 ? true : false;
                    return (
                        <>
                            <div className="review" ref={isLast ? lastReview : null}>
                                <div className="5review__wrapper">
                                    <div className="review__item review__item__info">
                                        <Space>
                                            <UserInfo
                                                username={review.user?.username || ""}
                                                avatar={review.user?.avatar}
                                            />
                                        </Space>
                                        <Space>
                                            <Rater number={review.rating as number} size={24} />
                                        </Space>
                                    </div>
                                    <div className="review__item review__item__content review__item--detail">
                                        <p>{review.content}</p>
                                    </div>
                                    <div className="review__item review__item__controls">
                                        <div className="review__item__controls--left">
                                            <Button icon={<LikeOutlined />} shape="circle" />

                                            <span>123 </span>
                                            <Button icon={<DislikeOutlined />} shape="circle" />
                                        </div>
                                        {/* <Timer time={moment(review.createdAt, "YYYYMMDD").startOf("hour").fromNow()} /> */}
                                        <Timer
                                            time={`${moment(review.createdAt).format("DD-MM-YYYY")} / ${moment(
                                                review.createdAt
                                            ).format("hh:MM A")}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
        </>
    );
});
export default ReviewList;
