import React, {useEffect, useState} from "react";
import Head from "../../../layout/head";
import Content from "../../../layout/content";
import Orders from "./Orders";
import {BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Col, Row} from "../../../components";
import { get as getOrder } from "../../../utils/api/order";

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
                        <Orders />
                    </Col>
                </Row>
            </Content>
        </React.Fragment>
    )
}