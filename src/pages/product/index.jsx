import Head from "../../layout/head";
import React from "react";
import {Block, Button, Icon} from "../../components";
import {Badge, Card, Col, Row} from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import Product1 from '../../assets/images/product/1.jpeg'
import Product2 from '../../assets/images/product/2.jpeg'
import Product3 from '../../assets/images/product/3.jpeg'
import Product4 from '../../assets/images/product/4.jpeg'
import Product5 from '../../assets/images/product/5.jpeg'
import Product6 from '../../assets/images/product/6.jpeg'
import Product7 from '../../assets/images/product/7.jpeg'
import Product8 from '../../assets/images/product/8.jpeg'
import ImageContainer from "../../components/partials/galery/ImageContainer";
import Logo from "../../assets/images/logo.png";

const Product = () => {
    const navigate = useNavigate();
    return <>
        <Head title="PRODUK DH MERCH 2024"/>
        <Block className="nk-block-middle nk-auth-body wide-lg">
            <div className="brand-logo pb-4 text-center">
                <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                    <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo"/>
                    <img className="logo-dark logo-img logo-img-lg" src={Logo} alt="logo-dark"/>
                </Link>
            </div>
            <Row className="g-gs align-content-center">
                <Col xxl={3} lg={4} sm={6}>
                    <Card className="gallery">
                        <ImageContainer img={Product1}/>
                        <div className="gallery-body card-inner align-center text-center flex-wrap g-2">
                            <h5 className="text-center">KAOS MIDHA EDISI 2024</h5>
                        </div>
                    </Card>
                </Col>
                <Col xxl={3} lg={4} sm={6}>
                    <Card className="gallery">
                        <ImageContainer img={Product2}/>
                        <div className="gallery-body card-inner align-center text-center flex-wrap g-2">
                            <h5 className="text-center">KAOS TULANG PUNGGUNG</h5>
                        </div>
                    </Card>
                </Col>
                <Col xxl={3} lg={4} sm={6}>
                    <Card className="gallery">
                        <ImageContainer img={Product3}/>
                        <div className="gallery-body card-inner align-center text-center flex-wrap g-2">
                            <h5 className="text-center">KAOS MADHA EDISI 2024</h5>
                        </div>
                    </Card>
                </Col>
                <Col xxl={3} lg={4} sm={6}>
                    <Card className="gallery">
                        <ImageContainer img={Product4}/>
                        <div className="gallery-body card-inner align-center text-center flex-wrap g-2">
                            <h5 className="text-center">KAOS HARLAH EDISI 2024</h5>
                        </div>
                    </Card>
                </Col>
                <Col xxl={3} lg={4} sm={6}>
                    <Card className="gallery">
                        <ImageContainer img={Product5}/>
                        <div className="gallery-body card-inner align-center text-center flex-wrap g-2">
                            <h5 className="text-center">KAOS MTSDHA EDISI 2024</h5>
                        </div>
                    </Card>
                </Col>
                <Col xxl={3} lg={4} sm={6}>
                    <Card className="gallery">
                        <ImageContainer img={Product6}/>
                        <div className="gallery-body card-inner align-center text-center flex-wrap g-2">
                            <h5 className="text-center">KAOS RA DARUL HIKMAH 2024</h5>
                        </div>
                    </Card>
                </Col>
                <Col xxl={3} lg={4} sm={6}>
                    <Card className="gallery">
                        <ImageContainer img={Product7}/>
                        <div className="gallery-body card-inner align-center text-center flex-wrap g-2">
                            <h5 className="text-center">KAOS PONPES DARUL HIKMAH 2024</h5>
                        </div>
                    </Card>
                </Col>
                <Col xxl={3} lg={4} sm={6}>
                    <Card className="gallery">
                        <ImageContainer img={Product8}/>
                        <div className="gallery-body card-inner align-center text-center flex-wrap g-2">
                            <h5 className="text-center">KAOS NGAJI NGOPI NGABDI EDISI 2024</h5>
                        </div>
                    </Card>
                </Col>
                <div className="form-group">
                    <Button size="lg" className="btn-block" type="submit" color="success" onClick={() => {
                        navigate('/order')
                    }}>
                        ORDER SEKARANG
                    </Button>
                </div>
            </Row>
        </Block>
    </>
}
export default Product;