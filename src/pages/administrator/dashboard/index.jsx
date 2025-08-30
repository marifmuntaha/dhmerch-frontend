import React, {useEffect, useState} from "react";
import Head from "../../../layout/head";
import Content from "../../../layout/content";
import Orders from "./Orders";
import {BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Col, Row} from "../../../components";
import { get as getOrder } from "../../../utils/api/order";
import Paid from "./Paid";
import Unpaid from "./Unpaid";
import RecentOrders from "./RecentOrder";
import TrafficSources from "./TrafficSources";

export const Dashboard = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        getOrder().then((resp) => setOrders(resp));
    }, []);
    return (
        <React.Fragment>
            <Head title="Dashboard" />
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page>Dashboard</BlockTitle>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Row className="g-gs">
                    <Col xxl="4" md="4">
                        <Orders orders={orders} />
                    </Col>
                    <Col xxl="4" md="4">
                        <Paid orders={orders} />
                    </Col>
                    <Col xxl="4" md="4">
                        <Unpaid orders={orders} />
                    </Col>
                    <Col xxl="6">
                        <RecentOrders orders={orders} />
                    </Col>
                    <Col xxl="6" lg={12} md={6}>
                        <TrafficSources orders={orders}/>
                    </Col>
                </Row>
            </Content>
        </React.Fragment>
    )
}