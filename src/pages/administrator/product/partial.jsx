import React, {useState} from "react";
import {Button, Col, Icon, Row, RSelect} from "../../../components";
import {Badge, Modal, ModalBody} from "reactstrap";
import {store as storeOrder} from "../../../utils/api/order"
import { store as storePayment } from "../../../utils/api/payment"
import {formatterIDR} from "../../../utils";

export const Add = ({modal, setModal, product, setProduct, setDataRefresh}) => {
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
    const typeOptions = [
        {value: 'Anak', label: 'Anak'},
        {value: 'Dewasa', label: 'Dewasa'}
    ]
    const sizeOptions = [
        { value: "XS", label: "XS" },
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
        { value: "XL", label: "XL" },
        { value: "XXL", label: "XXL" },
        { value: "3XL", label: "3XL" },
    ]
    const armOptions = [
        {value: 'Pendek', label: 'Pendek'},
        {value: 'Panjang', label: 'Panjang'},
    ]
    const paymentOptions = [
        {value: '1', label: 'Tunai'},
        {value: '2', label: 'Virtual Account'},
    ]
    const onFormSubmit = (e) => {
        e.preventDefault();
        if (formData.payment === "2") {
            storePayment(formData).then((resp) => {
                const params = {
                    code: formData.code,
                    name: formData.name,
                    phone: formData.phone,
                    address: formData.address,
                    productId: '',
                    size: "",
                    arm: "",
                    price: 0,
                    payment: '',
                    payCode: "",
                    check: false,
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        // storeOrder(formData).then(() => {
        //     setModal({ add: false, detail: false });
        //     resetForm();
        //     setDataRefresh(true);
        // });
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

    return(
        <Modal isOpen={modal.add} toggle={toggle} className="modal-dialog-centered" size="lg">
            <ModalBody>
                <div className="p-2">
                    <h5 className="title">Tambah Produk</h5>
                    <div className="mt-4">
                        <form onSubmit={(e) => onFormSubmit(e)}>
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
                                                value={formData.code}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="SKU Produk"
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
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                placeholder="Harga"
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <RSelect
                                                name="type"
                                                options={typeOptions}
                                                value={typeOptions.find((e) => e.value === formData.type)}
                                                onChange={(e) => setFormData({ ...formData, type: e.value })}
                                                placeholder="Pilih Jenis"
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
                                                onChange={(e) => setFormData({ ...formData, size: e.value })}
                                                value={sizeOptions.find((e) => e.value === formData.size)}
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
                                                onChange={(e) => setFormData({ ...formData, arm: e.value })}
                                                value={armOptions.find((e) => e.value === formData.arm)}
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
                                                onChange={(e) => setFormData({ ...formData, payment: e.value })}
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
                                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
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

export const Detail = ({modal, setModal, order}) => {
    const toggle = () => {
        setModal({add: false, detail: false})
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
                            <span className="sub-text">Tipe</span>
                            <span className="caption-text">{order?.type}</span>
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
                        <Col lg={4}>
                            <span className="sub-text">Metode Pembayaran</span>
                            <span className="caption-text">{order?.payment}</span>
                        </Col>
                        <Col lg={4}>
                            <span className="sub-text">Kode Bayar</span>
                            <span className="caption-text">{order?.payCode}</span>
                        </Col>
                    </Row>
                </div>
            </ModalBody>
        </Modal>
    )
}