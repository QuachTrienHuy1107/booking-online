import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Space, Tabs } from "antd";
import BookingHistory from "components/booking-history";
import { Loading } from "components/common/loading";
import EditProfile from "components/edit-profile";
import ReviewHistory from "components/review-history";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import authSvc from "service/auth.service";
import { useAppSelector } from "store/store";
import { ICredential } from "types/auth.type";
import "../styles/pages/_profile.scss";
const { TabPane } = Tabs;

const Profile: React.FC = () => {
    const [me, setMe] = React.useState<ICredential>({ email: "", username: "" });
    const [error, setError] = React.useState<Error | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [isEdit, setEdit] = React.useState(false);
    const { credential } = useAppSelector((state) => state.authSlice);

    React.useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response: any = await authSvc.me();

                const _error = response?.error;
                const { data } = response?.response;
                setMe((prev: ICredential) => (prev = data));

                if (!!_error) throw new Error(_error.message);
            } catch (error: any) {
                setError((prev) => (prev = error.message));
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const onClose = () => {
        setEdit(false);
    };

    return (
        <div className="profile">
            <div className="userinfo">
                <Container>
                    <Row>
                        <Col md={6}>
                            <Space align="start" size={13}>
                                <Avatar icon={<UserOutlined />} src={credential?.avatar} />
                                <div>
                                    <h1 className="userinfo__text userinfo__text--username">{credential.username}</h1>

                                    <span className="userinfo__text userinfo__text--email">
                                        Email: {credential.email}
                                    </span>
                                </div>
                            </Space>
                        </Col>
                        <Col md={6}>
                            <div className="userinfo__operations">
                                <Space>
                                    <Button shape="circle" icon={<EditOutlined />} onClick={() => setEdit(true)} />
                                </Space>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <EditProfile isOpen={isEdit} onClose={onClose} me={me} />
            </div>
            <Container>
                <div className="main">
                    {(loading && <Loading />) || (
                        <Tabs>
                            <TabPane tab="Booking history" key="1">
                                <BookingHistory bookingHistory={me.showtimes} />
                            </TabPane>
                            <TabPane tab="Reviews" key="2">
                                <ReviewHistory />
                            </TabPane>
                        </Tabs>
                    )}
                </div>
            </Container>
        </div>
    );
};
export default Profile;
