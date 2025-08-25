import React from "react";
import Head from "../../../layout/head";
import Content from "../../../layout/content";
import Orders from "./Orders";
import {BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Col, Row} from "../../../components";

export const Dashboard = () => {
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
                <Col xxl="4">
                    <Row className="g-gs">
                        <Col xxl="12" md="4">
                            <Orders />
                        </Col>
                        <Col xxl="12" md="4">
                            <Orders />
                        </Col>
                        <Col xxl="12" md="6">
                            {/*<Customer />*/}
                        </Col>
                    </Row>
                </Col>
            </Content>
        </React.Fragment>
    )
}