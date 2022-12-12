import React from 'react'
import cuteAnimal from "../../svg/successregis/仓鼠织毛衣 1.svg"
import {useNavigate} from "react-router-dom"
import "./index.css"
export default function SuccessRegis() {
    const navigate=useNavigate()
  return (
    <div className="cs-SuccessRegis">
        <img src={cuteAnimal} alt="可爱动物"></img>
        <p>希望你在这留下自己的故事</p>
        <button onClick={()=>navigate("/login")}>下一步</button>
    </div>
  )
}
