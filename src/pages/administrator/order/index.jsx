import React, {useEffect, useState} from "react";
import Head from "../../../layout/head";
import Content from "../../../layout/content";
import {
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button, Col,
    DataTableHead, DataTableItem, DataTableRow,
    Icon, Row, TooltipComponent, RSelect
} from "../../../components";
import {Badge, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, UncontrolledDropdown} from "reactstrap";
import {get as getOrder, store as storeOrder} from "../../../utils/api/order"
import {useForm} from "react-hook-form";

const Order = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [data, setData] = useState([]);
    const [onSearchText, setSearchText] = useState("");
    const [formData, setFormData] = useState({
        id: null,
        code: "",
        name: "",
        phone: "",
        address: "",
        type: "",
        size: "",
        arm: "",
        price: 0,
        payment: "",
        check: false,
    });
    const [smOption, setSmOption] = useState(false);
    const [view, setView] = useState({ add: false, details: false})
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(7);

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const deleteOrder = (id) => {
        let defaultData = data;
        defaultData = defaultData.filter((item) => item.id !== id);
        setData([...defaultData]);
    };
    const loadDetail = (id) => {
        let index = data.findIndex((item) => item.id === id);
        setFormData(data[index]);
    };
    const markAsDelivered = (id) => {
        let newData = data;
        let index = newData.findIndex((item) => item.id === id);
        newData[index].status = "Delivered";
        setData([...newData]);
    };
    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };
    const onFormCancel = () => {
        setView({ add: false, details: false });
        resetForm();
    };
    const onFormSubmit = () => {
        storeOrder(formData).then(() => {
            setView({ add: false, details: false });
            resetForm();
        });
    };
    const onSelectChange = (e, id) => {
        let newData = data;
        let index = newData.findIndex((item) => item.id === id);
        newData[index].check = e.currentTarget.checked;
        setData([...newData]);
    };
    const resetForm = () => {
        setFormData({
            id: null,
            code: "",
            name: "",
            phone: "",
            address: "",
            type: "",
            size: "",
            arm: "",
            price: 0,
            payment: '',
            check: false,
        });
    };
    const selectorCheck = (e) => {
        let newData;
        newData = data.map((item) => {
            item.check = e.currentTarget.checked;
            return item;
        });
        setData([...newData]);
    };
    const selectorDeleteOrder = () => {
        let newData;
        newData = data.filter((item) => item.check !== true);
        setData([...newData]);
    };
    const selectorMarkAsDelivered = () => {
        let newData;
        newData = data.map((item) => {
            if (item.check === true) item.status = "Delivered";
            return item;
        });
        setData([...newData]);
    };
    const toggle = (type) => {
        setView({
            add: type === "add",
            details: type === "details",
        });
    };

    useEffect(() => {
        getOrder().then((resp) => setData(resp));
    }, []);

    useEffect(() => {
        let price = 0;
        if (formData.type === 'Anak') {
            price = 75000
        } else {
            if (['S', 'M', 'L', 'XL'].includes(formData.size)) {
                if (formData.arm === 'Pendek') {
                    price = 85000
                } else {
                    price = 95000
                }
            } else {
                if (formData.arm === 'Pendek') {
                    price = 95000
                } else {
                    price = 105000
                }
            }
        }
        if (formData.payment === '2') {
            price = price + 4250
        }
        setFormData({...formData, price: price});
    }, [formData.size, formData.type, formData.arm, formData.payment]);
    return (
        <React.Fragment>
            <Head title="Pesanan" />
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle>Pesanan</BlockTitle>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <div className="toggle-wrap nk-block-tools-toggle">
                                <a
                                    href={"#more"}
                                    className="btn btn-icon btn-trigger toggle-expand me-n1"
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        setSmOption(!smOption);
                                    }}
                                >
                                    <Icon name="more-v"></Icon>
                                </a>
                                <div className="toggle-expand-content" style={{ display: smOption ? "block" : "none" }}>
                                    <ul className="nk-block-tools g-3">
                                        <li>
                                            <div className="form-control-wrap">
                                                <div className="form-icon form-icon-right">
                                                    <Icon name="search"></Icon>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="default-04"
                                                    placeholder="Pencarian"
                                                    onChange={(e) => onFilterChange(e)}
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    color="transparent"
                                                    className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                                                >
                                                    Status
                                                </DropdownToggle>
                                                <DropdownMenu end>
                                                    <ul className="link-list-opt no-bdr">
                                                        <li>
                                                            <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                                                <span>UNPAID</span>
                                                            </DropdownItem>
                                                        </li>
                                                        <li>
                                                            <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                                                <span>PAID</span>
                                                            </DropdownItem>
                                                        </li>
                                                        <li>
                                                            <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                                                <span>TAKE</span>
                                                            </DropdownItem>
                                                        </li>
                                                    </ul>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </li>
                                        <li className="nk-block-tools-opt">
                                            <Button
                                                className="toggle btn-icon d-md-none"
                                                color="primary"
                                                onClick={() => {
                                                    toggle("add");
                                                }}
                                            >
                                                <Icon name="plus"></Icon>
                                            </Button>
                                            <Button
                                                className="toggle d-none d-md-inline-flex"
                                                color="primary"
                                                onClick={() => {
                                                    toggle("add");
                                                }}
                                            >
                                                <Icon name="plus"></Icon>
                                                <span>Tambah</span>
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Block>
                    <div className="nk-tb-list is-separate is-medium mb-3">
                        <DataTableHead className="nk-tb-item">
                            <DataTableRow className="nk-tb-col-check">
                                <div className="custom-control custom-control-sm custom-checkbox notext">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="pid-all"
                                        onChange={(e) => selectorCheck(e)}
                                    />
                                    <label className="custom-control-label" htmlFor="pid-all"></label>
                                </div>
                            </DataTableRow>
                            <DataTableRow>
                                <span className="sub-text">Nomor</span>
                            </DataTableRow>
                            <DataTableRow size="md">
                                <span className="sub-text">Tanggal</span>
                            </DataTableRow>
                            <DataTableRow>
                                <span className="sub-text">Status</span>
                            </DataTableRow>
                            <DataTableRow size="sm">
                                <span className="sub-text">Pelanggan</span>
                            </DataTableRow>
                            <DataTableRow size="md">
                                <span className="sub-text">Pembayaran</span>
                            </DataTableRow>
                            <DataTableRow>
                                <span className="sub-text">Total</span>
                            </DataTableRow>
                            <DataTableRow className="nk-tb-col-tools">
                                <ul className="nk-tb-actions gx-1 my-n1">
                                    <li>
                                        <UncontrolledDropdown>
                                            <DropdownToggle tag="a" className="btn btn-trigger dropdown-toggle btn-icon me-n1">
                                                <Icon name="more-h"></Icon>
                                            </DropdownToggle>
                                            <DropdownMenu end>
                                                <ul className="link-list-opt no-bdr">
                                                    <li>
                                                        <DropdownItem
                                                            tag="a"
                                                            href="#markasdone"
                                                            onClick={(ev) => {
                                                                ev.preventDefault();
                                                                selectorMarkAsDelivered();
                                                            }}
                                                        >
                                                            <Icon name="money"></Icon>
                                                            <span>Tandai Lunas</span>
                                                        </DropdownItem>
                                                    </li>
                                                    <li>
                                                        <DropdownItem
                                                            tag="a"
                                                            href="#remove"
                                                            onClick={(ev) => {
                                                                ev.preventDefault();
                                                                selectorDeleteOrder();
                                                            }}
                                                        >
                                                            <Icon name="cart"></Icon>
                                                            <span>Tandai Diambil</span>
                                                        </DropdownItem>
                                                    </li>
                                                    <li>
                                                        <DropdownItem
                                                            tag="a"
                                                            href="#remove"
                                                            onClick={(ev) => {
                                                                ev.preventDefault();
                                                                selectorDeleteOrder();
                                                            }}
                                                        >
                                                            <Icon name="trash"></Icon>
                                                            <span>Hapus</span>
                                                        </DropdownItem>
                                                    </li>
                                                </ul>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </li>
                                </ul>
                            </DataTableRow>
                        </DataTableHead>
                        {currentItems.length > 0
                            ? currentItems.map((item) => (
                                <DataTableItem key={item.id}>
                                    <DataTableRow className="nk-tb-col-check">
                                        <div className="custom-control custom-control-sm custom-checkbox notext">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                defaultChecked={item.check}
                                                id={item.id + "oId-all"}
                                                key={Math.random()}
                                                onChange={(e) => onSelectChange(e, item.id)}
                                            />
                                            <label className="custom-control-label" htmlFor={item.id + "oId-all"}></label>
                                        </div>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <a href={"#id"} onClick={(ev) => ev.preventDefault()}>
                                            #{item.code}
                                        </a>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                                        <span>{item.created_at}</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span className={`dot bg-${item.status === "2" ? "success" : "warning"} d-sm-none`}/>
                                        <Badge
                                            className="badge-sm badge-dot has-bg d-none d-sm-inline-flex"
                                            color={
                                                item.status === "2" ? "success" : "warning"
                                            }
                                        >
                                            {item.status === "2" ? 'Lunas' : 'Menunggu Pembayaran'}
                                        </Badge>
                                    </DataTableRow>
                                    <DataTableRow size="sm">
                                        <span className="tb-sub">{item.name}</span>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                                        <span className="tb-sub text-primary">{item.payment === '2' ? 'VA' : 'CASH'}</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span className="tb-lead">Rp. {item.price}</span>
                                    </DataTableRow>
                                    <DataTableRow className="nk-tb-col-tools">
                                        <ul className="nk-tb-actions gx-1">
                                            {item.status !== "Delivered" && (
                                                <li className="nk-tb-action-hidden" onClick={() => markAsDelivered(item.id)}>
                                                    <TooltipComponent
                                                        tag="a"
                                                        containerClassName="btn btn-trigger btn-icon"
                                                        id={"delivery" + item.id}
                                                        icon="truck"
                                                        direction="top"
                                                        text="Mark as Delivered"
                                                    />
                                                </li>
                                            )}
                                            <li
                                                className="nk-tb-action-hidden"
                                                onClick={() => {
                                                    loadDetail(item.id);
                                                    toggle("details");
                                                }}
                                            >
                                                <TooltipComponent
                                                    tag="a"
                                                    containerClassName="btn btn-trigger btn-icon"
                                                    id={"view" + item.id}
                                                    icon="eye"
                                                    direction="top"
                                                    text="View Details"
                                                />
                                            </li>
                                            <li>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                                                        <Icon name="more-h"></Icon>
                                                    </DropdownToggle>
                                                    <DropdownMenu end>
                                                        <ul className="link-list-opt no-bdr">
                                                            <li>
                                                                <DropdownItem
                                                                    tag="a"
                                                                    href="#dropdown"
                                                                    onClick={(ev) => {
                                                                        ev.preventDefault();
                                                                        loadDetail(item.id);
                                                                        toggle("details");
                                                                    }}
                                                                >
                                                                    <Icon name="eye"></Icon>
                                                                    <span>Order Details</span>
                                                                </DropdownItem>
                                                            </li>
                                                            {item.status !== "Delivered" && (
                                                                <li>
                                                                    <DropdownItem
                                                                        tag="a"
                                                                        href="#dropdown"
                                                                        onClick={(ev) => {
                                                                            ev.preventDefault();
                                                                            markAsDelivered(item.id);
                                                                        }}
                                                                    >
                                                                        <Icon name="truck"></Icon>
                                                                        <span>Mark as Delivered</span>
                                                                    </DropdownItem>
                                                                </li>
                                                            )}
                                                            <li>
                                                                <DropdownItem
                                                                    tag="a"
                                                                    href="#dropdown"
                                                                    onClick={(ev) => {
                                                                        ev.preventDefault();
                                                                        deleteOrder(item.id);
                                                                    }}
                                                                >
                                                                    <Icon name="trash"></Icon>
                                                                    <span>Remove Order</span>
                                                                </DropdownItem>
                                                            </li>
                                                        </ul>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </li>
                                        </ul>
                                    </DataTableRow>
                                </DataTableItem>
                            ))
                            : null}
                    </div>
                </Block>
                <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
                    <ModalBody>
                        <a href={"#cancel"} className="close">
                            {" "}
                            <Icon
                                name="cross-sm"
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    onFormCancel();
                                }}
                            ></Icon>
                        </a>
                        <div className="p-2">
                            <h5 className="title">Tambah Pesanan</h5>
                            <div className="mt-4">
                                <form onSubmit={handleSubmit(onFormSubmit)}>
                                    <Row className="g-3">
                                        <Col md="12">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="name">
                                                    Nama Pemesan
                                                </label>
                                                <div className="form-control-wrap">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        {...register('name', {
                                                            required: "Kolom tidak boleh kosong",
                                                        })}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        value={formData.name} />
                                                    {errors.name && <span className="invalid">{errors.name.message}</span>}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="phone">
                                                    Nomor WA
                                                </label>
                                                <div className="form-control-wrap">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        {...register('phone', { required: "This is required" })}
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                                    {errors.phone && <span className="invalid">{errors.phone.message}</span>}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="address">
                                                    Alamat
                                                </label>
                                                <div className="form-control-wrap">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        {...register('address', { required: "This is required" })}
                                                        value={formData.address}
                                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                                    {errors.address && <span className="invalid">{errors.address.message}</span>}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="type">
                                                    Jenis
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="type"
                                                        options={[
                                                            { value: "Anak", label: "Anak" },
                                                            { value: "Dewasa", label: "Dewasa" },
                                                        ]}
                                                        onChange={(e) => setFormData({ ...formData, type: e.value })}
                                                        value={{value: formData.type, label: formData.type}}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="size">
                                                    Ukuran
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="size"
                                                        options={[
                                                            { value: "XS", label: "XS" },
                                                            { value: "S", label: "S" },
                                                            { value: "M", label: "M" },
                                                            { value: "L", label: "L" },
                                                            { value: "XL", label: "XL" },
                                                            { value: "XXL", label: "XXL" },
                                                            { value: "3XL", label: "3XL" },
                                                        ]}
                                                        onChange={(e) => setFormData({ ...formData, size: e.value })}
                                                        value={{value: formData.size, label: formData.size}}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="arm">
                                                    Lengan
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="arm"
                                                        options={[
                                                            { value: "Pendek", label: "Pendek" },
                                                            { value: "Panjang", label: "Panjang" },
                                                        ]}
                                                        onChange={(e) => setFormData({ ...formData, arm: e.value })}
                                                        value={{value: formData.arm, label: formData.arm}}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="payment">
                                                    Metode Pembayaran
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="payment"
                                                        options={[
                                                            { value: "1", label: "Cash" },
                                                            { value: "2", label: "Virtual Account" },
                                                        ]}
                                                        onChange={(e) => setFormData({ ...formData, payment: e.value })}
                                                        value={{value: formData.payment, label: formData.payment}}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="price">
                                                    Total Pembayaran
                                                </label>
                                                <div className="form-control-wrap">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        {...register('price', { required: "This is required" })}
                                                        value={formData.price}
                                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                                                    {errors.price && <span className="invalid">{errors.price.message}</span>}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col size="12">
                                            <Button color="primary" type="submit">
                                                <Icon className="plus"></Icon>
                                                <span>Add Order</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>

                <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
                    <ModalBody>
                        <a href={"#cancel"} className="close">
                            {" "}
                            <Icon
                                name="cross-sm"
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    onFormCancel();
                                }}
                            ></Icon>
                        </a>
                        <div className="nk-tnx-details mt-sm-3">
                            <div className="nk-modal-head mb-3">
                                <h5 className="title">Order Details</h5>
                            </div>
                            <Row className="gy-3">
                                <Col lg={6}>
                                    <span className="sub-text">Order Id</span>
                                    <span className="caption-text">{formData.orderId}</span>
                                </Col>
                                <Col lg={6}>
                                    <span className="sub-text">Status</span>
                                    <span
                                        className={`dot bg-${formData.status === "Delivered" ? "success" : "warning"} d-sm-none`}
                                    ></span>
                                    <Badge
                                        className="badge-sm badge-dot has-bg d-none d-sm-inline-flex"
                                        color={
                                            formData.status === "Delivered" ? "success" : "warning"
                                        }
                                    >
                                        {formData.status}
                                    </Badge>
                                </Col>
                                <Col lg={6}>
                                    <span className="sub-text">Customer</span>
                                    <span className="caption-text">{formData.customer}</span>
                                </Col>
                                <Col lg={6}>
                                    <span className="sub-text">Purchased Product</span>
                                    <span className="caption-text">{formData.purchased}</span>
                                </Col>
                                <Col lg={6}>
                                    <span className="sub-text">Total Price</span>
                                    <span className="caption-text">{formData.total}</span>
                                </Col>
                            </Row>
                        </div>
                    </ModalBody>
                </Modal>
            </Content>
        </React.Fragment>
    )
}

export default Order;