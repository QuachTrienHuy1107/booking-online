import React from "react";
import HeartIcon from "./heart";

interface IRater {
    number: number;
    size: number;
}

const Rater: React.FC<IRater> = ({ number, size }) => {
    return (
        <>
            <HeartIcon size={size} />
            <span style={{ marginLeft: 5 }}>{number}%</span>
        </>
    );
};
export default Rater;
