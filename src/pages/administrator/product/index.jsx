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
import ProductH from "../../../images/product/h.png"
import {Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {destroy as destroyProduct, get as getProduct} from "../../../utils/api/product"
import {Detail, FormSubmit} from "./partial"
import {numberFormat} from "../../../utils";

const Product = () => {
    const [dataRefresh, setDataRefresh] = useState(true);
    const [data, setData] = useState([]);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(false);
    const [onSearchText, setSearchText] = useState("");
    const [smOption, setSmOption] = useState(false);
    const [modal, setModal] = useState({ submit: false, detail: false});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
    const selectorDeleteProduct = () => {
        let index = data.filter((item) => item.check === true);
        index.map(async (item) => {
            await destroyProduct(item.id).then(() => setDataRefresh(true))
        })
    };

    useEffect(() => {
        dataRefresh && getProduct().then((resp) => {
            setData(resp);
            setProducts(resp);
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
            setData([...products]);
        }
    }, [onSearchText]);

    return (
        <React.Fragment>
            <Head title="Produk" />
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle>Produk</BlockTitle>
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
                                        <li className="nk-block-tools-opt">
                                            <Button
                                                className="toggle btn-icon d-md-none"
                                                color="primary"
                                                onClick={() => {
                                                    setModal({
                                                        submit: true,
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
                                                        submit: true,
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
                            <DataTableRow size="md">
                                <span className="sub-text">Nama</span>
                            </DataTableRow>
                            <DataTableRow size="md">
                                <span className="sub-text">Diskripsi</span>
                            </DataTableRow>
                            <DataTableRow>
                                <span className="sub-text">SKU</span>
                            </DataTableRow>
                            <DataTableRow>
                                <span className="sub-text">Status</span>
                            </DataTableRow>
                            <DataTableRow size="sm">
                                <span className="sub-text">Harga</span>
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
                                                            href="#remove"
                                                            onClick={(ev) => {
                                                                ev.preventDefault();
                                                                selectorDeleteProduct();
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
                                    <DataTableRow size="sm">
                                        <span className="tb-product">
                                            <img src={item.image ? item.image : ProductH} alt="product" className="thumb" />
                                            <span className="title">{item.name}</span>
                                        </span>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                                        <span>{item.description}</span>
                                    </DataTableRow>
                                    <DataTableRow size="sm">
                                        <span className="tb-sub">{item.sku}</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span className={`dot bg-${item.status === "2" ? "danger" : "success"} d-sm-none`}/>
                                        <Badge
                                            className="badge-sm badge-dot has-bg d-none d-sm-inline-flex"
                                            color={
                                                item.status === "2" ? "danger" : "success"}
                                        >
                                            {item.status === "2" ? 'Out Stock' : "In Stock"}
                                        </Badge>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                                        <span className="tb-lead">{numberFormat(item.price)}</span>
                                    </DataTableRow>
                                    <DataTableRow className="nk-tb-col-tools">
                                        <ul className="nk-tb-actions gx-1">
                                            <li
                                                className="nk-tb-action-hidden"
                                                onClick={() => {
                                                    setProduct(item);
                                                    setModal({
                                                        submit: false,
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
                                                    text="Detail Produk"
                                                />
                                            </li>
                                            <li className="nk-tb-action-hidden" onClick={() => {
                                                setProduct(item);
                                                setModal({
                                                    submit: true,
                                                    detail: false
                                                })
                                            }}>
                                                <TooltipComponent
                                                    tag="a"
                                                    containerClassName="btn btn-trigger btn-icon"
                                                    id={"delivery" + item.id}
                                                    icon="edit"
                                                    direction="top"
                                                    text="Ubah Produk"
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
                                                                        setProduct(item);
                                                                        setModal({
                                                                            submit: false,
                                                                            detail: true
                                                                        })
                                                                    }}
                                                                >
                                                                    <Icon name="eye"></Icon>
                                                                    <span>Detail Produk</span>
                                                                </DropdownItem>
                                                            </li>
                                                            <li>
                                                                <DropdownItem
                                                                    tag="a"
                                                                    href="#dropdown"
                                                                    onClick={(ev) => {
                                                                        ev.preventDefault();
                                                                        setProduct(item);
                                                                        setModal({
                                                                            submit: true,
                                                                            detail: false
                                                                        })
                                                                    }}
                                                                >
                                                                    <Icon name="edit"></Icon>

                                                                    <span>Ubah Produk</span>
                                                                </DropdownItem>
                                                            </li>
                                                            <li>
                                                                <DropdownItem
                                                                    tag="a"
                                                                    href="#dropdown"
                                                                    onClick={(ev) => {
                                                                        ev.preventDefault();
                                                                        destroyProduct(item.id).then(() => {
                                                                            setDataRefresh(true);
                                                                        })
                                                                    }}
                                                                >
                                                                    <Icon name="trash"></Icon>
                                                                    <span>Hapus Produk</span>
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
                                <span className="text-silent">Produk tidak ditemukan</span>
                            </div>
                        )}
                    </PreviewAltCard>
                </Block>
                <FormSubmit modal={modal} setModal={setModal} product={product} setProduct={setProduct} setDataRefresh={setDataRefresh} />
                <Detail modal={modal} setModal={setModal} product={product} />
            </Content>
        </React.Fragment>
    )
}

export default Product;