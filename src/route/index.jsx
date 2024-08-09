import React from "react";
import {Route} from "react-router-dom";

const Product = React.lazy(() => import("../pages/product"));
const Order = React.lazy(() => import('../pages/order'));
const Success = React.lazy(() => import('../pages/success'));
export const publicRoutes = [
    {
        path: '/',
        name: 'Product',
        element: <Product/>,
        route: Route,
    },
    {
        path: '/order',
        name: 'Order',
        element: <Order/>,
        route: Route,
    },
    {
        path: '/sukses',
        name: 'Sukses',
        element: <Success/>,
        route: Route,
    },
]