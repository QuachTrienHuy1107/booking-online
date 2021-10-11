import React from "react";

interface IAdmin {
    children: React.ReactNode;
}

const AdminTemplate: React.FC<IAdmin> = ({ children }) => {
    return <div>Admin template</div>;
};
export default AdminTemplate;
