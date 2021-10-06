import React from "react";
import "../../styles/components/_loading.scss";
export const Loading: React.FC = () => {
    return (
        <div className="stage">
            <div className="dot-pulse"></div>
        </div>
    );
};
