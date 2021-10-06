import React from "react";
import "../../styles/components/shared/_title.scss";

interface ITitle {
    title: string;
}

const Title: React.FC<ITitle> = ({ title }) => {
    return <h1 className="title">{title}</h1>;
};

export default Title;
