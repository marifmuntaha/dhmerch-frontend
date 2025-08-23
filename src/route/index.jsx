import React, {useLayoutEffect} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import Layout from "../layout";
import NoSidebar from "../layout/noSidebar";
import PrivateRoute from "./protectedRoute";
import Dashboard from "../pages/dashboard";
import Login from "../pages/auth/login";
import Logout from "../pages/auth/logout";
import Error404 from "../pages/error/Error-404";
import ForgotPassword from "../pages/auth/forgot-password";
import ResetPassword from "../pages/auth/reset-password";
import {Dashboard as DashboardAdministrator} from "../pages/administrator/dashboard"
import Order from "../pages/administrator/order";

const Router = () => {
    const location = useLocation();
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <Routes>
            <Route element={<PrivateRoute/>}>
                <Route path={process.env.PUBLIC_URL} element={<Layout/>}>
                    <Route path="/administrator" element={<DashboardAdministrator/>} />
                    <Route path="/administrator/pesanan" element={<Order/>} />
                </Route>
            </Route>
            <Route path={process.env.PUBLIC_URL} element={<NoSidebar/>}>
                <Route index element={<Dashboard/>}/>
                <Route path="auth/masuk" element={<Login/>}/>
                <Route path="auth/lupa-sandi" element={<ForgotPassword />}/>
                <Route path="auth/reset-sandi/:token" element={<ResetPassword />}/>
                <Route path="auth/keluar" element={<Logout/>}/>

                <Route path="errors">
                    <Route path="404" element={<Error404 />}></Route>
                    {/*    <Route path="404-classic" element={<Error404Classic />}></Route>*/}
                    {/*    <Route path="504-modern" element={<Error504Modern />}></Route>*/}
                    {/*    <Route path="504-classic" element={<Error504Classic />}></Route>*/}
                </Route>
                <Route path="*" element={<Error404 />}></Route>

            </Route>
        </Routes>
    )
}

export default Router;