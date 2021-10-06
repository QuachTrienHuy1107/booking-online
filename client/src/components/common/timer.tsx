import React from "react";
import "../../styles/components/_timer.scss";
interface ITime {
    time: string;
}
const Timer: React.FC<ITime> = ({ time }) => {
    return (
        <>
            <span className="timer">{time}</span>
        </>
    );
};
export default Timer;
