import { Line } from "react-chartjs-2";

import { Chart, CategoryScale, LinearScale, BarElement, PointElement, Tooltip, Legend, LineController, LineElement, Filler} from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement, PointElement, Tooltip, Legend, LineController, LineElement, Filler);

export const TotalOrderChart = ({data}) => {
    return (
        <Line
            className="ecommerce-line-chart-s1"
            data={data}
            options={{
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: true,
                        displayColors: false,
                        backgroundColor: "#1c2b46",
                        titleFont: {
                            size: 10,
                        },
                        titleColor: "#fff",
                        titleMarginBottom: 4,
                        bodyColor: "#fff",
                        bodyFont: {
                            size: 10,
                        },
                        bodySpacing: 4,
                        padding: 6,
                        footerMarginTop: 0,
                        callbacks: {
                            label: function (context) {
                                return context.parsed.y;
                            },
                        },
                    },
                },
                maintainAspectRatio: false,
                scales: {
                    y:{
                        display: false,
                        ticks: {
                            beginAtZero: false,
                            color:"#9eaecf",
                            font: {
                                size: 12,
                            },
                            padding: 0,
                        },
                        grid: {
                            display: false,
                            color: "transparent",
                            tickMarkLength: 0,
                            zeroLineColor: "rgba(82, 100, 132, 0.2)",
                        },
                    },
                    x:{
                        display: false,
                        ticks: {
                            color:"#9eaecf",
                            font: {
                                size: 12,
                            },
                            source: "auto",
                            padding: 0,
                        },
                        grid: {
                            display: false,
                            color: "transparent",
                            tickMarkLength: 0,
                            zeroLineColor: "rgba(82, 100, 132, 0.2)",
                            offsetGridLines: true,
                        },
                    },
                },
            }}
        />
    );
};