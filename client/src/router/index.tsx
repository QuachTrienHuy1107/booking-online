import React, { lazy } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "store/store";
import AdminTemplate from "../templates/admin.template";
import FormTemplate from "../templates/form.template";
import HomeTemplate from "../templates/home.template";
import { ROUTES } from "../utils/constant";

type PrivateRouteProps = {
    component: React.ComponentType;
    layout: string;
    restricted?: boolean;
} & RouteProps;

type RouterType = {
    path: string;
    exact: boolean;
    component: React.ComponentType;
    layout: string;
    restricted?: boolean | false;
};

const HomePage = lazy(() => import("../pages/home"));
const MovieDetail = lazy(() => import("../pages/movie-detail"));
const LoginPage = lazy(() => import("../pages/login"));
const RegiserPage = lazy(() => import("../pages/register"));
const ResetPassword = lazy(() => import("../pages/reset-password"));
const Booking = lazy(() => import("../pages/booking"));
const Checkout = lazy(() => import("../pages/checkout"));
const ReviewPage = lazy(() => import("../pages/review-page"));
const MovieList = lazy(() => import("../pages/movie-list"));
const Profile = lazy(() => import("../pages/profile"));

const routes = [
    /**
     * Client
     */
    {
        path: `${ROUTES.HOME}`,
        exact: true,
        component: HomePage,
        layout: "Home",
        restricted: false,
    },
    {
        path: `${ROUTES.MOVIEDETAIL}/:_id`,
        exact: true,
        component: MovieDetail,
        layout: "Home",
        restricted: false,
    },
    {
        path: `${ROUTES.MOVIELIST}`,
        exact: true,
        component: MovieList,
        layout: "Home",
        restricted: false,
    },
    {
        path: `${ROUTES.REVIEW_PAGE}/:_id`,
        exact: true,
        component: ReviewPage,
        layout: "Home",
        restricted: false,
    },
    {
        path: `${ROUTES.BOOKING}/:_id`,
        exact: true,
        component: Booking,
        layout: "Home",
        restricted: true,
    },
    {
        path: `${ROUTES.CHECKOUT}/:_id`,
        exact: true,
        component: Checkout,
        restricted: true,
    },
    {
        path: `${ROUTES.PROFILE}/:_id`,
        exact: true,
        component: Profile,
        restricted: true,
        layout: "Home",
    },

    /**
     * Form
     */

    {
        path: ROUTES.LOGIN,
        exact: true,
        component: LoginPage,
        layout: "Form",
        restricted: false,
    },
    {
        path: `${ROUTES.RESET_PASSWORD}/:token`,
        exact: true,
        component: ResetPassword,
        layout: "Form",
        restricted: false,
    },
    {
        path: ROUTES.REGISTER,
        exact: true,
        component: RegiserPage,
        layout: "Form",
        restricted: false,
    },
];

const AppLayout = ({ component: Component, layout, restricted, ...rest }: PrivateRouteProps) => {
    const { credential } = useAppSelector((state) => state.authSlice);
    React.useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    return (
        <Route
            {...rest}
            render={(props) =>
                (layout === "Form" && (
                    <FormTemplate>
                        <Component {...props} />
                    </FormTemplate>
                )) ||
                (!localStorage.getItem("isAuth") && restricted === true && <Redirect to={ROUTES.LOGIN} />) ||
                (layout === "Home" && (
                    <HomeTemplate {...rest}>
                        <Component {...props} />
                    </HomeTemplate>
                )) ||
                (credential?.role === "Admin" && layout === "Admin" && (
                    <AdminTemplate {...rest}>
                        <Component {...props} />
                    </AdminTemplate>
                )) || <Component {...props} />
            }
        />
    );
};

const renderRoutes = (router: any) => {
    if (router && router.length > 0) {
        return router?.map((route: RouterType, index: number) => (
            <AppLayout
                key={index}
                exact
                path={route.path}
                component={route.component}
                layout={route.layout}
                restricted={route.restricted}
            />
        ));
    }
};

export { routes, renderRoutes };
