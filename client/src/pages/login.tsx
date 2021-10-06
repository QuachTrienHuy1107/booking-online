import { Button, Checkbox, Col, Form, Input, message, Row, Space } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import authSvc from "service/auth.service";
import { loginAction } from "store/features/auth.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import Swal from "sweetalert2";
import { LoginPayload } from "types/auth.type";
import { ROUTES } from "utils/constant";
import { formItemLayout, layout } from "utils/helper";

const Login: React.FC = () => {
    const disptach = useAppDispatch();
    const { credential, isLoading, error, isAuth } = useAppSelector((state) => state.authSlice);
    const isFirst = React.useRef(true);
    const [form] = Form.useForm();
    const history = useHistory();

    React.useEffect(() => {
        if (isAuth && !isFirst.current) {
            window.close();
        }
    }, [isAuth]);

    const onFinish = (values: LoginPayload) => {
        isFirst.current = false;
        disptach(loginAction(values));
    };

    const ShowEmailPopup = () => {
        Swal.fire({
            title: "Enter your email",
            input: "email",
            inputAttributes: {
                autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Submit",
            showLoaderOnConfirm: true,
            preConfirm: async (email: string) => {
                try {
                    const { response, error }: any = await authSvc.sendEmailToResetPassword({ email });
                    if (!!error) throw new Error("INTERNAL SERVER");
                    return response.data.message;
                } catch (error) {
                    Swal.showValidationMessage(`Request failed: ${error}`);
                }
            },

            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: result.value,
                });
            }
        });
    };

    const handleLoginWithSocial = async () => {
        let timer: NodeJS.Timeout | null = null;
        const googleLoginURL = `${process.env.REACT_APP_API_URL}/auth/google`;
        const newWindow = window.open(googleLoginURL, "_blank", "width=500,height=600");

        if (newWindow) {
            timer = setInterval(() => {
                if (newWindow.closed) {
                    if (timer) clearInterval(timer);
                    // history.push(ROUTES.HOME);
                }
            }, 500);
        }
    };

    React.useEffect(() => {
        if (isFirst.current) return;
        if (!!error) return message.error(error);
    }, [error]);

    React.useEffect(() => {
        if (isAuth) return history.push(ROUTES.HOME);
    }, [history, isAuth]);

    React.useEffect(() => {
        if (!!credential && Object.keys(credential).length !== 0) {
            return form.setFieldsValue({
                email: credential?.email,
                password: credential?.password,
            });
        }
        form.resetFields();
    }, [credential, form]);

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
                <Col span={24} className="login--email">
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
                    <Form.Item className="login__checkbox" {...formItemLayout}>
                        <Form.Item valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a onClick={ShowEmailPopup} className="login-form-forgot">
                            Forgot password
                        </a>
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item {...formItemLayout} style={{ textAlign: "center" }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login__btn login__btn--loginLocal"
                            loading={isLoading}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Col>

                <Col span={24} style={{ textAlign: "center" }} className="login--social">
                    <Space size="large">
                        <Button
                            shape="circle"
                            icon={<i className="fab fa-facebook-f"></i>}
                            className="login__btn login__btn--loginSocial"
                        />
                        <Button
                            shape="circle"
                            icon={<i className="fab fa-google"></i>}
                            className="login__btn login__btn--loginSocial"
                            onClick={() => handleLoginWithSocial()}
                        />
                    </Space>
                </Col>

                <Col span={24}>
                    <Form.Item style={{ textAlign: "center" }}>
                        <span>Don't you have an account? </span>
                        <Link to={ROUTES.REGISTER}>Register now</Link>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
export default Login;
