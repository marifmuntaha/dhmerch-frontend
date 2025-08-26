import React, {useEffect, useState} from "react";
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

export const Add = ({modal, setModal, setDataRefresh}) => {
    const [sizes, setSizes] = useState([]);
    const [size, setSize] = useState({value: '', label: '', price: ''});
    const [arms, setArms] = useState([]);
    const [arm, setArm] = useState({value: "", label: "", price: ""});
    const [image, setImage] = useState({});
    const [formData, setFormData] = useState({
        id: null,
        sku: "",
        name: "",
        description: "",
        price: "",
        size: "",
        arm: "",
        file: {},
        status: '',
        check: false,
    })
    const statusOptions = [
        {value: '1', label: 'Aktif'},
        {value: '2', label: 'Tidak Aktif'}
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = {
            sku: formData.sku,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            size: JSON.stringify(sizes),
            arm: JSON.stringify(arms),
            file: image,
            status: formData.status,
            check: false,
        }
        storeProduct(params).then(() => {
            setDataRefresh(true)
        });
    };
    const handleResetForm = () => {
        setFormData({
            id: null,
            sku: "",
            name: "",
            description: "",
            price: "",
            size: "",
            arm: "",
            file: {},
            status: undefined,
            check: false,
        });
        setSizes([]);
        setArms([]);
        setImage({});
    };
    const toggle = () => {
        handleResetForm();
        setModal({add: false, edit: false, detail: false});
    }

    return (
        <React.Fragment>
            <SimpleBar
                className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${modal.add ? "content-active" : ""}`}>
                <BlockHead>
                    <BlockHeadContent>
                        <BlockTitle tag="h5">Tambah Produk</BlockTitle>
                        <BlockDes>
                            <p>Tambahkan informasi atau perbarui produk.</p>
                        </BlockDes>
                    </BlockHeadContent>
                </BlockHead>
                <Block>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <Row className="g-2">
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
                                            value={formData.status !== undefined && statusOptions.find((item) => item.value === formData.status)}
                                            placeholder="Pilih Status"
                                            onChange={(e) => setFormData({...formData, status: e.value})}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col size="12">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <div className="form-file">
                                            <Input type="file" onChange={(e) => setImage(e.target.files[0])}/>
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
            {modal.add && <div className="toggle-overlay" onClick={toggle}></div>}
        </React.Fragment>
    )
}

export const Edit = ({modal, setModal, product, setDataRefresh}) => {
    const [arms, setArms] = useState([]);
    const [arm, setArm] = useState({
        value: "",
        label: "",
        price: "",
    })
    const [image, setImage] = useState({});
    const [sizes, setSizes] = useState([]);
    const [size, setSize] = useState({
        value: "",
        label: "",
        price: "",
    })
    const [formData, setFormData] = useState({
        id: null,
        sku: "",
        name: "",
        description: "",
        price: "",
        size: "",
        arm: "",
        file: {},
        status: '',
        check: false,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleResetForm = () => {
        setFormData({
            id: null,
            sku: "",
            name: "",
            description: "",
            price: "",
            size: "",
            arm: "",
            file: {},
            status: undefined,
            check: false,
        });
        setSizes([]);
        setArms([]);
        setImage({});
    };
    const toggle = () => {
        handleResetForm();
        setModal({add: false, edit: false, detail: false});
    }

    useEffect(() => {
        setFormData(product)
        setArms(JSON.parse(product.arm))
        setSizes(JSON.parse(product.size))
    }, [product]);
    return (
        <Modal isOpen={modal.edit} toggle={toggle} className="modal-dialog-centered" size="md">
            <ModalBody>
                <div className="p-2">
                    <h5 className="title">Perbarui Produk</h5>
                    <div className="mt-4">
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
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
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
                                                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}/>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}/>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="12">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <textarea
                                                className="form-control"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}/>
                                        </div>
                                    </div>
                                </Col>
                                <Col size="12">
                                    <Button color="primary" type="submit">
                                        <Icon name="plus"></Icon>
                                        <span>Perbarui Produk</span>
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
export const Detail = ({modal, setModal, product}) => {
    const sizes = product.size && JSON.parse(product.size)
    const arms = product.arm && JSON.parse(product.arm)
    const toggle = () => {
        setModal({add: false, edit: false, detail: false})
    }
    return (
        <Modal isOpen={modal.detail} toggle={toggle} className="modal-dialog-centered" size="lg">
            <ModalBody>
                <div className="nk-modal-head">
                    <h4 className="nk-modal-title title">
                        Product <small className="text-primary">#{product.sku}</small>
                    </h4>
                    <img src={product.image} alt=""/>
                </div>
                <div className="nk-tnx-details mt-sm-3">
                    <Row className="gy-3">
                        <Col lg={6}>
                            <span className="sub-text">Nama Produk</span>
                            <span className="caption-text">{product.name}</span>
                        </Col>
                        <Col lg={6}>
                            <span className="sub-text">Harga</span>
                            <span className="caption-text">{product.price}</span>
                        </Col>
                        <Col lg={6}>
                            <span className="sub-text">Ukuran</span>
                            <span className="caption-text">
                                {sizes && sizes.map(size => (
                                    <Badge className="me-1" color="info">{size.label}</Badge>
                                ))}
                            </span>
                        </Col>
                        <Col lg={6}>
                            <span className="sub-text">Lengan</span>
                            <span className="caption-text">
                                {arms && arms.map(arm => (
                                    <Badge className="me-1" color="warning">{arm.label}</Badge>
                                ))}
                            </span>
                        </Col>
                        <Col lg={6}>
                            <span className="sub-text">Stok</span>
                            <span className="caption-text"> {product.status === '1' ? (
                                <Badge className="me-1" color="success">In Stock</Badge>
                            ) : <Badge className="me-1" color="danger">Out Stock</Badge>}</span>
                        </Col>
                    </Row>
                </div>
            </ModalBody>
        </Modal>
    )
}