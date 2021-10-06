import { Avatar } from "antd";
import React from "react";
import avatarDefault from "../../assets/images/avatar.png";
import { UserOutlined } from "@ant-design/icons";
import "../../styles/components/_user-info.scss";
interface IUserInfo {
    username: string;
    avatar?: string;
}

const UserInfo: React.FC<IUserInfo> = ({ username, avatar = avatarDefault }) => {
    return (
        <div className="userinfo">
            <Avatar icon={<UserOutlined />} src={avatar} />
            <span className="userinfo__name">{username}</span>
        </div>
    );
};

export default UserInfo;
