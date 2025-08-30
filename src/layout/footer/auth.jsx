import React from "react";
import { Row, Col } from "../../components";
import { Link } from "react-router-dom";

const AuthFooter = () => {
    return (
        <div className="nk-footer nk-auth-footer-full">
            <div className="container wide-lg">
                <Row className="g-3">
                    <Col lg={6} className="order-lg-last">
                        <ul className="nav nav-sm justify-content-center justify-content-lg-end">
                            <li className="nav-item">
                                <Link className="nav-link" target="_blank" to={`${process.env.PUBLIC_URL}/auths/terms`}>
                                    Syarat &amp; Kondisi
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" target="_blank" to={`${process.env.PUBLIC_URL}/auths/terms`}>
                                    Kebijakan Privasi
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" target="_blank" to={`${process.env.PUBLIC_URL}/auths/faq`}>
                                    Bantuan
                                </Link>
                            </li>
                        </ul>
                    </Col>
                    <Col lg="6">
                        <div className="nk-block-content text-center text-lg-start">
                            <p className="text-soft">&copy; 2023 DH Merch by <a href="https://darul-hikmah.sch.id">Yayasan Darul Hikmah Menganti</a></p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
export default AuthFooter;