import React, {useEffect, useState} from "react";
import Head from "../../layout/head";
import {Card, Col, Row} from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import {getPublic as getProduct} from "../../utils/api/product"
import {
    Block,
    BlockContent,
    BlockHead,
    BlockTitle, Button, ImageContainer,
    PreviewCard
} from "../../components";
import {numberFormat} from "../../utils";

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getProduct().then((resp) => {
            setProducts(resp);
        });
    }, [])
    return (
        <React.Fragment>
            <Head title="Beranda"/>
            <Block className="nk-block-middle nk-auth-body  wide-lg">
                <div className="brand-logo pb-4 text-center">
                    <Link to={process.env.PUBLIC_URL} className="logo-link">
                        <img className="logo-light logo-img logo-img-lg" src={String(Logo)} alt="logo" />
                        <img className="logo-dark logo-img logo-img-lg" src={String(LogoDark)} alt="logo-dark" />
                    </Link>
                </div>
                <PreviewCard bodyClass="card-inner-lg">
                    <BlockHead>
                        <BlockContent>
                            <BlockTitle tag="h5" className="text-center">SEMUA PRODUK</BlockTitle>
                        </BlockContent>
                    </BlockHead>
                    <Row className="g-gs">
                        {products.map((item, index) => (
                            <Col sm={6} lg={4} xxl={3} key={item.id}>
                                <Card className="gallery">
                                    <ImageContainer img={item.image} />
                                    <div className="gallery-body card-inner align-center justify-between flex-wrap g-2">
                                        <div className="user-card">
                                            <div className="user-info">
                                                <span className="lead-text">{item.name}</span>
                                                <span className="sub-text">Rp. {numberFormat(item.price)}</span>
                                                <span className="sub-text">{item.description}</span>
                                            </div>
                                        </div>
                                        <Col className="col-md-12">
                                            <Button
                                                className={`btn btn-${item.status === '2' ? 'danger' : 'success'} btn-sm col-md-12`}
                                                disabled={item.status === "2"}
                                                onClick={() => navigate(`/pesan/${item.sku}`)}
                                            >
                                                <span>{item.status === '2' ? 'OUT STOCK' : 'BELI SEKARANG'}</span>
                                            </Button>
                                        </Col>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </PreviewCard>
            </Block>
        </React.Fragment>
    )
}

export default Dashboard;