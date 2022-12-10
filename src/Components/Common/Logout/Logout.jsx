import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Logout.css'

export default function Logout() {
    const navigate = useNavigate()

    const logout = () =>{
        localStorage.clear()
        navigate('/login')
    }
  return (
    <>
    <button className='logoutbtn' type='submit' onClick={logout}>Logout</button>
    </>
  )
}
