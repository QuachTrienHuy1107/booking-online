import { DownOutlined } from "@ant-design/icons";
import { AutoComplete, Dropdown, Menu } from "antd";
import useSearch from "hooks/useSearch";
import { debounce } from "lodash";
import React from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { logoutAction } from "store/features/auth.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import { ROUTES } from "utils/constant";
import "../../styles/components/_header.scss";
import { Loading } from "./loading";
import Logo from "./logo";

const menu = <Menu></Menu>;

const Header: React.FC = () => {
    const { credential, isLoading } = useAppSelector((state) => state.authSlice);
    const dispatch = useAppDispatch();
    const history = useHistory();
    const { onSearch, options, loading } = useSearch();
    const [value, setValue] = React.useState<any>(undefined);

    const handleLogout = () => {
        // persistor.purge();
        dispatch(logoutAction());
        localStorage.clear();
    };

    const onSelect = (value: string, options: any) => {
        const { label, key } = options;
        history.push(`${ROUTES.MOVIEDETAIL}/${key}`);
        setValue(value);
    };

    return (
        <div className="header">
            <Container style={{ height: "100%" }}>
                <div className="header__wrapper">
                    <div className="header__left">
                        <Logo />

                        <AutoComplete
                            options={options}
                            className="search-input"
                            onSelect={onSelect}
                            onSearch={debounce(onSearch, 500)}
                            placeholder="Search movie"
                            allowClear={true}
                            notFoundContent={loading ? <Loading /> : options.length === 0 && "No data"}
                        />
                    </div>

                    <div className="header__right">
                        <div className="header__right__userInfo">
                            {Object.keys(credential).length === 0 ? (
                                <Link to={ROUTES.LOGIN}>
                                    <p className="header__right__userInfo--name">Login</p>
                                </Link>
                            ) : (
                                <>
                                    <img
                                        src={credential.avatar}
                                        alt="avatar"
                                        className="header__right__userInfo--avatar"
                                    />
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                <Menu.Item
                                                    key="0"
                                                    onClick={() => history.push(`${ROUTES.PROFILE}/${credential?._id}`)}
                                                >
                                                    Profile
                                                </Menu.Item>
                                                <Menu.Item key="1" onClick={() => handleLogout()}>
                                                    Logout
                                                </Menu.Item>
                                            </Menu>
                                        }
                                        trigger={["click"]}
                                    >
                                        <p className="header__right__userInfo--name" style={{ cursor: "pointer" }}>
                                            {credential?.username}
                                        </p>
                                    </Dropdown>
                                </>
                            )}
                        </div>
                        <div className="header__right__location">
                            <i className="fa fa-map-marker-alt" style={{ marginRight: 10 }}></i>
                            <span>VIET NAM</span>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Header;
