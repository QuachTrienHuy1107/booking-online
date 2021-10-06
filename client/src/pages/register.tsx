import { Button, Col, Form, Input, message, Row } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { registerAction } from "store/features/auth.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import { RegisterPayload } from "types/auth.type";
import { ROUTES } from "utils/constant";
import { formItemLayout, layout } from "utils/helper";

const Register: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { credential, isLoading, error, isAuth } = useAppSelector((state) => state.authSlice);
    const history = useHistory();
    const isFirst = React.useRef(true);

    const onFinish = (values: RegisterPayload) => {
        isFirst.current = false;
        dispatch(registerAction(values));
    };

    React.useEffect(() => {
        if (isFirst.current) return;
        if (!!error) return message.error(error);
    }, [error]);

    React.useEffect(() => {
        if (isFirst.current) return;
        if (Object.keys(credential).length !== 0) history.push(ROUTES.LOGIN);
    }, [credential, history]);

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
            <Row justify="center" className="register">
                <Col span={24} className="register--username">
                    <Form.Item
                        {...formItemLayout}
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your username!",
                            },
                        ]}
                        validateFirst
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24} className="register--email">
                    <Form.Item
                        {...formItemLayout}
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email!",
                            },
                            {
                                type: "email",
                                message: "Email is invalid",
                            },
                        ]}
                        validateFirst
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item
                        {...formItemLayout}
                        name="password"
                        label="Password"
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
                                    if (!value || getFieldValue("password") === value) {
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
                            loading={isLoading}
                            type="primary"
                            htmlType="submit"
                            className="register__btn register__btn--registerLocal"
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item style={{ textAlign: "center" }}>
                        <span>Have an account? </span>
                        <Link to={ROUTES.LOGIN}>Login now</Link>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
export default Register;
