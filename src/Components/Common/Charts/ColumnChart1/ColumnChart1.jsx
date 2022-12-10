import React from 'react'
import './ColumnChart1.css'
import Chart from "react-apexcharts";

export default function ColumnChart1(props) {
    var ColumnChart={
        options:{
        series: [{
            name: 'Flue/Month',
            data: [3010,2820,3600,2525,3000,3600]
          }],
            chart: {
            height: 350,
            type: 'bar',
            toolbar:{
              show : false,
            }
          },
          plotOptions: {
            bar: {
              borderRadius: 0,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          dataLabels: {
            enabled: false,
            formatter: function (val) {
              return val + "Ltr";
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ["#304758"]
            }
          },
          
          xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            position: 'bottom',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              fill: {
                type: 'gradient',
                gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                }
              }
            },
            tooltip: {
              enabled: false,
            }
          },
          yaxis: {
            min : 0,
            max :4000,
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: true,
              formatter: function (val) {
                return val + "";
              }
            }
          
          },
          title: {
            text: 'Monthly Inflation in Argentina, 2002',
            floating: false,
            offsetY: 330,
            align: 'center',
            style: {
              color: '#444'
            }
          }
    }
}
  return (
    <>
    {/* <div className="ColumnChart"> */}
    <Chart options={ColumnChart.options} series={ColumnChart.options.series} type='bar' height={230} width={300}/>
    {/* <Chart options={ColumnChart.options} series={ColumnChart.series} type="bar" height={props.heightgraphColumn} width={props.widthgraphColumn}/> */}
    {/* </div> */}
    </>
  )
}
