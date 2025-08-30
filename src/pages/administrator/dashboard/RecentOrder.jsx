import React, {useEffect, useState} from "react";
import {Card, Badge} from "reactstrap";
import {DataTableHead, DataTableRow, DataTableItem, UserAvatar} from "../../../components";
import {numberFormat} from "../../../utils";

const RecentOrders = ({orders}) => {
    const [lastOrders, setLastOrders] = useState([]);
    useEffect(() => {
        const shortOrders = orders?.toSorted((a, b) => b.id - a.id);
        setLastOrders(shortOrders.slice(0, 5));
    }, [orders]);
    return (
        <Card className="card-full">
            <div className="card-inner">
                <div className="card-title-group">
                    <div className="card-title">
                        <h6 className="title">Pesanan Terakhir</h6>
                    </div>
                </div>
            </div>
            <div className="nk-tb-list mt-n2">
                <DataTableHead>
                    <DataTableRow>
                        <span>No. Pesanan</span>
                    </DataTableRow>
                    <DataTableRow size="sm">
                        <span>Nama</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                        <span>Diskripsi</span>
                    </DataTableRow>
                    <DataTableRow>
                        <span>Harga</span>
                    </DataTableRow>
                    <DataTableRow>
                        <span className="d-none d-sm-inline">Status</span>
                    </DataTableRow>
                </DataTableHead>
                {lastOrders.map((item, idx) => (
                    <DataTableItem key={idx}>
                        <DataTableRow>
                            <span className="tb-lead">
                                <a href={"#order"} onClick={(ev) => ev.preventDefault()}>
                                    {item.code}
                                </a>
                            </span>
                        </DataTableRow>
                        <DataTableRow size="sm">
                            <div className="user-card">
                                <div className="user-name">
                                    <span className="tb-lead">{item.name}</span>
                                </div>
                            </div>
                        </DataTableRow>
                        <DataTableRow size="md">
                            <span className="tb-sub">{item.size}/{item.arm}</span>
                        </DataTableRow>
                        <DataTableRow>
                            <span className="tb-sub tb-amount">
                                {numberFormat(item.price)} <span>IDR</span>
                            </span>
                        </DataTableRow>
                        <DataTableRow>
                            <Badge
                                className="badge-dot badge-dot-xs"
                                color={
                                    item.status === "2" ? "success" : item.status === "3" ? "info" : "danger"
                                }
                            >
                                {item.status === "2" ? "Lunas" : item.status === "3" ? "Diambil" : "Belum Bayar"}
                            </Badge>
                        </DataTableRow>
                    </DataTableItem>
                ))}
            </div>
        </Card>
    );
};
export default RecentOrders;
