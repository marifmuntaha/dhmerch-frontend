import React, {useEffect, useState} from "react";
import { Card } from "reactstrap";
import { Icon } from "../../../components";
import { TotalOrderChart } from "../../../components/partials/charts/e-commerce/EcomCharts";
import moment from "moment";
import {calcPercentage, numberFormat} from "../../../utils";

const Unpaid = ({orders}) => {
    const [orderTotal, setOrderTotal] = useState(0);
    const [orderLastWeek, setOrderLastWeek] = useState(0)
    const [orderLast2Week, setOrderLast2Week] = useState(0)
    const [percentGrow, setPercentGrow] = useState(0)
    const [orderData, setOrderData] = useState({
        labels: [
            "01 Jan",
            "02 Jan",
            "03 Jan",
            "04 Jan",
            "05 Jan",
            "06 Jan",
            "07 Jan",
            "08 Jan",
            "09 Jan",
            "10 Jan",

        ],
        dataUnit: "Pesanan",
        lineTension: 0.3,
        datasets: [
            {
                label: "Pesanan",
                borderColor: "#7de1f8",
                backgroundColor: "rgba(125, 225, 248, 0.25)",
                borderWidth: 2,
                fill:true,
                pointBorderColor: "transparent",
                pointBackgroundColor: "transparent",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#7de1f8",
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 4,
                data: [],
            },
        ],
    })

    const handleDays = () => {
        let days = [];
        let daysRequired = 30

        for (let i = 1; i <= daysRequired; i++) {
            if(i===1) {
                days.push( moment().format('D MMM') )
            } else {
                days.push( moment().add(-i, 'days').format('D MMM') )
            }
        }
        return days.reverse();
    }

    useEffect(() => {
        const currentTime = moment().format('YYYY-MM-DD');
        const lastWeek = moment().add(-7, 'days').format("YYYY-MM-DD");
        const last2Week = moment().add(-14, 'days').format("YYYY-MM-DD");
        const ordersUnpaid = orders.filter((order) => {
            return order.status === "1"
        })
        setOrderTotal(ordersUnpaid?.reduce((sum, item) => Number(sum) + Number(item.price), 0));
        const lastData = ordersUnpaid?.filter((item) => {
            return lastWeek <= moment(item.created_at).format('YYYY-MM-DD') && moment(item.created_at).format('YYYY-MM-DD') <= currentTime;
        })
        const last2Data = ordersUnpaid?.filter((item) => {
            return last2Week <= moment(item.created_at).format('YYYY-MM-DD') && moment(item.created_at).format('YYYY-MM-DD') <= lastWeek;
        })
        const lastWeekTotal = lastData.reduce((sum, item) => Number(sum) + Number(item.price), 0);
        const last2WeekTotal = last2Data.reduce((sum, item) => Number(sum) + Number(item.price), 0);
        const days = handleDays()
        const data = days.map((item) => {
            const order = ordersUnpaid?.filter((order) => {
                return moment(order.created_at).format('YYYY-MM-DD') === moment(item, 'DD MMM').format('YYYY-MM-DD');
            })
            return order?.reduce((sum, item) => Number(sum) + Number(item.price), 0);
        })
        setOrderData({
            ...orderData, labels: handleDays(), datasets: [
                {
                    label: "Pesanan",
                    borderColor: "#f40707",
                    backgroundColor: "rgba(243,24,24,0.25)",
                    borderWidth: 2,
                    fill: true,
                    pointBorderColor: "transparent",
                    pointBackgroundColor: "transparent",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "#f40707",
                    pointBorderWidth: 2,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 2,
                    pointRadius: 4,
                    pointHitRadius: 4,
                    data: data,
                },
            ]
        })
        setOrderLastWeek(lastWeekTotal);
        setOrderLast2Week(last2WeekTotal);
        setPercentGrow(calcPercentage(lastWeekTotal + last2WeekTotal, lastWeekTotal));
    }, [orders])
    return (
        <Card>
            <div className="nk-ecwg nk-ecwg3">
                <div className="card-inner pb-0">
                    <div className="card-title-group">
                        <div className="card-title">
                            <h6 className="title">Pesanan Belum Lunas</h6>
                        </div>
                    </div>
                    <div className="data">
                        <div className="data-group">
                            <div className="amount">{numberFormat(orderTotal)}</div>
                            <div className="info text-end">
                                <span className={`text-info`}>
                                    {orders.filter((order) => {
                                        return order.status === "1"
                                    }).length}
                                </span>
                                <br />
                                <span>Pesanan</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nk-ecwg3-ck">
                    <TotalOrderChart data={orderData}/>
                </div>
            </div>
        </Card>
    );
};
export default Unpaid;
