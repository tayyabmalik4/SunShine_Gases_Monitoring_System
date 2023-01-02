import { DateRangePicker } from 'rsuite';
import { useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import '../../MachineData/MachineData.css';
import './MachineDataAdmin.css';
import { useNavigate, useLocation } from 'react-router-dom'
// import { finddate } from '../../Service/FindByDateApi'
import moment from 'moment'
import Header from '../../Common/Header/Header';
import GuageChart1 from '../../Common/Charts/GaugeChart1/GuageChart1'
import Clock from 'react-live-clock';
import { GetMeterData } from '../../../Service/MeterApi';
import Footer from '../../Common/Footer/Footer';
import Header2 from '../../Common/Header/Header2';
import AreaChart1 from '../../Common/Charts/AreaChart1/AreaChart1';
import AreaChart2 from '../../Common/Charts/AreaChart1/AreaChart2';
import { DummyValApi } from '../../../Service/DummyValApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const MachineData = () => {

    const [value, setValue] = useState([]);
    const [dummyVal, setDummyVal] = useState([]);



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
    const navigate = useNavigate()
    const location = useLocation()

    let MQTT_ID = new URLSearchParams(location.search).get("MQTT_ID")
    // let roomName = location?.state?.roomName
    const [meterDashData, setMeterDashData] = useState([])
    let getarray = meterDashData?.map((array) => { return array?.meterReadings })

    // this api is goes to get api of meters data
    const gettingMeterData = async () => {
        let res = await GetMeterData(MQTT_ID)
        if (res.error != null) {
            toast.error(res.error)
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
        let startDate = dateback?.startDate
        let endDate = dateback?.endDate
        let sDate = new Date(startDate).getTime()
        let eDate = new Date(endDate).getTime()
        let epStartDate = new Date(sDate - 18000000).getTime()
        let epEndDate = new Date(eDate + 68000000).getTime()
        let filterDate = meterDashData?.map((meter) => {
            return {
                ...meter,
                meterReadings: meter?.meterReadings.filter((val) => {
                    let currenDate = new Date(val?.datetime).getTime()
                    if (currenDate >= epStartDate && currenDate <= epEndDate) {
                        return true
                    } else {
                        return false
                    }
                })
            }
        })

        navigate('/dashboard/report', { state: { date: sendDate, filterDate: filterDate } })
    }
    let inter = null;
    function startvalByClick(){
            inter = setInterval(() => {
                console.log("Interval Started")
                DummyValApi(dummyVal)
            }, 60000);
        }
    function stopvalByClick(){
            clearInterval(inter)
            console.log("Stop the interval process")
        }

    return (
        <>
            <div className="meterdatamain">
                <Header timedate={<Clock format={'HH:mm:ss| DD-MM-YYYY'} ticking={true} timezone={'asia/Karachi'} />} />
                <div className="header2main">
                <Header2 Device_ID={meterDashData[0]?.Device_ID} updatetime={getarray[0]?.[getarray[0]?.length - 1]?.time + '\t | \t' + getarray[0]?.[getarray[0]?.length - 1]?.date} />
                <div className="btnstartstop">
                    <button onClick={()=>startvalByClick()} className='btnstart btncommon'>Start</button>
                    <button onClick={()=>stopvalByClick()} className="btnstop btncommon">Stop</button>
                </div>
                </div>
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
                                        <GuageChart1 val={(getarray[0]?.[getarray[0]?.length - 1]?.co / 100) * 100} name={'CO: ' + getarray[0]?.[getarray[0]?.length - 1]?.co + " "} numColor='rgb(0,0,255)' textColor='gray' heightgraph={180} valpercent={'%'} gradientColor={'rgba(237, 18, 1, 1)'} textFontSize='11px' valueFontSize='18px' valfix={0} />
                                    </div>
                                    <div className="gaugechartarea ">
                                        <GuageChart1 val={(getarray[0]?.[getarray[0]?.length - 1]?.sox / 100) * 100} name={"SOX: " + getarray[0]?.[getarray[0]?.length - 1]?.sox + " ppm"} numColor='rgb(0,0,255)' textColor='gray' heightgraph={180} valpercent={'ppm'} gradientColor={'rgba(255,69,0,0.4)'} textFontSize='11px' valueFontSize='18px' valfix={0} />
                                    </div>
                                </div>
                                <div className="linechart1">
                                    <AreaChart1 labels={getarray[0]?.slice(-24)?.map((time) => time?.time)} temp={getarray[0]?.slice(-24)?.map((time) => time?.co)} humid={getarray[0]?.slice(-24)?.map((time) => time?.sox)} labelname1='SOX' labelname2='CO' maxValueArea={60} />
                                </div>
                            </div>
                            <div className="chartarea2">
                                <div className="gaugechartarea2">
                                    <div className="gaugechartarea">
                                        <GuageChart1 val={(getarray[0]?.[getarray[0]?.length - 1]?.nox / 100) * 100} name={'NOX: ' + getarray[0]?.[getarray[0]?.length - 1]?.nox + " ppm"} numColor='rgb(0,0,255)' textColor='gray' heightgraph={180} valpercent={'ppm'} gradientColor={'rgba(2, 18, 153, 1)'} textFontSize='11px' valueFontSize='14px' valfix={2} />
                                    </div>
                                    <div className="gaugechartarea">
                                        <GuageChart1 val={(getarray[0]?.[getarray[0]?.length - 1]?.co2 / 100) * 100} name={'CO2: ' + getarray[0]?.[getarray[0]?.length - 1]?.co2 + " %"} numColor='rgb(0,0,255)' textColor='gray' heightgraph={180} valpercent={' %'} gradientColor={'rgba(2, 18, 153, 1)'} textFontSize='11px' valueFontSize='16px' valfix={0} />
                                    </div>
                                </div>
                                <div className="linechart2">
                                    <AreaChart1 labels={getarray[0]?.slice(-24)?.map((time) => time?.time)} temp={getarray[0]?.slice(-24)?.map((time) => time?.co2)} humid={getarray[0]?.slice(-24)?.map((time) => time?.nox)} labelname1='CO2' labelname2='NOX' maxValueArea={10} />
                                </div>
                            </div>
                            <div className="chartarea3">
                                <div className="gaugechartarea hourschart">
                                    <GuageChart1 val={(getarray[0]?.[getarray[0]?.length - 1]?.pm / 100) * 100} name={'PM: ' + getarray[0]?.[getarray[0]?.length - 1]?.pm + " ppm"} numColor='rgb(0,0,255)' textColor='gray' heightgraph={180} valpercent={'ppm'} gradientColor={'rgba(2, 18, 153, 1)'} textFontSize='11px' valueFontSize='16px' />
                                </div>
                                <div className="linechart3">
                                    <AreaChart2 labels={getarray[0]?.slice(-24)?.map((time) => time?.time)} temp={getarray[0]?.slice(-24)?.map((time) => time?.pm)} labelname1='Particular Matter' maxValueArea={10} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            {/* <Footer /> */}
        </>
    )
}
export default MachineData
