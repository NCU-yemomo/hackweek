import React,{useEffect} from 'react'
import {useShowFooterStore,} from "../../store/store"
import { useNavigate } from 'react-router-dom'
import wuwu from "../../svg/猫猫哭.svg"
import "./index.css"
export default function FailExchange() {
    const setFooterFalse=useShowFooterStore(state=>state.setFalse)
    const setFooterTrue=useShowFooterStore(state=>state.setTrue)
    const navigate=useNavigate()
    useEffect(()=>{      
            setFooterFalse()
            return ()=>{
                setFooterTrue()
            }
    })
    const back=()=>{
        navigate("/product")
    }
    const add=()=>{
        //这里需要补充逻辑
        alert("已加入收藏馆")
        navigate("/product")
    }
  return (
    <div className="cs-FailExchange-x">
      <div className="cs-FailExchange-img-x">
        <img src={wuwu} alt={wuwu}></img>
       </div>
        <p>不要紧，美好的机遇值得等待</p>
        <div className="cs-FailExchange-button-x">
            <button className="cs-FailExchange-button" onClick={back}>返回</button>
            <button className="cs-FailExchange-button" onClick={add}>加入收藏</button>
        </div>
    </div>
  )
}
