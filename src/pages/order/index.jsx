import React, {useEffect, useState} from "react";
import Head from "../../layout/head";
import {Link, useNavigate, useParams} from "react-router-dom";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import {
    Block,
    BlockContent,
    BlockDes,
    BlockHead,
    BlockTitle,
    Button,
    Col, Icon,
    PreviewCard,
    Row,
    RSelect
} from "../../components";
import {Form} from "reactstrap";
import {useForm} from "react-hook-form";
import {getPublic as getProduct} from "../../utils/api/product"
import {storePublic as storePayment} from "../../utils/api/payment";
import {storePublic as storeOrder} from "../../utils/api/order";

const Order = () => {
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        phone: "",
        address: "",
        productId: "",
        type: "",
        size: "",
        arm: "",
        price: 0,
        payment: '',
        payCode: "",
    })
    const [productOptions, setProductOptions] = useState([]);
    const [sizeOptions, setSizeOptions] = useState([]);
    const [armOptions, setArmOptions] = useState([]);
    const [priceProduct, setPriceProduct] = useState(0);
    const [priceSize, setPriceSize] = useState(0);
    const [priceArm, setPriceArm] = useState(0);
    const [pricePayment, setPricePayment] = useState(0)
    const paymentOptions = [
        {value: '1', label: 'Tunai', price: 0},
        {value: '2', label: 'Virtual Account', price: 4250},
    ];
    const navigate = useNavigate();
    const {sku} = useParams();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = () => {
        const paramsPayment = {
            productId: formData.productId,
            amount: formData.price,
            name: formData.name,
            phone: formData.phone,
            address: formData.address,

        }
        storePayment(paramsPayment).then(async (resp) => {
            const paramsOrder = {
                code: resp.order_id,
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
                productId: formData.productId,
                size: formData.size,
                arm: formData.arm,
                price: Number(formData.price) - 4250,
                payment: formData.payment,
                reference: resp.transaction_id,
                payCode: resp.va_numbers[0].va_number,
                check: false,
            }
            await storeOrder(paramsOrder);
        });
    }

    useEffect(() => {
        getProduct({status: 1}).then((resp) => {
            const product = resp.filter((product) => {
                return product.sku === sku;
            }).pop();
            const sizes = JSON.parse(String(product.size));
            const arms = JSON.parse(String(product.arm));
            setProductOptions(resp.map((product) => {
                return {
                    value: product.sku,
                    label: product.sku,
                }
            }))
            setSizeOptions(sizes.map((item) => {
                return {
                    value: item.value,
                    label: item.label,
                    price: item.price,
                }
            }))
            setArmOptions(arms.map((item) => {
                return {
                    value: item.value,
                    label: item.label,
                    price: item.price,
                }
            }))
            setFormData({...formData, productId: product.sku, price: product.price});
            setPriceProduct(product.price);
        })
    }, [sku])
    useEffect(() => {
        setFormData({...formData, price: Number(priceProduct) + Number(priceSize) + Number(priceArm) + Number(pricePayment)});
    }, [priceProduct, priceSize, priceArm, pricePayment]);

    return (
        <React.Fragment>
            <Head title="Pesan"/>
            <Block className="nk-block-middle nk-auth-body  wide-xs">
                <div className="brand-logo pb-4 text-center">
                    <Link to={process.env.PUBLIC_URL} className="logo-link">
                        <img className="logo-light logo-img logo-img-lg" src={String(Logo)} alt="logo" />
                        <img className="logo-dark logo-img logo-img-lg" src={String(LogoDark)} alt="logo-dark" />
                    </Link>
                </div>
                <PreviewCard bodyClass="card-inner-lg">
                    <BlockHead>
                        <BlockContent>
                            <BlockTitle tag="h5" className="text-center">PESANAN</BlockTitle>
                            <BlockDes className="text-center">
                                <p>Silahkan isi form pemesanan dibawah ini</p>
                            </BlockDes>
                        </BlockContent>
                    </BlockHead>
                    <Form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control-md form-control"
                                    placeholder="Nama Lengkap"
                                    {...register('name', { required: "Nama Lengkap tidak boleh kosong." })}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                {errors.name && <span className="invalid">{errors.name.message}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="phone"
                                    placeholder="Nomor WA"
                                    {...register('phone', { required: "Nomor WA tidak boleh kosong." })}
                                    className="form-control-md form-control"
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                                {errors.phone && <span className="invalid">{errors.phone.message}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="address"
                                    className="form-control-md form-control"
                                    placeholder="Alamat"
                                    {...register('address', { required: "Alamat tidak boleh kosong." })}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                                {errors.address && <span className="invalid">{errors.address.message}</span>}
                            </div>
                        </div>
                        <Row>
                            <Col className="form-group" md={6} sm={12}>
                                <div className="form-control-wrap">
                                    <RSelect
                                        name="size"
                                        options={productOptions}
                                        value={productOptions?.find((e) => e.value === formData.productId)}
                                        onChange={(e) => {
                                            setPriceSize(e.price)
                                            setFormData({
                                                ...formData,
                                                size: e.value
                                            })
                                        }}
                                        placeholder="Pilih Produk"
                                        isDisabled={true}
                                    />
                                </div>
                            </Col>
                            <Col className="form-group" md={6} sm={12}>
                                <div className="form-control-wrap">
                                    <RSelect
                                        name="size"
                                        options={sizeOptions}
                                        value={sizeOptions?.find((e) => e.value === formData.size)}
                                        onChange={(e) => {
                                            setPriceSize(e.price)
                                            setFormData({
                                                ...formData,
                                                size: e.value
                                            })
                                        }}
                                        placeholder="Pilih Ukuran"
                                    />
                                </div>
                            </Col>
                            <Col className="form-group" md={6} sm={12}>
                                <div className="form-control-wrap">
                                    <RSelect
                                        name="arm"
                                        options={armOptions}
                                        value={armOptions?.find((e) => e.value === formData.arm)}
                                        onChange={(e) => {
                                            setPriceArm(e.price)
                                            setFormData({
                                                ...formData,
                                                arm: e.value
                                            })
                                        }}
                                        placeholder="Pilih Lengan"
                                    />
                                </div>
                            </Col>
                            <Col className="form-group" md={6} sm={12}>
                                <div className="form-control-wrap">
                                    <RSelect
                                        name="payment"
                                        options={paymentOptions}
                                        onChange={(e) => {
                                            setPricePayment(e.price)
                                            setFormData({...formData, payment: e.value})
                                        }}
                                        value={paymentOptions.find((e) => e.value === formData.payment)}
                                        placeholder="Metode Pembayaran"
                                    />
                                </div>
                            </Col>
                            <div className="form-group">
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.price}
                                        placeholder="Total Pembayaran"
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <Col size="12" className="between-center">
                                <Button color="primary" type="submit">
                                    <Icon name="send"></Icon>
                                    <span>PESAN</span>
                                </Button>
                                <Button color="secondary" type="button" onClick={() => navigate('/')}>
                                    <Icon name="reload"></Icon>
                                    <span>KEMBALI</span>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </PreviewCard>
            </Block>
        </React.Fragment>
    )
}

export default Order;