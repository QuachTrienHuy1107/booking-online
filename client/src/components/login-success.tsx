import React from "react";

const LoginSuccess: React.FC = () => {
    const isCurrent = React.useRef(true);

    React.useEffect(() => {
        return () => {
            isCurrent.current = false;
        };
    }, []);

    React.useEffect(() => {
        isCurrent.current &&
            setTimeout(() => {
                window.close();
            }, 1000);
    }, []);

    return <div>Login success</div>;
};

export default LoginSuccess;
