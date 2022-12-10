import React from 'react'
import './Header2.css'

import gen from '../../../Asserts/Generature/gen.jpg'
import sunshine2 from '../../../Asserts/Generature/sunshine2.png'

export default function Header2(props) {
    return (
        <>
            <div className="header2main">
                {/* <div className="gencalculatiom">
                    <div className="gentotal"><img className='sunshine2' src={sunshine2} alt="" /></div>
                </div> */}
                <div className="header2DeviceId">{props.Device_ID}</div> 
                <div className="header2updatetime"><span className='updateat'>Update :</span>  {props.updatetime}</div>
                    <img className="genimg" src={gen} alt="Uploaded" />

            </div>
        </>
    )
}
