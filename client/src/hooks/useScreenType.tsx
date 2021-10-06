import { useMediaQuery } from "react-responsive";

export function useScreenType() {
    const FullScreen = ({ children }: any) => {
        const isFullScreen = useMediaQuery({ minWidth: 768 });
        return isFullScreen ? children : null;
    };

    const Mobile = ({ children }: any) => {
        const isMobile = useMediaQuery({ minWidth: 0, maxWidth: 767 });
        return isMobile ? children : null;
    };

    return { FullScreen, Mobile };
}
