import React, {useState} from "react";

const DataLine = (name, data) => {
    const [label, setLabel] = useState([]);
    return {
        labels: label,
        dataUnit: "Pesanan",
        lineTension: 0.3,
        datasets: [
            {
                label: "Pesanan",
                borderColor: "#7de1f8",
                backgroundColor: "rgba(125, 225, 248, 0.25)",
                borderWidth: 2,
                fill: true,
                pointBorderColor: "transparent",
                pointBackgroundColor: "transparent",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#7de1f8",
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 4,
                data: data,
            },
        ],
    }
}

export default DataLine;