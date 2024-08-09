import Head from "../../layout/head";
import React from "react";
import {Block, Button, Icon, PreviewCard} from "../../components";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import {useDispatch, useSelector} from "react-redux";
import {Col, Row} from "reactstrap";
import {resetOrder} from "../../redux/order/actions";

const Success = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {order} = useSelector((state) => state.order);
    return <>
        <Head title="PRODUK DH MERCH 2024"/>
        <Block className="nk-block-middle nk-auth-body wide-xs">
            <div className="brand-logo pb-4 text-center">
                <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                    <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo"/>
                    <img className="logo-dark logo-img logo-img-lg" src={Logo} alt="logo-dark"/>
                </Link>
            </div>
            <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                <div className="text-center">
                    <h1 className="text-success">
                        <Icon name="check-c" className=""/>
                    </h1>
                    <h5 className="mb-2 text-success">Terima Kasih</h5>
                    <h5 className="mb-4">Order nomor {order.nomor} atas nama {order.nama} berhasil.</h5>
                </div>
                <Row className="gy-2">
                    <Col xs="12" md="6">
                        <div className="form-group">
                            <Button size="l" className="btn-block" type="submit" color="info" onClick={() => {
                                dispatch(resetOrder());
                                navigate('/')
                            }}>
                                Halaman Utama
                            </Button>
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <div className="form-group">
                            <Button size="l" className="btn-block" type="submit" color="success" onClick={() => {
                                dispatch(resetOrder());
                                navigate('/order')
                            }}>
                                Pesan Ulang
                            </Button>
                        </div>
                    </Col>
                </Row>
            </PreviewCard>
        </Block>
    </>
}
export default Success;