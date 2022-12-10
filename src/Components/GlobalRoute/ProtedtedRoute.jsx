import React , {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtedtedRoute(props) {
    const {Component} = props;
    const navigate = useNavigate();
    useEffect (()=>{
        let login = localStorage.getItem('login')? JSON.parse(localStorage.getItem("login")) : null
        if(!login){
            navigate('/login')
        }
    })
  return (
    <>
    <Component/>
    </>
  )
}
