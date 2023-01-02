import React, { useState} from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { login } from '../../../Service/AuthApi'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../../Common/Header/Header';

const defaultvalue = {
  username: '',
  password: ''
}

export default function Login() {

  const [userlogin, setuserlogin] = useState(defaultvalue)

  const navigate = useNavigate();

  const onvaluechange = (e) => {
    setuserlogin({ ...userlogin, [e.target.name]: e.target.value })
  }

  const loginClick =async () => {
    let response =await login(userlogin)
    if (response.data[0]?.admin) {
      toast.success("Admin Login Success", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setTimeout(() => {
        navigate('/dashboard_admin/Dep?MQTT_ID=m1')
      }, 1000);
    }
    else if(response.data[0]?.admin===false){
      toast.success("User Login Success", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setTimeout(() => {
        navigate(`/dashboard/Dep?MQTT_ID=m1`)
      }, 1000);
    }
    else {
      toast.error("Invalid Cridentials", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    localStorage.setItem('login', JSON.stringify(response.data));
  }

  return (
    <>
      <div className="loginmainContainer">
        {/* <img className="loginuserimage" src={luckyimg} alt="Uploading" /> */}
        <Header />
        <div className="logincontainer">
          <div className="loginform">
            <div className="headinglogin">Login</div>
            <input className='logininput' onChange={(e) => onvaluechange(e)} type="text" name='username' id='username' placeholder='Username' />
            <input className='logininput' onChange={(e) => onvaluechange(e)} type="password" name='password' id='password' placeholder='Password' />
            <button className='btnlogin' type='submit' onClick={loginClick}> Login </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  )
}
