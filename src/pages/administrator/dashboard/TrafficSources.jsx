import React, {useEffect, useState} from "react";
import { Card, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import { Icon } from "../../../components";
import { TrafficSourcesChart } from "../../../components/partials/charts/e-commerce/EcomCharts";

const TrafficSources = ({orders}) => {
    const [data, setData] = useState([]);
    const [trafficSources, setTrafficSources] = useState( {
        labels: ["XS Pendek", "XS Panjang", "S Pendek", "S Panjang", 'M Pendek', 'M Panjang', 'L Pendek', 'L Panjang',
            'XL Pendek', 'XL Panjang', '2XL Pendek', '2XL Panjang', '3XL Pendek', '3XL Panjang', '4XL Pendek', '4XL Panjang'
        ],
        dataUnit: "Item",
        legend: false,
        datasets: [
            {
                borderColor: "#fff",
                backgroundColor: ["#b695ff", "#b8acff", "#ffa9ce", "#f9db7b"],
                data: [4305, 859, 482, 138],
            },
        ],
    });
    useEffect(() => {
        const xsshort = orders.filter((order) => {
            return order.arm === "Pendek" && order.size === 'XS'
        }).length;
        const xslong = orders.filter((order) => {
            return order.arm === "Panjang" && order.size === 'XS'
        }).length;
        const sshort = orders.filter((order) => {
            return order.arm === "Pendek" && order.size === 'S'
        }).length;
        const slong = orders.filter((order) => {
            return order.arm === "Panjang" && order.size === 'S'
        }).length;
        const mshort = orders.filter((order) => {
            return order.arm === "Pendek" && order.size === 'M'
        }).length;
        const mlong = orders.filter((order) => {
            return order.arm === "Panjang" && order.size === 'M'
        }).length;
        const lshort = orders.filter((order) => {
            return order.arm === "Pendek" && order.size === 'L'
        }).length;
        const llong = orders.filter((order) => {
            return order.arm === "Panjang" && order.size === 'L'
        }).length;
        const xlshort = orders.filter((order) => {
            return order.arm === "Pendek" && order.size === 'XL'
        }).length;
        const xllong = orders.filter((order) => {
            return order.arm === "Panjang" && order.size === 'XL'
        }).length;
        const xxlshort = orders.filter((order) => {
            return order.arm === "Pendek" && order.size === '2XL'
        }).length;
        const xxllong = orders.filter((order) => {
            return order.arm === "Panjang" && order.size === '2XL'
        }).length;
        const xxxlshort = orders.filter((order) => {
            return order.arm === "Pendek" && order.size === '3XL'
        }).length;
        const xxxllong = orders.filter((order) => {
            return order.arm === "Panjang" && order.size === '3XL'
        }).length;
        const xxxxlshort = orders.filter((order) => {
            return order.arm === "Pendek" && order.size === '4XL'
        }).length;
        const xxxxllong = orders.filter((order) => {
            return order.arm === "Panjang" && order.size === '4XL'
        }).length;
        setData([xsshort, xslong, sshort, slong, mshort, mlong, lshort, llong, xlshort, xllong, xxlshort, xxllong, xxxlshort, xxxllong, xxxxlshort, xxxxllong])
        setTrafficSources({...trafficSources, datasets: [
            {
                borderColor: "#fff",
                backgroundColor: ["#3396D3", "#A8BBA3", "#9A3F3F", "#9112BC", "#E62727", "#5D688A", "#DDF4E7",
                    "#F6F1E9", "#37353E", "#896C6C", "#FF0066", "#3338A0", "#0D1164", "#BBDCE5", "#0F0E0E", "#E4004B"
                ],
                data: [xsshort, xslong, sshort, slong, mshort, mlong, lshort, llong, xlshort, xllong, xxlshort, xxllong, xxxlshort, xxxllong, xxxxlshort, xxxxllong],
            }
        ]})
    }, [orders]);
    return (
        <Card className="card-full overflow-hidden">
            <div className="nk-ecwg nk-ecwg4 h-100">
                <div className="card-inner flex-grow-1">
                    <div className="card-title-group mb-4">
                        <div className="card-title">
                            <h6 className="title">Rekap Jenis</h6>
                        </div>
                        <div className="card-tools">
                            <UncontrolledDropdown>
                                <DropdownToggle
                                    tag="a"
                                    href="#toggle"
                                    onClick={(ev) => ev.preventDefault()}
                                    className="dropdown-toggle btn btn-icon btn-trigger"
                                >
                                    <Icon name="more-h" />
                                </DropdownToggle>
                            </UncontrolledDropdown>
                        </div>
                    </div>
                    <div className="data-group">
                        <div className="nk-ecwg4-ck">
                            <TrafficSourcesChart data={trafficSources} />
                        </div>
                        <ul className="nk-ecwg4-legends">
                            <table className="table table-bordered">
                                <tbody>
                                <tr>
                                    <td rowSpan={2} className="align-middle">XS</td>
                                    <td>
                                        <div className="title">
                                            <span className="dot dot-lg sq" style={{ background: "#fa4949" }}></span>
                                            <span>Pendek</span>
                                        </div>
                                    </td>
                                    <td><div className="amount amount-xs">{data[0]}</div></td>
                                    <td rowSpan={2} className="align-middle">XL</td>
                                    <td>
                                        <div className="title">
                                            <span className="dot dot-lg sq" style={{ background: "#9cabff" }}></span>
                                            <span>Pendek</span>
                                        </div>
                                    </td>
                                    <td><div className="amount amount-xs">{data[8]}</div></td>
                                </tr>
                                <tr>
                                    <td style={{paddingLeft: 16}}>
                                        <div className="title">
                                            <span className="dot dot-lg sq" style={{ background: "#c50101" }}></span>
                                            <span>Panjang</span>
                                        </div>
                                    </td>
                                    <td><div className="amount amount-xs">{data[1]}</div></td>
                                    <td className="text-start">
                                        <div className="title">
                                            <span className="dot dot-lg sq" style={{ background: "#ffa9ce" }}></span>
                                            <span>Panjang</span>
                                        </div>
                                    </td>
                                    <td><div className="amount amount-xs">{data[9]}</div></td>
                                </tr>
                                <tr>
                                    <td rowSpan={2} className="align-middle">S</td>
                                    <td>
                                        <div className="title">
                                            <span className="dot dot-lg sq" style={{ background: "#9cabff" }}></span>
                                            <span>Pendek</span>
                                        </div>
                                    </td>
                                    <td><div className="amount amount-xs">{data[2]}</div></td>
                                    <td rowSpan={2} className="align-middle">2XL</td>
                                    <td>
                                        <div className="title">
                                            <span className="dot dot-lg sq" style={{ background: "#9cabff" }}></span>
                                            <span>Pendek</span>
                                        </div>
                                    </td>
                                    <td><div className="amount amount-xs">{data[10]}</div></td>
                                </tr>
                                <tr>
                                    <td style={{paddingLeft: 16}}>
                                        <div className="title">
                                            <span className="dot dot-lg sq" style={{ background: "#ffa9ce" }}></span>
                                            <span>Panjang</span>
                                        </div>
                                    </td>
                                    <td><div className="amount amount-xs">{data[3]}</div></td>
                                    <td className="text-start">
                                        <div className="title">
                                            <span className="dot dot-lg sq" style={{ background: "#ffa9ce" }}></span>
                                            <span>Panjang</span>
                                        </div>
                                    </td>
                                    <td><div className="amount amount-xs">{data[11]}</div></td>
                                </tr>
                                <tr>
                                    <td rowSpan={2} className="align-middle">M</td>
                                    <td>
                                        <div className="title">
                                            <span className="dot dot-lg sq" style={{ background: "#9cabff" }}></span>
                                            <span>Pendek</span>
                                        </div>
                                    </td>
                                    <td><div className="amount amount-xs">{data[4]}</div></td>
                                    <td rowSpan={2} className="align-middle">3XL</td>
                                    <td>
                                        <div className="title">
                                            <span className="dot dot-lg sq" style={{ background: "#9cabff" }}></span>
                                            <span>Pendek</span>
                                        </div>
                                    </td>
                                    <td><div className="amount amount-xs">{data[12]}</div></td>
                                </tr>
                                <tr>
                                    <td style={{paddingLeft: 16}}>
                                        <div className="title">
                                            <span className="dot dot-lg sq" style={{ background: "#ffa9ce" }}></span>
                                            <span>Panjang</span>
                                        </div>
                                    </td>
                                    <td><div className="amount amount-xs">{data[5]}</div></td>
                                    <td className="text-start">
                                        <div className="title">
                                            <span className="dot dot-lg sq" style={{ background: "#ffa9ce" }}></span>
                                            <span>Panjang</span>
                                        </div>
                                    </td>
                                    <td><div className="amount amount-xs">{data[13]}</div></td>
                                </tr>
                                <tr>
                                    <td rowSpan={2} className="align-middle">L</td>
                                    <td>
                                        <div className="title">
                                            <span className="dot dot-lg sq" style={{ background: "#9cabff" }}></span>
                                            <span>Pendek</span>
                                        </div>
                                    </td>
                                    <td><div className="amount amount-xs">{data[6]}</div></td>
                                    <td rowSpan={2} className="align-middle">4XL</td>
                                    <td>
                                        <div className="title">
                                            <span className="dot dot-lg sq" style={{ background: "#9cabff" }}></span>
                                            <span>Pendek</span>
                                        </div>
                                    </td>
                                    <td><div className="amount amount-xs">{data[14]}</div></td>
                                </tr>
                                <tr>
                                    <td style={{paddingLeft: 16}}>
                                        <div className="title">
                                            <span className="dot dot-lg sq" style={{ background: "#ffa9ce" }}></span>
                                            <span>Panjang</span>
                                        </div>
                                    </td>
                                    <td><div className="amount amount-xs">{data[7]}</div></td>
                                    <td className="text-start">
                                        <div className="title">
                                            <span className="dot dot-lg sq" style={{ background: "#ffa9ce" }}></span>
                                            <span>Panjang</span>
                                        </div>
                                    </td>
                                    <td><div className="amount amount-xs">{data[15]}</div></td>
                                </tr>
                                </tbody>
                            </table>
                        </ul>
                    </div>
                </div>
                <div className="card-inner card-inner-md bg-light">
                    <div className="card-note">
                        <Icon className="info-fill"></Icon>
                        <span>Traffic channels have beed generating the most traffics over past days.</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default TrafficSources;
