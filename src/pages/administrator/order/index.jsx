import React, {useEffect, useState} from "react";
import Head from "../../../layout/head";
import Content from "../../../layout/content";
import {
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    DataTableHead,
    DataTableItem,
    DataTableRow,
    Icon,
    PaginationComponent,
    PreviewAltCard,
    TooltipComponent
} from "../../../components";
import {Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {destroy as destroyOrder, update as updateOrder, get as getOrder} from "../../../utils/api/order"
import {Add, Detail} from "./partial"
import moment from "moment";
import {formatterIDR} from "../../../utils";

const Order = () => {
    const [dataRefresh, setDataRefresh] = useState(true);
    const [data, setData] = useState([]);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({});
    const [onSearchText, setSearchText] = useState("");
    const [smOption, setSmOption] = useState(false);
    const [status, setStatus] = useState('');
    const [modal, setModal] = useState({ add: false, detail: false});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const selectorMarkAsPaid = () => {
        let index = data.filter((item) => item.check === true);
        index.map(async (item) => {
            await updateOrder({id: item.id, status: '2'}).then(() => setDataRefresh(true))
        })
    };
    const selectorMarkAsTake = () => {
        let index = data.filter((item) => item.check === true);
        index.map(async (item) => {
            await updateOrder({id: item.id, status: '3'}).then(() => setDataRefresh(true))
        })
    };
    const onFilterChange = (status) => {
        if (status === "") {
            setData([...orders])
        } else {
            let newData = orders.filter((item) => {
                return item.status === status
            })
            setData([...newData]);
        }
    };

    const onSelectChange = (e, id) => {
        let newData = data;
        let index = newData.findIndex((item) => item.id === id);
        newData[index].check = e.currentTarget.checked;
        setData([...newData]);
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
        let index = data.filter((item) => item.check === true);
        index.map(async (item) => {
            await destroyOrder(item.id).then(() => setDataRefresh(true))
        })
    };

    useEffect(() => {
        dataRefresh && getOrder().then((resp) => {
            setData(resp);
            setOrders(resp);
            setDataRefresh(false);
        }).catch(() => setDataRefresh(false));
    }, [dataRefresh]);

    useEffect(() => {
        if (onSearchText !== "") {
            const filteredObject = data.filter((item) => {
                return item.code.includes(onSearchText);
            });
            setData([...filteredObject]);
        } else {
            setData([...orders]);
        }
    }, [onSearchText]);

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
                                                    onChange={(e) => setSearchText(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    color="transparent"
                                                    className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                                                >
                                                    {status === '' ? 'Status' : status}
                                                </DropdownToggle>
                                                <DropdownMenu end>
                                                    <ul className="link-list-opt no-bdr">
                                                        <li>
                                                            <DropdownItem tag="a" href="#all" onClick={(e) => {
                                                                onFilterChange('')
                                                                setStatus('ALL')
                                                            }}>
                                                                <span>ALL</span>
                                                            </DropdownItem>
                                                        </li>
                                                        <li>
                                                            <DropdownItem tag="a" href="#paid" onClick={(e) => {
                                                                onFilterChange('1')
                                                                setStatus('PAID')
                                                            }}>
                                                                <span>UNPAID</span>
                                                            </DropdownItem>
                                                        </li>
                                                        <li>
                                                            <DropdownItem tag="a" href="#unpaid" onClick={(e) => {
                                                                onFilterChange('2')
                                                                setStatus('UNPAID')
                                                            }}>
                                                                <span>PAID</span>
                                                            </DropdownItem>
                                                        </li>
                                                        <li>
                                                            <DropdownItem tag="a" href="#take" onClick={(e) => {
                                                                onFilterChange('3')
                                                                setStatus('TAKE')
                                                            }}>
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
                                                    setModal({
                                                        add: true,
                                                        detail: false
                                                    })
                                                }}
                                            >
                                                <Icon name="plus"></Icon>
                                            </Button>
                                            <Button
                                                className="toggle d-none d-md-inline-flex"
                                                color="primary"
                                                onClick={() => {
                                                    setModal({
                                                        add: true,
                                                        detail: false
                                                    })
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
                            <DataTableRow>
                                <span className="sub-text">Total</span>
                            </DataTableRow>
                            <DataTableRow size="md">
                                <span className="sub-text">Pembayaran</span>
                            </DataTableRow>
                            <DataTableRow>
                                <span className="sub-text">Kode Bayar</span>
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
                                                                selectorMarkAsPaid();
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
                                                                selectorMarkAsTake();
                                                            }}
                                                        >
                                                            <Icon name="check"></Icon>
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
                                        <span>{moment(item.created_at).format('D/MM/Y')}</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span className={`dot bg-${item.status === "2" ? "success" : item.status === "1" ? "warning" : "info"} d-sm-none`}/>
                                        <Badge
                                            className="badge-sm badge-dot has-bg d-none d-sm-inline-flex"
                                            color={
                                                item.status === "2" ? "success" : item.status === "1" ? "warning" : "info"
                                            }
                                        >
                                            {item.status === "2" ? 'PAID' : item.status === "1" ? 'UNPAID' : "TAKE"}
                                        </Badge>
                                    </DataTableRow>
                                    <DataTableRow size="sm">
                                        <span className="tb-sub">{item.name}</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span className="tb-lead">{formatterIDR.format(item.price)}</span>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                                        <span className="tb-sub text-primary">{item.payment === '2' ? 'BRIVA' : 'Tunai'}</span>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                                        <span className="tb-sub text-primary">{item.payCode}</span>
                                    </DataTableRow>
                                    <DataTableRow className="nk-tb-col-tools">
                                        <ul className="nk-tb-actions gx-1">
                                            {item.status === "2" && (
                                                <li className="nk-tb-action-hidden" onClick={() => {
                                                    updateOrder({id: item.id, status: "3" }).then(() => {
                                                        setDataRefresh(true);
                                                    });
                                                }}>
                                                    <TooltipComponent
                                                        tag="a"
                                                        containerClassName="btn btn-trigger btn-icon"
                                                        id={"delivery" + item.id}
                                                        icon="check"
                                                        direction="top"
                                                        text="Tandai Diambil"
                                                    />
                                                </li>
                                            )}
                                            <li
                                                className="nk-tb-action-hidden"
                                                onClick={() => {
                                                    setOrder(item);
                                                    setModal({
                                                        add: false,
                                                        detail: true
                                                    })
                                                }}
                                            >
                                                <TooltipComponent
                                                    tag="a"
                                                    containerClassName="btn btn-trigger btn-icon"
                                                    id={"view" + item.id}
                                                    icon="eye"
                                                    direction="top"
                                                    text="Detail Pesanan"
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
                                                                        setOrder(item);
                                                                        setModal({
                                                                            add: false,
                                                                            detail: true
                                                                        })
                                                                    }}
                                                                >
                                                                    <Icon name="eye"></Icon>
                                                                    <span>Detail Pesanan</span>
                                                                </DropdownItem>
                                                            </li>
                                                            {item.status === "1" && (
                                                                <li>
                                                                    <DropdownItem
                                                                        tag="a"
                                                                        href="#dropdown"
                                                                        onClick={(ev) => {
                                                                            ev.preventDefault();
                                                                            updateOrder({id: item.id, status: "2" }).then(() => {
                                                                                setDataRefresh(true);
                                                                            });
                                                                        }}
                                                                    >
                                                                        <Icon name="money"></Icon>
                                                                        <span>Tandai Lunas</span>
                                                                    </DropdownItem>
                                                                </li>
                                                            )}
                                                            {item.status === "2" && (
                                                                <li>
                                                                    <DropdownItem
                                                                        tag="a"
                                                                        href="#dropdown"
                                                                        onClick={(ev) => {
                                                                            ev.preventDefault();
                                                                            updateOrder({id: item.id, status: "3" }).then(() => {
                                                                                setDataRefresh(true);
                                                                            });
                                                                        }}
                                                                    >
                                                                        <Icon name="check"></Icon>
                                                                        <span>Tandai Diambil</span>
                                                                    </DropdownItem>
                                                                </li>
                                                            )}
                                                            <li>
                                                                <DropdownItem
                                                                    tag="a"
                                                                    href="#dropdown"
                                                                    onClick={(ev) => {
                                                                        ev.preventDefault();
                                                                        destroyOrder(item.id).then(() => {
                                                                            setDataRefresh(true);
                                                                        })
                                                                    }}
                                                                >
                                                                    <Icon name="trash"></Icon>
                                                                    <span>Hapus Pesanan</span>
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
                    <PreviewAltCard>
                        {data.length > 0 ? (
                            <PaginationComponent
                                itemPerPage={itemPerPage}
                                totalItems={data.length}
                                paginate={paginate}
                                currentPage={currentPage}
                            />
                        ) : (
                            <div className="text-center">
                                <span className="text-silent">No orders found</span>
                            </div>
                        )}
                    </PreviewAltCard>
                </Block>
                <Add modal={modal} setModal={setModal} setDataRefresh={setDataRefresh}/>
                <Detail modal={modal} setModal={setModal} order={order} setOrder={setOrder}/>
            </Content>
        </React.Fragment>
    )
}

export default Order;