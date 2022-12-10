import React from 'react'
import './DonutChart1.css'
import Chart from "react-apexcharts";

export default function DonutChart1(props) {
  var st = {
    options: {},
      series: [4, 2],
      labels: ['eng', 'urdu'],
      dataLabels: {
        enabled: false,
        formatter: function (val) {
          return val + "%"
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show :true,
                fontSize : '16px',

              },
              value: {
                show: true,
          fontSize: '16px',

              },
              total: {
                show: false,
                showAlways: false,
                label: 'Total',
                fontSize: '22px',
              },
            }
          }
        }
      },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]}
  return (
    <>
    <div className="donutchartmain">
      <Chart options = {st?.options} series={st?.series} type="donut" width="250"  />
    </div>
    </>
  )
}
