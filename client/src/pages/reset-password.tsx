import { Button, Col, Form, Input, message, Row } from "antd";
import axios from "axios";
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import authSvc from "service/auth.service";
import axiosClient from "service/axiosClient";
import { ResetPasswordPayload } from "types/auth.type";
import { API, ROUTES } from "utils/constant";
import { formItemLayout, layout } from "utils/helper";

const ResetPassword: React.FC = () => {
    const [form] = Form.useForm();
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const params = useParams() as { token: string };
    const history = useHistory();

    const onFinish = async (values: ResetPasswordPayload) => {
        // disptach(resetPassword(values));
        // isFirst.current = false;
        if (!params) return;
        try {
            setLoading(true);
            const url = `${process.env.REACT_APP_API_URL}${API.RESET_PASSWORD}`;
            const response = await axios({
                method: "PUT",
                url,
                data: values,
                headers: { Authorization: `Bearer ${params.token}` },
            });
            // if (!!error) throw new Error("INTERNAL SERVER");
            const { data } = response;
            if (!!data.success) {
                message
                    .success({
                        content: data.message,
                        duration: 0.7,
                    })
                    .then(() => history.replace(ROUTES.LOGIN));
            }
        } catch (error: any) {
            console.log("Error", error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            {...layout}
            name="form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Row justify="center" className="login">
                <Col span={24}>
                    <Form.Item
                        {...formItemLayout}
                        name="newPassword"
                        label="New Password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item
                        {...formItemLayout}
                        name="confirmPassword"
                        label="Confirm password"
                        dependencies={["password"]}
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("newPassword") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("The two passwords that you entered do not match!")
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item {...formItemLayout} style={{ textAlign: "center" }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login__btn login__btn--loginLocal"
                            loading={loading}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item style={{ textAlign: "center" }}>
                        <span>Don't you have an account? </span>
                        <Link to={ROUTES.LOGIN}>Login again</Link>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
export default ResetPassword;
