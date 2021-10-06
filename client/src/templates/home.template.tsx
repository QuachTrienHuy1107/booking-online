import React from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";

interface IHome {
    children: React.ReactNode;
}

const HomeTemplate: React.FC<IHome> = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};
export default HomeTemplate;
