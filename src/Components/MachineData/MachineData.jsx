import { DateRangePicker } from 'rsuite';
import { useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import './MachineData.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { finddate } from '../../Service/FindByDateApi'
import moment from 'moment'
import Header from '../Common/Header/Header';
import GuageChart1 from '../Common/Charts/GaugeChart1/GuageChart1'
import Clock from 'react-live-clock';
import { GetMeterData } from '../../Service/MeterApi';
import Footer from '../Common/Footer/Footer';
import Header2 from '../Common/Header/Header2';
import AreaChart1 from '../Common/Charts/AreaChart1/AreaChart1';
import AreaChart2 from '../Common/Charts/AreaChart1/AreaChart2';




const MachineData = () => {

    let newDate = new Date();
    let onlyDate = moment(newDate).format('DD-MM-YYYY');
    let onlyTime = moment(newDate).format('HH:mm');
    // let meterDummyData = {
    //     value:{
    //         "MQTT_ID":"m1",
    //         "Device_ID": "CELL9000001234",
    //         "pm" : "7",
    //         "co2":"6",
    //         "co":"44",
    //         "sox": "31",
    //         "nox": "0.16"
    //     },
    //     date : onlyDate,
    //     time : onlyTime,
    //     datetime : newDate,
    // }
    // function getRndInteger(min, max) {
    //     return Math.floor(Math.random() * (max - min + 1) ) + min;
    //   }
    // setInterval(() => {
    //     let ranval = getRndInteger(10,15)
    //      return console.log("This is a random values", ranval);
    // }, 300000);

    // const [meterData,setmeterData] = useState([meterDummyData])
    const [value, setValue] = useState([]);



    let new1 = moment(value[0])?.format("DD-MM-YYYY")
    let new2 = moment(value[1])?.format("DD-MM-YYYY")

    let sdate = moment(value[0])?.format("YYYY-MM-DD")
    let edate = moment(value[1])?.format("YYYY-MM-DD")

    let sendDate = {
        startDate: new1,
        endDate: new2
    }
    let dateback = {
        startDate: sdate,
        endDate: edate
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    let MQTT_ID = new URLSearchParams(location.search).get("MQTT_ID")
    // let roomName = location?.state?.roomName
    const [meterDashData, setMeterDashData] = useState([])

    // this api is goes to get api of meters data
    const gettingMeterData = async () => {
        let res = await GetMeterData(MQTT_ID)
        if (res.error != null) {
            alert(res.error)
        } else {
            setMeterDashData(res.data)

        }
    }


    useEffect(() => {
        if (MQTT_ID) {
            // setInterval(() => {
            gettingMeterData()
            // }, 5000);
        }
    }, [MQTT_ID])

    const settingDate = (event) => {
        if (event == null) {
            setValue([])
        } else {
            setValue(event)
        }
    }

    // the function is use to find the date between start date and last date
    const findByDate = () => {
        finddate(dispatch, dateback, MQTT_ID)

        navigate('/dashboard/report', { state: { date: sendDate } })
    }

    return (
        <>
            <div className="meterdatamain">

                <Header timedate={<Clock format={'HH:mm:ss| DD-MM-YYYY'} ticking={true} timezone={'asia/Karachi'} />} />
                <Header2 Device_ID={meterDashData[meterDashData.length - 1]?.value?.Device_ID} updatetime={meterDashData[meterDashData.length - 1]?.time + '\t | \t' + meterDashData[meterDashData.length - 1]?.date} />
                <div className="machinedatamain">
                    <div className="machinetabledata">
                    </div>
                </div>
                <div className="gatherdateID">


                    <div className="datepiker">
                        <DateRangePicker showOneCalendar className='rangepiker' onChange={(event) => settingDate(event)} value={value} placeholder="Start Date ~ End Date"
                            renderValue={(value) => {
                                return moment(value[0])?.format("DD-MM-YYYY") + ' ~ ' + moment(value[1])?.format("DD-MM-YYYY");
                            }} />
                        <button className='btnreport' onClick={findByDate}> Report</button>
                    </div>
                </div>
                <div className="allcharts">


                    <div className="getherCharts">

                        <div className="guageChartcontainer">
                                <div className="chartarea1">
                                    <div className="gaugechartarea1">
                                        <div className="gaugechartarea ">
                                            <GuageChart1 val={(meterDashData[meterDashData.length - 1]?.value?.co / 100) * 100} name={'CO: ' + meterDashData[meterDashData.length - 1]?.value?.co + " "} numColor='rgb(0,0,255)' textColor='gray' heightgraph={180} valpercent={'%'} gradientColor={'rgba(237, 18, 1, 1)'} textFontSize='11px' valueFontSize='18px' valfix={0} />
                                        </div>
                                        <div className="gaugechartarea ">
                                            <GuageChart1 val={(meterDashData[meterDashData.length - 1]?.value?.sox / 100) * 100} name={"SOX: " + meterDashData[meterDashData.length - 1]?.value?.sox + " ppm"} numColor='rgb(0,0,255)' textColor='gray' heightgraph={180} valpercent={'ppm'} gradientColor={'rgba(255,69,0,0.4)'} textFontSize='11px' valueFontSize='18px' valfix={0} />
                                        </div>
                                    </div>
                                    <div className="linechart1">
                                        <AreaChart1 labels={meterDashData.slice(-24)?.map((time) => time?.time)} temp={meterDashData.slice(-24)?.map((time) => time?.value?.co)} humid={meterDashData.slice(-24)?.map((time) => time?.value?.sox)} labelname1='SOX' labelname2='CO' maxValueArea={60} />
                                    </div>
                                </div>
                            <div className="chartarea2">
                                <div className="gaugechartarea2">
                                    <div className="gaugechartarea">
                                        <GuageChart1 val={(meterDashData[meterDashData.length - 1]?.value?.nox / 100) * 100} name={'NOX: ' + meterDashData[meterDashData.length - 1]?.value?.nox + " ppm"} numColor='rgb(0,0,255)' textColor='gray' heightgraph={180} valpercent={'ppm'} gradientColor={'rgba(2, 18, 153, 1)'} textFontSize='11px' valueFontSize='14px' valfix={2} />
                                    </div>
                                    <div className="gaugechartarea">
                                        <GuageChart1 val={(meterDashData[meterDashData.length - 1]?.value?.co2 / 100) * 100} name={'CO2: ' + meterDashData[meterDashData.length - 1]?.value?.co2 + " %"} numColor='rgb(0,0,255)' textColor='gray' heightgraph={180} valpercent={' %'} gradientColor={'rgba(2, 18, 153, 1)'} textFontSize='11px' valueFontSize='16px' valfix={0} />
                                    </div>
                                </div>
                                <div className="linechart2">
                                    <AreaChart1 labels={meterDashData.slice(-24)?.map((time) => time?.time)} temp={meterDashData.slice(-24)?.map((time) => time?.value?.co2)} humid={meterDashData.slice(-24)?.map((time) => time?.value?.nox)} labelname1='CO2' labelname2='NOX' maxValueArea={10} />
                                </div>
                            </div>
                            <div className="chartarea3">
                                <div className="gaugechartarea hourschart">
                                    <GuageChart1 val={(meterDashData[meterDashData.length - 1]?.value?.pm / 100) * 100} name={'PM: ' + meterDashData[meterDashData.length - 1]?.value?.pm + " ppm"} numColor='rgb(0,0,255)' textColor='gray' heightgraph={180} valpercent={'ppm'} gradientColor={'rgba(2, 18, 153, 1)'} textFontSize='11px' valueFontSize='16px' />
                                </div>
                                <div className="linechart3">
                                    <AreaChart2 labels={meterDashData.slice(-24)?.map((time) => time?.time)} temp={meterDashData.slice(-24)?.map((time) => time?.value?.pm)} labelname1='Particular Matter' maxValueArea={10} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
export default MachineData
