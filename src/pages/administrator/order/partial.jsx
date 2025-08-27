import React, {useEffect, useState} from "react";
import {Button, Col, Icon, Row, RSelect} from "../../../components";
import {Badge, Modal, ModalBody} from "reactstrap";
import {get as getProduct} from "../../../utils/api/product"
import {store as storeOrder} from "../../../utils/api/order"
import {store as storePayment} from "../../../utils/api/payment"
import {formatterIDR} from "../../../utils";
import moment from "moment";

export const Add = ({modal, setModal, setDataRefresh}) => {
    const [products, setProducts] = useState([]);
    const [productOptions, setProductOptions] = useState([]);
    const [sizeOptions, setSizeOptions] = useState([])
    const [armOptions, setArmOptions] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
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
        check: false,
    })
    const [priceProduct, setPriceProduct] = useState(0);
    const [priceSize, setPriceSize] = useState(0);
    const [priceArm, setPriceArm] = useState(0)
    const [pricePayment, setPricePayment] = useState(0)
    const paymentOptions = [
        {value: '1', label: 'Tunai', price: 0},
        {value: '2', label: 'Virtual Account', price: 4250},
    ]
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.payment === "2") {
            const paramsPayment = {
                code: moment().format("YYYYMMDDHHmmss"),
                amount: formData.price,
                name: formData.name,
                phone: formData.phone,

            }
            storePayment(paramsPayment).then((resp) => {
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
                storeOrder(paramsOrder).then(() => {
                    setDataRefresh(true);
                    toggle();
                });
            });
        } else {
            const paramsOrder = {
                code: moment().format("YYYYMMDDHHmmss"),
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
                productId: formData.productId,
                size: formData.size,
                arm: formData.arm,
                price: Number(formData.price),
                payment: formData.payment,
                reference: '',
                payCode: '',
                check: false,
            }
            storeOrder(paramsOrder).then(() => {
                setDataRefresh(true);
                toggle();
            });
        }
    };
    const resetForm = () => {
        setFormData({
            id: null,
            code: "",
            name: "",
            phone: "",
            address: "",
            type: "",
            productId: "",
            size: "",
            arm: "",
            price: 0,
            payment: '',
            payCode: "",
            check: false,
        });
    };
    const toggle = () => {
        resetForm();
        setModal({add: false, detail: false});
    }

    useEffect(() => {
        getProduct().then((resp) => {
            setProducts(resp);
            setProductOptions(() => {
                return resp.map((item) => {
                    return {value: item.sku, label: item.sku, price: item.price};
                })
            })
        });
    }, []);

    useEffect(() => {
        const product = products.filter((item) => {
            return item.sku === formData.productId;
        }).pop()
        setSizeOptions(product && JSON.parse(product.size))
        setArmOptions(product && JSON.parse(product.arm))
    }, [formData.productId]);

    useEffect(() => {
        setFormData({...formData, price: Number(priceProduct) + Number(priceSize) + Number(priceArm) + Number(pricePayment)});
    }, [priceProduct, priceSize, priceArm, pricePayment]);

    return(
        <Modal isOpen={modal.add} toggle={toggle} className="modal-dialog-centered" size="lg">
            <ModalBody>
                <div className="p-2">
                    <h5 className="title">Tambah Pesanan</h5>
                    <div className="mt-4">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Row className="g-3">
                                <Col md="12">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                value={formData.name}
                                                placeholder="Nama Pemesan"
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="Nomor WA"
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                placeholder="Alamat"
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <RSelect
                                                name="type"
                                                options={productOptions}
                                                value={productOptions?.find((e) => e.value === formData.productId)}
                                                onChange={(e) => {
                                                    setPriceProduct(e.price);
                                                    setFormData({...formData, productId: e.label});
                                                }}
                                                placeholder="Pilih Produk"
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="form-group">
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
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <RSelect
                                                name="arm"
                                                options={armOptions}
                                                onChange={(e) => {
                                                    setPriceArm(e.price)
                                                    setFormData({...formData, arm: e.value});
                                                }}
                                                value={armOptions?.find((e) => e.value === formData.arm)}
                                                placeholder="Pilih Lengan"
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="form-group">
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
                                    </div>
                                </Col>
                                <Col md="6">
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
                                </Col>
                                <Col size="12">
                                    <Button color="primary" type="submit">
                                        <Icon className="plus"></Icon>
                                        <span>Simpan</span>
                                    </Button>
                                </Col>
                            </Row>
                        </form>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export const Detail = ({modal, setModal, order, setOrder}) => {
    const toggle = () => {
        setModal({add: false, detail: false})
        setOrder({});
    }
    return (
        <Modal isOpen={modal.detail} toggle={() => toggle()} className="modal-dialog-centered" size="lg">
            <ModalBody>
                <div className="nk-tnx-details mt-sm-3">
                    <div className="nk-modal-head mb-3">
                        <h5 className="title">Detail Pesanan</h5>
                    </div>
                    <Row className="gy-3">
                        <Col lg={6}>
                            <span className="sub-text">Nomor Pesanan</span>
                            <span className="caption-text">{order?.code}</span>
                        </Col>
                        <Col lg={6}>
                            <span className="sub-text">Status</span>
                            <span className={`dot bg-${order?.status === "2" ? "success" : order?.status === "1" ? "warning" : "info"} d-sm-none`}></span>
                            <Badge
                                className="badge-sm badge-dot has-bg d-none d-sm-inline-flex"
                                color={order?.status === "2" ? "success" : order?.status === "1" ? "warning" : "info"}
                            >
                                {order?.status === "2" ? "LUNAS" : order?.status === "1" ? "Menunggu Pembayaran" : "Telah diambil"}
                            </Badge>
                        </Col>
                        <Col lg={6}>
                            <span className="sub-text">Nama Pelanggan</span>
                            <span className="caption-text">{order?.name}</span>
                        </Col>
                        <Col lg={6}>
                            <span className="sub-text">Nama Produk</span>
                            <span className="caption-text">{order?.productId}</span>
                        </Col>
                        <Col lg={4}>
                            <span className="sub-text">Ukuran</span>
                            <span className="caption-text">{order?.size}</span>
                        </Col>
                        <Col lg={4}>
                            <span className="sub-text">Lengan</span>
                            <span className="caption-text">{order?.arm}</span>
                        </Col>
                        <Col lg={4}>
                            <span className="sub-text">Harga</span>
                            <span className="caption-text">{formatterIDR.format(order?.price)}</span>
                        </Col>
                        <Col lg={6}>
                            <span className="sub-text">Metode Pembayaran</span>
                            <span className="caption-text">{order?.payment === '1' ? "CASH" : "BRIVA"}</span>
                        </Col>
                        <Col lg={6}>
                            <span className="sub-text">Kode Bayar</span>
                            <span className="caption-text">{order?.payCode}</span>
                        </Col>
                    </Row>
                </div>
            </ModalBody>
        </Modal>
    )
}