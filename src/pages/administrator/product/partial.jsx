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
import {Badge, Input, Modal, ModalBody} from "reactstrap";
import {store as storeProduct} from "../../../utils/api/product"
import SimpleBar from "simplebar-react";
import {numberFormat} from "../../../utils";

export const Add = ({modal, setModal, product, setProduct, setDataRefresh}) => {
    const [colors, setColors] = useState([]);
    const [color, setColor] = useState({value: '', label: '',});
    const [sizes, setSizes] = useState([]);
    const [size, setSize] = useState({value: '', label: '', price: ''});
    const [arms, setArms] = useState([]);
    const [arm, setArm] = useState({value: "", label: "", price: ""});
    const [images, setImages] = useState({});
    const [formData, setFormData] = useState({
        id: null,
        sku: "",
        name: "",
        description: "",
        price: "",
        color: "",
        size: "",
        arm: "",
        image: {},
        status: '',
        check: false,
    })
    const statusOptions = [
        {value: '1', label: 'Aktif'},
        {value: '2', label: 'Tidak Aktif'}
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        if (product === false) {
            handleStore(formData)
        }
    };
    const handleStore = (data) => {
        const params = {
            sku: data.sku,
            name: data.name,
            description: data.description,
            price: data.price,
            color: JSON.stringify(colors),
            size: JSON.stringify(sizes),
            arm: JSON.stringify(arms),
            image: images,
            status: data.status,
            check: false,
        }
        storeProduct(params).then(() => {
            setDataRefresh(true)
        });
    }
    const handleUpdate = (data) => {

    }
    const handleResetForm = () => {
        setFormData({
            id: null,
            sku: "",
            name: "",
            description: "",
            price: "",
            color: "",
            size: "",
            arm: "",
            image: {},
            status: '',
            check: false,
        });
    };
    const toggle = () => {
        handleResetForm();
        setModal({formData: false, detail: false});
    }

    return (
        <React.Fragment>
            <SimpleBar
                className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${modal.formData ? "content-active" : ""}`}>
                <BlockHead>
                    <BlockHeadContent>
                        <BlockTitle tag="h5">{product !== false ? "Ubah" : "Tambah"} Produk</BlockTitle>
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
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                                    </div>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.sku}
                                            placeholder="SKU"
                                            onChange={(e) => setFormData({...formData, sku: e.target.value})}/>
                                    </div>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={numberFormat(formData.price)}
                                            placeholder="Harga"
                                            onChange={(e) => setFormData({...formData, price: e.target.value})}/>
                                    </div>
                                </div>
                            </Col>
                            <Col md="12">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                    <textarea
                                        className="form-control"
                                        value={formData.description}
                                        placeholder="Diskripsi"
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}/>
                                    </div>
                                </div>
                            </Col>
                            <Col size="12">
                                <div className="form-group">
                                    <label className="label fw-bold">Warna</label>
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr className="text-center">
                                            <th>Nilai</th>
                                            <th>Label</th>
                                            <th>#</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {colors.map((color, idx) => (
                                            <tr className="text-center" key={idx}>
                                                <td>{color.value}</td>
                                                <td>{color.label}</td>
                                                <td>
                                                    <Button color="danger" size="sm" outline
                                                            onClick={() => setColors(colors.filter((item) => {
                                                                return item.value !== color.value
                                                            }))}>
                                                        <Icon name="trash" color="danger"></Icon>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="text-center">
                                            <td>
                                                <input type="text" className="form-control text-center" size="sm"
                                                       value={color.value}
                                                       onChange={(e) => setColor({...color, value: e.target.value})}/>
                                            </td>
                                            <td>
                                                <input type="text" className="form-control text-center" size="sm"
                                                       value={color.label}
                                                       onChange={(e) => setColor({...color, label: e.target.value})}/>
                                            </td>
                                            <td>
                                                <Button color="primary" size="sm" outline
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setColors([...colors, color]);
                                                            setColor({value: '', label: ''});
                                                        }}>
                                                    <Icon name="save" color="danger"></Icon>
                                                </Button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                            <Col size="12">
                                <div className="form-group">
                                    <label className="label fw-bold">Ukuran</label>
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr className="text-center">
                                            <th>Nilai</th>
                                            <th>Label</th>
                                            <th>Harga</th>
                                            <th>#</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {sizes.map((size, idx) => (
                                            <tr className="text-center" key={idx}>
                                                <td>{size.value}</td>
                                                <td>{size.label}</td>
                                                <td>{numberFormat(size.price)}</td>
                                                <td>
                                                    <Button color="danger" size="sm" outline
                                                            onClick={() => setSizes(sizes.filter((item) => {
                                                                return item.value !== size.value
                                                            }))}>
                                                        <Icon name="trash" color="danger"></Icon>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="text-center">
                                            <td>
                                                <input type="text" className="form-control text-center" size="sm"
                                                       value={size.value}
                                                       onChange={(e) => setSize({...size, value: e.target.value})}/>
                                            </td>
                                            <td>
                                                <input type="text" className="form-control text-center" size="sm"
                                                       value={size.label}
                                                       onChange={(e) => setSize({...size, label: e.target.value})}/>
                                            </td>
                                            <td>
                                                <input type="text" className="form-control text-center" size="sm"
                                                       value={size.price}
                                                       onChange={(e) => setSize({...size, price: e.target.value})}/>
                                            </td>
                                            <td>
                                                <Button
                                                color="primary"
                                                size="sm"
                                                outline
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSizes([...sizes, size]);
                                                    setSize({value: '', label: '', price: ''});
                                                }}
                                            >
                                                <Icon name="save"></Icon>
                                            </Button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                            <Col size="12">
                                <div className="form-group">
                                    <label className="label fw-bold">Lengan</label>
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr className="text-center">
                                            <th>Nilai</th>
                                            <th>Label</th>
                                            <th>Harga</th>
                                            <th>#</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {arms.map((arm, idx) => (
                                            <tr className="text-center" key={idx}>
                                                <td>{arm.value}</td>
                                                <td>{arm.label}</td>
                                                <td>{numberFormat(arm.price)}</td>
                                                <td>
                                                    <Button color="danger" size="sm" outline
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                setArms(arms.filter((item) => {
                                                                    return item.value !== arm.value
                                                                }))
                                                            }}>
                                                        <Icon name="trash" color="danger"></Icon>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="text-center">
                                            <td>
                                                <input type="text" className="form-control text-center" size="sm"
                                                       value={arm.value}
                                                       onChange={(e) => setArm({...arm, value: e.target.value})}/>
                                            </td>
                                            <td>
                                                <input type="text" className="form-control text-center" size="sm"
                                                       value={arm.label}
                                                       onChange={(e) => setArm({...arm, label: e.target.value})}/>
                                            </td>
                                            <td>
                                                <input type="text" className="form-control text-center" size="sm"
                                                       value={arm.price}
                                                       onChange={(e) => setArm({...arm, price: e.target.value})}/>
                                            </td>
                                            <td>
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                    outline
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setArms([...arms, arm]);
                                                        setArm({value: '', label: '', price: ''});
                                                    }}
                                                >
                                                    <Icon name="save"></Icon>
                                                </Button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                            <Col size="12">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <RSelect
                                            name="status"
                                            options={statusOptions}
                                            value={statusOptions.find((item) => item.value === formData.status)}
                                            placeholder="Pilih Status"
                                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col size="12">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <div className="form-file">
                                            <Input
                                                type="file"
                                                multiple
                                                onChange={(e) => setImages(e.target.files)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col size="12">
                                <Button color="primary" className="col-md-12 justify-content-center">
                                    <Icon name="save" color="danger"/>
                                    <span>SIMPAN</span>
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </Block>
            </SimpleBar>
            {modal.formData && <div className="toggle-overlay" onClick={toggle}></div>}
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
                            <span
                                className={`dot bg-${order?.status === "2" ? "success" : order?.status === "1" ? "warning" : "info"} d-sm-none`}></span>
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
                            <span className="caption-text">{numberFormat(order?.price)}</span>
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