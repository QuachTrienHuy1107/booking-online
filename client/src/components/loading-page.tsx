import { Space } from "antd";
import React from "react";
import loading from "../assets/images/loading-page.gif";

export const LoadingPage: React.FC = () => {
    return (
        <div
            style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                zIndex: 9,
                backgroundColor: "#fff",
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <style></style>
                <span className="display-4 text-white">
                    <Space size="middle">
                        <img src={loading} alt="loading" />
                    </Space>
                </span>
            </div>
        </div>
    );
};
