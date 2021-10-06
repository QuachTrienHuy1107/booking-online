import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/_title-navigation.scss";

interface ITitleNavigation {
    subTitle: string;
    title: string;
    linkTo: string;
    state?: any;
}

const TitleNavigation: React.FC<ITitleNavigation> = ({ title, subTitle, linkTo, state }) => {
    return (
        <div className="heading-title">
            <h1>{title}</h1>
            {!!state ? (
                <Link to={{ pathname: linkTo, state: state }}>{subTitle}</Link>
            ) : (
                <Link to={linkTo}>{subTitle}</Link>
            )}
        </div>
    );
};
export default TitleNavigation;
