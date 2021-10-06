import React from "react";

interface IAdmin {
    children: React.ReactNode;
}

const AdminTemplate: React.FC<IAdmin> = ({ children }) => {
    return <div>123</div>;
};
export default AdminTemplate;
