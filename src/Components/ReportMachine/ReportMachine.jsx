import React from 'react'
import './ReportMachine.css'
import Header from '../Common/Header/Header'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from "jspdf";
import { useNavigate, useLocation } from 'react-router-dom';

const ReportMachine = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const date = location.state.date
  const roomName = location.state.roomName
  let array = location?.state?.filterDate
  let arr = array[0]?.meterReadings
  let arr1 = [].concat(arr).reverse()

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


  return (
    <>
      <div className="reportmain">
        <div className="report" id='reportid'>
          <Header/>
          <div className="date">{date.startDate} ~ {date.endDate}</div>
          <table className='tablemain' id='tablee'>
            <thead className='tablehead'>
              <tr className='tablerow'>
                <th className='tableh'>Time | Date</th>
                <th className='tableh'>PM</th>
                <th className='tableh'>CO2</th>
                <th className='tableh'>CO</th>
                <th className='tableh'>NOX</th>
                <th className='tableh'>SOX</th>
              </tr>
            </thead>
            <tbody className='tablebody'>
              {
                arr1.map((ddd, i) => {
                  return (
                    <tr className='tablerow' key={i}>
                      <td className='tabled'>{ddd?.time} | {ddd?.date}</td>
                      <td className='tabled'>{ddd?.pm} </td>
                      <td className='tabled'>{ddd?.co2} </td>
                      <td className='tabled'>{ddd?.co} </td>
                      <td className='tabled'>{ddd?.nox} </td>
                      <td className='tabled'>{ddd?.sox} </td>
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
    </>


  )
}

export default ReportMachine
