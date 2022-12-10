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
import LiquaidChart1 from '../Common/Charts/LiquidChartReact/LiquaidChart1';




const MachineData = () => {

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
        // finddate(dispatch, dateback, _groupName)
        // finddate(dispatch, sendDate, MQTT_ID)
        finddate(dispatch, dateback, MQTT_ID)

        navigate('/dashboard/report', { state: {date: sendDate } })
    }


    // value define of temperature 
    let valuetemp = meterDashData[meterDashData.length - 1]?.value?.temp
    // console.log("-----", valuetemp);

    var totalPower = parseInt(meterDashData[meterDashData.length - 1]?.value?.Total_Power);
    var totalFuel = parseInt(meterDashData[meterDashData.length - 1]?.value?.Total_Fuel);
    var totalHourse = parseInt(meterDashData[meterDashData.length - 1]?.value?.Total_Hourse);

    return (
        <>
            <div className="meterdatamain">

                <Header head={"MRS9000 GENERATOR SET HEALTH MONITORING WITH REPORTING"} timedate={<Clock format={'HH:mm:ss| DD-MM-YYYY'} ticking={true} timezone={'asia/Karachi'} />} />
                <Header2 Device_ID={meterDashData[meterDashData.length - 1]?.value?.Device_ID} updatetime={meterDashData[meterDashData.length - 1]?.time + '\t | \t' + meterDashData[meterDashData.length - 1]?.date} />
                <div className="machinedatamain">
                    <div className="machinetabledata">
                    </div>
                </div>
                <div className="gatherdateID">


                    <div className="datepiker">
                        <DateRangePicker className='rangepiker' onChange={(event) => settingDate(event)} value={value} placeholder="Start Date ~ End Date"
                            renderValue={(value) => {
                                return moment(value[0])?.format("DD-MM-YYYY") + ' ~ ' + moment(value[1])?.format("DD-MM-YYYY");
                            }} />
                        <button className='btnreport' onClick={findByDate}> Report</button>
                        <div className="fuelchart">
                            <LiquaidChart1 valuech={meterDashData[meterDashData.length - 1]?.value?.Available_Fuel} />
                        </div>
                    </div>
                </div>
                <div className="getherCharts">

                    <div className="guageChartcontainer">
                        <div className="gaugechartpowerfuel">

                            <div className="gaugechartarea">
                                <GuageChart1 val={(meterDashData[meterDashData.length - 1]?.value?.Power / 630) * 100} name={'Power: ' + meterDashData[meterDashData.length - 1]?.value?.Power + " Kw"} numColor='rgb(0,0,255)' textColor='gray' heightgraph={180} valpercent={'%'} gradientColor={'rgba(237, 18, 1, 1)'} textFontSize='11px' valueFontSize='18px' />
                                <div className="totalgaugepowerarea">
                                    <div className="totalgaugepara">Total Kw</div>
                                    <div className="totalgaugep">{totalPower.toLocaleString()}</div>
                                </div>
                            </div>
                            <div className="gaugechartarea ">
                                <GuageChart1 val={(meterDashData[meterDashData.length - 1]?.value?.Fuel_Level / 157) * 100} name={"Fuel: " + meterDashData[meterDashData.length - 1]?.value?.Fuel_Level + " Ltr"} numColor='rgb(0,0,255)' textColor='gray' heightgraph={180} valpercent={'%'} gradientColor={'rgba(255,69,0,0.4)'} textFontSize='11px' valueFontSize='18px' />
                                <div className="totalgaugepowerarea">
                                    <div className="totalgaugepara">Total Ltr</div>
                                    <div className="totalgaugep">{totalFuel.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                        <div className="gaugechartarea hourschart">
                            <GuageChart1 val={(190 / 720) * 100} name={'Run Hour: ' + 190} numColor='rgb(0,0,255)' textColor='gray' heightgraph={180} valpercent={'%'} gradientColor={'rgba(2, 18, 153, 1)'} textFontSize='11px' valueFontSize='16px' />
                            <div className="totalgaugepowerarea">
                                <div className="totalgaugepara">Total Hours</div>
                                <div className="totalgaugep">{totalHourse.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="temppowergraph">
                    <div className="linechartcontainer">
                        <div className="linechart1">
                        <AreaChart1 labels={meterDashData.slice(-24)?.map((time) => time?.time)} temp={meterDashData.slice(-24)?.map((time) => time?.value?.Power)} humid={meterDashData.slice(-24)?.map((time) => time?.value?.Fuel_Level)} labelname1='Kw' labelname2='Fuel' maxValueArea = {600}/>
                        </div>
                        <div className="linechart2">
                        <AreaChart1 labels={meterDashData.slice(-24)?.map((time) => time?.time)} temp={meterDashData.slice(-24)?.map((time) => time?.value?.Temperature)} humid={meterDashData.slice(-24)?.map((time) => time?.value?.Oil_Pressure)} labelname1='Temperature' labelname2='Pressure' maxValueArea={120}/>
                        </div>
                        <div className="linechart3">
                        <AreaChart2 labels={meterDashData.slice(-24)?.map((time) => time?.time)} temp={meterDashData.slice(-24)?.map((time) => time?.value?.Available_Fuel)} labelname1='Fuel Tank' maxValueArea={540}/>
                        </div>
                    </div>
                    <div className="temppower">
                        <GuageChart1 val={meterDashData[meterDashData.length - 1]?.value?.Temperature} valgraph={valuetemp} name='Temperature' numColor='rgb(0,0,255)' textColor='gray' heightgraph={180} valpercent={'°C'} gradientColor={'rgb(211, 84, 0 )'} textFontSize='11px' valueFontSize='14px' />
                        <GuageChart1 val={meterDashData[meterDashData.length - 1]?.value?.Oil_Pressure} valgraph={meterDashData[meterDashData.length - 1]?.value?.humidity} name='Pressure' numColor='rgb(0,0,255)' textColor='gray' heightgraph={180} valpercent={'Psi'} gradientColor={'rgba(2, 1, 255, 1)'} textFontSize='11px' valueFontSize='14px' />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
export default MachineData
