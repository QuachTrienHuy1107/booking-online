import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Button, Empty, Space } from "antd";
import usePagination from "hooks/usePagination";
import moment from "moment";
import React, { memo } from "react";
import Slider from "react-slick";
import { resetReviews, getReviewByMovie } from "store/features/review.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import { ReviewRepsonse } from "types/review.type";
import { ROUTES } from "utils/constant";
import "../styles/components/_top-review.scss";
import UserInfo from "./common/info";
import { Loading } from "./common/loading";
import Rater from "./common/rating";
import Timer from "./common/timer";
import TitleNavigation from "./common/title-navigation";

const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

interface ITopReview {
    _id?: string;
}

const TopReview: React.FC<ITopReview> = memo(({ _id }) => {
    const dispatch = useAppDispatch();

    const { resPagination } = usePagination(1, 5);
    const { reviews, isLoading } = useAppSelector((state) => state.reviewSlice);

    React.useEffect(() => {
        const data = {
            ...resPagination,
            _id,
            isLoadmore: false,
        };
        dispatch(getReviewByMovie(data));

        return () => {
            dispatch(resetReviews());
        };
    }, [dispatch, _id]);

    return (
        <section className="top-review">
            <div className="top-review__title">
                <TitleNavigation
                    title="Top reviews"
                    subTitle={reviews.total === 0 ? "Review now" : `${reviews.total} reviews`}
                    linkTo={`${ROUTES.REVIEW_PAGE}/${_id}`}
                    state={reviews}
                />
                <span className="top-review__title--subtitle">Summary of {reviews.total} reviews.</span>
            </div>
            {!isLoading && reviews.reviewList.length === 0 && (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No review yet</span>} />
            )}
            <div className="top-review__reviews">
                {!!isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <Slider {...settings}>
                            {reviews.reviewList?.map((review: ReviewRepsonse) => {
                                return (
                                    <div className="top-review__reviews__item" key="1">
                                        <div>
                                            <div className="top-review__reviews__item__info">
                                                <div>
                                                    <UserInfo
                                                        username={review.user?.username || ""}
                                                        avatar={review.user?.avatar}
                                                    />
                                                </div>
                                                <Space>
                                                    <Rater number={review.rating as number} size={24} />
                                                </Space>
                                            </div>
                                            <div className="top-review__reviews__item__content">{review.content}</div>
                                        </div>
                                        <div className="top-review__reviews__item__control">
                                            <div className="top-review__reviews__item__control--left">
                                                <Button icon={<LikeOutlined />} shape="circle" />

                                                <span>123 </span>
                                                <Button icon={<DislikeOutlined />} shape="circle" />
                                            </div>
                                            <div className="top-review__reviews__item__control--right">
                                                <Timer time={moment(review.createdAt).format("DD-MM")} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                        <div className="fence"></div>
                    </>
                )}
            </div>
        </section>
    );
});

export default TopReview;
