import React, {useLayoutEffect} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import LayoutNoSidebar from "../layout/NoSidebar"
import {publicRoutes} from ".";
import {APICore} from "../utils/api/APICore";
import {ToastContainer} from "react-toastify";

const AllRoutes = (props) => {
    const api = new APICore();
    const location = useLocation();
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <React.Fragment>
            <Routes>
                <Route>
                    {publicRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <LayoutNoSidebar {...props}>
                                    {route.element}
                                </LayoutNoSidebar>
                            }
                            key={idx}
                        />
                    ))}
                </Route>
                {/*<Route>*/}
                {/*    {protectedRoutes.map((route, idx) => (*/}
                {/*        <Route*/}
                {/*            path={route.path}*/}
                {/*            element={*/}
                {/*                api.isUserAuthenticated() === false ? (*/}
                {/*                    <Navigate to={{*/}
                {/*                        pathname: '/auth/masuk',*/}
                {/*                    }}*/}
                {/*                    />*/}
                {/*                ) : (*/}
                {/*                    <Layout {...props}>{route.element}</Layout>*/}
                {/*                )}*/}
                {/*            key={idx}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</Route>*/}
            </Routes>
        </React.Fragment>
    )
}
export default AllRoutes;