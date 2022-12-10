import React from 'react'
import './Header.css'
import sunshine from '../../../Asserts/Logo/sunshine.png'
// import { useLocation } from 'react-router-dom'

export default function Header(props) {
    // const location = useLocation()
    // let roomName = location?.state?.roomName
    // console.log("123",roomName)
    return (
        <>
            <div className="machineHeader">
                <img className='machineimagelogo' src={sunshine} alt="Uploading" />
                {/* <div className="roomName">{roomName}</div> */}
                <div className="machineheading">{props.head}</div>
                <div className="datetimeupdated">{props.timedate}</div>
                {/* <div className="machineheading">TEMPERATURE AND HUMIDITY MONITORING WITH REPORTING</div> */}
            </div>
        </>
    )
}
