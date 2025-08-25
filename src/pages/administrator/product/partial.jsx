import React, {useState} from "react";
import {
    Block,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Col,
    Icon,
    Row,
    RSelect
} from "../../../components";
import {Badge, Modal, ModalBody} from "reactstrap";
import {store as storeOrder} from "../../../utils/api/order"
import { store as storePayment } from "../../../utils/api/payment"
import {formatterIDR} from "../../../utils";
import SimpleBar from "simplebar-react";

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
    });
    const [colors, setColors] = useState([]);
    const [color, setColor] = useState({value: '', label: ''});
    const [sizes, setSizes] = useState([]);
    const [size, setSize] = useState({value: '', label: '', price: '',})
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
    const handleSubmit = (e) => {
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
        <React.Fragment>
            <SimpleBar
                className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${
                    modal.add ? "content-active" : ""
                }`}
            >
                <BlockHead>
                    <BlockHeadContent>
                        <BlockTitle tag="h5">Tambah Produk</BlockTitle>
                        <BlockDes>
                            <p>Add information or update product.</p>
                        </BlockDes>
                    </BlockHeadContent>
                </BlockHead>
                <Block>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <Row className="g-3">
                            <Col size="12">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.name}
                                            placeholder="Nama Produk"
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col size="12">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                    <textarea
                                        className="form-control"
                                        value={formData.description}
                                        placeholder="Diskripsi"
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                                            placeholder="SKU Produk"
                                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={formData.price === 0 ? '' : formData.price}
                                            placeholder="Harga"
                                            onChange={(e) => {
                                                setFormData({...formData, price: Number(e.target.value)})
                                            }}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col md="12">
                                <div className="form-group">
                                    <label htmlFor="name">Warna</label>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                    <tr className="text-center">
                                        <td scope="col">Nilai</td>
                                        <td scope="col">Label</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {colors.map((color, index) => (
                                        <tr key={index} className="text-center">
                                            <td>{color.value}</td>
                                            <td>{color.label}</td>
                                        </tr>
                                    ))}
                                    <tr className="text-center">
                                        <td scope="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="value"
                                                onChange={(e) => {
                                                    setColor({...color, value: e.target.value})
                                                }}
                                            />
                                        </td>
                                        <td scope="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="label"
                                                onChange={(e) => {
                                                    setColor({...color, label: e.target.value})
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Col>
                            <Col size="12">
                                <Button color="danger" className="col-md-12 justify-center" type="submit" size="sm" onClick={() => {
                                    setColors([...colors, color])
                                    setColor({value: '', label: ''})
                                }}>
                                    <Icon name="plus"></Icon>
                                    <span>Tambah</span>
                                </Button>
                            </Col>
                            <Col md="12">
                                <div className="form-group">
                                    <label htmlFor="name">Ukuran</label>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                    <tr className="text-center">
                                        <td scope="col">Nilai</td>
                                        <td scope="col">Label</td>
                                        <td scope="col">Harga</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {sizes.map((size, index) => (
                                        <tr key={index} className="text-center">
                                            <td>{size.value}</td>
                                            <td>{size.label}</td>
                                            <td>{size.price}</td>
                                        </tr>
                                    ))}
                                    <tr className="text-center">
                                        <td scope="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="value"
                                                onChange={(e) => {
                                                    setColor({...size, value: e.target.value})
                                                }}
                                            />
                                        </td>
                                        <td scope="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="label"
                                                onChange={(e) => {
                                                    setColor({...size, label: e.target.value})
                                                }}
                                            />
                                        </td>
                                        <td scope="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="price"
                                                onChange={(e) => {
                                                    setColor({...size, price: e.target.value})
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Col>
                            <Col size="12">
                                <Button color="danger" className="col-md-12 justify-center" type="submit" size="sm" onClick={() => {
                                    setColors([...colors, color])
                                    setColor({value: '', label: ''})
                                }}>
                                    <Icon name="plus"></Icon>
                                    <span>Tambah</span>
                                </Button>
                            </Col>
                            <Col size="12">
                                <Button color="primary" type="submit">
                                    <Icon name="save"></Icon>
                                    <span>SIMPAN</span>
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </Block>
            </SimpleBar>
            {modal.add && <div className="toggle-overlay" onClick={toggle}></div>}
        </React.Fragment>
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