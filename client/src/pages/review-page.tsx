import { Button, Modal, Slider, Form, Input, message } from "antd";
import HeartIcon from "components/common/heart";
import { Loading } from "components/common/loading";
import ReviewList from "components/review-list";
import usePagination from "hooks/usePagination";
import React from "react";
import { Container } from "react-bootstrap";
import { useLocation, useParams } from "react-router";
import { addNewReview, getReviewByMovie, resetReviews } from "store/features/review.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import { AdditionalReviewPayload, ReviewPayload } from "types/review.type";
import { ROUTES } from "utils/constant";
import { formItemLayout } from "utils/helper";
import "../styles/pages/_review-page.scss";

const ReviewPage: React.FC = () => {
    const { _id } = useParams<any>();
    const dispatch = useAppDispatch();
    const { credential, isLoading: loginLoading } = useAppSelector((state) => state.authSlice);
    const { resPagination, handlePageChange } = usePagination(1, 4);
    const { reviews, isLoading, error } = useAppSelector((state) => state.reviewSlice);
    const [_reviewList, setReviewList] = React.useState<any[] | null>([] || null);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const location = useLocation();
    const isFirst = React.useRef(false);

    React.useEffect(() => {
        dispatch(resetReviews());
    }, []);

    React.useEffect(() => {
        if (!!error && !!isFirst.current) {
            message
                .error({
                    content: "You need to login first!",
                    duration: 0.5,
                })
                .then(() => {
                    window.open(ROUTES.LOGIN, "_blank", "width=500,height=600");
                });
        }
    }, [error]);

    React.useEffect(() => {
        if (location.state && !isFirst.current) {
            const { reviewList } = location.state as any;
            if (!!reviewList) {
                setReviewList((prev) => (prev = reviewList));
                isFirst.current = true;
                return;
            }
        }
        setReviewList(null);

        const data = {
            ...resPagination,
            _id,
            isLoadmore: true,
        };
        dispatch(getReviewByMovie(data));
    }, [dispatch, _id, resPagination, location.state]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values: any) => {
        if (!credential) return;
        const data: AdditionalReviewPayload = {
            ...values,
            movieId: _id,
            userId: credential?._id,
        };
        dispatch(addNewReview(data));
        setIsModalVisible(false);
    };

    return (
        <div className="reviews">
            <Container>
                <div className="reviews__title">
                    <h1>
                        <HeartIcon size={40} />
                        <span> 91% </span> Rating
                    </h1>
                    {reviews.reviewList.length === 0 && isLoading && <Loading />}
                    <p>{reviews.reviewList[0]?.movie?.title}</p>
                </div>
                <div className="reviews__rating">
                    <div className="reviews__rating--content">
                        <h1 className="reviews__maintext">Add your rating {"&"} reviews</h1>
                        <p className="reviews__subtext">Your rating master</p>
                    </div>
                    <Button className="reviews__rating__btn reviews__rating__btn--rating" onClick={showModal}>
                        Rate now
                    </Button>
                </div>
                <h1 className="reviews__maintext reviews__maintext--title">Most helpful reviews</h1>
                <ReviewList
                    reviews={!!_reviewList ? _reviewList : reviews.reviewList}
                    total={reviews.total}
                    isLoading={isLoading}
                    handlePageChange={handlePageChange}
                />

                <Modal
                    title="How was the movie?"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    destroyOnClose={true}
                >
                    <Form onFinish={onFinish} name="review">
                        <Form.Item {...formItemLayout} name="rating" label="How would you rate the movie">
                            <Slider defaultValue={0} />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            name="content"
                            label="Express more, write a review"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your review!",
                                },
                            ]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="reviews__rating__btn reviews__rating__btn--submit"
                            >
                                SUBMIT
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Container>
        </div>
    );
};
export default ReviewPage;
