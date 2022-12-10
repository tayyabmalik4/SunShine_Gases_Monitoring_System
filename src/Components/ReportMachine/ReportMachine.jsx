import React from 'react'
import './ReportMachine.css'
import { useSelector } from 'react-redux'
import Header from '../Common/Header/Header'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from "jspdf";
import { useNavigate, useLocation } from 'react-router-dom';

const ReportMachine = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const date = location.state.date
  const roomName = location.state.roomName

  const reportformat = "PDH\t" + roomName +"\t" + date.startDate + "\t\t" + date.endDate
  // console.log("The Format of the report is:------",reportformat)
  // console.log("start date is-----",date.startDate,"end date is :-----", date.endDate)
  const pdfbtn = () => {
    var doc = new jsPDF('l', 'pt');
    var content = document.getElementById("reportid");
    doc.html(content, {
      callback: function (doc) {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(12)
        for(var i=1; i<=pageCount; i++){
          doc.setPage(i);
          // doc.rect(20, 20, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, 'S');
          doc.text('Page'+ String(i) + ' of ' + String(pageCount) , 842-30,595-30,null,null,"right")
        }
        doc.save(reportformat);
      }
    })

  }
  const close = () => {
    navigate(-1)
  }

  const dataa = useSelector((state) => state.dashboard?.dateData)

  return (
    <>
      <div className="reportmain">
        <div className="report" id='reportid'>
          {/* <div className="reportmaintable"> */}
          <Header head={"MRS9000 GENERATOR SET HEALTH MONITORING WITH REPORTING"}/>
          <div className="date">{date.startDate} ~ {date.endDate}</div>
          <table className='tablemain' id='tablee'>
            <thead className='tablehead'>
              <tr className='tablerow'>
                <th className='tableh'>Time | Date</th>
                {/* <th className='tableh'>Time</th> */}
                <th className='tableh'>Power</th>
                <th className='tableh'>Total_Power</th>
                <th className='tableh'>Temperature</th>
                <th className='tableh'>Pressure</th>
                <th className='tableh'>Fuel_Level</th>
                <th className='tableh'>Total_Fuel</th>
                <th className='tableh'>Available_Fuel</th>
                <th className='tableh'>Water_Level</th>
                <th className='tableh'>Led_Status</th>
                <th className='tableh'>Sensor_Status</th>
                <th className='tableh'>Total_Hourse</th>
                

                {/* <th className='tableh'>{dataa[dataa.length-1]?.value?.meter_id}</th> */}
              </tr>
            </thead>
            <tbody className='tablebody'>
              {
                dataa.map((ddd, i) => {
                  return (
                    <tr className='tablerow' key={i}>
                      <td className='tabled'>{ddd?.time} | {ddd?.date}</td>
                      {/* <td className='tabled'></td> */}
                      <td className='tabled'>{ddd?.value?.Power} Kw </td>
                      <td className='tabled'>{ddd?.value?.Total_Power} Kw </td>
                      <td className='tabled'>{ddd?.value?.Temperature}°C </td>
                      <td className='tabled'>{ddd?.value?.Oil_Pressure} Psi </td>
                      <td className='tabled'>{ddd?.value?.Fuel_Level} Ltr </td>
                      <td className='tabled'>{ddd?.value?.Total_Fuel} Ltr </td>
                      <td className='tabled'>{ddd?.value?.Available_Fuel} Ltr </td>
                      <td className='tabled'>{ddd?.value?.Water_Level} </td>
                      <td className='tabled'>{ddd?.value?.Led_Status} </td>
                      <td className='tabled'>{ddd?.value?.Sensor_Status} </td>
                      <td className='tabled'>{ddd?.value?.Total_Hourse} </td>
                      {/* <td className='tabled'> </td> */}
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <div className="btnss">
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="excelbtn"
            table="tablee"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Excel" />
          <button className='pdfbtn' onClick={pdfbtn}>Pdf</button>
          <button className='pdfbtn' onClick={close}>Close</button>
        </div>
      </div>
      {/* </div> */}
    </>


  )
}

export default ReportMachine
