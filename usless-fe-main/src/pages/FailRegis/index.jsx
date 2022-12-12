import React from 'react'
import cuteAnimal from "../../svg/failregis/可爱小动物 1.svg"
import {useNavigate} from "react-router-dom"
import "./index.css"
export default function FailRegis() {
    const navigate=useNavigate()
  return (
    <div className="cs-FailRegis">
        <img src={cuteAnimal} alt="可爱动物"></img>
        <p>登录已断开，急需抢救</p>
        <button onClick={navigate("./login")}>点击返回</button>
    </div>
  )
}
